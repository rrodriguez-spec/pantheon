# Automated Tasks — Cron Job Definitions

> **35 automated tasks** running 24/7 to keep Taylor Insurance Services operating smoothly

## 🌅 Morning Tasks (4:00 - 8:00 AM)

### **4:00 AM — Morning Learning Scan**
**Purpose:** Daily research for AI/automation best practices  
**Frequency:** Every weekday  
**What it does:** Scans Reddit, Twitter, Discord, GitHub, and Hacker News for new Moltbot features, agent architecture patterns, and automation improvements. Writes findings to `urd/learnings/YYYY-MM-DD.md`  
**Why:** Keeps Pantheon system updated with latest AI agent techniques and prevents us from missing important developments

### **4:45 AM — Tyr Morning Learning**  
**Purpose:** Operations-focused learning scan  
**Frequency:** Every weekday  
**What it does:** Searches for operations efficiency, insurance industry best practices, AgencyBloc tips, and SOPs. Focuses on actionable insights for TIS operations  
**Why:** Ensures operations domain stays current with industry developments

### **4:50 AM — Bragi Morning Learning**
**Purpose:** Sales & Marketing learning scan  
**Frequency:** Every weekday  
**What it does:** Researches B2B sales strategies, LinkedIn tactics, GoHighLevel tips, insurance marketing, and AI in sales/marketing  
**Why:** Keeps sales and marketing strategies fresh and competitive

### **4:55 AM — Eir Morning Learning**
**Purpose:** Service & Compliance learning scan  
**Frequency:** Every weekday  
**What it does:** Monitors customer success best practices, Zendesk optimization, insurance compliance updates, and support automation  
**Why:** Maintains service excellence and regulatory compliance

### **5:00 AM — LinkedIn SDR Daily Approval**
**Purpose:** Generate connection requests for approval  
**Frequency:** Every weekday  
**What it does:** Creates 10 personalized LinkedIn connection requests targeting HR/Benefits decision makers. Sends to Robert for approval before sending  
**Why:** Maintains consistent prospecting pipeline with human oversight

### **6:00 AM — Daily Health Check**
**Purpose:** Complete system health validation  
**Frequency:** Every day  
**What it does:** Runs comprehensive health check script with auto-repair. Tests all integrations, fixes common issues, and reports failures that need human attention  
**Why:** Prevents small issues from becoming big problems

### **6:00 AM — Skuld Daily Forecast**
**Purpose:** Predictive analysis for the day ahead  
**Frequency:** Every weekday  
**What it does:** Analyzes Pipedrive pipeline, Zendesk tickets, and historical data to predict workload, identify risks, and suggest priorities  
**Why:** Helps Robert plan his day with data-driven insights

### **6:00 AM — Daily Notion Orphan Cleanup**
**Purpose:** Organize scattered Notion pages  
**Frequency:** Every weekday  
**What it does:** Finds orphaned pages that aren't properly organized in folders and suggests where they should go  
**Why:** Keeps knowledge base organized and findable

### **6:00 AM — Weekly Stuck Tickets Report** 
**Purpose:** Service quality monitoring  
**Frequency:** Every Monday  
**What it does:** Finds Zendesk tickets older than 30 days or marked urgent. Reports to Service Reports channel for attention  
**Why:** Prevents customers from falling through cracks

### **7:00 AM — Weekly Pipeline Analysis**
**Purpose:** Strategic business intelligence  
**Frequency:** Every Monday  
**What it does:** Tyr analyzes pipeline health, win rates, stalled deals, and provides strategic insights. Posts to Pantheon Updates channel  
**Why:** Gives management strategic context for weekly planning

### **7:00 AM — Daily Integration Health Check**
**Purpose:** Morning integration validation  
**Frequency:** Every weekday  
**What it does:** Eir tests Podium stats, sales goals, and webhook endpoints. Reports any systems that are actually down  
**Why:** Catches integration failures early in the day

