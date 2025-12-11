# Claude AI Instructions for Kenos Restaurant Website

## Communication Guidelines

**IMPORTANT - Read First:**
- Keep responses SHORT and DIRECT
- **NEVER create documentation files without explicit user permission**
- **ASK before creating any new files in /docs folder**
- Answer questions concisely in chat only
- Only create guides/documents when user explicitly says "create a document" or "write a guide"
- Compress and summarize - avoid verbose explanations
- If user asks a question, answer it directly - don't offer to document it

## Project Overview
This is a Next.js 15 + Payload CMS 3.x restaurant website project for Kenos Restaurant with Tailwind CSS styling and GSAP animations.

## How to Create Pages in Payload CMS

### Quick Method: Using the API Route (Recommended)

To create a new page programmatically, use the built-in API route:

```bash
# Visit this URL in your browser or use curl
http://localhost:3011/api/seed-homepage
```

This creates a complete example homepage with all block types. You can then edit it in the admin panel.

### Manual Method: Through Admin Panel

1. **Start the server**: `npm run dev`
2. **Access admin**: http://localhost:3011/admin
3. **Navigate to Pages**: Click "Pages" in sidebar
4. **Create new page**: Click "Create New" button
5. **Fill in basic fields**:
   - **Title**: Page name (e.g., "About Us")
   - **Slug**: URL path (auto-formatted, e.g., "about-us")
   - **Status**: "draft" or "published"
6. **Add content blocks**: Click "Add Block" and choose block type
7. **Configure each block**: Fill in all required fields
8. **Add SEO metadata**: Scroll to "SEO & Meta" section
9. **Save and publish**: Click "Save" button

### Available Block Types

The Pages collection includes 8 flexible content blocks:

1. **hero** - Hero section with heading, subheading, background image, and CTA buttons
2. **about** - About section with title, rich text content, image, and feature list
3. **menuHighlights** - Menu items showcase with name, description, price, images, categories
4. **gallery** - Image gallery with captions and layout options (grid/masonry/carousel)
5. **testimonials** - Customer reviews with quotes, authors, roles, avatars, and ratings
6. **contact** - Contact section with address, phone, email, hours, map, and contact form
7. **content** - Flexible rich text content block with background color options
8. **cta** - Call-to-action section with heading, description, button, and background image

### Block Structure Example

```typescript
// Hero Block
{
  blockType: 'hero',
  heading: 'Welcome to Kenos Restaurant',
  subheading: 'Your tagline here',
  backgroundImage: mediaId, // Upload to Media collection first
  primaryButton: {
    text: 'View Menu',
    link: '/menu'
  },
  secondaryButton: {
    text: 'Reserve Table',
    link: '/reservations'
  }
}
```

### Required Fields by Block

- **hero**: heading
- **about**: title, content (rich text)
- **menuHighlights**: title, items (min 1 item with name)
- **gallery**: images (min 1 image)
- **testimonials**: testimonials (min 1 with quote and author)
- **contact**: No required fields, but should include contact info
- **content**: content (rich text)
- **cta**: heading, button.text, button.link

### Working with Images

Images must be uploaded to the **Media collection** BEFORE adding them to page blocks:

1. Go to **Media** collection in admin
2. Click **Upload**
3. Select image file
4. Add **alt text** (required for accessibility)
5. Add caption (optional)
6. Save
7. Now you can select this image in page blocks

### Rich Text Format (Slate Editor)

Rich text fields use Slate editor format:

```javascript
content: [
  {
    children: [
      { text: 'Your paragraph text here' }
    ]
  },
  {
    children: [
      { text: 'Another paragraph' }
    ]
  }
]
```

### API Access

Fetch page data programmatically:

```javascript
// Get by slug
const res = await fetch('http://localhost:3011/api/pages?where[slug][equals]=home')
const data = await res.json()
const page = data.docs[0]

// Get by ID
const res = await fetch('http://localhost:3011/api/pages/PAGE_ID')
const page = await res.json()
```

### Frontend Rendering

The homepage frontend is at `/src/app/(frontend)/page.tsx`. It:
1. Fetches the page with slug "home"
2. Loops through `page.layout` blocks
3. Renders each block based on `blockType`
4. Applies inline styles (can be replaced with Tailwind/CSS)

