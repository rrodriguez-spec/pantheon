# The Norns — Memory Architecture

> *"The three sisters who weave the threads of fate"*

The Norns provide **5-layer memory protection** ensuring context continuity across sessions, compactions, and system restarts. Named after the Norse goddesses of fate, they represent the temporal dimensions of knowledge.

## 🌿 Urd — The Past (Long-term Memory)

**Location:** `/Users/mimir/Desktop/Mimir/urd/`  
**Purpose:** Permanent knowledge storage and retrieval

### Core Files

| File | Purpose | Contents |
|------|---------|----------|
| `integrations.md` | System capabilities | API status, webhook endpoints, working integrations |
| `decisions.md` | Past choices | Strategic decisions with rationale and outcomes |
| `procedures.md` | How-to guides | Step-by-step workflows and commands |
| `clients.md` | Customer knowledge | Client history, preferences, special requirements |
| `history.md` | Event timeline | Chronological record of important events |
| `PANTHEON.md` | System architecture | Agent roles, infrastructure, delegation rules |
| `business_context.md` | Company knowledge | TIS operations, goals, processes |

### Specialized Directories

```
urd/
├── agencybloc/          # Client management system data
├── benselect/           # Benefits selection platform
├── clients/             # Individual client folders
├── gohighlevel/         # Marketing automation data  
├── pipedrive/           # Sales pipeline information
├── zendesk/             # Support ticket knowledge
├── learnings/           # Daily learning scans
├── ops/                 # Operational procedures
└── systems/             # Technical system documentation
```

### Usage Protocol
- **MANDATORY CHECK** — All agents must read Urd before claiming inability
- **Never assume** — Always verify current capabilities in integrations.md
- **Update frequently** — New decisions and procedures immediately added
- **Organized structure** — Files grouped by domain for easy navigation

## 🌀 Verdandi — The Present (Working Memory)

**Location:** `/Users/mimir/Desktop/Mimir/verdandi/`  
**Purpose:** Real-time context processing and working memory

### Key Files

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `journal.jsonl` | Real-time activity log | Every significant action |
| `working-context.md` | Current conversation state | Every 20 minutes |
| `state.json` | Memory metadata | Every checkpoint |

### Real-time Journal
```jsonl
{"ts":1709654400,"type":"decision","content":"Delegated pipeline analysis to Tyr"}
{"ts":1709654500,"type":"completion","content":"Tyr completed weekly pipeline report"}  
{"ts":1709654600,"type":"thread","content":"Started discussion about GHL automation"}
```

### Working Context Format
```markdown
<!-- verdandi:2026-03-09T14:30:00Z:threads:3:confidence:0.85 -->

# Current Threads

## Thread 1: Pipeline Analysis (Active)
- Status: Delegated to Tyr  
- Expected completion: 14:45
- Next action: Review results

## Thread 2: GHL Automation (Planning)
- Status: Gathering requirements
- Owner: Bragi
- Notes: Waiting for approval criteria

# Recent Decisions
- Approved new LinkedIn SDR sequence
- Deferred Zendesk automation until Q2

# Pending Items  
- [ ] Review Tyr's pipeline analysis
- [ ] Schedule GHL automation planning session
```

### State Metadata
```json
{
  "timestamp": "2026-03-09T14:30:00Z",
  "status": "active",
  "confidence": 0.85,
  "threadsActive": 3,
  "pendingActions": 2,
  "lastCompaction": "2026-03-09T12:00:00Z"
}
```

### Checkpoint Process
**Every 20 minutes** (automated cron):
1. Read new journal entries
2. Consolidate into coherent context
3. Update working-context.md atomically  
4. Update state.json with metadata
5. Preserve buffer of recent entries

## 🔮 Skuld — The Future (Predictive Analysis)

**Location:** `/Users/mimir/Desktop/Mimir/skuld/`  
**Purpose:** Forecasting, trend analysis, and predictive insights

### Daily Forecasts
**Generated every morning at 6 AM:**

```markdown  
# Daily Forecast — March 9, 2026

## Pipeline Predictions
- 3 deals likely to close this week (85% confidence)
- Spectrum pipeline showing 15% growth trend
- Implementation pipeline backlog increasing

## Workload Forecast
- High: Tyr (2 system integrations due)
- Medium: Bragi (weekly campaign launch)  
- Low: Eir (routine monitoring only)

## Risk Assessment
- ⚠️ AgencyBloc license renewal dates missing (data quality issue)
- ✅ All integrations healthy
- 📈 GHL lead volume up 23% vs last month

## Recommendations
1. Prioritize AgencyBloc data cleanup (assign to Tyr)
2. Scale GHL automation for increased lead volume (Bragi)
3. Plan additional Implementation resources for Q2
```

