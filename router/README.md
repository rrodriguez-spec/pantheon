# Pantheon Router

Pure JS Roam DM → Agent Session bridge. Zero LLM tokens for routing.

## How It Works

```
Roam Bot DM → Router (polls) → moltbot agent --agent <id> → Agent Session
                                                              ↓
                                                    Uses Urd/Verdandi
                                                    (same as Telegram)
```

## Files

| File | Purpose |
|------|---------|
| `pantheon-router.js` | Main router daemon |
| `pantheon-registry.json` | Agent config (DM IDs, tiers, escalation) |

## Running

```bash
# Start as daemon
node pantheon-router.js --daemon

# Or via launchd (auto-restart on boot)
launchctl load ~/Library/LaunchAgents/com.pantheon.router.plist
```

## Adding New Agents

1. Create Roam bot account in Settings → Developer → Apps
2. Update `pantheon-registry.json`:
   ```json
   "newagent": {
     "tier": 2,
     "roamBotId": "B-xxx",
     "roamDmIds": ["D-xxx"],
     "escalatesTo": "mimir",
     "enabled": true
   }
   ```
3. Router auto-detects on next poll cycle

## Polling Intervals

- **Active**: 15 seconds (within 5 min of last message)
- **Idle**: 60 seconds

## Architecture Decision (2026-03-11)

Consensus between Mimir and Tyr after 3 rounds of iteration:
- Pure JS, no LLM tokens for routing
- Roam treated like any other channel (Telegram, Signal)
- Agents use existing Urd/Verdandi memory infrastructure
- Each agent has own Roam bot identity (separate DMs)

## 🔑 GROUPS vs DMs (2026-03-12)

**Use Roam GROUPS instead of DMs for multi-user agent communication.**

### Why Groups?

| DMs | Groups |
|-----|--------|
| ❌ Each DM = unique channel ID | ✅ One group ID, many users |
| ❌ Adding user = config change | ✅ Adding user = group invite |
| ❌ Must update registry for each user | ✅ Config once, users join/leave freely |

### Pattern

```
1. Create one group per agent/function
2. Add group ID to config ONCE  
3. Add/remove users via Roam group management
4. No config changes needed for user management
```

### Current Groups

| Group | Purpose | ID |
|-------|---------|-----|
| Pantheon Updates | Agent logs, status | `G-6a05abc2-60f6-4308-b477-e27a716a74f9` |
| System Health | Health alerts | `G-33f3a0fc-2e74-4f31-bb1b-87aeb3579d3e` |
| Mimir Testing | Dev/testing | `G-a3d536c9-f926-4b3d-8b68-ceea5c7a86f8` |

### Adding Users to Agent Communication

**DO THIS:**
1. Go to Roam → appropriate group
2. Add user to group
3. Done

**DON'T DO THIS:**
- Create new DM channels
- Update config files for each user
- Configure channel IDs per-person

See `urd/decisions.md` for full rationale.
