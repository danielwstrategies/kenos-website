# Block Types Reference

Quick reference for all available content blocks in the Pages collection.

## Overview

This guide documents the 8 block types available for building pages in Payload CMS.

---

## 🎯 Hero Section
**Block Type:** `hero`

Perfect for: Homepage header, landing page banners

| Field | Type | Description |
|-------|------|-------------|
| heading | Text | Main headline text |
| subheading | Textarea | Supporting text below headline |
| backgroundImage | Upload | Full-width hero background image |
| primaryButton | Group | Main CTA (text + link) |
| secondaryButton | Group | Secondary CTA (text + link) |

**Example:**
```json
{
  "blockType": "hero",
  "heading": "Welcome to Keno's Restaurant",
  "subheading": "Experience authentic flavors...",
  "primaryButton": { "text": "View Menu", "link": "/menu" }
}
```

---

## 📖 About Section
**Block Type:** `about`

Perfect for: Restaurant story, company info, mission statement

| Field | Type | Description |
|-------|------|-------------|
| title | Text | Section heading |
| subtitle | Text | Optional subtitle |
| content | RichText | Main content with formatting |
| image | Upload | Supporting image |
| imagePosition | Select | left \| right |
| features | Array | List of feature items with icon, title, description |

**Example:**
```json
{
  "blockType": "about",
  "title": "Our Story",
  "imagePosition": "right",
  "features": [
    {
      "icon": "🍳",
      "title": "Fresh Ingredients",
      "description": "Locally sourced daily"
    }
  ]
}
```

---

## 🍽️ Menu Highlights
**Block Type:** `menuHighlights`

Perfect for: Featured dishes, menu showcase, food gallery

| Field | Type | Description |
|-------|------|-------------|
| title | Text | Section heading |
| subtitle | Text | Optional subtitle |
| items | Array | Menu items with details |

**Item Fields:**
- name (Text, required)
- description (Textarea)
- price (Text)
- image (Upload)
- category (Text) - e.g., "Appetizer", "Main Course"
- featured (Checkbox)

**Example:**
```json
{
  "blockType": "menuHighlights",
  "title": "Signature Dishes",
  "items": [
    {
      "name": "Grilled Salmon",
      "description": "Fresh Atlantic salmon...",
      "price": "$28.99",
      "category": "Main Course",
      "featured": true
    }
  ]
}
```

---

## 🖼️ Gallery Section
**Block Type:** `gallery`

Perfect for: Photo galleries, ambiance showcase, food photography

| Field | Type | Description |
|-------|------|-------------|
| title | Text | Section heading |
| subtitle | Text | Optional subtitle |
| images | Array | Image items with captions |
| layout | Select | grid \| masonry \| carousel |

**Image Item Fields:**
- image (Upload, required)
- caption (Text)

**Example:**
```json
{
  "blockType": "gallery",
  "title": "Our Atmosphere",
  "layout": "grid",
  "images": [
    {
      "image": "restaurant-interior.jpg",
      "caption": "Our elegant dining room"
    }
  ]
}
```

---

## 💬 Testimonials Section
**Block Type:** `testimonials`

Perfect for: Customer reviews, social proof, ratings

| Field | Type | Description |
|-------|------|-------------|
| title | Text | Section heading |
| subtitle | Text | Optional subtitle |
| testimonials | Array | Customer testimonials |

**Testimonial Fields:**
- quote (Textarea, required)
- author (Text, required)
- role (Text) - e.g., "Food Critic", "Regular Customer"
- avatar (Upload)
- rating (Number, 1-5)

**Example:**
```json
{
  "blockType": "testimonials",
  "title": "What Our Guests Say",
  "testimonials": [
    {
      "quote": "Best food in town!",
      "author": "Sarah Mitchell",
      "role": "Food Critic",
      "rating": 5
    }
  ]
}
```

---

## 📍 Contact Section
**Block Type:** `contact`

Perfect for: Contact info, location details, business hours

| Field | Type | Description |
|-------|------|-------------|
| title | Text | Section heading |
| subtitle | Text | Optional subtitle |
| address | Textarea | Full address |
| phone | Text | Phone number |
| email | Email | Email address |
| hours | Array | Day/hours pairs |
| mapEmbed | Textarea | Google Maps embed code/URL |
| showContactForm | Checkbox | Toggle contact form display |

