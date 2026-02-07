# Canva Clone - API Keys Setup Guide

## ✅ Core Features Working
Your application is now running with:
- ✅ User Authentication (Email/Password)
- ✅ Database (Neon PostgreSQL)
- ✅ Project Creation & Editing
- ✅ Canvas Editor with Fabric.js
- ✅ Basic Design Tools

## 🔧 Optional API Keys for Enhanced Features

### 1. **Unsplash API** (Stock Images)
**Purpose:** Browse and insert stock photos in designs
**Sign up:** https://unsplash.com/developers
**Steps:**
1. Create a free account
2. Go to "Your Apps" → "New Application"
3. Accept terms and create app
4. Copy "Access Key"
5. Add to `.env.local`: `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_key_here`

**Free Tier:** 50 requests/hour

---

### 2. **Replicate API** (AI Features)
**Purpose:** AI image generation & background removal
**Sign up:** https://replicate.com
**Steps:**
1. Create account
2. Go to Account → API Tokens
3. Create new token
4. Add to `.env.local`: `REPLICATE_API_TOKEN=your_token_here`

**Free Tier:** $5 credit to start

---

### 3. **UploadThing** (File Uploads)
**Purpose:** Upload custom images to designs
**Sign up:** https://uploadthing.com
**Steps:**
1. Create account with GitHub
2. Create new app
3. Copy App ID and Secret
4. Add to `.env.local`:
   ```
   UPLOADTHING_SECRET=your_secret
   UPLOADTHING_APP_ID=your_app_id
   ```

**Free Tier:** 2GB storage, 2GB bandwidth/month

---

### 4. **GitHub OAuth** (Social Login)
**Purpose:** Sign in with GitHub
**Setup:** https://github.com/settings/developers
**Steps:**
1. Go to Settings → Developer settings → OAuth Apps → New OAuth App
2. Fill in:
   - Application name: Canva Clone
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
3. Create app and get Client ID & Secret
4. Add to `.env.local`:
   ```
   AUTH_GITHUB_ID=your_client_id
   AUTH_GITHUB_SECRET=your_client_secret
   ```

---

### 5. **Google OAuth** (Social Login)
**Purpose:** Sign in with Google
**Setup:** https://console.cloud.google.com/
**Steps:**
1. Create new project
2. Enable Google+ API
3. Go to Credentials → Create Credentials → OAuth client ID
4. Configure consent screen
5. Create OAuth client ID (Web application)
6. Add authorized redirect: http://localhost:3000/api/auth/callback/google
7. Add to `.env.local`:
   ```
   AUTH_GOOGLE_ID=your_client_id.apps.googleusercontent.com
   AUTH_GOOGLE_SECRET=your_client_secret
   ```

---

### 6. **Stripe** (Payments & Subscriptions)
**Purpose:** Premium features monetization
**Sign up:** https://stripe.com
**Steps:**
1. Create account
2. Get API keys from Dashboard → Developers → API keys
3. Create a product and price
4. Set up webhook endpoint: http://localhost:3000/api/webhooks/stripe
5. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_ID=price_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

**Free Tier:** Test mode (no real charges)

---

## 🚀 Restart After Adding Keys
After adding any API keys, restart the dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 📝 Notes
- All API services have free tiers perfect for development
- You can add keys gradually as you need features
- The app works without optional keys (core features functional)
- For production, move to production API keys and update URLs
