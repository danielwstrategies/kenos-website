# Critical Deployment Issue: Express 5 + Next.js Custom Server

## Issue Summary
Application failed to deploy on Coolify with health check failures. Root cause: Express 5 incompatibility with wildcard route patterns (`app.all('*')`).

## Error Symptoms
```
Failed to start server: TypeError: Missing parameter name at index 1: *
at start (src/server.ts:33:6) {
  originalPath: '*'
}
```

Health checks continuously failed with exit code 1, causing deployment rollbacks.

## Root Cause
Express 5.x changed route parameter parsing. The pattern `app.all('*', handler)` and `app.get('*', handler)` are no longer valid.

## Solution
Use `app.use()` middleware instead of wildcard routes:

**Before (Broken):**
```typescript
app.all('*', (req, res) => nextHandler(req, res))
// or
app.get('*', (req, res) => nextHandler(req, res))
app.post('*', (req, res) => nextHandler(req, res))
```

**After (Working):**
```typescript
app.use((req, res) => nextHandler(req, res))
```

## Why This Happens
- Next.js + Payload CMS requires a custom Express server
- Package.json uses `express: ^5.2.1`
- Express 5 treats `*` as a parameter pattern, not a catch-all
- `app.use()` properly delegates all unmatched requests to Next.js

## Prevention
When creating custom Express servers with Next.js:
1. Always use `app.use()` for catch-all routing
2. Define specific routes (like `/health`) BEFORE the catch-all
3. Test health endpoints before enabling Coolify health checks

## Files Modified
- `src/server.ts` - Changed from `app.all('*')` to `app.use()`
- `package.json` - Updated start script to use custom server via `tsx`

## Verification
```bash
# Test health endpoint
curl https://yourdomain.com/health
# Expected: {"status":"ok"}

# Check Coolify health check status
# Should show "healthy" in deployment logs
```

## Related Documentation
- Express 5 Migration Guide: https://expressjs.com/en/guide/migrating-5.html
- Next.js Custom Server: https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
