# Pages Collection Guide

This guide explains how to use the Pages collection in Payload CMS to build your restaurant homepage based on your Figma design.

## Overview

The Pages collection uses a flexible **block-based layout system** that allows you to build custom pages by combining different content blocks. This approach gives you maximum flexibility while maintaining consistency.

## Available Content Blocks

### 1. Hero Section
The main banner at the top of your page.

**Fields:**
- **Heading**: Main headline (e.g., "Welcome to Keno's Restaurant")
- **Subheading**: Supporting text below the headline
- **Background Image**: Full-width hero image
- **Primary Button**: Main call-to-action (text + link)
- **Secondary Button**: Secondary action (text + link)

**Example Use:**
```
Heading: "Authentic Cuisine, Unforgettable Experience"
Subheading: "Discover the finest flavors in town, crafted with passion and served with love"
Primary Button: "View Menu" → "/menu"
Secondary Button: "Reserve Table" → "/reservations"
```

### 2. About Section
Tell your restaurant's story.

**Fields:**
- **Title**: Section heading
- **Subtitle**: Optional subtitle
- **Content**: Rich text content about your restaurant
- **Image**: Supporting image
- **Image Position**: Left or Right
- **Features**: Array of feature items with icons, titles, and descriptions

**Example Use:**
```
Title: "Our Story"
Content: "Since 2010, Keno's has been serving..."
Features:
  - Icon: "🍳" Title: "Fresh Ingredients" Description: "Locally sourced, daily fresh"
  - Icon: "👨‍🍳" Title: "Expert Chefs" Description: "Over 20 years of experience"
```

### 3. Menu Highlights
Showcase your best dishes.

**Fields:**
- **Title**: Section heading
- **Subtitle**: Optional subtitle
- **Items**: Array of menu items
  - Name
  - Description
  - Price
  - Image
  - Category (Appetizer, Main Course, Dessert, etc.)
  - Featured checkbox

**Example Use:**
```
Title: "Signature Dishes"
Items:
  - Name: "Grilled Salmon"
    Description: "Fresh Atlantic salmon with herbs"
    Price: "$24.99"
    Category: "Main Course"
    Featured: Yes
```

### 4. Gallery Section
Display photos of your restaurant, food, or ambiance.

**Fields:**
- **Title**: Section heading
- **Subtitle**: Optional subtitle
- **Images**: Array of images with captions
- **Layout**: Grid, Masonry, or Carousel

**Example Use:**
```
Title: "Our Atmosphere"
Layout: Grid
Images: [array of restaurant photos with captions]
```

### 5. Testimonials Section
Show customer reviews and ratings.

**Fields:**
- **Title**: Section heading
- **Subtitle**: Optional subtitle
- **Testimonials**: Array of testimonials
  - Quote
  - Author
  - Role (e.g., "Food Critic", "Regular Customer")
  - Avatar image
  - Rating (1-5 stars)

**Example Use:**
```
Quote: "The best Italian food outside of Italy!"
Author: "Sarah Johnson"
Role: "Food Blogger"
Rating: 5
```

### 6. Contact Section
Display contact information and location.

**Fields:**
- **Title**: Section heading
- **Address**: Full address
- **Phone**: Phone number
- **Email**: Email address
- **Hours**: Array of day/hours pairs
- **Map Embed**: Google Maps embed code
- **Show Contact Form**: Toggle contact form display

**Example Use:**
```
Address: "123 Main Street, City, State 12345"
Phone: "(555) 123-4567"
Hours:
  - Day: "Monday - Friday" Hours: "11:00 AM - 10:00 PM"
  - Day: "Saturday - Sunday" Hours: "10:00 AM - 11:00 PM"
```

### 7. Content Block
Flexible rich text content for any purpose.

**Fields:**
- **Title**: Optional heading
- **Content**: Rich text editor
- **Background Color**: White, Light Gray, Dark, or Primary Color

### 8. Call to Action (CTA)
Encourage specific user actions.

**Fields:**
- **Heading**: Main CTA text
- **Description**: Supporting text
- **Button**: Text and link
- **Background Image**: Optional background
- **Style**: Centered, Left, or Right aligned

**Example Use:**
```
Heading: "Ready to Dine?"
Description: "Reserve your table today and experience culinary excellence"
Button: "Make Reservation" → "/reservations"
```

