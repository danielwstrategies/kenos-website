# Kenos Website Documentation

Complete documentation for the Kenos Restaurant website built with Next.js 15 and Payload CMS 3.x.

## 📚 Documentation Index

### Getting Started
- **[quick-start.md](./quick-start.md)** - 10-minute setup checklist to build your first homepage
- **[implementation-summary.md](./implementation-summary.md)** - Technical overview of the project architecture

### Pages Collection Guide
- **[pages-guide.md](./pages-guide.md)** - Comprehensive guide for using the Pages collection
- **[blocks-reference.md](./blocks-reference.md)** - Quick reference for all 8 content block types
- **[example-homepage.json](./example-homepage.json)** - Complete sample homepage data structure

### Advanced
- **[browser-seed-instructions.md](./browser-seed-instructions.md)** - Create pages via browser console
- **[css-troubleshooting.md](./css-troubleshooting.md)** - Fix Payload admin styling issues

## 🚀 Quick Links

### Common Tasks
- **Create a new page**: See [quick-start.md](./quick-start.md) → Step 4
- **Add content blocks**: See [blocks-reference.md](./blocks-reference.md) for all block types
- **Upload images**: See [pages-guide.md](./pages-guide.md) → "Uploading Media"
- **Fix admin styling**: See [css-troubleshooting.md](./css-troubleshooting.md) → "Quick Fix"

### API & Development
- **Fetch page data**: See [pages-guide.md](./pages-guide.md) → "Frontend Integration"
- **TypeScript types**: See [implementation-summary.md](./implementation-summary.md) → "TypeScript Types"
- **Seed homepage**: Visit `http://localhost:3011/api/seed-homepage`

## 📖 Documentation by Role

### For Content Editors
1. Start with [quick-start.md](./quick-start.md) - Create your first page in 10 minutes
2. Reference [blocks-reference.md](./blocks-reference.md) - Learn what each block does
3. Use [example-homepage.json](./example-homepage.json) - See sample content for inspiration

### For Developers
1. Read [implementation-summary.md](./implementation-summary.md) - Understand the architecture
2. Study [pages-guide.md](./pages-guide.md) - Learn API access and frontend integration
3. Check [css-troubleshooting.md](./css-troubleshooting.md) - Fix common issues

### For Designers
1. Review [blocks-reference.md](./blocks-reference.md) - See available layout components
2. Check [example-homepage.json](./example-homepage.json) - Understand content structure
3. Reference image sizes in [pages-guide.md](./pages-guide.md) → "Image Recommendations"

## 🎯 Key Concepts

### Content Blocks
The website uses a flexible block-based system with 8 block types:
- **hero** - Hero banners with CTAs
- **about** - Story sections with features
- **menuHighlights** - Menu item showcases
- **gallery** - Image galleries
- **testimonials** - Customer reviews
- **contact** - Contact information
- **content** - Flexible rich text
- **cta** - Call-to-action prompts

See [blocks-reference.md](./blocks-reference.md) for complete details.

### Collections
- **Pages** - Content pages with flexible blocks
- **Media** - Image uploads with automatic resizing
- **Users** - Admin user management

### Access Points
- **Frontend**: http://localhost:3011
- **Admin Panel**: http://localhost:3011/admin
- **API**: http://localhost:3011/api/pages

## 🔧 Troubleshooting

### Admin Panel Issues
If the admin panel appears unstyled → [css-troubleshooting.md](./css-troubleshooting.md)

### Content Issues
- Page not showing? → Check status is "published" not "draft"
- Images not loading? → Verify upload to Media collection
- API returns empty? → Check slug matches exactly

### Build/Development Issues
- Server won't start? → Check `.env` file has `DATABASE_URI`
- Type errors? → Run `npm run generate:types`
- Port in use? → Change `PORT` in `.env` or kill process

See individual documentation files for detailed troubleshooting steps.

## 📝 File Descriptions

### quick-start.md
Step-by-step checklist to create your homepage in 10 minutes. Includes:
- Server setup
- Admin account creation
- Image uploads
- Block-by-block homepage creation
- Publishing workflow

**Best for:** First-time users, content editors

### pages-guide.md
Comprehensive 310-line guide covering everything about Pages collection:
- All 8 block types explained with examples
- Image upload workflow
- SEO configuration
- Frontend integration
- API access
- TypeScript usage

**Best for:** Developers, advanced users

### blocks-reference.md
Quick reference guide (342 lines) with tables and examples for each block:
- Field descriptions
- Example data
- Usage tips
- Recommended content

**Best for:** Content editors creating pages, quick lookups

### implementation-summary.md
Technical overview of the Pages collection implementation:
- What was created
- Features summary
- Getting started steps
- Frontend implementation guide
- Best practices

**Best for:** Developers, project handoff

### example-homepage.json
Complete JSON structure of a restaurant homepage with:
- All 8 block types demonstrated
- Sample content and copy
- Proper data formatting
- Real-world example

**Best for:** Understanding data structure, content inspiration

### browser-seed-instructions.md
Alternative method to create pages using browser console:
- JavaScript code to create pages via API
- Workaround for database connection issues
- Manual creation instructions

**Best for:** When seed script doesn't work, API testing

### css-troubleshooting.md
Detailed guide for fixing Payload admin styling issues:
- Quick fix for most common issue
- Browser extension interference
- Missing packages
- Component styles debugging
- Version compatibility

**Best for:** Fixing broken admin panel, debugging CSS issues

## 🎓 Learning Path

### Beginner (Content Editor)
1. Read [quick-start.md](./quick-start.md) - Understand the basics
2. Create your first page following the checklist
3. Reference [blocks-reference.md](./blocks-reference.md) as needed
4. Experiment with different block combinations

### Intermediate (Developer)
1. Review [implementation-summary.md](./implementation-summary.md) - Understand architecture
2. Study [pages-guide.md](./pages-guide.md) - Learn API and integration
3. Examine [example-homepage.json](./example-homepage.json) - See data structure
4. Build custom frontend components for each block type

### Advanced (Full Stack)
1. Modify `/src/collections/Pages.ts` - Add custom block types
2. Extend [css-troubleshooting.md](./css-troubleshooting.md) - Document new issues
3. Create additional collections (Menu Items, Reservations, etc.)
4. Integrate with external services (payment, booking, etc.)

## 🔄 Keeping Documentation Updated

When making changes:
- **New block type?** → Update [blocks-reference.md](./blocks-reference.md) and [pages-guide.md](./pages-guide.md)
- **New troubleshooting fix?** → Add to [css-troubleshooting.md](./css-troubleshooting.md)
- **Changed workflow?** → Update [quick-start.md](./quick-start.md)
- **New feature?** → Update [implementation-summary.md](./implementation-summary.md)

## 📞 Support

- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Report bugs and request features
- **Main README**: `/README.md` - Project overview

---

**Last Updated:** December 2, 2024  
**Version:** 1.0.0  
**Payload CMS:** 3.65.0  
**Next.js:** 15.4.7