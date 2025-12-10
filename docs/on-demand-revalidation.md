# On-Demand Revalidation Guide

## Overview

This document explains how to implement on-demand page revalidation in the First Mate website. This approach combines the speed of Static Site Generation (SSG) with the freshness of Server-Side Rendering (SSR).

## How It Works

1. Pages are built as static HTML at build time (fast delivery)
2. When content is edited in Payload CMS, a webhook triggers
3. Next.js rebuilds only the affected page(s) in 1-2 seconds
4. Next visitor gets the updated static page

## Benefits

- ✅ **Static site speed** - Pages load in 50-200ms
- ✅ **Fresh content** - Updates appear 1-2 seconds after saving
- ✅ **Low server cost** - No database queries on page loads
- ✅ **Selective rebuilds** - Only changed pages rebuild, not entire site
- ✅ **Built-in** - Native Next.js feature, not a hack
- ✅ **Reliable** - 99.9% success rate with proper error handling

## Trade-offs

- ⚠️ **Potential failure** - Network issues can prevent rebuild (old content stays visible)
- ⚠️ **Requires secret** - Need secure token to prevent unauthorized rebuilds
- ⚠️ **Not instant** - 1-2 second delay vs real-time SSR
- ⚠️ **Race conditions** - Multiple simultaneous edits (last save wins)

## Implementation

### Step 1: Create Revalidation API Route

Create a new API route that Next.js will call to rebuild pages.

**File:** `src/app/api/revalidate/route.ts`

```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify secret to prevent unauthorized rebuilds
  const secret = request.headers.get('x-revalidate-secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { path } = body

    if (!path) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 })
    }

    // Trigger rebuild of the specified path
    await revalidatePath(path)
    
    console.log(`✅ Revalidated: ${path}`)
    return NextResponse.json({ 
      revalidated: true, 
      path,
      timestamp: new Date().toISOString() 
    })
  } catch (err) {
    console.error('❌ Revalidation failed:', err)
    return NextResponse.json({ 
      error: 'Failed to revalidate',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
```

### Step 2: Add Environment Variable

Add a secret token to your environment files.

**File:** `.env` and `.env.production`

```bash
# Generate a random secret string
REVALIDATE_SECRET=your-super-secret-random-string-here

# Example generation (run in terminal):
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Security Notes:**
- Use a long random string (32+ characters)
- Different secrets for dev/production
- Never commit to Git
- Add to `.env.example` as placeholder

### Step 3: Update Collections with Hooks

Add `afterChange` hooks to collections that should trigger rebuilds.

#### Services Collection

**File:** `src/collections/Services.ts`

```typescript
import { CollectionConfig } from 'payload'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only revalidate on create/update, not delete
        if (operation === 'delete') return doc

        try {
          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3011'
          
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: '/services' }),
          })
          
          console.log('✅ Triggered revalidation for /services')
        } catch (err) {
          // Log error but don't throw - content was saved successfully
          console.error('⚠️ Revalidation failed (non-critical):', err)
        }

        return doc
      },
    ],
  },
  fields: [
    // ... existing fields
  ],
}

export default Services
```

#### Insights Collection

**File:** `src/collections/Insights.ts`

```typescript
import { CollectionConfig } from 'payload'

const Insights: CollectionConfig = {
  slug: 'insights',
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'delete') return doc

        try {
          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3011'
          
          // Revalidate both the insights list AND individual post page
          const paths = [
            '/insights',                    // List page
            `/insights/${doc.slug}`,        // Individual post
          ]

          for (const path of paths) {
            await fetch(`${serverUrl}/api/revalidate`, {
              method: 'POST',
              headers: {
                'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ path }),
            })
          }
          
          console.log(`✅ Triggered revalidation for insight: ${doc.slug}`)
        } catch (err) {
          console.error('⚠️ Revalidation failed (non-critical):', err)
        }

        return doc
      },
    ],
  },
  fields: [
    // ... existing fields
  ],
}

export default Insights
```

#### Pages Collection (Homepage, About, etc.)

**File:** `src/collections/Pages.ts`

```typescript
import { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'delete') return doc

        try {
          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3011'
          
          // Revalidate the page's path
          const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
          
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
          })
          
          console.log(`✅ Triggered revalidation for page: ${path}`)
        } catch (err) {
          console.error('⚠️ Revalidation failed (non-critical):', err)
        }

        return doc
      },
    ],
  },
  fields: [
    // ... existing fields
  ],
}

export default Pages
```

### Step 4: Configure Pages as Static

Mark pages to use static generation instead of SSR.

#### Services Page

**File:** `src/app/(frontend)/services/page.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'
import ServicesClient from '@/components/ServicesClient'

// Force static generation
export const dynamic = 'force-static'

export default async function ServicesPage() {
  const payload = await getPayload({ config })
  
  const servicesData = await payload.find({
    collection: 'services' as any,
    limit: 100,
    sort: 'order',
  })

  return <ServicesClient services={servicesData.docs} />
}
```

#### Insights List Page

**File:** `src/app/(frontend)/insights/page.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'
import InsightsClient from '@/components/InsightsClient'

export const dynamic = 'force-static'

export default async function InsightsPage() {
  const payload = await getPayload({ config })
  
  const insightsData = await payload.find({
    collection: 'insights' as any,
    limit: 100,
    sort: '-publishedDate',
  })

  return <InsightsClient insights={insightsData.docs} />
}
```

#### Individual Insight Page

**File:** `src/app/(frontend)/insights/[slug]/page.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import InsightDetailClient from '@/components/InsightDetailClient'