## Creating the Homepage

### Step 1: Access Admin Panel
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. Log in with your admin credentials

### Step 2: Create Home Page
1. Click on **Pages** in the sidebar
2. Click **Create New**
3. Fill in the basic fields:
   - **Title**: "Home"
   - **Slug**: "home" (this will be auto-formatted)
   - **Status**: Draft (change to Published when ready)

### Step 3: Build Your Layout
Based on typical restaurant homepages, add blocks in this order:

1. **Hero Section**
   - Add your main banner image
   - Write your welcome headline
   - Add "View Menu" and "Reserve Table" buttons

2. **About Section**
   - Tell your restaurant's story
   - Add restaurant interior photo
   - Include 3-4 key features

3. **Menu Highlights**
   - Showcase 6-8 signature dishes
   - Add appetizing food photos
   - Include prices and descriptions

4. **Gallery Section**
   - Add 8-12 photos of food, ambiance, and team
   - Use Grid layout for consistency

5. **Testimonials Section**
   - Add 3-5 customer reviews
   - Include star ratings
   - Add customer photos if available

6. **Call to Action**
   - Encourage reservations
   - Add background image
   - Link to booking system

7. **Contact Section**
   - Add full address and contact info
   - Include operating hours
   - Embed Google Maps
   - Enable contact form

### Step 4: Configure SEO
Scroll to the **SEO & Meta** section:
- **Title**: "Keno's Restaurant | Authentic Cuisine & Fine Dining"
- **Description**: "Experience the finest dining at Keno's Restaurant. Fresh ingredients, expert chefs, and unforgettable flavors. Reserve your table today!"
- **Keywords**: "restaurant, fine dining, Italian cuisine, local restaurant"
- **Image**: Upload your restaurant logo or hero image

### Step 5: Publish
1. Change **Status** to "Published"
2. Click **Save**

## Uploading Media

### Before Adding Content Blocks
1. Go to **Media** in the sidebar
2. Click **Upload**
3. Upload all images you need:
   - Hero background
   - Food photos
   - Restaurant interior/exterior
   - Team photos
   - Logo
4. For each image, add:
   - **Alt text** (required for accessibility)
   - **Caption** (optional)

### Image Recommendations
- **Hero**: 1920x1080px minimum, landscape orientation
- **Food Photos**: 800x600px minimum, landscape
- **Gallery**: 600x600px minimum, square works well
- **Testimonial Avatars**: 200x200px, square

## Frontend Integration

Once you've created your homepage, you'll need to create Next.js components to render each block type.

### Example API Request
```javascript
// Fetch homepage data
const response = await fetch('http://localhost:3000/api/pages?where[slug][equals]=home')
const data = await response.json()
const homePage = data.docs[0]

// Access layout blocks
homePage.layout.forEach(block => {
  switch(block.blockType) {
    case 'hero':
      // Render hero component
      break
    case 'about':
      // Render about component
      break
    // ... etc
  }
})
```

### Suggested Component Structure
```
src/
  components/
    blocks/
      Hero.tsx
      About.tsx
      MenuHighlights.tsx
      Gallery.tsx
      Testimonials.tsx
      Contact.tsx
      Content.tsx
      CTA.tsx
    Page.tsx (renders all blocks)
```

## Tips & Best Practices

1. **Content First**: Write your content before adding blocks
2. **Image Optimization**: Use compressed, web-optimized images
3. **Mobile Responsive**: Design with mobile users in mind
4. **SEO**: Always fill in alt text and meta descriptions
5. **Testing**: Use "Draft" status while building, "Published" when ready
6. **Consistent Spacing**: Use similar block arrangements across pages
7. **Call to Actions**: Include clear CTAs throughout the page

## Next Steps

1. ✅ Pages collection created
2. ✅ Media collection for uploads ready
3. 📝 Create your homepage content
4. 🎨 Build frontend components to render the blocks
5. 🚀 Style components to match your Figma design
6. ✨ Launch your website!

## Need Help?

- Check Payload documentation: https://payloadcms.com/docs
- Review the collection file: `src/collections/Pages.ts`
- Look at the auto-generated types: `src/payload-types.ts`

---

**Ready to get started?** Head to the admin panel and create your first page!