To add a new page route:
1. Create the page in Payload CMS admin
2. Create Next.js route file (e.g., `/src/app/(frontend)/about/page.tsx`)
3. Fetch page with matching slug
4. Render blocks using same pattern as homepage

### TypeScript Types

Auto-generated types are available:

```typescript
import type { Page } from '@/payload-types'

const page: Page = await fetchPage('home')
```

Regenerate types after schema changes:
```bash
npm run generate:types
```

## Important Files

- **Pages Collection**: `/src/collections/Pages.ts` - Block definitions
- **Media Collection**: `/src/collections/Media.ts` - Image upload settings
- **Config**: `/src/payload.config.ts` - Payload configuration
- **Frontend Homepage**: `/src/app/(frontend)/page.tsx` - Homepage rendering
- **Seed API Route**: `/src/app/api/seed-homepage/route.ts` - Create example homepage

## Documentation Files

All documentation is in the `/docs` folder:

- `blocks-reference.md` - Comprehensive guide for using Pages collection
- `blocks-reference.md` - Quick reference for all block types
- `setup.md` - 10-minute setup checklist
- `index.md` - Technical overview
- `css-troubleshooting.md` - Payload admin styling issues reference
- `setup.md` - How to create pages via browser console

## Common Tasks

### Create a New Page Type
1. Edit `/src/collections/Pages.ts`
2. Add new block to `layout.blocks` array
3. Run `npm run generate:types`
4. Add rendering logic in frontend page component

### Add Image to Existing Page
1. Upload to Media collection
2. Edit page in admin
3. Find the image field in the block
4. Select the uploaded image
5. Save page

### Change Page Status
1. Open page in admin
2. Find "Status" field (usually in sidebar)
3. Change from "draft" to "published"
4. Save

### Delete a Page
1. Go to Pages collection
2. Click on the page
3. Scroll to bottom
4. Click "Delete" button
5. Confirm deletion

## Troubleshooting

### CSS/Styling Issues
If Payload admin panel appears unstyled, see `docs/css-troubleshooting.md` for detailed debugging steps.

**Quick fix:** Verify `/src/app/(payload)/layout.tsx` imports:
```typescript
import '@payloadcms/next/css'  // ✅ Correct for Payload 3.x
```

### Page Not Showing
- Check page status is "published" not "draft"
- Verify slug matches the route you're accessing
- Check API endpoint returns data: `/api/pages?where[slug][equals]=YOUR_SLUG`

### Images Not Loading
- Verify image uploaded to Media collection
- Check `public/media` folder exists
- Ensure alt text is provided (required)
- Verify image is selected in page block

### TypeScript Errors
- Run `npm run generate:types` after changing collections
- Restart TypeScript server in IDE
- Check imports use `@/payload-types` path

## Development Workflow

1. **Start server**: `npm run dev`
2. **Access admin**: http://localhost:3011/admin
3. **Create/edit content** in Payload admin
4. **Preview frontend**: http://localhost:3011
5. **Check API data**: http://localhost:3011/api/pages
6. **Generate types**: `npm run generate:types` (after schema changes)
7. **Deploy**: Follow `deployment.md` instructions

## Database Connection

The project uses MongoDB Atlas (cloud database). Connection string is in `.env`:

```
DATABASE_URI=mongodb+srv://...
```

No local MongoDB required. The admin panel and API routes connect automatically.

## AI Assistant Guidelines

1. **Be concise** - Short answers in chat only
2. **NEVER create files without permission** - User must explicitly say "create a file" or "write a document"
3. **Answer, don't document** - When user asks a question, answer it in chat
4. **Ask first** - If documentation would be helpful, ASK if user wants it created
5. **Docs in /docs folder** - Only when explicitly requested
6. **Focus on user request** - Only address what was asked
7. **No token waste** - Avoid verbose explanations and unnecessary details

## Dev Server Management (CRITICAL)

**NEVER kill or interrupt the dev server.** The user runs `npm run dev` in a separate terminal.

