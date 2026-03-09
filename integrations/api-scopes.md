# API Scopes and Permissions

This document specifies the exact permissions and scopes required for each integration to function properly in the Pantheon system.

## 🔐 Pipedrive API Permissions

### **Required Access Level:** Admin or Full API Access

### **Specific Permissions:**
- **Deals** — Read, Create, Update (pipeline management)
- **Contacts** — Read, Create, Update (prospect and client data)
- **Activities** — Read, Create, Update (task tracking, follow-ups)
- **Pipelines** — Read (pipeline structure and stages)
- **Users** — Read (agent assignments and ownership)
- **Organizations** — Read, Create, Update (company information)
- **Webhooks** — Create, Manage (automation triggers)

### **Webhook Events Needed:**
- `deal.created` — New deal notifications
- `deal.updated` — Stage changes, value updates
- `deal.won` — Implementation pipeline creation
- `activity.created` — Task completion tracking

### **API Rate Limits:**
- 100 requests per 10 seconds per user
- Burst allowance of 2000 requests

---

## 📢 GoHighLevel API Permissions

### **Required Access Level:** Location API Key (NOT Agency)

### **Specific Permissions:**
- **Contacts** — Full CRUD (lead management, data sync)
- **Campaigns** — Read, Create, Update (automation sequences)
- **Opportunities** — Read, Create (deal tracking)
- **Calendars** — Read (appointment scheduling)
- **Custom Fields** — Read, Update (lead source tracking)
- **Tags** — Read, Create, Update (contact categorization)
- **Workflows** — Read, Trigger (automation management)

### **Location-Level Access:**
- Must have access to specific location/sub-account
- Cannot use agency-level keys for location operations

### **API Version:** v1 Only
- v2 API not compatible with current authentication
- Must use `https://rest.gohighlevel.com/v1/` endpoints

---

## 🎫 Zendesk API Permissions

### **Required Access Level:** Admin or Agent with API Access

### **Specific Permissions:**
- **Tickets** — Full CRUD (support management)
- **Users** — Read (agent information)
- **Groups** — Read (department organization)
- **Organizations** — Read (client company data)
- **Ticket Comments** — Create, Read (communication)
- **Ticket Fields** — Read (custom field access)
- **Satisfaction Ratings** — Read (service quality metrics)

### **Authentication Method:**
- Email + API Token (Basic Auth)
- Format: `username/token:api_token`

### **API Rate Limits:**
- 700 requests per minute for Enterprise
- 400 requests per minute for Professional

---

## 🏢 AgencyBloc API Permissions

### **Required Access Level:** API User with Full Permissions

### **Specific Permissions:**
- **Groups** — Read, Create, Update (client companies)
- **Individuals** — Read, Create, Update (contacts)
- **Policies** — Read, Create, Update (insurance policies)
- **Agents** — Read (agent information and assignments)
- **Addresses** — Create, Update (location data)
- **Custom Fields** — Read, Update (additional data storage)

### **Authentication Requirements:**
- Session ID (SID) from browser session
- API Key generated in AgencyBloc admin
- Form-encoded POST authentication

### **Browser Fallback Access:**
- Username/password for manual operations
- Session management for web automation
- Access to reports and license data (not in API)

### **Known Limitations:**
- License data not exposed via API
- Renewal dates often not populated (data entry issue)
- Some endpoints return 302/405 (producers, users, activities)

---

## 📊 Google Workspace API Scopes

### **Required OAuth Scopes:**
```
https://www.googleapis.com/auth/calendar
https://www.googleapis.com/auth/gmail.readonly  
https://www.googleapis.com/auth/gmail.send
https://www.googleapis.com/auth/spreadsheets
```

### **Specific Permissions:**

#### **Gmail API:**
- **Read** — Access email content and metadata
- **Send** — Send emails on behalf of user
- **Labels** — Read label information
- **Threads** — Read conversation threads

#### **Calendar API:**
- **Events** — Read, create, update, delete calendar events
- **Calendars** — Read calendar metadata
- **ACL** — Read calendar sharing permissions

#### **Sheets API:**
- **Spreadsheets** — Full read/write access
- **Values** — Read and update cell data
- **Formatting** — Read formatting information

### **OAuth Flow Requirements:**
- Redirect URI: `http://localhost:8080/callback`
- Offline access for refresh tokens
- Incremental authorization support

---

