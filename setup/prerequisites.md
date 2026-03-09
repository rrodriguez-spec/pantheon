# Prerequisites — What You Need Before Starting

Before setting up the Pantheon system, ensure you have access to all required tools, accounts, and infrastructure.

## 🖥️ Hardware Requirements

### **Dedicated Host Machine**
- **Recommended:** Mac Mini M4 (32GB RAM) or equivalent
- **Minimum:** 16GB RAM, 4-core processor, 512GB storage
- **Network:** Stable internet connection, static IP preferred
- **Uptime:** 24/7 operation capability

### **Why Dedicated Hardware?**
- **Always Available** — Agents respond instantly, no wake-up delay
- **Persistent Sessions** — Memory and context preserved across conversations
- **Reliable Automation** — Cron jobs run uninterrupted
- **Local Storage** — Fast access to memory files and configurations

---

## 🛠️ Software Requirements

### **Operating System**
- **Recommended:** macOS 26.2+ (Tahoe)
- **Alternative:** Linux (Ubuntu 22.04+) with modifications
- **Not Recommended:** Windows (path compatibility issues)

### **Core Software Stack**
```bash
# Node.js (Latest LTS)
node --version  # v25.8.0 or higher

# Google Chrome (for browser automation)
# Playwright (installed with Moltbot)

# Git (version control)
git --version

# Optional: iTerm2 or better terminal
```

### **Moltbot Gateway**
- **Installation:** Follow official Moltbot installation guide
- **Version:** Latest stable release
- **Configuration:** Multi-agent support enabled
- **Features:** Signal integration, browser control, file operations

---

## 🔑 Required Accounts & Subscriptions

### **Core Business Systems**

#### **Pipedrive** (Pipeline Management)
- **Required:** Professional plan or higher
- **Admin Access:** Needed for API token generation
- **Webhooks:** Ability to create webhooks for automation

#### **GoHighLevel** (Marketing Automation)  
- **Required:** Agency account with location access
- **API Access:** Location API key (NOT agency key)
- **Permissions:** Full contact and campaign management

#### **Zendesk** (Customer Support)
- **Required:** Professional plan for API access
- **Admin Access:** Needed for API token generation
- **Ticket Management:** Agent-level permissions minimum

#### **AgencyBloc** (Client Management)
- **Required:** API access enabled account
- **Browser Access:** Administrative user account
- **Data Access:** Groups, individuals, policies, agents

### **Productivity & Communication**

#### **Google Workspace**
- **Required:** Business account with API access
- **Admin Rights:** Needed for OAuth app creation
- **Services:** Gmail, Calendar, Sheets, Drive

#### **Notion**
- **Required:** Team/Business plan
- **Admin Access:** Workspace admin for integration setup
- **Page Sharing:** Ability to share pages with integrations

#### **Signal** (Primary Communication)  
- **Required:** Signal account on mobile device
- **Desktop:** Signal Desktop for development/testing
- **Number:** Dedicated business number recommended

### **Supporting Services**

#### **Apollo.io** (Prospect Data)
- **Required:** Paid plan with API access
- **Credits:** Sufficient contact export credits
- **Features:** People search, organization search, enrichment

#### **LinkedIn Sales Navigator**
- **Required:** Sales Navigator subscription
- **Premium Features:** Advanced search filters and InMail
- **Team License:** If multiple users need access

#### **Cloudflare** (Hosting & CDN)
- **Required:** Free plan minimum, Pro recommended
- **Features:** Workers, Pages, DNS management
- **Domains:** Custom domain for professional appearance

---

## 🌐 Infrastructure Setup

### **Domain & DNS**
- **Custom Domain** — Professional appearance for webhooks and tools
- **DNS Management** — Cloudflare recommended for ease
- **SSL Certificates** — Automatic via Cloudflare

### **Cloud Storage** (Optional but Recommended)
- **Backup Location** — For memory files and configurations
- **Version Control** — GitHub/GitLab for configuration management
- **Monitoring** — Uptime monitoring service

