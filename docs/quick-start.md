# Quick Start: Building Your Homepage

A simple checklist to get your Keno's Restaurant homepage up and running.

## ✅ Prerequisites (Already Done!)

- [x] Pages collection created with 8 flexible content blocks
- [x] Media collection set up for image uploads
- [x] Collections registered in Payload config
- [x] TypeScript types generated

## 📋 Your 10-Minute Setup Checklist

### Step 1: Start Your Server (1 min)
```bash
npm run dev
```
Open `http://localhost:3000/admin` in your browser.

### Step 2: Create Admin Account (1 min)
- First-time setup will prompt you to create an admin user
- Enter your email and password
- Click "Create"

### Step 3: Upload Images (3 min)
Navigate to **Media** in the sidebar, then upload:

- [ ] Hero background image (1920x1080px recommended)
- [ ] Restaurant interior/exterior photos (2-3 images)
- [ ] Food photos for menu items (6-8 images)
- [ ] Gallery images (8-12 images)
- [ ] Team/chef photos (optional)
- [ ] Logo/branding images

**Important**: Add descriptive "alt text" for each image!

### Step 4: Create Homepage (5 min)
Navigate to **Pages** → **Create New**

#### Basic Info
- **Title**: `Home`
- **Slug**: `home` (auto-formatted)
- **Status**: `draft` (change to "published" when ready)

#### Add These Blocks (in order):

##### 1. Hero Section
- [x] Heading: "Welcome to Keno's Restaurant"
- [x] Subheading: Your tagline/description
- [x] Background Image: Select from uploaded media
- [x] Primary Button: Text: "View Menu", Link: "/menu"
- [x] Secondary Button: Text: "Reserve Table", Link: "/reservations"

##### 2. About Section
- [x] Title: "Our Story"
- [x] Subtitle: Optional subtitle
- [x] Content: Write 2-3 paragraphs about your restaurant
- [x] Image: Restaurant interior photo
- [x] Image Position: Right
- [x] Features: Add 3-4 items:
  - 🍳 "Fresh Ingredients" - "Locally sourced daily"
  - 👨‍🍳 "Expert Chefs" - "20+ years experience"
  - 🏆 "Award Winning" - "Recognized excellence"
  - ❤️ "Made with Love" - "Passion in every dish"

##### 3. Menu Highlights
- [x] Title: "Signature Dishes"
- [x] Subtitle: "Taste our most loved creations"
- [x] Add 6-8 Menu Items:
  - Name, Description, Price
  - Select image for each
  - Category (Appetizer, Main Course, Dessert)
  - Check "featured" for 3-4 best dishes

##### 4. Gallery Section
- [x] Title: "Experience Keno's"
- [x] Subtitle: Optional
- [x] Layout: "grid"
- [x] Add 8-12 images with captions

##### 5. Testimonials Section
- [x] Title: "What Our Guests Say"
- [x] Add 3-5 Testimonials:
  - Quote, Author, Role
  - Rating (5 stars recommended)
  - Avatar image (optional)

##### 6. Call to Action
- [x] Heading: "Ready for an Unforgettable Dining Experience?"
- [x] Description: "Reserve your table today..."
- [x] Button Text: "Make a Reservation"
- [x] Button Link: "/reservations"
- [x] Style: "centered"

##### 7. Contact Section
- [x] Title: "Visit Us"
- [x] Address: Your full address
- [x] Phone: Your phone number
- [x] Email: Your email
- [x] Hours: Add each day/hours
- [x] Map Embed: Google Maps iframe or URL
- [x] Show Contact Form: ✓

#### SEO & Meta
Scroll to "SEO & Meta" section:
- [x] Title: "Keno's Restaurant | Authentic Cuisine & Fine Dining"
- [x] Description: Write 150-160 character description
- [x] Keywords: "restaurant, fine dining, [your cuisine], [your city]"
- [x] Image: Upload Open Graph image (1200x630px)

### Step 5: Publish (30 sec)
- Change **Status** from "draft" to "published"
- Click **Save**

## 🎉 Done!

Your homepage data is now in Payload CMS and accessible via API:

```javascript
// Fetch your homepage
fetch('http://localhost:3000/api/pages?where[slug][equals]=home')
  .then(res => res.json())
  .then(data => console.log(data.docs[0]))
```

## 🎨 Next: Build the Frontend

Now that your content is ready, you need to:

1. **Create React components** for each block type
2. **Fetch page data** from the API
3. **Render blocks** dynamically
4. **Style components** to match your Figma design

### Example Component Structure
```
src/
  components/
    blocks/
      Hero.tsx          ← Renders hero block
      About.tsx         ← Renders about block
      MenuHighlights.tsx ← Renders menu items
      Gallery.tsx       ← Renders image gallery
      Testimonials.tsx  ← Renders reviews
      Contact.tsx       ← Renders contact info
      Content.tsx       ← Renders rich text
      CTA.tsx          ← Renders call to action
    Block.tsx          ← Main block router
  app/
    page.tsx           ← Homepage that fetches and displays blocks
```

### Example Page Component
```typescript
// app/page.tsx
export default async function HomePage() {
  const res = await fetch('http://localhost:3000/api/pages?where[slug][equals]=home')
  const data = await res.json()
  const page = data.docs[0]
  
  return (
    <main>
      {page.layout.map((block, i) => {
        switch(block.blockType) {
          case 'hero':
            return <Hero key={i} {...block} />
          case 'about':
            return <About key={i} {...block} />
          case 'menuHighlights':
            return <MenuHighlights key={i} {...block} />
          // ... etc
        }
      })}
    </main>
  )
}
```

## 📚 Need More Help?

- **Detailed Guide**: `PAGES_GUIDE.md` - Full walkthrough with examples
- **Block Reference**: `BLOCKS_REFERENCE.md` - Field reference for all blocks
- **Example Data**: `example-homepage.json` - Complete sample homepage
- **Implementation**: `IMPLEMENTATION_SUMMARY.md` - Technical overview

## 💡 Pro Tips

1. **Work in Drafts**: Keep status as "draft" while building
2. **Save Often**: Click save after adding each block
3. **Preview API**: Check `http://localhost:3000/api/pages` to see your data
4. **Use Examples**: Reference `example-homepage.json` for content ideas
5. **Mobile First**: Think about how content will look on phones

## 🚨 Troubleshooting

**Can't upload images?**
- Check that `public/media` directory exists
- Verify MongoDB is running

**Changes not saving?**
- Make sure MongoDB connection is active
- Check browser console for errors

**API returns empty?**
- Ensure page status is "published"
- Check the slug matches exactly

**Types not working?**
- Run `npm run generate:types`
- Restart your IDE

---

**Ready?** Start with Step 1 and you'll have your homepage running in 10 minutes! 🚀