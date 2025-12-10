# Lottie Animation Troubleshooting Guide

## Overview

This guide helps diagnose and fix issues with Lottie animations on the First Mate website.

## Current Setup

### Animation Files
- **Location:** `/public/animations/`
- **Strategy Animation:** `strategy-animation.json`
- **Guidance Animation:** `guidance-animation.json`

### Component
- **Path:** `src/components/blocks/ImageTextSection.tsx`
- **Type:** Client Component (`'use client'`)
- **Library:** `lottie-web` (installed as dependency)

### Usage
Animations are used in the homepage's `imageTextSection` blocks:
- Strategy section (right side, white background) - "We help you develop clear, impactful messaging strategies..."
- Guidance section (left side, gray background) - "First Mate provides expert guidance to help you navigate..."

## Quick Fix Checklist

### 1. Check Animation URLs in Database

**Problem:** The database might have external URLs instead of local paths.

**Solution:**
```bash
# Start MongoDB (if using local)
# Or ensure MongoDB Atlas is accessible

# Visit the seed endpoint to recreate homepage with correct paths
curl http://localhost:3011/api/seed-firstmate
```

**Expected URLs in database:**
- ✅ `/animations/strategy-animation.json`
- ✅ `/animations/guidance-animation.json`

**Wrong URLs (old external URLs):**
- ❌ `https://lottie.host/4db68bbd-31f6-4cd3-a610-2a388c052cee/wpiJ8ZnmPd.json`
- ❌ `https://lottie.host/647c2f3d-7c9d-4b7c-9b8d-3b1e8f6b0a5c/6WzKdq0DJj.json`

### 2. Verify Animation Files Exist

```bash
# Check that animation files are present
ls -la public/animations/

# Expected output:
# strategy-animation.json
# guidance-animation.json
# README.md
```

### 3. Test Animations in Isolation

Visit the test page at: `http://localhost:3011/test-lottie`

This page loads both animations directly and provides detailed console logging.

**What to check:**
- Do the animations appear on the test page?
- Open browser console (F12) and look for messages:
  - ✅ "Strategy animation loaded successfully!"
  - ✅ "Guidance animation loaded successfully!"
  - ❌ Any error messages about loading

### 4. Check Browser Console on Homepage

Visit: `http://localhost:3011`

Open browser console (F12) and look for:

**Success messages:**
```
Loading Lottie animation from: /animations/strategy-animation.json
Lottie animation loaded successfully: /animations/strategy-animation.json
Loading Lottie animation from: /animations/guidance-animation.json
Lottie animation loaded successfully: /animations/guidance-animation.json
```

**Error messages to watch for:**
- `404 Not Found` - Animation file doesn't exist
- `Failed to load Lottie animation` - Parse error or file corruption
- `data_failed` - Invalid JSON or wrong format
- CORS errors - Wrong URL or protocol mismatch

### 5. Verify Package Installation

```bash
# Check that lottie-web is in dependencies (NOT devDependencies)
npm list lottie-web

# Should show:
# lottie-web@5.13.0

# If not installed or in wrong location:
npm install lottie-web --save
```

### 6. Clear Next.js Cache

```bash
# Stop the dev server (Ctrl+C)

# Remove build cache
rm -rf .next

# Restart dev server
npm run dev
```

## Common Issues & Solutions

### Issue 1: Animations Don't Load on Homepage

**Symptoms:**
- Placeholder text "Animation Placeholder" is visible
- No animations playing
- Console shows loading messages but no success

**Diagnosis:**
1. Check if `lottieAnimationUrl` is being passed to component
2. Verify the URL path is correct (starts with `/animations/`)
3. Check browser Network tab for failed requests

**Solution:**
```bash
# Reseed the homepage with correct local paths
curl http://localhost:3011/api/seed-firstmate

# Or manually update in admin panel:
# 1. Go to http://localhost:3011/admin
# 2. Navigate to Pages → Home
# 3. Edit each imageTextSection block
# 4. Set lottieAnimationUrl to:
#    - Strategy: /animations/strategy-animation.json
#    - Guidance: /animations/guidance-animation.json
```

### Issue 2: 404 Errors for Animation Files

**Symptoms:**
- Console shows: `GET http://localhost:3011/animations/strategy-animation.json 404 (Not Found)`

**Diagnosis:**
Animation files are missing from `/public/animations/` directory

**Solution:**
Ensure animation files exist. If they're missing, they should be in the project. Check:
```bash
# Verify files exist
cat public/animations/strategy-animation.json | head -1
cat public/animations/guidance-animation.json | head -1

# Both should start with: {"v":"5.9.6","fr":30,...
```

