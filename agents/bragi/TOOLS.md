# TOOLS.md - Bragi Marketing Agent

## Capability Status (Verified Feb 23, 2026)

### ✅ WORKING - Direct Access

| Integration | Status | Access Method | Notes |
|-------------|--------|---------------|-------|
| Google Sheets | ✅ Full | Local OAuth tokens | Voluntary Production Scorecard accessible |
| Google Calendar | ✅ Full | Local OAuth tokens | Can read events |
| Notion | ✅ Full | $NOTION_TOKEN env var | Can search/read all shared pages |
| Pipedrive (read) | ✅ Read | Podium `/api/stats` | Cases, retention, producers |
| Zendesk (read) | ✅ Read | Podium `/api/stats` | Ticket counts, weekly stats |

### ✅ WORKING - Via Automation

| Integration | Status | Access Method | Notes |
|-------------|--------|---------------|-------|
| GoHighLevel | ✅ Automated | `tis-automations.pages.dev` | ~8,500 contacts, nurture automation |
| GHL Nurture Pipeline | ✅ | Webhook triggers | Pipedrive Archive → GHL nurture |

### ⚠️ NOT AVAILABLE (By Design)

| Integration | Why | Workaround |
|-------------|-----|------------|
| GHL Direct API | Credentials in Cloudflare secrets only | Use webhook triggers or request via main session |
| Pipedrive Write | Credentials in Cloudflare only | Request via Podium or main session |

---

## How To Use

### Read Production Data
```bash
curl -s https://podium-8e8.pages.dev/api/stats | jq '.production'
```

### Read Google Sheets
```bash
ACCESS_TOKEN=$(bash /Users/robertrodriguez/Desktop/Mimir/agent/scripts/refresh-google-token.sh)
SHEET_ID="1G6NK7PA0sy5_9Gdq5FMdrVKw_aQfj-_DkPvnB70HlHo"
curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SHEET_ID/values/'Totals'!A1:Z10" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### Search Notion
```bash
curl -s "https://api.notion.com/v1/search" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"query": "search term"}'
```

### Trigger GHL Automation
```bash
# Via webhook (for Pipedrive archive flows)
curl -s -X POST "https://tis-automations.pages.dev/api/ghl" \
  -H "Content-Type: application/json" \
  -d '{"event": "...", "data": {...}}'
```

---

## Marketing Focus Areas

### Current Data Available
- **Voluntary Production Scorecard** - Weekly production by agent
- **Pipeline Status** - 8 open cases, 1 won (current week)
- **Retention** - 50% rate (4 retained, 4 lost)
- **Lead Attribution** - Via Pipedrive → Podium

### GHL Contact Pool
- ~8,500 contacts in nurture system
- Location ID: OEjnTawItnvTvrwLCojP
- Tags available: `nurture-cold`, `pipedrive-archive`, custom

---

*Last verified: 2026-02-23 by Bragi*
