# MoniQuest Vercel Deployment Guide

## Overview

MoniQuest is configured for secure deployment on Vercel with the following architecture:

- **Frontend**: Static assets served from Vercel
- **API Proxy**: `/api/generate` endpoint running on Vercel serverless functions
- **API Key Security**: `GEMINI_API_KEY` stored only in Vercel environment variables (never in repository)
- **PWA Support**: Service worker with cache versioning for offline functionality
- **Base Path**: Auto-detects environment (`/` for Vercel, `/MoniQuest/` for GitHub Pages)

## Prerequisites

- GitHub account with access to this repository
- Vercel account (free tier is sufficient)
- Gemini API key from Google AI Studio

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository: `ers123/MoniQuest`
4. Vercel will auto-detect the framework (Vite)

### 2. Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In the Vercel project settings:

1. Go to **Settings → Environment Variables**
2. Add the following variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `GEMINI_API_KEY` | `AIza...` (your actual key) | Production, Preview, Development |

   **IMPORTANT**:
   - Never commit this key to the repository
   - The key is already in `.gitignore` (public/config.json, .env)
   - Use a restricted API key with HTTP referrer restrictions

3. (Optional) If you want to allow additional domains beyond the defaults:

   | Name | Value | Example |
   |------|-------|---------|
   | `EXTRA_ALLOWED_ORIGINS` | Comma-separated list | `https://custom-domain.com,https://another-domain.com` |

### 4. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your app will be available at `https://moniquest.vercel.app`

### 5. Configure Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Update `EXTRA_ALLOWED_ORIGINS` environment variable to include your custom domain

## Security Features

### API Key Protection

- ✅ API key stored only in Vercel environment variables
- ✅ Never exposed to client-side code
- ✅ `.gitignore` includes `public/config.json` and `.env`
- ✅ Gitleaks configuration prevents accidental commits

### CORS Protection

The API endpoint allows requests only from:

- `https://ers123.github.io` (GitHub Pages)
- `https://ers123.github.io/MoniQuest`
- `https://moniquest.vercel.app` (Vercel deployment)
- Custom domains specified in `EXTRA_ALLOWED_ORIGINS`

### Rate Limiting

- **Window**: 60 seconds
- **Max Requests**: 10 per IP address
- Automatic identifier extraction from `x-forwarded-for` or `x-real-ip` headers

## Architecture

### Frontend (geminiService.ts)

Automatically detects the environment and routes API calls:

- **On Vercel** (`moniquest.vercel.app`): Uses relative path `/api/generate`
- **On GitHub Pages** (`github.io`): Proxies to `https://moniquest.vercel.app/api/generate`
- **Local Development**: Proxies to `https://moniquest.vercel.app/api/generate`

### Backend (api/generate.ts)

Serverless function that:

1. Validates origin against CORS whitelist
2. Checks rate limits
3. Validates request payload
4. Calls Gemini API with server-side key
5. Returns formatted response or error

### Error Response Format

```json
{
  "error": {
    "code": "error_code",
    "message": "User-friendly error message"
  }
}
```

Error codes:
- `method_not_allowed`: Non-POST request
- `missing_api_key`: Server configuration error
- `invalid_origin`: Origin not in CORS whitelist
- `invalid_payload`: Malformed request body
- `rate_limited`: Too many requests
- `generation_failed`: Gemini API error

## PWA Features

### Service Worker

- **Cache Version**: `v1.6.0` (auto-incremented)
- **Cached Assets**: Core HTML, manifest, icons, images
- **Offline Support**: Falls back to cached content when offline
- **Strategy**: Network-first with cache fallback

### Manifest

- **Display Mode**: Standalone (appears as native app)
- **Theme Color**: `#7c3aed` (purple)
- **Icons**: 192x192 and 512x512 PWA icons
- **Shortcuts**: Quick access to quizzes

### 404 Handling

The `public/404.html` automatically redirects to home for SPA routing:
- Handles GitHub Pages 404s
- Preserves deep linking functionality
- 1.5 second delay with manual fallback button

## Testing Deployment

### 1. Test API Endpoint