### Issue 3: Animations Work on Test Page but Not Homepage

**Symptoms:**
- Test page (`/test-lottie`) shows animations correctly
- Homepage doesn't show animations

**Diagnosis:**
Database has wrong URLs or block data is malformed

**Solution:**
1. Check admin panel: `http://localhost:3011/admin/collections/pages`
2. Open the "Home" page
3. Verify `imageTextSection` blocks have correct `lottieAnimationUrl`
4. If wrong, reseed: `curl http://localhost:3011/api/seed-firstmate`

### Issue 4: CORS or External URL Errors

**Symptoms:**
- Console shows CORS policy errors
- Trying to load from `lottie.host` or other external URLs

**Diagnosis:**
Database contains old external URLs instead of local paths

**Solution:**
Update the database by reseeding:
```bash
curl http://localhost:3011/api/seed-firstmate
```

The seed script has been updated to use local paths.

### Issue 5: Hydration Errors

**Symptoms:**
- Warning: Text content did not match
- Animations flash or don't render consistently

**Diagnosis:**
Server/client mismatch in rendering

**Solution:**
The `ImageTextSection` component is marked as `'use client'` which should prevent this. If issues persist, ensure:
1. No server-side rendering of animation container
2. Animation loading is wrapped in `useEffect`
3. Proper cleanup on unmount

### Issue 6: Production Build Issues

**Symptoms:**
- Animations work in dev but not in production build

**Diagnosis:**
`lottie-web` might be in wrong dependency section

**Solution:**
```bash
# Ensure lottie-web is in dependencies, not devDependencies
npm uninstall lottie-web --save-dev
npm install lottie-web --save

# Rebuild
npm run build
npm start
```

## Testing Checklist

Use this checklist to verify everything works:

- [ ] Animation files exist in `/public/animations/`
- [ ] `lottie-web` is installed as a dependency (not devDependency)
- [ ] Test page (`/test-lottie`) shows both animations
- [ ] Homepage shows both animations (Strategy and Guidance sections)
- [ ] Browser console shows "loaded successfully" messages
- [ ] No 404 errors in Network tab
- [ ] No CORS errors in console
- [ ] Animations loop continuously
- [ ] Animations are responsive (work on mobile view)

## Debug Logging

The `ImageTextSection` component includes detailed logging. To see it:

1. Open browser console (F12)
2. Refresh the page
3. Look for messages starting with:
   - "Loading Lottie animation from:"
   - "Lottie animation loaded successfully:"
   - Any error messages

## Manual Database Check

If you need to manually verify what's in the database:

```bash
# Run the check script (requires MongoDB to be running)
npx tsx scripts/check-homepage.ts

# Or access MongoDB directly via admin panel
http://localhost:3011/admin/collections/pages
```

## Reseed Commands

```bash
# Seed First Mate homepage using the script (local MongoDB required)
npm run seed:firstmate

# Seed First Mate homepage using API endpoint (works with remote DB)
curl http://localhost:3011/api/seed-firstmate

# Check result (requires jq installed)
curl http://localhost:3011/api/seed-firstmate | jq
```

## File Paths Reference

```
first-mate-2/
├── public/
│   └── animations/
│       ├── strategy-animation.json    # Strategy section animation
│       ├── guidance-animation.json    # Guidance section animation
│       └── README.md                  # Animation documentation
├── src/
│   ├── components/
│   │   └── blocks/
│   │       └── ImageTextSection.tsx   # Main component
│   ├── app/
│   │   ├── (frontend)/
│   │   │   └── page.tsx              # Homepage
│   │   ├── test-lottie/
│   │   │   └── page.tsx              # Test page
│   │   └── api/
│   │       └── seed-firstmate/
│   │           └── route.ts          # Seeding API
│   └── collections/
│       └── Pages.ts                   # CMS schema
└── scripts/
    └── seed-firstmate-homepage.ts     # Seeding script
```

## Support

If you've gone through this guide and animations still don't work:

1. **Check the console** - Copy all error messages
2. **Check the Network tab** - Look for failed requests
3. **Verify database** - Ensure MongoDB is connected
4. **Test in isolation** - Use `/test-lottie` page
5. **Review recent changes** - Check git history for modifications

## Additional Resources

- [Lottie Web Documentation](https://github.com/airbnb/lottie-web)
- [Next.js Static Assets](https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets)
- Project animation README: `/public/animations/README.md`

## Related Documentation

- **Quick Start**: [setup.md](./setup.md)
- **GSAP Animations**: [gsap-animations.md](./gsap-animations.md)
- **General Troubleshooting**: [troubleshooting-log.md](./troubleshooting-log.md)
- **All Docs**: [index.md](./index.md)