When making code changes:
- **DO NOT** run `npm run dev` - assume it's already running
- **DO NOT** use `pkill` or kill commands on node/tsx processes
- **DO NOT** run bash commands with timeouts that could kill the server
- **DO** let Next.js hot reload handle file changes automatically
- **DO** use `curl http://localhost:3011/health` to check if server is running (non-destructive)

If the server stops responding:
1. Ask the user to restart it manually in their terminal
2. Or use: `cd /Users/danielyager/kenos-website && npm run dev &` to start in background

**Why this matters:** Running `npm run dev` from Claude Code or using timeouts on bash commands can orphan/kill the existing server process, causing "site not loading" issues.

## Best Practices

1. **Always add alt text** to images (accessibility + SEO)
2. **Use drafts** while editing, publish when ready
3. **Fill in SEO metadata** for all public pages
4. **Test mobile view** when creating content
5. **Keep block order logical** (hero → content → CTA)
6. **Upload images first** before adding to blocks
7. **Use consistent naming** for slugs (lowercase, hyphens)
8. **Backup before major changes** (export database)

## Quick Reference Commands

```bash
# Development
npm run dev                    # Start dev server (port 3011)
npm run build                  # Build for production
npm start                      # Start production server

# Payload
npm run generate:types         # Generate TypeScript types
npm run generate:importmap     # Generate import map
npm run seed:homepage          # Seed example homepage (requires MongoDB)

# Access Points
http://localhost:3011          # Frontend homepage
http://localhost:3011/admin    # Payload admin panel
http://localhost:3011/api      # API documentation
```

## Server Logging

The project uses **Winston** for comprehensive logging to help diagnose issues:

### Log Files Location
- **Error logs**: `/logs/error.log` - Only errors, crashes, exceptions
- **Combined logs**: `/logs/combined.log` - All logs (info + errors)
- **Auto-rotation**: Max 5MB per file, keeps last 5 files

### Viewing Logs in Production (Coolify)
```bash
# In Coolify terminal:
cat /app/logs/error.log           # View error logs
cat /app/logs/combined.log        # View all logs
tail -50 /app/logs/combined.log   # Last 50 lines
grep -i "error\|mongodb\|crash" /app/logs/combined.log  # Search errors
```

### What Gets Logged
- ✅ Server startup/shutdown
- ✅ Health check passes/failures
- ✅ Unhandled promise rejections
- ✅ Uncaught exceptions
- ✅ MongoDB connection issues
- ✅ All errors with full stack traces

### If Site Shows "No Server Available"
1. Check `/app/logs/error.log` for crash details
2. Look for MongoDB connection errors
3. Check for memory/timeout issues
4. Review last entries before crash in `combined.log`


## When Things Go Wrong

1. **Server won't start**: Check `.env` file exists with DATABASE_URI
2. **Admin unstyled**: See `docs/css-troubleshooting.md`
3. **API errors**: Check MongoDB connection in `.env`
4. **Type errors**: Run `npm run generate:types`
5. **Build fails**: Delete `.next` folder and rebuild
6. **Port in use**: Change PORT in `.env` or kill process on 3011
7. **Site crashed/went down**: Check `/logs/error.log` for crash details

## Additional Resources

- **Payload Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project Docs**: `/docs` folder
- **Example Data**: `/example-homepage.json`

## Known Issues & Bugs

### Curl commands get stuck
**Problem**: Running `curl` commands to check localhost:3011 causes the bash tool to hang/timeout.
**Workaround**: Do NOT use `curl` to test the server. Instead:
- Check the background server output with `BashOutput` tool
- Ask the user to verify in their browser
- Use non-blocking checks only

### CSS changes may require hard refresh
**Problem**: After editing `globals.css`, the page may appear broken or not load.
**Solution**: 
- The server logs may still show 200 responses
- Ask user to hard refresh browser (Cmd+Shift+R)
- Check server output for compilation errors


### Multiple processes on same port
**Problem**: Page refuses to load when multiple node processes are running on port 3011.
**Symptoms**: Server logs show 200 but browser shows nothing or hangs.
**Diagnosis**: Run `lsof -ti:3011` - if it shows more than one PID, thats the issue.
**Solution**: Kill all processes with `kill -9 $(lsof -ti:3011)` then restart server.

