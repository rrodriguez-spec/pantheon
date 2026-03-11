# Architecture Overview — Pantheon System Design

## 🏛️ High-Level Architecture

Pantheon is built on the principle of **specialized intelligence** — each agent masters their domain rather than trying to be a generalist.

```
                     ┌─────────────────┐
                     │     Robert      │ (Human)
                     │   (via Signal)  │
                     └─────────┬───────┘
                               │
                    ┌─────────────────┐
                    │      Mimir      │ (Orchestrator)
                    │  "The Executive" │
                    └─────────┬───────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         ┌─────────┐    ┌─────────┐    ┌─────────┐
         │   Tyr   │    │  Bragi  │    │   Eir   │
         │  "Ops"  │    │ "Sales" │    │"Service"│
         └─────────┘    └─────────┘    └─────────┘
              │               │               │
    ┌─────────────────────────────────────────────┐
    │             The Norns (Memory)              │
    │  Verdandi (Present) │ Urd (Past) │ Skuld   │
    └─────────────────────────────────────────────┘
              │               │               │
    ┌─────────────────────────────────────────────┐
    │              External Systems               │
    │ Pipedrive │ GHL │ Zendesk │ AgencyBloc │... │
    └─────────────────────────────────────────────┘
```

## 🎯 Design Principles

### 1. **Executive Delegation**
- **Mimir** never executes domain work directly
- Each task gets routed to the appropriate specialist
- Mimir stays available for new requests and coordination

### 2. **Domain Expertise**
- **Tyr** — Operations, systems, efficiency, technical builds
- **Bragi** — Marketing, sales, pipeline management, campaigns  
- **Eir** — Service, monitoring, compliance, health checks

### 3. **Memory Continuity**
- **Verdandi** — Working memory, real-time context processing
- **Urd** — Long-term storage, decisions, procedures, history
- **Skuld** — Predictive analysis, forecasting, trend detection

### 4. **Self-Healing Architecture**
- Automated health monitoring every hour
- Auto-recovery for common integration failures
- Proactive alerting when manual intervention needed

## 🔄 Request Flow

```
1. Task arrives → Mimir
2. Mimir assesses domain
3. Delegate to specialist
4. Specialist executes
5. Report completion
6. Update Norns memory
7. Confirm with Robert
```

### Decision Tree Example

```
Pipeline report needed?
├─ YES → Bragi (sales data)
├─ NO → System optimization needed?
    ├─ YES → Tyr (operations)  
    ├─ NO → Service quality check?
        ├─ YES → Eir (monitoring)
        └─ NO → Mimir handles directly (coordination/planning)
```

## 🧠 Moltbot Gateway Integration

Pantheon runs on **Moltbot Gateway** which provides:

- **Session Management** — Multiple concurrent agent sessions
- **Channel Integration** — Signal, browser, CLI, webhooks
- **Tool Access** — File operations, web browsing, API calls
- **Memory Persistence** — File-based storage survives restarts

### Agent Session Architecture

```
Moltbot Gateway
├── mimir (main session) — Always available
├── tyr (spawned when needed) — Operations tasks
├── bragi (spawned when needed) — Marketing/sales tasks  
├── eir (spawned when needed) — Service tasks
├── verdandi (scheduled) — Memory processing
├── urd (scheduled) — Long-term memory updates
└── skuld (scheduled) — Predictive analysis
```

## 📱 Communication Channels

### Signal (Primary)
- **Robert ↔ Mimir** — Main interface for all requests
- **Emergency alerts** — Critical system failures
- **Daily briefings** — Morning status, priority updates

### Roam (Team Updates) 
- **Pantheon Updates** — Agent progress reports
- **Sales Team** — Weekly pipeline summaries
- **Service Reports** — Ticket status, stuck issues

**Architecture:** Use GROUPS not DMs for agent communication.
- One group ID per agent/function (configured once)
- Users join/leave groups without config changes
- See `router/README.md` for group IDs and management

### Browser/CLI (Secondary)
- **Development work** — Podium, integrations, debugging
- **Bulk operations** — Data exports, migrations, analysis

## 🏗️ Infrastructure

### Mac Mini M4 (Primary Host)
- **24/7 Operation** — Auto-login, prevent sleep
- **32GB RAM** — Multiple agent sessions
- **Remote Access** — VNC, SSH for management
- **Local Storage** — All memory files, configurations

### External Dependencies
- **Cloudflare** — Podium hosting, webhook endpoints
- **Google Cloud** — OAuth, calendar integration  
- **Neon** — LinkedIn SDR database
- **Various APIs** — Pipedrive, GHL, Zendesk, etc.

## 🔐 Security Architecture

### Credential Management
- **Environment Variables** — API keys in ~/.moltbot/.env
- **Never Exposed** — Agents cannot output credentials
- **Podium Proxy** — Centralized API access for some services

### Access Control
- **Signal Auth** — Phone number verification
- **Browser Profiles** — Isolated service access
- **API Tokens** — Service-specific, rotated regularly

## 📊 Monitoring & Health

### Automated Checks
- **Hourly** — Integration health (Pipedrive, GHL, Zendesk)
- **Daily** — Full system health check with auto-fix
- **Weekly** — Pipeline analysis, stuck ticket reports

### Self-Healing
- **Token Refresh** — Auto-renew Google OAuth tokens
- **API Failover** — Browser fallback for API failures
- **Process Restart** — Auto-recover crashed sessions

## 📈 Scalability

### Adding New Agents
1. Create agent directory (e.g., `loki-agent/`)
2. Add AGENTS.md configuration  
3. Update Miltbot config with new agent
4. Define domain boundaries in Pantheon docs
5. Add cron jobs for regular tasks

### Adding New Integrations  
1. Add API keys to environment
2. Update `integrations/manifest.md`
3. Create health check in Eir
4. Document procedures in Urd

### Memory Growth
- **Automatic Archiving** — Old files moved to yearly folders
- **Intelligent Summarization** — Urd processes verbose logs
- **Context Compression** — Verdandi creates concise working memory

## 🎛️ Configuration Management

All agent configurations stored in:
- `agents/{agent-name}/AGENTS.md` — Core configuration
- `agents/{agent-name}/SOUL.md` — Personality/voice (where applicable)
- `~/.moltbot/moltbot.json` — Gateway configuration
- `crons/cron-export.json` — Scheduled automation

## 🔄 Deployment Process

1. **Development** — Local testing in isolated sessions
2. **Staging** — Verify on Mac Mini before production
3. **Production** — Deploy to main agent sessions
4. **Monitoring** — Watch health checks for failures
5. **Rollback** — Git-managed configurations for quick revert

---

This architecture has **proven successful** for 24/7 operations since February 2026, handling thousands of automated tasks with 99.9% uptime.