## 🗃️ Notion API Permissions

### **Required Integration Type:** Internal Integration

### **Specific Permissions:**
- **Read Content** — Access page and database content
- **Update Content** — Modify pages and database entries  
- **Insert Content** — Create new pages and database entries
- **Read User Information** — Basic user data for mentions

### **Page/Database Access:**
- Must be explicitly shared with integration
- Inheritance from parent pages supported
- Database schema read access required

### **API Capabilities:**
- Search across accessible content
- Create and update structured data
- File upload and attachment support

---

## 🔍 Apollo API Permissions

### **Required Access Level:** Paid Plan with API Access

### **Specific Permissions:**
- **People Search** — Find contacts by criteria
- **Organization Search** — Company discovery
- **Contact Enrichment** — Email and phone data
- **Profile Matching** — LinkedIn to Apollo data mapping
- **Export Credits** — Contact information export

### **API Rate Limits:**
- 60 requests per minute (free/basic)
- 200 requests per minute (paid plans)
- Contact export limits based on plan

### **Data Access:**
- Email addresses (verified and unverified)
- Phone numbers (when available)
- Company information and firmographics
- LinkedIn profile matching

---

## 🔗 LinkedIn Sales Navigator

### **Access Requirements:** Sales Navigator Subscription

### **Browser-Based Access:**
- No official API for prospecting activities
- Requires browser automation (Playwright)
- Must use headed browser (headless detected)

### **Functional Requirements:**
- Profile viewing and data extraction
- Connection request sending with custom notes
- Message reading and response management
- Search filter application

### **Rate Limiting:**
- LinkedIn enforces aggressive anti-automation
- Must respect human-like timing and patterns
- Connection limits: ~100-200 per week safely

---

## ☁️ Cloudflare Workers/Pages Permissions

### **Required Permissions:**
- **Workers** — Deploy and manage serverless functions
- **Pages** — Static site deployment
- **KV Storage** — Key-value data storage
- **Environment Variables** — Secure secret management

### **Zone-Level Access:**
- Custom domain management
- DNS record modification
- SSL certificate management

### **API Token Scopes:**
```
Zone:Zone:Read (for DNS)
Zone:Zone Settings:Edit (for SSL)
Workers:Script:Edit (for deployments)
Workers KV:Storage:Edit (for data)
Page:Edit (for static sites)
```

---

## 🗨️ ro.am API Permissions

### **Required Access Level:** API Key with Channel Access

### **Specific Permissions:**
- **Send Messages** — Post to designated channels
- **Read History** — Access message history for monitoring
- **Channel Access** — Specific channel IDs required

### **Channel Requirements:**
- Pantheon Updates (`6a05abc2-60f6-4308-b477-e27a716a74f9`)
- Sales Team (`02ff254f-6029-48d5-9c18-fafcf1757951`)
- Service Reports (`71e2704e-afaf-45b7-8c11-55319219c19a`)
- General (`509c9748-b455-4102-bc25-1bd97ebdc130`)

---

## 🚨 Security Considerations

### **Principle of Least Privilege**
- Request only required permissions
- Avoid admin access when user-level sufficient
- Regularly audit and remove unused permissions

### **Token Security**
- Store in environment variables only
- Never commit to version control
- Implement token rotation schedule
- Monitor for unauthorized usage

### **Rate Limit Management**
- Implement exponential backoff
- Respect service rate limits
- Use caching to reduce API calls
- Monitor usage patterns

### **Error Handling**
- Graceful degradation for API failures
- Automatic retry with backoff
- Alternative data sources when possible
- Health monitoring and alerting

---

## 📋 Permission Verification Checklist

### **Pre-Setup Validation:**
- [ ] Admin access confirmed for each service
- [ ] All required scopes approved by data owner
- [ ] Rate limits understood and documented
- [ ] Error handling strategy defined

### **Post-Setup Testing:**
- [ ] Basic CRUD operations work for each service
- [ ] Webhook delivery confirmed (where applicable)
- [ ] Rate limiting handled gracefully
- [ ] Error scenarios tested and logged

### **Ongoing Monitoring:**
- [ ] Weekly permission audit
- [ ] Rate limit usage tracking  
- [ ] Token expiration monitoring
- [ ] Service health validation

---

This comprehensive scope definition ensures secure, reliable access to all integrated services while maintaining the principle of least privilege and robust error handling.