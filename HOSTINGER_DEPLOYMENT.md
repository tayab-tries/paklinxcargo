# Hostinger Node.js Production Deployment Guide

This guide describes how to deploy the standalone Next.js application **Paklinx Cargo** to **Hostinger Business Node.js Hosting** (cPanel/CloudLinux/hPanel Node.js Application Manager).

---

## 1. Hostinger Node.js Application Settings

In Hostinger's control panel (**Websites** > **Manage** > **Node.js** or **cPanel Setup Node.js App**):

| Setting | Recommended Value | Notes |
| :--- | :--- | :--- |
| **Node.js version** | `20.x LTS` (or `22.x LTS`) | Minimum supported is Node 18.18+. Recommended: Node 20 LTS. |
| **Application Mode** | `Production` | Ensures production optimizations and suppresses debug overhead. |
| **Application Root** | `/home/u123456789/domains/paklinxcargo.com/public_html` | The directory on your server where the project files reside. |
| **Application Startup File** | `server.js` or `.next/standalone/server.js` | See Section 4 for detailed entry point explanation. |
| **Application URL** | `https://paklinxcargo.com` | Your primary domain or subdomain. |

---

## 2. Node.js Version Recommendation

- **Recommended**: **Node.js 20.x LTS** (e.g., `20.18.0+`) or **Node.js 22.x LTS**.
- Next.js 16.3.2 and React 19.2.8 require Node.js 18.18.0 or newer.

---

## 3. Application Root

The application root should be set to your project folder or `public_html` depending on your Hostinger plan:
- **Shared/Business Hosting (hPanel Node.js manager)**: `/home/[username]/domains/paklinxcargo.com/public_html` (or a dedicated application folder).
- **Cloud/VPS Hosting**: `/var/www/paklinxcargo` or `/home/[user]/paklinxcargo`.

---

## 4. Startup File Configuration

Next.js `output: 'standalone'` builds a self-contained server bundle at `.next/standalone/server.js`.

Depending on your Hostinger panel interface:
- **Option A (Universal Root Wrapper — Recommended)**:
  Use `server.js`.
  The project includes a root-level `server.js` wrapper:
  ```javascript
  require('./.next/standalone/server.js');
  ```
  This is the safest setting on Hostinger because some Hostinger panel versions only allow entering a filename in the root directory.
- **Option B (Direct Subfolder)**:
  If your Hostinger UI allows paths with slashes in the startup file field, enter:
  `.next/standalone/server.js`

Both options execute the exact same optimized server process.

---

## 5. Build Command

Run locally before uploading, or run via SSH in the project root:

```bash
npm run build
```

This compiles TypeScript, optimizes assets, and generates the standalone bundle at `.next/standalone/`.

---

## 6. Start Command

- **Hostinger Managed Mode**: Hostinger starts the process automatically using Phusion Passenger or Node process manager via the specified **Application Startup File** (`server.js`).
- **Manual SSH / Terminal Testing**:
  ```bash
  PORT=3000 HOSTNAME=0.0.0.0 node server.js
  ```

---

## 7. Required Environment Variables

Configure these in the Hostinger panel (**Environment Variables** section):

### Minimum Required for Database & Leads:
- `NEXT_PUBLIC_SITE_URL`: `https://paklinxcargo.com`
- `NEXT_PUBLIC_SUPABASE_URL`: `https://[your-project-id].supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: `[your-anon-publishable-key]`
- `SUPABASE_SERVICE_ROLE_KEY`: `[your-secret-service-role-key]`
- `RESEND_API_KEY`: `re_[your-resend-api-key]`
- `ADMIN_EMAIL`: `quotes@paklinxcargo.com`

*(See `HOSTINGER_ENV_CHECKLIST.md` for complete reference)*

---

## 8. Standalone Deployment Directory Structure

After running `npm run build`, Next.js creates `.next/standalone`.
Before uploading to Hostinger, ensure public assets and static chunks are in place:

```bash
# 1. Copy static chunks into standalone directory
cp -r .next/static .next/standalone/.next/

# 2. Copy public assets into standalone directory
cp -r public .next/standalone/
```

### Files to upload to Hostinger Application Root:
```
/paklinxcargo (Application Root)
├── .next/
│   ├── standalone/       <-- Complete standalone runtime bundle
│   │   ├── .next/
│   │   │   └── static/   <-- CSS, JS chunks, media
│   │   ├── public/       <-- Images, SVGs, favicon
│   │   ├── node_modules/ <-- Bundled dependencies
│   │   └── server.js     <-- Next.js standalone entrypoint
│   └── static/           <-- Root static assets
├── public/               <-- Public images, logos, fonts
├── server.js             <-- Root startup file wrapper
├── package.json          <-- Project metadata
└── next.config.ts        <-- Next.js configuration
```

> **TIP:** You can zip `.next/standalone`, `.next/static`, `public`, `server.js`, and `package.json`, upload the zip to Hostinger File Manager, and extract it directly into your application root.

---

## 9. Domain Configuration & DNS Setup

### Web Traffic:
1. In Hostinger DNS zone, point `paklinxcargo.com` and `www.paklinxcargo.com` A records to your Hostinger server IP.
2. Enable Hostinger Free SSL (Let's Encrypt) for `paklinxcargo.com`.

### Transactional Email (Resend) Verification:
To allow `quotes@paklinxcargo.com` to deliver emails reliably without spam filtering:
1. Log in to [Resend Dashboard](https://resend.com/domains) and add `paklinxcargo.com`.
2. Add the generated DNS records in Hostinger DNS Management:
   - **DKIM**: TXT record (`resend._domainkey.paklinxcargo.com`)
   - **SPF**: TXT record (`v=spf1 include:amazonses.com ~all` or Resend value)
   - **DMARC**: TXT record (`_dmarc.paklinxcargo.com` with value `v=DMARC1; p=none;`)
   - **MX**: MX record for inbound routing (if using Resend receiving)

---

## 10. Post-Deployment Testing Commands

Once the application is running in Hostinger, execute these checks from SSH or an external terminal:

```bash
# 1. Test homepage HTTP response
curl -I https://paklinxcargo.com/

# 2. Test key public pages
curl -I https://paklinxcargo.com/about
curl -I https://paklinxcargo.com/cargo-services
curl -I https://paklinxcargo.com/locations/lahore
curl -I https://paklinxcargo.com/destinations/saudi-arabia
curl -I https://paklinxcargo.com/quote
curl -I https://paklinxcargo.com/track
curl -I https://paklinxcargo.com/admin/login

# 3. Test SEO endpoints
curl https://paklinxcargo.com/robots.txt
curl https://paklinxcargo.com/sitemap.xml | head -n 25

# 4. Test Quote API route validation
curl -X POST https://paklinxcargo.com/api/quote \
  -H "Content-Type: application/json" \
  -d '{"sender_name":"Test User","sender_phone":"+923001234567","contact_preference":"phone","origin_city":"lahore","destination_country":"saudi-arabia","cargo_type":"air_freight","estimated_weight_kg":20,"package_count":1,"cargo_description":"Test cargo"}'
```

---

## 11. Rollback Procedure

If any issue occurs during a production deployment:
1. In Hostinger File Manager, keep a backup of the previous deployment zip (e.g. `backup-previous.zip`).
2. If the new deployment fails:
   - Click **Stop App** in the Node.js manager.
   - Delete the current application root files.
   - Extract `backup-previous.zip`.
   - Click **Start App** / **Restart App**.
3. Check the Hostinger Node.js error log (`stderr.log` or Passenger log) in the application root to diagnose the root cause.
