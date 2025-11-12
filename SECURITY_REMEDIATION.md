# 🚨 Security Incident Response: Exposed API Key

## Status: **REQUIRES IMMEDIATE ACTION**

GitHub Secret Scanning detected an exposed `GEMINI_API_KEY` in the commit history.

## Immediate Actions Required

### 1. Revoke the Exposed API Key (DO THIS FIRST!)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Find the exposed API key
3. **DELETE** or **REVOKE** it immediately
4. This prevents anyone who found the key from using it

### 2. Generate a New API Key

1. In Google AI Studio, create a **NEW API key**
2. Apply restrictions:
   - **Application restrictions**: HTTP referrers
   - **Website restrictions**: Add these allowed referrers:
     - `https://moniquest.vercel.app/*`
     - `https://ers123.github.io/MoniQuest/*`
     - Add any custom domains you plan to use
3. **API restrictions**: Restrict to Gemini API only
4. Copy the new key (you'll need it for Vercel)

### 3. Update Vercel Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your MoniQuest project
3. Go to **Settings → Environment Variables**
4. Find `GEMINI_API_KEY`
5. Click **Edit** and replace with your **NEW key**
6. Save and redeploy

### 4. Clean Git History

You have two options:

#### Option A: Start Fresh (Recommended - Easiest)

**WARNING: This creates a new repository. You'll lose stars, forks, and issues.**

```bash
# 1. Create a new orphan branch with clean history
git checkout --orphan fresh-start

# 2. Add all current files
git add -A

# 3. Commit clean state
git commit -m "chore: initialize repository with secure deployment setup"

# 4. Delete old main branch
git branch -D main

# 5. Rename fresh-start to main
git branch -m main

# 6. Force push to overwrite history
git push -f origin main
```

#### Option B: Use BFG Repo-Cleaner (Preserves Repository)

**This removes sensitive data but keeps commit history structure.**

```bash
# 1. Install BFG
# macOS:
brew install bfg

# Linux:
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 2. Clone a fresh copy
cd ..
git clone --mirror https://github.com/ers123/MoniQuest.git moniquest-clean
cd moniquest-clean

# 3. Remove API keys (any string starting with AIza)
bfg --replace-text <(echo 'AIza[A-Za-z0-9_-]{35}==>***REMOVED***')

# Or if using downloaded jar:
java -jar bfg-1.14.0.jar --replace-text <(echo 'AIza[A-Za-z0-9_-]{35}==>***REMOVED***')

# 4. Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Force push
git push --force

# 6. Go back to original repo and pull
cd ../MoniQuest
git pull
```

#### Option C: Squash History (Simplest, Loses All History)

```bash
# 1. Create orphan branch
git checkout --orphan temp-main

# 2. Add all files
git add -A

# 3. Commit
git commit -m "feat: MoniQuest PWA with secure Vercel deployment

- Full PWA support with service worker v1.6.0
- Secure API proxy through Vercel serverless functions
- CORS protection and rate limiting
- Gitleaks configuration for secret detection
- No API keys in repository"

# 4. Delete old main
git branch -D main

# 5. Rename to main
git branch -m main

# 6. Force push
git push -f origin main

# 7. Update branch protection rules in GitHub if needed
```

### 5. Verify Security

After cleaning:

```bash
# Scan for any remaining secrets
npm install -g gitleaks
gitleaks detect --config .gitleaks.toml --verbose

# Check no config.json exists
ls -la public/config.json  # Should fail

# Verify .gitignore
cat .gitignore | grep -E "(config.json|\.env)"

# Check current files for keys
grep -r "AIza" . --exclude-dir=node_modules --exclude-dir=.git
```

### 6. Dismiss GitHub Security Alert

After completing steps 1-5:

1. Go to https://github.com/ers123/MoniQuest/security/secret-scanning/1
2. Click **Dismiss alert**
3. Select reason: **"Revoked"**
4. Add note: "Key revoked and git history cleaned. New restricted key added to Vercel environment variables only."

## Prevention Checklist

Going forward:

- ✅ `.gitignore` includes `public/config.json` and `.env`
- ✅ Gitleaks configured in `.gitleaks.toml`
- ✅ API calls go through Vercel proxy only
- ✅ No API keys in code or config files
- ✅ New API key has HTTP referrer restrictions
- ✅ Git history is clean

## Testing After Remediation

1. **Test Vercel Deployment**:
   ```bash
   curl -X POST https://moniquest.vercel.app/api/generate \
     -H "Content-Type: application/json" \
     -H "Origin: https://ers123.github.io" \
     -d '{"purpose":"chat-response","userName":"테스트","question":"저축이 뭐예요?"}'
   ```

2. **Verify No Keys in Repo**:
   ```bash
   git log --all -S "AIza" --oneline
   # Should return empty or only show commits where keys were removed
   ```

3. **Check GitHub Secret Scanning**:
   - Go to repository **Security** tab
   - Verify alert is dismissed
   - Confirm no new alerts

## Why This Happened

The key was likely exposed because:

1. Early commits used `public/config.json` with actual API key
2. File was later added to `.gitignore` but history remained
3. GitHub's secret scanning detected the historical exposure

## Long-term Security

1. **Enable GitHub Secret Scanning**: Already enabled (detected this issue)
2. **Enable Push Protection**: Go to Settings → Code security → Enable "Push protection"
3. **Regular Audits**: Run gitleaks monthly
4. **Key Rotation**: Rotate API key every 90 days
5. **Monitor Usage**: Check Google AI Studio for unusual API usage

## Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [Google API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [Git History Rewriting](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

---

**Created**: 2025-11-12
**Priority**: CRITICAL
**Status**: PENDING USER ACTION
