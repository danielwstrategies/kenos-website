# Quick Start Guide

## Overview

This is the technical setup guide for the website, built with Next.js, Payload CMS, and MongoDB. It features Lottie animations and a modern, responsive design.

⚠️ **Note:** This guide covers technical setup only. The content (text, images, branding) shown in examples is specific to First Mate Consulting and should be **customized for your own website**. See `docs/content-examples/` for First Mate specific content examples.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn package manager

## First-Time Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# MongoDB Connection
DATABASE_URI=your_mongodb_connection_string_here

# Payload CMS
PAYLOAD_SECRET=your_secret_key_here
NEXT_PUBLIC_SERVER_URL=http://localhost:3011
```

**Getting your MongoDB connection string:**
1. Log in to MongoDB Atlas
2. Go to your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at:
- **Frontend:** http://localhost:3011
- **Admin Panel:** http://localhost:3011/admin

### 4. Create Admin User

On first visit to http://localhost:3011/admin, you'll be prompted to create an admin account.

Or use the command:
```bash
npm run create:admin
```

### 5. Seed the Homepage

Populate the homepage with First Mate content:

```bash
# Using the API endpoint (recommended)
curl http://localhost:3011/api/seed-firstmate

# Or using the script (requires local MongoDB)
npm run seed:firstmate
```

## Verify Everything Works

### Check Lottie Animations

1. **Test Page:** Visit http://localhost:3011/test-lottie
   - Both animations should play
   - Check browser console for success messages

2. **Homepage:** Visit http://localhost:3011
   - Strategy animation (right side, white background)
   - Guidance animation (left side, gray background)

3. **Browser Console:** Press F12 and look for:
   - ✅ "Lottie animation loaded successfully"
   - ❌ No error messages

## Homepage Content

⚠️ **This content is specific to First Mate Consulting** - Use as an example only. Replace with your own branding, messaging, and copy.

### Hero Section (Example)
- **Heading:** "Your trusted partner in strategic communications."
- **Subheading:** "First Mate helps you craft compelling narratives and build meaningful connections with your stakeholders."
- **CTA:** "Get Started"

### Strategy Section (Example)
- **Visual:** Megaphone/chart animation
- **Message:** "We help you develop clear, impactful messaging strategies that resonate with your audience and drive meaningful engagement across all channels."

### Guidance Section (Example)
- **Visual:** Shipping boat animation
- **Message:** "First Mate provides expert guidance to help you navigate complex communications challenges with confidence and clarity."

### Services (Example)
1. **Strategic Communications** - Clear, effective communication strategies that deliver results.
2. **Content & Messaging** - Compelling content that connects with your audience.
3. **Digital Strategy** - Innovative digital approaches that amplify your message.

### Schedule Section (Example)
- **Heading:** "Let's Connect"
- **Subheading:** "Schedule a consultation to discuss your needs."
- **CTA:** "Contact Us"

**Remember:** This is First Mate specific content. Create your own unique content for your website.

## Project Structure

```
first-mate-2/
├── public/
│   └── animations/          # Lottie animation JSON files
│       ├── strategy-animation.json
│       └── guidance-animation.json
├── src/
│   ├── app/
│   │   ├── (frontend)/      # Public-facing pages
│   │   │   └── page.tsx     # Homepage
│   │   ├── (payload)/       # Admin panel
│   │   ├── api/
│   │   │   └── seed-firstmate/  # Seeding endpoint
│   │   └── test-lottie/     # Animation test page
│   ├── components/
│   │   ├── blocks/          # Page building blocks
│   │   │   ├── FirstMateHero.tsx
│   │   │   ├── ImageTextSection.tsx  # Lottie animations
│   │   │   ├── ServicesGrid.tsx
│   │   │   └── ScheduleSection.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── collections/         # CMS content models
│   │   └── Pages.ts
│   └── payload.config.ts    # Payload CMS configuration
├── scripts/                 # Utility scripts
│   └── seed-firstmate-homepage.ts
└── docs/                    # Documentation
    ├── setup.md       # This file
    ├── lottie-troubleshooting.md
    └── LOTTIE-FIX-SUMMARY.md
```

## Common Tasks

### Update Homepage Content

**Option 1: Via Admin Panel**
1. Go to http://localhost:3011/admin
2. Navigate to Collections → Pages
3. Click on "Home"
4. Edit any section
5. Save changes

**Option 2: Reseed (Overwrites Everything)**
```bash
curl http://localhost:3011/api/seed-firstmate
```

### Check Existing Users

```bash
npm run check:users
```

### Test Database Connection

```bash
npm run test:db
```

### Generate TypeScript Types

After modifying CMS collections:
```bash
npm run generate:types
```

## Troubleshooting

### Animations Not Working?

See the comprehensive guide: [docs/lottie-troubleshooting.md](./lottie-troubleshooting.md)

**Quick checks:**
1. Visit http://localhost:3011/test-lottie
2. Open browser console (F12)
3. Look for error messages
4. Verify animation files exist in `/public/animations/`

### Can't Connect to Database?

1. Check `.env` file has correct `DATABASE_URI`
2. Verify MongoDB Atlas cluster is running
3. Check IP whitelist in MongoDB Atlas
4. Test connection: `npm run test:db`

### Admin Panel Not Loading?

1. Clear browser cache
2. Delete `.next` folder: `rm -rf .next`
3. Restart dev server: `npm run dev`
4. Check `PAYLOAD_SECRET` is set in `.env`

### Port 3011 Already in Use?

```bash
# Find and kill the process
lsof -ti:3011 | xargs kill -9

# Or change the port in package.json
# Update both "dev" and "start" scripts
```

## Development Workflow

1. **Make changes** to components or content
2. **Test locally** at http://localhost:3011
3. **Check admin panel** at http://localhost:3011/admin
4. **Verify animations** at http://localhost:3011/test-lottie
5. **Check console** for errors (F12)
6. **Build for production:** `npm run build`
7. **Test production build:** `npm start`

## Production Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Using PM2 (Process Manager)

```bash
# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Restart
pm2 restart first-mate-2
```

## Key Features

- ✅ **Payload CMS** - Full-featured headless CMS
- ✅ **Lottie Animations** - Smooth, scalable animations
- ✅ **Next.js 15** - Latest React framework
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **MongoDB** - Flexible database
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Meta tags and structured data

## Related Documentation

- **Troubleshooting:** [lottie-troubleshooting.md](./lottie-troubleshooting.md)
- **Deployment:** [deployment-quickstart.md](./deployment-quickstart.md)
- **MongoDB Setup:** [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **All Docs:** [index.md](./index.md)

## Quick Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server

# Database
npm run test:db               # Test MongoDB connection
npm run check:users           # List all users

# Seeding
npm run seed:firstmate        # Seed homepage (script)
curl http://localhost:3011/api/seed-firstmate  # Seed via API

# Admin
npm run create:admin          # Create admin user

# Types
npm run generate:types        # Generate TypeScript types
```

## URLs

- **Frontend:** http://localhost:3011
- **Admin Panel:** http://localhost:3011/admin
- **Animation Test:** http://localhost:3011/test-lottie
- **Seed API:** http://localhost:3011/api/seed-firstmate

## Next Steps

1. ✅ Set up environment variables
2. ✅ Start development server
3. ✅ Create admin account
4. ✅ Seed the homepage
5. ✅ Verify animations work
6. 🎨 Customize branding (colors, fonts, images)
7. 📝 Add additional pages/content
8. 🚀 Deploy to production

---

**Questions?** Check the documentation files in the `/docs` folder or review the comprehensive troubleshooting guide.