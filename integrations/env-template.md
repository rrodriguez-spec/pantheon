# Environment Variables Template

This file lists all environment variables required to recreate the Pantheon system. **DO NOT include actual values** — this is a template showing what's needed and where to get them.

## 🔐 Required Environment Variables

### **Pipedrive API**
```bash
PIPEDRIVE_API_TOKEN=your_pipedrive_api_token_here
PIPEDRIVE_COMPANY_DOMAIN=your_company_domain  # e.g., "yourcompany"
```

**Where to get:**
1. Login to Pipedrive as admin
2. Go to Settings → API
3. Generate new API token
4. Company domain is from your Pipedrive URL: `https://{domain}.pipedrive.com`

**Permissions needed:** Full API access (read/write deals, contacts, activities)

---

### **GoHighLevel API**
```bash
GHL_API_KEY=your_ghl_location_api_key_here
GHL_LOCATION_ID=your_location_id_here
```

**Where to get:**
1. Login to GoHighLevel
2. Go to Settings → Company Settings → API Keys
3. Create "Location API Key" (NOT Agency API Key)
4. Location ID found in URL or Settings → Company Settings

**Permissions needed:** Full location access (contacts, campaigns, automation)

---

### **Zendesk API**
```bash
ZENDESK_SUBDOMAIN=your_zendesk_subdomain
ZENDESK_EMAIL=your_admin_email@domain.com
ZENDESK_TOKEN=your_zendesk_api_token
```

**Where to get:**
1. Login to Zendesk as admin
2. Go to Admin Center → Apps and integrations → APIs → Zendesk API
3. Enable token access
4. Create new token
5. Subdomain is from your Zendesk URL: `https://{subdomain}.zendesk.com`

**Permissions needed:** Full ticket management (read, create, update, assign)

---

### **AgencyBloc API**
```bash
# These go in a separate file: ~/.moltbot/credentials/agencybloc.json
{
  "sid": "your_session_id",
  "apiKey": "your_api_key"
}
```

**Where to get:**
1. Login to AgencyBloc
2. Go to Admin → API Management
3. Generate API key
4. SID requires browser session inspection or contact AgencyBloc support

**Permissions needed:** Full API access (groups, individuals, policies, agents)

---

### **Google Workspace API**
```bash
# OAuth credentials file: google-oauth-creds.json
{
  "client_id": "your_google_client_id.googleusercontent.com",
  "client_secret": "your_google_client_secret",
  "redirect_uris": ["http://localhost:8080/callback"],
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}

# Token file: google-tokens.json (generated after OAuth flow)
{
  "access_token": "auto_generated_after_auth",
  "refresh_token": "auto_generated_after_auth",
  "scope": "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/spreadsheets",
  "token_type": "Bearer",
  "expiry_date": "auto_managed"
}
```

**Where to get:**
1. Go to Google Cloud Console
2. Create new project or use existing
3. Enable Calendar, Gmail, and Sheets APIs
4. Create OAuth 2.0 credentials for desktop application
5. Download credentials JSON file

**Permissions needed:** Calendar (read/write), Gmail (read/send), Spreadsheets (read/write)

---

### **Notion API**
```bash
NOTION_TOKEN=your_notion_integration_token
NOTION_API_KEY=your_notion_integration_token  # Same as above (alias)
```

**Where to get:**
1. Go to https://www.notion.so/my-integrations
2. Create new integration
3. Give it access to required pages/databases
4. Copy internal integration token

**Permissions needed:** Read/write access to shared workspace pages

---

### **Apollo API**
```bash
APOLLO_API_KEY=your_apollo_api_key
```

**Where to get:**
1. Login to Apollo.io
2. Go to Settings → API
3. Generate new API key

**Permissions needed:** People search, organization search, contact enrichment

---

### **LinkedIn SDR** (Separate Project)
```bash
# In linkedin-sdr/.env
ANTHROPIC_API_KEY=your_claude_api_key
DATABASE_URL=your_neon_database_connection_string
GHL_API_KEY=your_ghl_location_api_key  # Same as above
```

**Where to get:**
- **Anthropic:** https://console.anthropic.com → API Keys
- **Neon:** https://console.neon.tech → Database connection string
- **GHL:** Same key as main environment

---

### **ro.am Communication**
```bash
ROAM_API_KEY=your_roam_api_token
```

**Where to get:**
1. Contact ro.am team for API access
2. Generate API key in ro.am settings
3. Get channel IDs for team communication

**Permissions needed:** Send messages to designated channels

---

### **Cloudflare (Podium Hosting)**
```bash
# For Cloudflare Workers/Pages (Podium)
CF_API_TOKEN=your_cloudflare_api_token
CF_ACCOUNT_ID=your_cloudflare_account_id
```

**Where to get:**
1. Login to Cloudflare dashboard
2. Go to My Profile → API Tokens
3. Create token with Workers and Pages permissions

**Permissions needed:** Workers/Pages deployment, KV storage access

---

## 📂 File Locations

### **Main Environment File**
```bash
# Location on Mac Mini
~/.moltbot/.env

# Contains all API keys above
```

### **Service-Specific Credential Files**
```bash
# AgencyBloc credentials
~/.moltbot/credentials/agencybloc.json

# Google OAuth
/Users/mimir/Desktop/Mimir/agent/google-oauth-creds.json
/Users/mimir/Desktop/Mimir/agent/google-tokens.json

# Browser credentials (gitignored)
/Users/mimir/Desktop/Mimir/agent/.credentials/agencybloc-mimir.txt
```

---

## 🔧 Setup Process

### 1. **Copy Template**
```bash
cp env-template ~/.moltbot/.env
```

### 2. **Fill in API Keys**
Replace all `your_*_here` placeholders with actual values

### 3. **Create Credential Files**
Set up Google OAuth, AgencyBloc JSON, and browser credentials

### 4. **Test Connections**
```bash
# Run health check script
./scripts/health-check.sh
```

### 5. **Verify Integrations**
Check that all services return successful responses

---

## 🚨 Security Notes

- **NEVER commit actual API keys** to version control
- **Use .gitignore** for all credential files
- **Rotate keys regularly** (quarterly recommended)
- **Monitor usage** for unauthorized access
- **Use environment-specific keys** (dev/staging/production)

---

## 🔄 Token Refresh

### **Google OAuth (Automatic)**
```bash
# Auto-refresh script (already configured)
./scripts/refresh-google-token.sh
```

### **Other Services**
Most other APIs use long-lived tokens that don't require refresh. Monitor for expiration and rotate as needed.

---

## 📊 Validation Commands

### **Test All Integrations**
```bash
# Pipedrive
curl -H "Authorization: Bearer $PIPEDRIVE_API_TOKEN" \
  "https://api.pipedrive.com/v1/users"

# GoHighLevel  
curl -H "Authorization: Bearer $GHL_API_KEY" \
  "https://rest.gohighlevel.com/v1/contacts"

# Zendesk
curl -u "$ZENDESK_EMAIL/token:$ZENDESK_TOKEN" \
  "https://$ZENDESK_SUBDOMAIN.zendesk.com/api/v2/tickets.json"

# Apollo
curl -H "Authorization: Bearer $APOLLO_API_KEY" \
  "https://api.apollo.io/api/v1/auth/health"
```

---

This template provides everything needed to recreate the complete Pantheon integration environment from scratch.