---

## 📱 Device Requirements

### **Mobile Device**
- **Signal App** — Primary communication channel
- **Phone Number** — For Signal account registration
- **Notifications** — Push notification capability

### **Development Machine** (If Different from Host)
- **SSH Client** — For remote management
- **VNC/Screen Sharing** — For GUI access when needed
- **Text Editor** — For configuration management

---

## 🔐 Security Prerequisites

### **Authentication Methods**
- **Two-Factor Authentication** — Enabled on all critical accounts
- **Strong Passwords** — Unique passwords for each service
- **Password Manager** — For secure credential storage

### **Network Security**
- **Firewall** — Basic firewall configuration
- **VPN** (Optional) — For secure remote access
- **SSH Keys** — For secure remote management

---

## 💳 Budget Considerations

### **Monthly Service Costs** (Approximate)
| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| Pipedrive | $25-100 | Depends on plan and users |
| GoHighLevel | $97+ | Location license |
| Zendesk | $19-99 | Per agent pricing |
| AgencyBloc | $XX | Contact for pricing |
| Google Workspace | $6-18/user | Business plan minimum |
| Apollo.io | $49-149 | Depends on plan and credits |
| LinkedIn Sales Navigator | $80-135 | Per user per month |
| Cloudflare | $0-20 | Free plan often sufficient |

### **One-Time Costs**
- **Mac Mini M4** — ~$1,600 (32GB recommended)
- **Development Setup** — ~$200 (accessories, software)
- **Domain Registration** — ~$15/year

### **Total Estimated Monthly** — $300-700 depending on plan selections

---

## 🧪 Testing Environment

### **Development Setup**
Before production deployment, prepare:
- **Test Accounts** — Sandbox versions of critical services
- **Staging Environment** — Separate from production
- **Backup Strategy** — Regular backups of configurations

### **Validation Checklist**
- [ ] All services accessible via API
- [ ] Webhook endpoints reachable
- [ ] Authentication working for each service
- [ ] Rate limits understood and documented
- [ ] Error handling tested

---

## 📚 Knowledge Prerequisites

### **Technical Skills Needed**
- **Basic Command Line** — File operations, script execution
- **API Concepts** — Understanding REST APIs, JSON, authentication
- **Git Basics** — Version control for configurations
- **Troubleshooting** — Reading logs, debugging issues

### **Business Context**
- **Process Understanding** — How your business operates
- **Integration Points** — Where systems need to connect
- **Automation Goals** — What you want to achieve
- **Success Metrics** — How to measure effectiveness

---

## 🔄 Migration Considerations

### **If Replacing Existing Systems**
- **Data Export** — Extract current data before switching
- **Parallel Operation** — Run old and new systems simultaneously
- **User Training** — Team preparation for new workflows
- **Rollback Plan** — Ability to revert if needed

### **Integration Mapping**
- **Current Tools** — Inventory of existing systems
- **Data Flow** — How information moves between systems
- **Dependencies** — What relies on current systems
- **Timing** — Best time to make the switch

---

## ✅ Readiness Checklist

### **Infrastructure Ready**
- [ ] Dedicated host machine configured
- [ ] Stable internet connection verified
- [ ] Backup power solution (UPS) in place
- [ ] Remote access configured

### **Accounts & Access**
- [ ] All required service accounts created
- [ ] Admin access confirmed for each service
- [ ] API access enabled where needed
- [ ] Billing and subscription status verified

### **Security & Compliance**
- [ ] Two-factor authentication enabled
- [ ] Strong, unique passwords set
- [ ] Credential storage plan established
- [ ] Compliance requirements understood

### **Team Preparation**
- [ ] Key stakeholders identified
- [ ] Communication plan established
- [ ] Training schedule planned
- [ ] Success criteria defined

---

Once all prerequisites are met, proceed to the **[Setup Guide](SETUP.md)** for step-by-step installation instructions.