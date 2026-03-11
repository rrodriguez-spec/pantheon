#!/usr/bin/env node

/**
 * Pantheon Router - Roam DM → Agent Session Bridge
 * 
 * Pure JS, no LLM tokens. Runs as persistent process.
 * Polls Roam bot DMs, injects messages into agent sessions.
 * 
 * Usage:
 *   node pantheon-router.js
 *   node pantheon-router.js --daemon  # Backgrounds itself
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Paths
const CONFIG_PATH = '/Users/mimir/Desktop/Mimir/urd/pantheon-registry.json';
const STATE_PATH = '/Users/mimir/Desktop/Mimir/agent/data/pantheon-router-state.json';
const LOG_PATH = '/Users/mimir/Desktop/Mimir/agent/data/pantheon-router.log';
const PID_PATH = '/Users/mimir/Desktop/Mimir/agent/data/pantheon-router.pid';

// Load API key
function loadEnv() {
  const envPath = path.join(process.env.HOME, '.moltbot', '.env');
  const env = {};
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=["']?([^"'\n]+)["']?/);
      if (match) env[match[1]] = match[2];
    });
  } catch (e) {}
  return env;
}

const ENV = loadEnv();
const ROAM_API_KEY = ENV.ROAM_API_KEY || process.env.ROAM_API_KEY;

// Polling config
const POLL_INTERVAL_MS = 15000; // 15 seconds
const IDLE_MULTIPLIER = 4;      // 60 seconds when idle
const ACTIVE_WINDOW_MS = 5 * 60 * 1000; // 5 min active window

// Logging
function log(level, msg, data = null) {
  const ts = new Date().toISOString();
  const entry = JSON.stringify({ ts, level, msg, ...(data && { data }) });
  
  if (level !== 'debug') console.log(entry);
  
  try {
    fs.appendFileSync(LOG_PATH, entry + '\n');
    // Rotate log if > 1MB
    const stats = fs.statSync(LOG_PATH);
    if (stats.size > 1024 * 1024) {
      fs.renameSync(LOG_PATH, LOG_PATH + '.old');
    }
  } catch (e) {}
}

// State management
function loadState() {
  try {
    if (fs.existsSync(STATE_PATH)) {
      return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    }
  } catch (e) {
    log('warn', 'State load failed, using defaults');
  }
  return { agents: {}, lastActivity: 0 };
}

function saveState(state) {
  const tmp = STATE_PATH + '.tmp';
  try {
    fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
    fs.renameSync(tmp, STATE_PATH);
  } catch (e) {
    log('error', 'State save failed', { error: e.message });
  }
}

// Load registry
function loadRegistry() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (e) {
    log('error', 'Registry load failed', { error: e.message });
    return { agents: {} };
  }
}

// Roam API
function roamGet(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://api.ro.am/v0/${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${ROAM_API_KEY}` }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data.slice(0, 100)}`));
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

// Get user info for sender context
async function getUserInfo(userId) {
  if (!userId || userId.startsWith('B-')) return null;
  try {
    const info = await roamGet('user.info', { userId });
    return info.user || null;
  } catch (e) {
    return null;
  }
}

// Route message to agent via moltbot
function routeToAgent(agentId, message, context) {
  return new Promise((resolve, reject) => {
    const fullMessage = `[Roam DM from ${context.senderName || context.senderId}]

${message}

---
To reply, use:
\`\`\`bash
source ~/.moltbot/.env && curl -X POST "https://api.ro.am/v0/chat.post" \\
  -H "Authorization: Bearer $ROAM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"chat": "${context.dmId}", "text": "YOUR_REPLY"}'
\`\`\``;

    log('info', 'Routing to agent', { agentId, sender: context.senderName, preview: message.slice(0, 50) });
    
    const proc = spawn('moltbot', [
      'agent',
      '--agent', agentId,
      '--message', fullMessage
    ], {
      stdio: 'ignore',
      detached: true,
      env: { ...process.env, ...ENV }
    });
    
    proc.unref();
    resolve();
  });
}

// Poll a single DM for new messages
async function pollDm(dmId, agentId, state) {
  if (!state.agents[agentId]) {
    state.agents[agentId] = { lastTs: 0, dmIds: {} };
  }
  if (!state.agents[agentId].dmIds[dmId]) {
    state.agents[agentId].dmIds[dmId] = { lastTs: 0 };
  }
  
  const dmState = state.agents[agentId].dmIds[dmId];
  
  try {
    const resp = await roamGet('chat.history', { chat: dmId, limit: '10' });
    const messages = resp.messages || [];
    
    let newCount = 0;
    for (const msg of messages) {
      // Skip old messages
      if (msg.timestamp <= dmState.lastTs) continue;
      
      // Skip bot messages
      if (msg.sender?.startsWith('B-')) continue;
      
      // Skip non-text
      if (!msg.text) continue;
      
      // Get sender info
      const user = await getUserInfo(msg.sender);
      
      // Route to agent
      await routeToAgent(agentId, msg.text, {
        dmId,
        senderId: msg.sender,
        senderName: user?.displayName || user?.email || msg.sender,
        timestamp: msg.timestamp
      });
      
      newCount++;
      state.lastActivity = Date.now();
      
      // Update last seen
      if (msg.timestamp > dmState.lastTs) {
        dmState.lastTs = msg.timestamp;
      }
    }
    
    return newCount;
  } catch (e) {
    log('error', 'DM poll failed', { dmId, agentId, error: e.message });
    return 0;
  }
}

// Main polling loop
async function pollAll(registry, state) {
  let totalNew = 0;
  
  for (const [agentId, config] of Object.entries(registry.agents)) {
    if (!config.enabled) continue;
    if (!config.roamDmIds?.length) continue;
    
    for (const dmId of config.roamDmIds) {
      const count = await pollDm(dmId, agentId, state);
      totalNew += count;
    }
  }
  
  return totalNew;
}

// Calculate adaptive interval
function getInterval(state) {
  const timeSinceActivity = Date.now() - state.lastActivity;
  if (timeSinceActivity < ACTIVE_WINDOW_MS) {
    return POLL_INTERVAL_MS;
  }
  return POLL_INTERVAL_MS * IDLE_MULTIPLIER;
}

// Main loop
async function main() {
  if (!ROAM_API_KEY) {
    log('error', 'ROAM_API_KEY not found');
    process.exit(1);
  }
  
  // Write PID
  fs.writeFileSync(PID_PATH, String(process.pid));
  
  // Handle shutdown
  const cleanup = () => {
    log('info', 'Shutting down');
    try { fs.unlinkSync(PID_PATH); } catch (e) {}
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  log('info', 'Pantheon Router starting', { pid: process.pid });
  
  let state = loadState();
  
  while (true) {
    try {
      const registry = loadRegistry();
      const newCount = await pollAll(registry, state);
      
      if (newCount > 0) {
        log('info', 'Processed messages', { count: newCount });
      }
      
      saveState(state);
      
      const interval = getInterval(state);
      await new Promise(r => setTimeout(r, interval));
      
    } catch (e) {
      log('error', 'Poll cycle failed', { error: e.message });
      await new Promise(r => setTimeout(r, 30000));
    }
  }
}

// Daemon mode
if (process.argv.includes('--daemon')) {
  const out = fs.openSync(LOG_PATH, 'a');
  const child = spawn(process.argv[0], [__filename], {
    detached: true,
    stdio: ['ignore', out, out]
  });
  child.unref();
  console.log(`Pantheon Router started as daemon (PID: ${child.pid})`);
  process.exit(0);
}

main().catch(e => {
  log('error', 'Fatal error', { error: e.message, stack: e.stack });
  process.exit(1);
});
