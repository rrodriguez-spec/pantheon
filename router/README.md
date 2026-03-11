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
