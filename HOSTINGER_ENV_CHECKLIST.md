# Hostinger Environment Variables Checklist

This document details all environment variables supported by the Paklinx Cargo application for production deployment on Hostinger Node.js hosting.

> **CRITICAL SECURITY NOTE:**
> - Never expose server-only variables to the client or prefix them with `NEXT_PUBLIC_`.
> - Never commit `.env`, `.env.local`, or `.env.production` files containing live secrets to Git.
> - Configure these variables in Hostinger's **Node.js Web App Environment Variables** dashboard.

---

## 1. Public Variables (Client-Accessible)

These variables are prefixed with `NEXT_PUBLIC_` and are embedded into the client browser bundle at build/runtime. They must NEVER contain secrets or private tokens.

| Variable Name | Status | Usage Location | Description & Hostinger Configuration |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | **Recommended** | `config/site.config.ts`, `app/sitemap.ts`, `app/robots.ts`, `sanity.config.ts` | The canonical production domain URL (e.g. `https://paklinxcargo.com`). If omitted, defaults safely to `https://paklinxcargo.com`. |
| `NEXT_PUBLIC_SUPABASE_URL` | **Required** (When Supabase active) | `lib/supabase/**`, `middleware.ts`, `app/api/**` | The public API gateway URL of your Supabase project (e.g. `https://xxxxxxxxxxxx.supabase.co`). Required for authentication, quotes, and tracking. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | **Required** (When Supabase active) | `lib/supabase/client.ts`, `lib/supabase/server.ts`, `middleware.ts` | The public publishable/anon key for Supabase client-side cookie session refreshing and public queries. Safe for client exposure. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | **Optional** | `lib/analytics/gtag.ts` | Google Analytics 4 Measurement ID (format: `G-XXXXXXXXXX`). If not provided, analytics tracking is cleanly disabled with zero runtime errors. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Optional** | `sanity/env.ts`, `sanity.cli.ts` | Sanity Studio Project ID for headless CMS content management. If omitted, the application uses built-in static content fallbacks. |
| `NEXT_PUBLIC_SANITY_DATASET` | **Optional** | `sanity/env.ts`, `sanity.cli.ts` | Sanity dataset name. Defaults to `'production'` if not set. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | **Optional** | `sanity/env.ts` | API date version for Sanity. Defaults to `'2024-01-01'`. |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | **Optional** | `sanity/lib/client.ts` | External studio URL for Sanity visual editing preview. Defaults to `'/studio'`. |

---

## 2. Server-Only Variables (Confidential Secrets)

These variables are strictly accessible by Node.js server-side code (API routes, server actions, services) and are NEVER exposed to the client browser.

| Variable Name | Status | Usage Location | Description & Hostinger Configuration |
| :--- | :--- | :--- | :--- |
| `SUPABASE_SERVICE_ROLE_KEY` | **Required** (When Supabase active) | `lib/supabase/admin.ts`, `app/api/quote/route.ts`, `lib/admin/quote-admin-service.ts` | High-privilege Supabase Service Role key. Bypasses Row Level Security (RLS) to insert quote leads and execute admin management actions. **MUST NEVER BE EXPOSED TO CLIENT OR GIVEN NEXT_PUBLIC_ PREFIX.** |
| `RESEND_API_KEY` | **Required** (For Quote Emails) | `lib/email/resend.service.ts`, `lib/email/email.service.ts` | Private Resend API key (starts with `re_...`) used to dispatch transactional email alerts to operators and quote confirmation receipts to customers. |
| `ADMIN_EMAIL` | **Optional** | `lib/email/resend.service.ts` | The destination inbox for new quote lead notifications. Defaults to `quotes@paklinxcargo.com` if not set. |
| `SANITY_API_READ_TOKEN` | **Optional** | `sanity/env.ts` | Private read token for Sanity draft mode / live preview fetching. Only needed if headless Sanity CMS is linked. |

---

## 3. Hostinger Deployment Configuration Summary

| Phase | Minimum Required in Hostinger |
| :--- | :--- |
| **Initial Deployment Test** | No variables required (app starts with safe static fallbacks) |
| **Live Production Lead Capture** | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` |
| **Full CMS & Analytics** | Add `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_READ_TOKEN` |
