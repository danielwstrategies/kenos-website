# On-Demand Revalidation (ODR)

## Quick Start (3 Steps)

### 1. Generate Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Add to .env
```bash
REVALIDATE_SECRET=<paste-your-secret-here>
NEXT_PUBLIC_SERVER_URL=http://localhost:3011
```

### 3. Restart Server
```bash
npm run dev
```

**Done!** Edit content in admin - it updates automatically.

## What is ODR?

On-demand revalidation gives you:
- ⚡ **Static site speed** - 50-200ms page loads
- 🔄 **Auto updates** - Content appears 1-2 seconds after saving
- 💰 **Low costs** - No database queries on page loads
- 🎯 **Smart rebuilds** - Only changed pages rebuild

## How It Works

```
Save content → Hook fires → /api/revalidate → Next.js rebuilds (1-2s) → Fresh page ready
```

## What Pages Auto-Update?

- ✅ Homepage (`/`)
- ✅ Services (`/services`)
- ✅ Insights list (`/insights`)
- ✅ Individual insights (`/insights/[slug]`)
- ✅ All CMS pages

## Testing

```bash
# Test API directly
curl -X POST http://localhost:3011/api/revalidate \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/services"}'

# Or just edit content in admin
# Watch terminal for: ✅ Triggered revalidation for /services
```

## Troubleshooting

**Content not updating?**
1. Check `.env` has both variables
2. Restart server
3. Look for ✅/❌ in terminal logs

**"Invalid secret" error?**
- Verify `REVALIDATE_SECRET` in `.env`
- No spaces/quotes around the secret
- Restart server after adding

## Production Deployment

1. Generate NEW secret for production
2. Add to hosting platform:
   ```bash
   REVALIDATE_SECRET=<production-secret>
   NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
   ```
3. Deploy and test

## Full Documentation

For complete implementation details, see:
- **[on-demand-revalidation.md](./on-demand-revalidation.md)** - Complete technical guide

## Status

✅ **Implementation Complete** - ODR is fully integrated and ready to use.

## Related Documentation

- **Full ODR Guide**: [on-demand-revalidation.md](./on-demand-revalidation.md)
- **Deployment**: [deployment.md](./deployment.md)
- **All Docs**: [index.md](./index.md)