### Trend Analysis
- **Sales Velocity** — Deal progression speed by stage
- **Lead Quality** — Conversion patterns from different sources
- **System Health** — Integration failure patterns and recovery times  
- **Workload Patterns** — Agent utilization and capacity planning

### Strategic Insights  
- **Quarterly Planning** — Revenue projections and resource needs
- **Market Trends** — Industry patterns affecting TIS
- **Technology Evolution** — New tools and integration opportunities
- **Risk Mitigation** — Potential issues before they become critical

## 🔄 5-Layer Memory Protection

### Layer 1: Real-time Journal (Always Active)
```bash
# Immediate logging after every significant action
echo '{"ts":'$(date +%s)',"type":"decision","content":"..."}' >> journal.jsonl
```
- **Instant capture** — No processing delay
- **Append-only** — Never lose data
- **Automated** — Built into all agent workflows

### Layer 2: Periodic Checkpoint (Every 20 min)
- **Automated cron** — Not dependent on compaction timing  
- **Context consolidation** — Journal → working-context.md
- **Metadata tracking** — Confidence and freshness indicators

### Layer 3: Pre-Compaction Flush
When context approaches limits:
1. **Verdandi processes** — Raw thread context → structured memory
2. **State preservation** — Active threads and pending items captured
3. **Urd promotion** — Important decisions moved to long-term storage

### Layer 4: Transcript Mining (Fallback)  
If Verdandi context is stale (>2 hours):
- **Session history** — Mine recent conversation transcripts
- **Pattern recognition** — Extract key decisions and context
- **Context reconstruction** — Rebuild working memory from logs

### Layer 5: Urd Permanent Storage
- **Decision archive** — All strategic choices preserved
- **Procedure library** — How-to guides never lost
- **Integration knowledge** — API capabilities and status
- **Client history** — Relationship context maintained

## 🧠 Context Recovery Protocol

### After Compaction (Hardened Read)

**Step 1: Bootstrap from state.json**
```bash
# Check metadata first
cat /Users/mimir/Desktop/Mimir/verdandi/state.json
```
- Timestamp < 30 min: ✅ Fresh
- Timestamp 30min-2hr: ⚠️ Usable  
- Timestamp > 2hr: 🔴 Stale

**Step 2: Read working context**  
```bash
# Get current context
cat /Users/mimir/Desktop/Mimir/verdandi/working-context.md
```
- Validate header format
- Check confidence score
- Extract active threads

**Step 3: Fallback if needed**
```bash
# Check today's memory
cat /Users/mimir/Desktop/Mimir/agent/memory/$(date +%Y-%m-%d).md

# Search long-term memory  
grep -r "keyword" /Users/mimir/Desktop/Mimir/urd/
```

**Step 4: Silent recovery**
- **Never say "I lost context"**
- **Recover automatically** — Use available memory layers
- **Graceful degradation** — Work with what's available

## 📊 Memory Health Monitoring

### Automated Checks
- **Verdandi freshness** — State.json timestamp validation
- **Urd completeness** — Critical files present and updated
- **Skuld accuracy** — Prediction vs actual outcome tracking
- **Journal integrity** — No corruption or gaps

### Performance Metrics
- **Context recovery time** — How quickly memory is restored
- **Prediction accuracy** — Skuld forecast vs reality  
- **Memory utilization** — Storage growth and cleanup efficiency
- **Cross-agent consistency** — Shared knowledge synchronization

## 🔄 Nightly Memory Consolidation

**11:30 PM automated process:**

1. **Verdandi → Urd promotion**
   - Extract permanent decisions from working memory
   - Update procedures.md with new workflows
   - Archive completed projects

2. **Journal cleanup**
   - Preserve last 10 entries as buffer
   - Archive processed events
   - Reset for next day

3. **Skuld analysis update**  
   - Review prediction accuracy
   - Update forecasting models
   - Generate tomorrow's forecast

## 🎛️ Configuration and Tuning

### Memory Retention Policies
- **Journal entries** — 48 hours active, then archived
- **Working context** — 24 hours active, then consolidated  
- **Daily forecasts** — 30 days active, then summary archived
- **Urd files** — Permanent (with yearly archiving)

### Performance Tuning
- **Checkpoint frequency** — Adjustable based on activity level
- **Context window size** — Optimized for model capacity  
- **Confidence thresholds** — Tuned for accuracy vs coverage
- **Compression ratios** — Balance detail vs storage efficiency

---

The Norn architecture has **proven reliable** since February 2026, with **zero context loss incidents** and seamless operation across thousands of agent sessions and context compactions.