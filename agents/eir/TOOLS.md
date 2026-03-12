# TOOLS.md - Eir Capability Reference

*Last updated: 2026-02-24 by Eir (System Access Audit)*

## ✅ FULLY WORKING Integrations

### 1. Zendesk - DIRECT API ✅
**Status:** Full API access confirmed
**Auth:** Email/token Basic auth
**Env Vars:** `ZENDESK_SUBDOMAIN`, `ZENDESK_EMAIL`, `ZENDESK_TOKEN`
**Capabilities:**
- ✅ Read ticket counts (verified: 2,290 tickets)
- ✅ Read individual tickets
- ✅ Create/update tickets
- ✅ Add comments
- ✅ Assign tickets

**Example:**
```bash
curl -u "$ZENDESK_EMAIL/token:$ZENDESK_TOKEN" \
  "https://$ZENDESK_SUBDOMAIN.zendesk.com/api/v2/tickets/count.json"
```

### 2. Notion - DIRECT API ✅
**Status:** Full API access confirmed
**Auth:** Bearer token
**Env Vars:** `NOTION_TOKEN`
**Capabilities:**
- ✅ Read pages
- ✅ Search databases
- ✅ Update pages
- ✅ Create pages

**Example:**
```bash
curl -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/users/me"
```

### 3. Podium Stats Endpoint ✅
**URL:** `https://podium-8e8.pages.dev/api/stats`
**Auth:** None required (public)
**Returns:**
- Zendesk: total, new, open, pending, hold, solved counts
- Pipedrive: casesOpen, casesWon, topProducers, retention
- Production: YTD, weekly history, goals

**Usage:**
```bash
curl -s https://podium-8e8.pages.dev/api/stats | jq
# Force refresh:
curl -s "https://podium-8e8.pages.dev/api/stats?refresh=1"
```

### 4. AgencyBloc - DIRECT API ✅
**Status:** Working (credentials in file)
**Auth:** SID + API Key (form-encoded POST)
**Credentials:** `/Users/robertrodriguez/.moltbot/credentials/agencybloc.json`
**Capabilities:**
- ✅ Search groups
- ✅ Search individuals
- ✅ Search policies
- ✅ Get agent details

**Note:** Use `key=` not `APIKey=` in POST data

### 5. Google (Gmail/Calendar/Sheets) ✅
**Status:** OAuth tokens available
**Credentials:** `/Users/robertrodriguez/.moltbot/credentials/google-tokens.json`
**Has:** Access token + Refresh token
**Capabilities:**
- ✅ Read calendar events
- ✅ Read Gmail
- ✅ Send Gmail
- ✅ Read/write Sheets

### 6. Message Tool (Signal) ✅
**Status:** Working
**Capabilities:**
- ✅ Send messages to Mimir/Robert
- ✅ React to messages
- ✅ Alert on failures

### 7. ro.am ✅
**Status:** Connected
**Env Vars:** `ROAM_API_KEY`

### 8. Browser Control ✅
**Status:** Available (chrome profile)
**Note:** Browser not currently running but can be started

## ⚠️ PROXY-ONLY Access

### Pipedrive
**Direct API:** ❌ No env vars
**Via Podium:** ✅ Stats available (casesOpen, casesWon, retention)
**Limitation:** Cannot access individual deals or create activities

### GoHighLevel
**Direct API:** ❌ No env vars
**Via Podium:** ⚠️ If integrated
**Limitation:** Cannot directly manage contacts/campaigns

## ❌ NOT AVAILABLE

### Node Monitoring
**Status:** No nodes connected
**Reason:** Mac Mini not yet online
**Future:** Will enable bot health monitoring when paired

### Direct Pipedrive/GHL API
**Status:** Env vars not in my session (by design)
**Workaround:** Use Podium stats or request endpoint expansion

## Health Check Capabilities

| System | Direct API | Via Podium | Can Alert |
|--------|------------|------------|-----------|
| Zendesk | ✅ FULL | ✅ Stats | ✅ |
| Pipedrive | ❌ | ✅ Stats | ✅ |
| Notion | ✅ FULL | N/A | ✅ |
| AgencyBloc | ✅ FULL | ❌ | ✅ |
| Google | ✅ FULL | N/A | ✅ |
| GHL | ❌ | ⚠️ | ✅ |
| Nodes | ❌ | N/A | N/A |

## How to Check Integration Health

Per `/Users/robertrodriguez/Desktop/Mimir/urd/auth-rules.md`:

```bash
# Quick health check (all major systems)
curl -s https://podium-8e8.pages.dev/api/stats | jq '{
  zendesk_ok: (.zendesk.total != null),
  pipedrive_ok: (.pipedrive.casesOpen != null),
  last_updated: .lastUpdated
}'

# Zendesk direct (more detailed)
curl -s -u "$ZENDESK_EMAIL/token:$ZENDESK_TOKEN" \
  "https://$ZENDESK_SUBDOMAIN.zendesk.com/api/v2/tickets/count.json"

# Notion direct
curl -s -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/users/me"
```

## Current Data (as of audit)

From Podium stats:
- **Zendesk:** 2,297 total tickets, 23 open, 2 pending, 24 on hold
- **Pipedrive:** 8 cases open, 1 won YTD
- **Retention:** 50% (4 retained, 4 lost)
- **Last Updated:** 2026-02-24T13:54:40Z

## Escalation Path

When I detect issues I cannot fix:
1. Alert Mimir via Signal (main agent)
2. Document in `/Users/robertrodriguez/Desktop/Mimir/urd/issues.md` if persistent
3. Only escalate to Robert for critical failures

---
*Audit completed 2026-02-24 by Eir*