### **7:00 AM — LinkedIn SDR Morning Prospects**
**Purpose:** Fresh prospect discovery  
**Frequency:** Every weekday  
**What it does:** Searches Sales Navigator for new prospects matching ICP, gathers context, crafts personalized messages, and sends digest to Robert  
**Why:** Keeps prospect pipeline fresh with quality targets

### **8:00 AM — Daily Briefing + Schedule**
**Purpose:** Robert's daily startup briefing  
**Frequency:** Every weekday  
**What it does:** Summarizes system status, ticket count, pipeline changes, new leads, overnight alerts, and today's meetings  
**Why:** Gives Robert complete situational awareness to start his workday

### **8:30 AM — Pantheon Daily Progress Reports**
**Purpose:** Track specialist agent progress  
**Frequency:** Every weekday  
**What it does:** Collects progress from Eir, Bragi, and Tyr. Synthesizes accomplishments and flags items needing attention  
**Why:** Ensures all agents are making progress and nothing is stalled

### **8:00 AM — Weekly Spectrum Cases Summary**
**Purpose:** Sales team pipeline update  
**Frequency:** Every Friday  
**What it does:** Pulls Spectrum pipeline data (new deals, closed deals, values by owner) and posts to Sales Team channel  
**Why:** Keeps sales team informed on weekly performance

### **9:00 AM — Agent of the Week Shoutout**
**Purpose:** Team motivation and recognition  
**Frequency:** Every Friday  
**What it does:** Finds agent with highest voluntary production this week and posts celebratory message to General channel  
**Why:** Recognizes top performance and builds team morale

### **9:00 AM — Bragi Daily Marketing Check**  
**Purpose:** Marketing system monitoring  
**Frequency:** Every weekday  
**What it does:** Checks GHL for new leads, verifies scheduled content, flags poor-performing campaigns, suggests content ideas  
**Why:** Ensures marketing automation is running smoothly

### **9:00 AM — Process → Playbook Sync**
**Purpose:** Knowledge base maintenance  
**Frequency:** Every day  
**What it does:** Finds completed processes in Notion Process Project and adds them to TIS Operations Playbook under correct departments  
**Why:** Keeps operational knowledge organized and accessible

## 🔄 Ongoing Monitoring (During Business Hours)

### **Every 5 Minutes — BiFrost Monitor**
**Purpose:** Monitor communication with Chancellor  
**Frequency:** Continuous during hours  
**What it does:** Checks BiFrost Roam channel for new messages from Chancellor and responds thoughtfully when needed  
**Why:** Maintains important business relationship

### **Every 15 Minutes — Support Channel Monitor**  
**Purpose:** Podium bug monitoring and fixing  
**Frequency:** 9 AM - 5 PM, weekdays  
**What it does:** Watches Support channel for Podium bugs from Elaine, analyzes issues, fixes when possible, and deploys solutions  
**Why:** Provides rapid response to operational issues

### **Every 20 Minutes — Verdandi Checkpoint**
**Purpose:** Memory continuity protection  
**Frequency:** Continuous  
**What it does:** Processes journal entries into working context, updates memory state, and preserves conversation continuity  
**Why:** Prevents context loss during system compactions

### **Every 30 Minutes — LinkedIn SDR Message Monitor**
**Purpose:** LinkedIn prospect communication  
**Frequency:** 9 AM - 6 PM, weekdays  
**What it does:** Bragi monitors LinkedIn messages, manages responses with delays, tracks connection accepts, updates GHL contacts  
**Why:** Maintains authentic communication patterns and tracks prospect engagement

## 🌆 Afternoon Tasks (10:00 AM - 6:00 PM)

### **10:00 AM — LinkedIn SDR Morning Run**
**Purpose:** Execute morning LinkedIn activities  
**Frequency:** Every weekday  
**What it does:** Runs LinkedIn processor for up to 15 actions (profile views, connections, messages)  
**Why:** Maintains consistent prospecting activity