```bash
curl -X POST https://moniquest.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -H "Origin: https://ers123.github.io" \
  -d '{
    "purpose": "chat-response",
    "userName": "테스트",
    "question": "저축이 뭐예요?"
  }'
```

Expected response:
```json
{
  "result": "테스트야, 저축은 지금 쓰지 않고..."
}
```

### 2. Test Frontend

1. Visit `https://moniquest.vercel.app`
2. Complete onboarding
3. Answer a quiz question incorrectly
4. Verify AI teacher (Lira) provides explanation
5. Open chatbot and ask a question

### 3. Test PWA

1. Open in Chrome/Edge
2. Look for "Install" button in address bar
3. Install app
4. Verify app opens in standalone mode
5. Turn off network
6. Verify offline page appears

### 4. Test Rate Limiting

Make 11 requests within 60 seconds:

```bash
for i in {1..11}; do
  curl -X POST https://moniquest.vercel.app/api/generate \
    -H "Content-Type: application/json" \
    -d '{"purpose":"chat-response","userName":"test","question":"hi"}'
  echo ""
done
```

The 11th request should return:
```json
{
  "error": {
    "code": "rate_limited",
    "message": "Too many requests. Try again in a minute."
  }
}
```

## Monitoring

### Vercel Dashboard

Monitor in real-time:
- **Deployments**: Build status and logs
- **Analytics**: Page views and performance
- **Functions**: Serverless function invocations and errors
- **Logs**: Runtime logs for debugging

### View Function Logs

1. Go to **Deployments → [Latest Deployment]**
2. Click **Functions** tab
3. Select `/api/generate`
4. View real-time logs and errors

## Troubleshooting

### "Missing API key" error

- Check environment variable is set in Vercel dashboard
- Ensure variable name is exactly `GEMINI_API_KEY`
- Redeploy after adding environment variables

### CORS errors

- Verify origin is in allowed list (api/generate.ts:11-16)
- Check browser console for actual origin
- Add origin to `EXTRA_ALLOWED_ORIGINS` if needed

### Rate limit issues

- Default: 10 requests per minute per IP
- Adjust `RATE_LIMIT_MAX_REQUESTS` in api/generate.ts if needed
- Consider implementing user-based rate limiting for production

### Build failures

- Check Vercel build logs
- Verify `package.json` dependencies
- Ensure Node.js version compatibility (20.x)

### Blank page / Nothing shows up

**Symptom**: Deployment succeeds but page is blank
**Cause**: Base path mismatch - assets loading from wrong path

**Solution**: The app now auto-detects Vercel environment. If you still see a blank page:

1. Check browser console for 404 errors on assets
2. Verify `vite.config.ts` has Vercel detection (lines 11-14)
3. Optionally set `VITE_BASE_PATH=/` in Vercel environment variables
4. Redeploy after any changes

## Continuous Deployment

Vercel automatically deploys:

- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches
- **Instant Rollback**: Previous deployments remain accessible

Each deployment gets a unique URL for testing before promoting to production.

## Security Best Practices

1. **API Key Rotation**: Regularly rotate your Gemini API key
2. **Key Restrictions**: Use HTTP referrer restrictions in Google Cloud Console
3. **Monitor Usage**: Check Gemini API quota in Google AI Studio
4. **Rate Limiting**: Adjust limits based on actual usage patterns
5. **Git History**: Use gitleaks to scan for exposed secrets

## Maintenance

### Update Service Worker

When updating cached assets:

1. Increment `CACHE_VERSION` in `public/sw.js`
2. Commit and push
3. Vercel auto-deploys
4. Users get new cache on next visit

### Update Dependencies

```bash
npm update
npm audit fix
git commit -am "chore: update dependencies"
git push
```

### Check for Secrets

```bash
# Install gitleaks
brew install gitleaks

# Scan repository
gitleaks detect --config .gitleaks.toml
```

## Support

For issues:
- Check Vercel build logs
- Review browser console errors
- Test API endpoint directly with curl
- Verify environment variables are set

---

**Last Updated**: 2025-11-12
**Cache Version**: v1.6.0
**Node.js Runtime**: nodejs (Vercel auto-detects version)
