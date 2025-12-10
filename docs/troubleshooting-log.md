# Troubleshooting Guide

## Common Issues & Solutions

### Tailwind CSS Not Loading

**Symptom:** CSS classes present in HTML but no styling applied

**Cause:** Version incompatibility (Tailwind v4 requires different setup)

**Solution:**
```bash
# Use Tailwind v3 (verified compatible)
npm install -D tailwindcss@3.4.17 postcss@8.4.49 autoprefixer@10.4.20

# Clear cache
rm -rf .next

# Restart
npm run dev
```

### Server Won't Start

**Symptom:** Port already in use or frozen process

**Solution:**
```bash
# Kill all Next.js processes
pkill -9 -f "next dev"
lsof -ti:3011 | xargs kill -9

# Clear cache
rm -rf .next node_modules/.cache

# Restart
npm run dev
```

### Admin Panel Not Loading

**Symptom:** Browser shows infinite loading spinner

**Cause:** Stale cache or interrupted build

**Solution:**
```bash
# Complete clean restart
pkill -9 -f "next dev"
lsof -ti:3011 | xargs kill -9
rm -rf .next node_modules/.cache
npm run dev
```

### Page Shows Blank/White

**Symptom:** HTML loads but React hydration fails

**Cause:** Client-side JavaScript error or Lottie animation failure

**Solution:**
1. Check browser console for errors
2. Hard refresh (Cmd+Shift+R)
3. Clear browser cache
4. Restart server with cache clear

### Slow First Page Load

**Symptom:** First compile takes 6-7 seconds

**Status:** EXPECTED in development mode

**Explanation:**
- Next.js compiles on first access
- Subsequent loads ~200ms
- Production builds are optimized
- Not a bug

### Lottie Animations Not Loading

**Symptom:** Animation placeholder shows but no animation

**Cause:** External URL failed to load

**Solution:** Error handling already added to `ImageTextSection.tsx`

### MongoDB Connection Failed

**Symptom:** `MongoServerError` or timeout

**Solution:**
1. Check `.env` has valid `DATABASE_URI`
2. Verify MongoDB Atlas IP whitelist includes your IP
3. Test connection string in MongoDB Compass

## Server Management

### Start Server
```bash
npm run dev
```

### Stop Server
```bash
pkill -f "next dev"
# or
lsof -ti:3011 | xargs kill -9
```

### Check Status
```bash
# Is it running?
ps aux | grep "next dev" | grep -v grep

# Is port in use?
lsof -ti:3011

# Test endpoint
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3011/health
```

### Clear Cache & Restart
```bash
rm -rf .next node_modules/.cache
npm run dev
```

## Known Non-Critical Warnings

### Sharp Not Installed
```
Image resizing enabled but sharp not installed
```
**Impact:** Images won't be auto-optimized  
**Fix (optional):** `npm install sharp`

### Large Bundle Warnings
```
Serializing big strings (320kiB) impacts performance
```
**Impact:** Slower dev compilation  
**Status:** Expected in dev mode, production is optimized

### No Email Adapter
```
No email adapter provided
```
**Impact:** Emails logged to console instead of sent  
**Fix (optional):** Configure email in `payload.config.ts`

## Deployment Issues

For Express 5 + Next.js custom server issues, see:
- **[deployment-issue-log.md](./deployment-issue-log.md)** - Complete guide

Quick summary:
- Use `app.use()` not `app.all('*')` for Next.js handler
- Express 5 doesn't support wildcard route patterns
- Health endpoint must come before catch-all middleware

## Daily Startup Routine

1. Navigate to project: `cd /Users/danielyager/kenos-website/first-mate-2`
2. Start server: `npm run dev`
3. Wait for "Ready" message
4. Access: http://localhost:3011

## If Nothing Works

Nuclear option:
```bash
# Kill everything
pkill -9 -f "next"
lsof -ti:3011 | xargs kill -9

# Clear all caches
rm -rf .next node_modules/.cache

# Reinstall dependencies (last resort)
rm -rf node_modules package-lock.json
npm install

# Restart
npm run dev
```

## Getting Help

1. Check browser console for errors
2. Check terminal for server errors
3. Try test endpoint: `curl http://localhost:3011/health`
4. Review logs in real-time: `npm run dev 2>&1 | tee debug.log`

## Success Checklist

- ✅ Server starts without errors
- ✅ Health endpoint returns 200: `curl http://localhost:3011/health`
- ✅ Homepage loads: http://localhost:3011
- ✅ Admin accessible: http://localhost:3011/admin
- ✅ Tailwind classes render
- ✅ No errors in browser console

## Related Documentation

- **Deployment Issues**: [deployment-issue-log.md](./deployment-issue-log.md)
- **CSS Issues**: [css-troubleshooting.md](./css-troubleshooting.md)
- **Lottie Issues**: [lottie-troubleshooting.md](./lottie-troubleshooting.md)
- **MongoDB Setup**: [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **All Docs**: [index.md](./index.md)