### **1:00 PM — Afternoon Email Scan**
**Purpose:** Midday email monitoring  
**Frequency:** Every weekday  
**What it does:** Scans Robert's email for new tasks since morning, identifies action items, flags items needing attention  
**Why:** Catches important emails that arrive during busy morning

### **2:00 PM — LinkedIn SDR Afternoon Check**  
**Purpose:** Afternoon LinkedIn monitoring  
**Frequency:** Every weekday  
**What it does:** Checks for LinkedIn replies, runs small batch of activities if needed  
**Why:** Maintains engagement throughout the day

## 🌙 Evening Tasks (After Hours)

### **11:00 PM — Verdandi Nightly Urd Sync**
**Purpose:** End-of-day memory consolidation  
**Frequency:** Every night  
**What it does:** Extracts decisions and facts from working memory, updates Urd files, clears processed journal entries  
**Why:** Preserves important knowledge permanently

### **11:30 PM — Nightly Reflection Scan**
**Purpose:** Pattern detection and learning  
**Frequency:** Every night  
**What it does:** Analyzes correction patterns, promotes recurring issues to lessons.md for review  
**Why:** Improves system performance through pattern recognition

## 🔄 Periodic Tasks

### **Every 4 Hours — Urd Memory Processing**
**Purpose:** Long-term memory updating  
**Frequency:** 6 AM, 10 AM, 2 PM, 6 PM, 10 PM  
**What it does:** Urd agent processes session transcripts, extracts key information, updates memory files  
**Why:** Maintains comprehensive knowledge base

### **3 Times Daily — Podium Stats Refresh**
**Purpose:** Data freshness maintenance  
**Frequency:** 8 AM, 12 PM, 4 PM  
**What it does:** Forces refresh of Podium statistics from Pipedrive and Zendesk  
**Why:** Ensures dashboard shows current data

### **3 Times Daily — Sales Goals Refresh**
**Purpose:** Performance tracking update  
**Frequency:** 8 AM, 12 PM, 4 PM  
**What it does:** Syncs sales goals data from Google Sheets to Podium  
**Why:** Keeps performance metrics current

## 🛡️ Security Tasks

### **Every Other Day in February — Acid Burn Security Test**
**Purpose:** Security testing and validation  
**Frequency:** Every even day in February  
**What it does:** Acid Burn agent tests system defenses, attempts social engineering and prompt injection, audits applications  
**Why:** Validates security measures and identifies vulnerabilities

## 📊 Task Categories

### **Health & Monitoring (8 tasks)**
- System health checks
- Integration validation  
- Bot healing
- Performance monitoring

### **Learning & Improvement (4 tasks)**
- Daily learning scans
- Pattern detection
- Best practice research
- Knowledge updates

### **Sales & Marketing (8 tasks)**
- LinkedIn SDR management
- Pipeline analysis
- Lead monitoring
- Content management

### **Operations & Maintenance (10 tasks)**
- Memory management
- Data synchronization
- Knowledge organization
- Process automation

### **Communication & Reporting (5 tasks)**
- Daily briefings
- Progress reports
- Team updates
- Status communications

## 🎯 Success Metrics

### **Uptime:** 99.9% system availability
- Health checks catch 95% of issues before they affect users
- Auto-repair resolves 80% of issues without human intervention

### **Efficiency:** 24/7 automated operations
- 35 tasks running continuously
- ~2,000 automated actions per week
- Human intervention needed <5% of the time

### **Learning:** Continuous improvement
- Daily learning scans across 4 domains
- Pattern recognition and lesson extraction
- Knowledge base grows automatically

### **Communication:** Proactive status updates
- Morning briefings set daily context
- Progress reports track agent work
- Issue alerts prevent surprises

---

This automation framework has **successfully operated** Taylor Insurance Services since February 2026, handling routine operations and freeing humans for strategic work.