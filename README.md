# Kenos Website - Payload CMS

A Payload CMS website with a flexible, block-based Pages collection for building your restaurant homepage and other pages.

## Getting Started

### Prerequisites

- Node.js v18+ installed
- MongoDB running locally or connection string to MongoDB Atlas

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Configuration

1. Update `.env` file with your MongoDB connection:
   ```
   DATABASE_URI=mongodb://localhost:27017/kenos-website
   PAYLOAD_SECRET=your-secret-key-change-this-in-production
   PORT=3000
   ```

### Running the Development Server

```bash
npm run dev
```

The admin panel will be available at: `http://localhost:3000/admin`

### Project Structure

```
.
├── src/
│   ├── collections/     # Content collections (Pages, Users, etc.)
│   ├── globals/         # Global settings
│   ├── payload.config.ts # Payload configuration
│   └── server.ts        # Express server
├── public/              # Static assets
└── .env                 # Environment variables
```

## Pages Collection

The site includes a powerful Pages collection with 8 flexible content blocks:

- **Hero Section** - Banner with headline, background image, and CTA buttons
- **About Section** - Story, features, and images
- **Menu Highlights** - Showcase signature dishes with photos and pricing
- **Gallery** - Photo galleries with multiple layout options
- **Testimonials** - Customer reviews with ratings
- **Contact Section** - Location, hours, and contact information
- **Content Block** - Flexible rich text content
- **Call to Action** - Conversion-focused prompts

### Quick Start Guide

1. **Start the server**: `npm run dev`
2. **Access admin panel**: `http://localhost:3000/admin`
3. **Upload images** to the Media collection
4. **Create homepage** in Pages collection with slug "home"
5. **Add content blocks** to build your page layout

### Documentation

- 📖 **Full Guide**: See `docs/pages-guide.md` for detailed instructions
- 📋 **Quick Reference**: See `docs/blocks-reference.md` for block field reference
- 💾 **Example Data**: See `docs/example-homepage.json` for sample content
- 📊 **Implementation Summary**: See `docs/implementation-summary.md` for overview

## Next Steps

1. ✅ **MongoDB Setup** - Install MongoDB locally or use MongoDB Atlas
2. ✅ **Pages Collection** - Ready to use with 8 content blocks
3. 📸 **Upload Media** - Add images from your Figma design to Media collection
4. 📝 **Create Homepage** - Build your homepage using the Pages collection
5. 🎨 **Build Frontend Components** - Create React components to render each block type
6. 💅 **Style Components** - Match your Figma design with CSS/Tailwind

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run generate:types` - Generate TypeScript types from collections

## Collections

- **Users** - Admin user management with authentication
- **Pages** - Flexible page builder with 8 content block types
- **Media** - Image uploads with automatic resizing (thumbnail, card, tablet, desktop)
- **TestCollection** - Sample collection for reference

## API Access

Access your content via REST API:

```javascript
// Fetch homepage
const response = await fetch('http://localhost:3000/api/pages?where[slug][equals]=home')
const data = await response.json()
const homePage = data.docs[0]

// Render blocks
homePage.layout.forEach(block => {
  // block.blockType: 'hero', 'about', 'menuHighlights', etc.
})
```
