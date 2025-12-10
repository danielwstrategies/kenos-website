# Documentation Index

## 📖 Documentation Types

This project has two types of documentation:

| Type | Location | Purpose |
|------|----------|---------|
| **Technical Docs** | `/docs/` (this folder) | Universal setup, deployment, features |
| **Content Examples** | `/docs/content-examples/` | First Mate specific content (customize for your site) |

---

## Technical Documentation (Universal)

These guides apply to **any website** using this stack:

### Quick Start Guides

| Guide | Purpose |
|-------|---------|
| **[deployment-quickstart.md](./deployment-quickstart.md)** | ⭐ Deploy duplicate from scratch (30-60 min) |
| **[setup.md](./setup.md)** | Initial local development setup |
| **[quick-start-atlas.md](./quick-start-atlas.md)** | MongoDB Atlas database setup |
| **[deployment.md](./deployment.md)** | Coolify deployment reference |

### Styling & Design

| Guide | Purpose |
|-------|---------|
| **[styling-guide.md](./styling-guide.md)** | Tailwind CSS customization |
| **[gsap-animations.md](./gsap-animations.md)** | GSAP animation patterns |

### CMS & Content

| Guide | Purpose |
|-------|---------|
| **[blocks-reference.md](./blocks-reference.md)** | Available content blocks reference |

### Features

| Feature | Guide |
|---------|-------|
| **On-Demand Revalidation** | [odr-readme.md](./odr-readme.md) - Quick start<br/>[on-demand-revalidation.md](./on-demand-revalidation.md) - Full guide |
| **Lottie Animations** | [lottie-troubleshooting.md](./lottie-troubleshooting.md) |

### Troubleshooting

| Issue | Guide |
|-------|-------|
| **Deployment Issues** | [deployment-issue-log.md](deployment-issue-log.md) - Express 5 + Next.js custom server |
| **CSS/Admin Styling** | [css-troubleshooting.md](./css-troubleshooting.md) - Payload admin panel |
| **General Issues** | [troubleshooting-log.md](./troubleshooting-log.md) |
| **Database** | [mongodb-atlas-setup.md](./mongodb-atlas-setup.md) |

---

## Content Examples (First Mate Specific)

⚠️ **These are examples only** - customize for your own website:

| Guide | Purpose |
|-------|---------|
| **[content-examples/README.md](./content-examples/README.md)** | Overview of content documentation |
| **[content-examples/first-mate-plan.md](./content-examples/first-mate-plan.md)** | First Mate planning (example) |

**Note:** Do not copy First Mate content directly. Use as examples to create your own branding, messaging, and copy.

---

## Key Commands

```bash
# Development
npm run dev                    # Start dev server (port 3011)
npm run build                  # Build for production
npm start                      # Start production server

# Payload CMS
npm run generate:types         # Generate TypeScript types
curl http://localhost:3011/api/seed-firstmate  # Seed example homepage

# Testing
curl http://localhost:3011/health              # Check server health
```

## Access Points

- **Frontend**: http://localhost:3011
- **Admin Panel**: http://localhost:3011/admin
- **Health Check**: http://localhost:3011/health
- **Test Animations**: http://localhost:3011/test-lottie

## Project Architecture

This is a Next.js 15 + Payload CMS 3.x website with:
- **Custom Express Server** (`src/server.ts`) - Integrates Next.js + Payload
- **MongoDB Atlas** - Cloud database
- **Tailwind CSS** - Styling with custom theme
- **Lottie/GSAP** - Animations
- **ODR** - On-demand revalidation for static pages

## Documentation Organization

```
docs/
├── index.md (this file)              # Navigation hub
├── setup.md                          # ✅ Universal
├── deployment-quickstart.md          # ✅ Universal
├── styling-guide.md                  # ✅ Universal
├── blocks-reference.md               # ✅ Universal
├── ... (11 more universal guides)
└── content-examples/
    ├── README.md                     # ⚠️ Content overview
    └── first-mate-plan.md            # ⚠️ First Mate specific
```

**Legend:**
- ✅ **Universal** - Reusable for any project with this stack
- ⚠️ **Content** - First Mate specific (customize for your site)

---

**Need help?** Start with the Quick Start Guides above, then check specific feature guides as needed.