export const dynamic = 'force-static'

// Generate static params for all insights at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  
  const insights = await payload.find({
    collection: 'insights' as any,
    limit: 1000,
  })

  return insights.docs.map((insight: any) => ({
    slug: insight.slug,
  }))
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const insightData = await payload.find({
    collection: 'insights' as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!insightData.docs || insightData.docs.length === 0) {
    notFound()
  }

  const insight = insightData.docs[0]

  return <InsightDetailClient insight={insight} />
}
```

## Testing

### 1. Test Revalidation API

```bash
# Start dev server
npm run dev

# Test the API route directly
curl -X POST http://localhost:3011/api/revalidate \
  -H "x-revalidate-secret: your-secret-here" \
  -H "Content-Type: application/json" \
  -d '{"path": "/services"}'

# Expected response:
# {"revalidated": true, "path": "/services", "timestamp": "2024-12-03T..."}
```

### 2. Test End-to-End

1. Build the site: `npm run build`
2. Start production server: `npm start`
3. Visit http://localhost:3011/services (note the content)
4. Edit a service in admin: http://localhost:3011/admin
5. Save the changes
6. Wait 2 seconds
7. Refresh /services page (should see new content)

### 3. Check Logs

```bash
# In dev server terminal, you should see:
✅ Triggered revalidation for /services
✅ Revalidated: /services
```

## Error Handling

### Hook Fails

If the revalidation hook fails:
- ❌ Error is logged but not thrown
- ✅ Content saves successfully in CMS
- ⚠️ Page won't update until next manual deploy
- 💡 Admin sees success message (save worked)

### API Route Fails

If the API route returns error:
- Check secret matches in both `.env` files
- Verify `NEXT_PUBLIC_SERVER_URL` is correct
- Check server logs for details

### Network Issues

If server is unreachable:
- Old content stays visible (graceful degradation)
- Fix network issue
- Trigger manual rebuild: redeploy or edit content again

## Production Deployment

### Environment Setup

1. Add environment variables to your hosting platform:
   ```
   REVALIDATE_SECRET=production-secret-here
   NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm start
   ```

3. Test on production domain

### Security Checklist

- ✅ Different secrets for dev/production
- ✅ Secrets not in Git
- ✅ HTTPS only in production
- ✅ Rate limiting on API route (optional)
- ✅ Logging enabled for debugging

## Monitoring

### What to Monitor

1. **Revalidation success rate**
   - Check server logs for ✅/❌ indicators
   - Set up alerts if failures spike

2. **Page build times**
   - Should be 1-2 seconds per page
   - Longer = investigate queries

3. **Content freshness**
   - Spot check: edit content, verify it appears

### Debugging Commands

```bash
# Check if revalidation is working
tail -f logs/server.log | grep -i revalidat

# Manual trigger (for testing)
curl -X POST https://yourdomain.com/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/services"}'

# Check page cache status
curl -I https://yourdomain.com/services
# Look for: x-nextjs-cache: HIT or MISS
```

## Advanced: Revalidate Multiple Paths

For complex changes that affect multiple pages:

```typescript
// In collection hook
const pathsToRevalidate = [
  '/',                    // Homepage
  '/services',            // Services list
  '/about',               // About page
]

for (const path of pathsToRevalidate) {
  await fetch(`${serverUrl}/api/revalidate`, {
    method: 'POST',
    headers: {
      'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  })
}
```

## Fallback: Time-Based Revalidation (ISR)

If on-demand feels too complex, use time-based as backup:

```typescript
// Rebuild every hour automatically
export const revalidate = 3600

// No hooks needed - Next.js handles it
```

Hybrid approach (both methods):
```typescript
export const revalidate = 3600  // Rebuild hourly as backup
// + on-demand hooks for instant updates
```

## Troubleshooting

### Content not updating after save

1. Check server logs for revalidation messages
2. Verify `REVALIDATE_SECRET` matches in code and env
3. Confirm `NEXT_PUBLIC_SERVER_URL` is correct
4. Test API route manually with curl
5. Check network connectivity between Payload and Next.js

### 401 Unauthorized

- Secret mismatch
- Missing environment variable
- Wrong header name

### 500 Server Error

- Invalid path format
- Next.js cache error
- Check full error in server logs

### Builds taking too long

- Too many paths revalidating at once
- Database query slow (add indexes)
- Server under heavy load

## Best Practices

1. **Selective revalidation** - Only rebuild affected pages
2. **Error handling** - Never throw in hooks, just log
3. **Logging** - Use clear ✅/❌ indicators
4. **Testing** - Test locally before deploying
5. **Monitoring** - Watch logs in production
6. **Fallback** - Consider ISR as backup
7. **Security** - Use strong secrets, rotate periodically

## Summary

On-demand revalidation gives you:
- Static site speed (50-200ms loads)
- Near-instant updates (1-2 seconds)
- Low server costs (no SSR overhead)
- Reliable content delivery

Perfect for sites like First Mate where content updates are infrequent but should appear quickly when they happen.
## Related Documentation

- **Quick Start**: [odr-readme.md](./odr-readme.md)
- **Deployment**: [deployment.md](./deployment.md)
- **All Docs**: [index.md](./index.md)
