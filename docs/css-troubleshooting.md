# Payload Admin CSS Troubleshooting Guide

## Quick Fix (Most Common Issue)

If your Payload admin panel appears unstyled (geometric shapes, no colors, broken layout), check the CSS import in `/src/app/(payload)/layout.tsx`:

**❌ WRONG (auto-generated, outdated):**
```typescript
import '@payloadcms/ui/scss/app.scss'
```

**✅ CORRECT (Payload 3.x):**
```typescript
import '@payloadcms/next/css'
```

### How to Fix

Open `/src/app/(payload)/layout.tsx` and change the import:

```typescript
// Before
import config from '@/payload.config'
import '@payloadcms/ui/scss/app.scss'  // Remove this line
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

// After
import config from '@/payload.config'
import '@payloadcms/next/css'  // Use this instead
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
```

Then restart the dev server:
```bash
npm run dev
```

### Why This Works

- Payload 3.x moved CSS imports to `@payloadcms/next/css`
- The old `@payloadcms/ui/scss/app.scss` only loads base styles
- The new import includes ALL admin UI component styles
- This is the official approach from Payload 3.0 demo

---

## Additional Troubleshooting Steps

### 1. Browser Extension Interference

**Symptoms:**
- Admin loads but appears completely unstyled
- CSS files show 200 status in Network tab
- Console shows no errors

**Cause:**
Browser extensions (especially dark mode extensions) can inject empty stylesheet links that block Payload's CSS from applying.

**Detection:**
Run this in browser console:
```javascript
document.querySelectorAll('link[rel="stylesheet"]').forEach((link, i) => {
  if (!link.sheet) console.log('BROKEN:', i, link.href, link.outerHTML)
})
```

Look for links like:
```html
<link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
<link type="text/css" rel="stylesheet" id="dark-mode-general-link">
```

**Solutions:**
1. Open admin in incognito/private mode (disables extensions)
2. Disable browser extensions and refresh
3. Whitelist localhost:3011 in extension settings
4. Remove programmatically (temporary):
   ```javascript
   document.getElementById('dark-mode-custom-link')?.remove()
   document.getElementById('dark-mode-general-link')?.remove()
   ```

### 2. Missing @payloadcms/ui Package

**Symptoms:**
- Build error: `Module not found: Can't resolve '@payloadcms/ui/scss/app.scss'`
- Admin route fails to load

**Fix:**
```bash
npm install @payloadcms/ui
```

### 3. CSS Files Not Loading

**Check if CSS files are being generated:**

```bash
# In browser, check Network tab for:
/_next/static/css/app/(payload)/layout.css
/_next/static/css/app/(payload)/admin/[[...segments]]/page.css
```

**If CSS files are missing:**

1. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. Verify `sass` package is installed:
   ```bash
   npm install sass
   ```

3. Check `next.config.mjs` doesn't have conflicting CSS settings

### 4. Styles Load But Don't Apply

**Symptoms:**
- CSS files load successfully (200 status)
- File size is correct (~50KB+)
- But UI still appears unstyled

**Possible causes:**
- CSP (Content Security Policy) blocking inline styles
- React hydration mismatch
- CSS specificity issues
- Browser cache corruption

**Solutions:**

1. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

2. Clear browser cache completely

3. Check for console errors about CSP

4. Verify CSS is actually in the loaded stylesheet:
   ```javascript
   // Search for Payload UI classes
   [...document.styleSheets].some(sheet => {
     try {
       return [...sheet.cssRules].some(rule => 
         rule.selectorText?.includes('.template-default')
       )
     } catch(e) { return false }
   })
   ```

### 5. Component Styles Missing

**Symptoms:**
- Base styles load (typography, colors)
- Component-specific styles missing (`.nav`, `.template-default`)

**Check what's loaded:**
```javascript
// Count CSS rules
let totalRules = 0
document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
  try {
    if (link.sheet) {
      totalRules += link.sheet.cssRules.length
      console.log(link.href, 'Rules:', link.sheet.cssRules.length)
    }
  } catch(e) {}
})
console.log('Total CSS rules:', totalRules)
```

**Expected:**
- Should have 1000+ CSS rules total
- If you only see ~100-200 rules, component styles aren't loading