**Hours Fields:**
- day (Text, required)
- hours (Text, required)

**Example:**
```json
{
  "blockType": "contact",
  "title": "Visit Us",
  "address": "123 Main Street\nCity, State 12345",
  "phone": "(555) 123-4567",
  "hours": [
    { "day": "Monday - Friday", "hours": "11:00 AM - 10:00 PM" }
  ],
  "showContactForm": true
}
```

---

## 📝 Content Block
**Block Type:** `content`

Perfect for: Flexible text content, announcements, additional info

| Field | Type | Description |
|-------|------|-------------|
| title | Text | Optional heading |
| content | RichText | Rich text editor content |
| backgroundColor | Select | white \| light-gray \| dark \| primary |

**Example:**
```json
{
  "blockType": "content",
  "title": "Special Announcement",
  "content": "<p>Join us for our annual...</p>",
  "backgroundColor": "light-gray"
}
```

---

## 🎯 Call to Action (CTA)
**Block Type:** `cta`

Perfect for: Reservation prompts, special offers, action drivers

| Field | Type | Description |
|-------|------|-------------|
| heading | Text | Main CTA text (required) |
| description | Textarea | Supporting text |
| button | Group | Button text + link (required) |
| backgroundImage | Upload | Optional background image |
| style | Select | centered \| left \| right |

**Example:**
```json
{
  "blockType": "cta",
  "heading": "Ready to Dine?",
  "description": "Reserve your table today",
  "button": {
    "text": "Make Reservation",
    "link": "/reservations"
  },
  "style": "centered"
}
```

---

## 📊 Typical Homepage Structure

Here's a recommended block order for a restaurant homepage:

1. **Hero** - Welcome banner with main CTA
2. **About** - Restaurant story and features
3. **Menu Highlights** - Showcase signature dishes
4. **Gallery** - Photos of food and ambiance
5. **Testimonials** - Customer reviews
6. **CTA** - Encourage reservations
7. **Contact** - Location and contact info

---

## 🎨 Block Usage Tips

### Hero Section
- Use high-quality, appetizing images (min 1920x1080px)
- Keep headline short and compelling (5-10 words)
- Include clear primary CTA ("View Menu", "Reserve Table")

### About Section
- Tell your story in 2-3 paragraphs
- Use 3-4 features maximum
- Choose emoji or icon names that are simple (🍳, 👨‍🍳, ❤️)

### Menu Highlights
- Feature 6-8 best dishes
- Use professional food photography
- Mark 3-4 items as "featured"
- Include clear pricing

### Gallery
- Use 8-12 high-quality images
- Mix food, interior, and atmosphere shots
- Add descriptive captions
- Grid layout works best for consistency

### Testimonials
- Include 3-5 reviews
- Use real names and roles
- Add avatar photos if possible
- 5-star ratings boost credibility

### Contact
- Include all contact methods
- Add Google Maps embed for easy navigation
- List accurate business hours
- Enable contact form for inquiries

### CTA
- Use action-oriented language
- Place strategically (middle and end of page)
- Include compelling background images
- Make button text clear and specific

---

## 🔄 Block Reusability

All blocks are reusable! You can:
- Add multiple instances of the same block type
- Rearrange blocks by dragging in the admin panel
- Use different configurations for different pages
- Mix and match to create unique layouts

---

## 🚀 Next Steps

1. **Upload Media First**: Add all images to Media collection before building pages
2. **Start with Hero**: Create the most important block first
3. **Build Incrementally**: Add one block at a time and preview
4. **Use Drafts**: Keep status as "draft" until ready to publish
5. **Test Mobile**: Consider how blocks will look on mobile devices

---

## Related Documentation

- **Quick Start**: [setup.md](./setup.md)
- **Styling Guide**: [styling-guide.md](./styling-guide.md)
- **Deployment**: [deployment-quickstart.md](./deployment-quickstart.md)
- **All Docs**: [index.md](./index.md)

## Resources

- **Collection File**: `src/collections/Pages.ts`
- **Payload Docs**: https://payloadcms.com/docs