**Fix:**
- Make sure you're using `import '@payloadcms/next/css'` (see Quick Fix above)
- This was the exact issue - old import only loaded base styles

### 6. Next.js Version Compatibility

**Issue:**
Some Next.js versions have CSS loading issues with Payload

**Recommended versions:**
- Next.js: `15.4.7` or later
- Payload: `3.65.0` or later
- @payloadcms/next: `3.65.0` or later

**Check versions:**
```bash
npm list next @payloadcms/next payload
```

**Update if needed:**
```bash
npm install next@latest @payloadcms/next@latest payload@latest
```

---

## Verification Steps

After applying fixes, verify admin is working:

### 1. Visual Check
- Admin panel should have proper navigation sidebar
- Colors should be visible (not just geometric shapes)
- Forms should be styled
- Buttons should have hover effects

### 2. CSS Rule Count
```javascript
// Should return 1000+
[...document.styleSheets].reduce((total, sheet) => {
  try { return total + sheet.cssRules.length }
  catch(e) { return total }
}, 0)
```

### 3. Component Styles Present
```javascript
// Should return true
[...document.styleSheets].some(sheet => {
  try {
    return [...sheet.cssRules].some(rule => 
      rule.selectorText?.includes('.template-default')
    )
  } catch(e) { return false }
})
```

### 4. Network Tab Check
- `layout.css` should be ~200KB+ (not ~50KB)
- `page.css` should be ~100KB+
- All CSS files should return 200 status

---

## Common Pitfalls

### ❌ Don't Do This:

1. **Don't use the old import path:**
   ```typescript
   import '@payloadcms/ui/scss/app.scss' // ❌ Outdated
   ```

2. **Don't add CSS layer declarations:**
   ```scss
   @layer payload-default, payload; // ❌ Causes infinite loading
   ```

3. **Don't change to dist path:**
   ```typescript
   import '@payloadcms/ui/dist/scss/app.scss' // ❌ Not exported
   ```

4. **Don't import styles in multiple places:**
   - Only import in `(payload)/layout.tsx`
   - Don't re-import in individual pages

### ✅ Do This:

1. **Use the correct Payload 3.x import:**
   ```typescript
   import '@payloadcms/next/css' // ✅ Correct
   ```

2. **Keep it simple:**
   - One CSS import in layout file
   - Let Next.js handle bundling
   - Don't customize unless necessary

3. **Check official examples:**
   - [Payload 3.0 Demo](https://github.com/payloadcms/payload-3.0-demo)
   - Look at their `layout.tsx` file

---

## Historical Context

This issue arose because:

1. **Payload 2.x used:** `@payloadcms/ui/scss/app.scss`
2. **Payload 3.x uses:** `@payloadcms/next/css`
3. **Auto-generators outdated:** Some scaffolding tools still use old import
4. **Breaking change:** Not well documented in migration guides

The old import path only loads base styles (typography, variables, resets) but misses all component-specific styles (navigation, forms, buttons, etc.).

---

## References

- [Payload 3.0 Demo - layout.tsx](https://github.com/payloadcms/payload-3.0-demo/blob/main/src/app/(payload)/layout.tsx)
- [Issue #8702 - Error loading admin styles](https://github.com/payloadcms/payload/issues/8702)
- [Payload 3.0 Migration Guide](https://payloadcms.com/docs/beta/migration-guide)

---

## Still Having Issues?

If none of these solutions work:

1. **Check Payload GitHub Issues:**
   Search for "CSS" or "styles" with your Next.js version

2. **Compare with working demo:**
   Clone the [official demo](https://github.com/payloadcms/payload-3.0-demo) and diff your config

3. **Create minimal reproduction:**
   - Create fresh Next.js + Payload project
   - Copy your config file
   - See if issue persists

4. **Report to Payload team:**
   - Open issue on [Payload GitHub](https://github.com/payloadcms/payload/issues)
   - Include Next.js version, Payload version, and reproduction steps

---

## Last Updated
December 2, 2024 - Verified working with Payload 3.65.0 + Next.js 15.4.7
## Related Documentation

- **General Troubleshooting**: [troubleshooting-log.md](./troubleshooting-log.md)
- **Quick Start**: [setup.md](./setup.md)
- **All Docs**: [index.md](./index.md)
