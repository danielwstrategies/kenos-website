# First Mate Website - Styling Guide

**Brand:** First Mate Consulting  
**Framework:** Tailwind CSS 3.4.17  
**Theme:** Custom brand color palette

---

## 📁 Files to Edit

### Component Files (Individual Sections)

| Component | File Path | What It Controls |
|-----------|-----------|------------------|
| **Hero Section** | `src/components/blocks/FirstMateHero.tsx` | Main hero with heading, subheading, CTA |
| **Strategy/Guidance** | `src/components/blocks/ImageTextSection.tsx` | Sections with Lottie animations |
| **Services Grid** | `src/components/blocks/ServicesGrid.tsx` | 3-column service cards |
| **Schedule Section** | `src/components/blocks/ScheduleSection.tsx` | Bottom CTA section |
| **Navigation** | `src/components/Navigation.tsx` | Top navigation bar |
| **Footer** | `src/components/Footer.tsx` | Bottom footer |

### Global Configuration Files

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Colors, fonts, spacing, animations |
| `src/app/globals.css` | Custom CSS, Tailwind base styles |
| `src/app/(frontend)/layout.tsx` | Page-wide layout settings |

---

## 🎨 Brand Colors

### Tailwind Config Colors
**File:** `tailwind.config.js`

```javascript
colors: {
  primary: {
    DEFAULT: '#6c9dff',
    light: '#8fb3ff',
    dark: '#5588ff',
  },
  secondary: {
    DEFAULT: '#2f74ff',
    light: '#4d8aff',
    dark: '#1a5ee6',
  },
  accent: {
    DEFAULT: '#0055ff',
    light: '#3377ff',
    dark: '#0044cc',
  },
}
```

### Usage in Components

```jsx
// Primary color
<button className="bg-primary hover:bg-primary-dark">Button</button>

// Secondary color
<div className="text-secondary border-secondary-light">Content</div>

// Accent color
<a className="text-accent hover:text-accent-dark">Link</a>
```

### Custom Brand Colors (To Add)

If you want to add project-specific colors, edit `tailwind.config.js`:

```javascript
colors: {
  brand: {
    purple: '#7B68EE',      // Example brand purple
    teal: '#20B2AA',        // Example brand teal
    coral: '#FF6B6B',       // Example brand coral
    navy: '#1A237E',        // Example brand navy
    mint: '#98D8C8',        // Example brand mint
  },
}
```

Then use: `bg-brand-purple`, `text-brand-teal`, etc.

---

## 📝 Common Styling Tasks

### 1. Change Hero Section Background

**File:** `src/components/blocks/FirstMateHero.tsx`

**Current (Line ~20):**
```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-100">
```

**Options:**
```jsx
// White background
bg-white

// Light blue background
bg-blue-50

// Gradient background
bg-gradient-to-br from-blue-50 to-purple-50

// Custom brand color
bg-brand-mint
```

### 2. Change Heading Colors

**File:** `src/components/blocks/FirstMateHero.tsx`

**Current (Line ~34):**
```jsx
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-neutral-900 whitespace-pre-line">
```

**Options:**
```jsx
// Primary blue
text-primary

// Custom color
text-brand-navy

// Gradient text
bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent
```

### 3. Change Strategy/Guidance Section Backgrounds

**File:** `src/components/blocks/ImageTextSection.tsx`

**Current (Line ~69):**
```jsx
const bgClass = backgroundColor === 'gray' ? 'bg-neutral-100' : 'bg-white'
```

**To customize, edit this line:**
```jsx
// Add more background options
const bgClass = 
  backgroundColor === 'gray' ? 'bg-neutral-100' : 
  backgroundColor === 'blue' ? 'bg-blue-50' : 
  backgroundColor === 'purple' ? 'bg-purple-50' : 
  'bg-white'
```

Then update in admin panel or seed script with `backgroundColor: 'blue'`

### 4. Change Section Spacing

**Global spacing classes:**
```jsx
// Padding
p-4    // 1rem (16px)
p-8    // 2rem (32px)
p-12   // 3rem (48px)
py-20  // Vertical padding 5rem (80px)

// Margins
mb-6   // Bottom margin 1.5rem
mt-16  // Top margin 4rem

// Gaps (between grid items)
gap-12    // 3rem
gap-20    // 5rem
```

**Example - Increase section padding:**
```jsx
// Find in any component:
<section className="section">

// Change to:
<section className="section py-32"> // More vertical padding
```

### 5. Change Font Sizes

**Tailwind text sizes:**
```jsx
text-sm    // 0.875rem (14px)
text-base  // 1rem (16px)
text-lg    // 1.125rem (18px)
text-xl    // 1.25rem (20px)
text-2xl   // 1.5rem (24px)
text-3xl   // 1.875rem (30px)
text-4xl   // 2.25rem (36px)
text-5xl   // 3rem (48px)
text-6xl   // 3.75rem (60px)
text-7xl   // 4.5rem (72px)
```

**Example - Make hero heading larger:**
```jsx
// Current
<h1 className="text-5xl md:text-6xl lg:text-7xl">

// Larger
<h1 className="text-6xl md:text-7xl lg:text-8xl">
```

### 6. Add Custom Animations

**File:** `tailwind.config.js`

**Already included:**
```javascript
animation: {
  'fade-in': 'fadeIn 0.4s ease-in',
  'slide-up': 'slideUp 0.4s ease-out',
  'scale-in': 'scaleIn 0.3s ease-out',
}
```

**Usage in components:**
```jsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-up">Slides up</div>
<div className="animate-scale-in">Scales in</div>
```

**Add new animation:**
```javascript
// In tailwind.config.js
animation: {
  'bounce-slow': 'bounce 3s infinite',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

### 7. Change Button Styles

**Global button classes are in:** `src/app/globals.css`

**Current button classes:**
```css
.btn {
  @apply px-6 py-3 rounded-lg font-medium transition-all duration-300;
}

.btn-primary {
  @apply bg-primary hover:bg-primary-dark text-white;
}
```

**To customize, edit `globals.css`:**
```css
.btn-primary {
  @apply bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg hover:shadow-xl;
}

.btn-outline {
  @apply border-2 border-primary text-primary hover:bg-primary hover:text-white;
}

.btn-primary {
  @apply bg-brand-purple hover:bg-brand-navy text-white rounded-full px-8 py-4;
}
```

### 8. Change Navigation Style

**File:** `src/components/Navigation.tsx`

**Common customizations:**
```jsx
// Background color (find the nav element)
<nav className="bg-white">           // Current
<nav className="bg-neutral-100">     // Light gray
<nav className="bg-primary">         // Blue background
<nav className="bg-transparent">     // Transparent

// Make sticky
<nav className="sticky top-0 z-50">

// Add shadow
<nav className="shadow-lg">

// Add backdrop blur
<nav className="backdrop-blur-lg bg-white/90">
```

---

## 🎯 Quick Recipes

### Recipe 1: Purple Gradient Hero
```jsx
// src/components/blocks/FirstMateHero.tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50">

<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
```

### Recipe 2: Card-Style Services
```jsx
// src/components/blocks/ServicesGrid.tsx
// Add to each service card div:
className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
```

### Recipe 3: Dark Mode Section
```jsx
// Any section component:
<section className="bg-neutral-900 text-white py-20">
  <h2 className="text-white">Dark Section</h2>
  <p className="text-neutral-300">Description text</p>
</section>
```

### Recipe 4: Glassmorphism Effect
```jsx
<div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl">
  Content here
</div>
```

### Recipe 5: Colorful Section Dividers
```jsx
// Between sections:
<div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
```

---

## 📐 Layout Utilities

### Container Classes
```jsx
container-custom    // Max-width container (defined in globals.css)
max-w-4xl         // Max width 56rem
max-w-6xl         // Max width 72rem
mx-auto           // Center horizontally
```

### Grid Layouts
```jsx
// 2 columns
<div className="grid md:grid-cols-2 gap-8">

// 3 columns
<div className="grid md:grid-cols-3 gap-6">

// 4 columns
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

// Responsive columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Flexbox Layouts
```jsx
// Center content
<div className="flex items-center justify-center">

// Space between items
<div className="flex justify-between items-center">

// Vertical stack with gap
<div className="flex flex-col gap-4">

// Horizontal with wrap
<div className="flex flex-wrap gap-6">
```

---

## 🎨 Color Palette Reference

### Neutral Colors
```jsx
bg-white          // #FFFFFF
bg-neutral-50     // #FFFFFF (lightest)
bg-neutral-100    // #FFFFF9 (very light)
bg-neutral-200    // #F5F5F5
bg-neutral-300    // #E5E5E5
bg-neutral-400    // #D4D4D4
bg-neutral-500    // #A3A3A3
bg-neutral-600    // #666666
bg-neutral-700    // #525252
bg-neutral-800    // #262626
bg-neutral-900    // #000000 (darkest)
```

### Primary Colors
```jsx
bg-primary        // #6c9dff
bg-primary-light  // #8fb3ff
bg-primary-dark   // #5588ff
```

### Text Colors
```jsx
text-neutral-900  // Dark text (headings)
text-neutral-600  // Medium text (body)
text-neutral-400  // Light text (subtle)
text-primary      // Brand blue
text-white        // White
```

---

## 🔄 Responsive Design

### Breakpoints
```jsx
// Mobile first (default)
<div className="text-sm">        // All screens

// Tablet and up
<div className="md:text-base">   // ≥768px

// Desktop and up
<div className="lg:text-lg">     // ≥1024px

// Large desktop
<div className="xl:text-xl">     // ≥1280px
```

### Responsive Example
```jsx
<div className="
  text-2xl           // Mobile: 24px
  md:text-4xl        // Tablet: 36px
  lg:text-5xl        // Desktop: 48px
  px-4               // Mobile: 1rem padding
  md:px-8            // Tablet: 2rem padding
  lg:px-12           // Desktop: 3rem padding
">
  Responsive Text
</div>
```

---

## ⚡ Performance Tips

1. **Avoid Custom CSS when possible** - Use Tailwind utilities
2. **Purge unused styles** - Already configured in production builds
3. **Use CSS variables for colors** - Makes theme switching easier
4. **Minimize custom @apply** - Direct utilities are faster

---

## 🛠 Development Workflow

### 1. Edit Component
```bash
# Open component file
code src/components/blocks/FirstMateHero.tsx

# Make changes to className attributes
# Save file - changes auto-reload
```

### 2. See Changes Live
```bash
# Server running: npm run dev
# Visit: http://localhost:3011
# Changes appear immediately
```

### 3. Add Custom Colors
```bash
# Edit tailwind.config.js
# Add to colors: { brand: { ... } }
# Restart dev server: Ctrl+C, then npm run dev
```

### 4. Test Responsive
```bash
# In browser (F12)
# Toggle device toolbar
# Test different screen sizes
```

---

## 📚 Common Tailwind Classes

### Spacing
```jsx
p-4, p-8, p-12        // Padding
px-4, py-8            // Horizontal/Vertical padding
m-4, m-8, m-12        // Margin
mt-4, mb-8            // Top/Bottom margin
space-y-4             // Gap between children
gap-6                 // Grid/Flex gap
```

### Typography
```jsx
font-bold, font-medium, font-light
text-center, text-left, text-right
leading-tight, leading-relaxed
tracking-wide, tracking-tight
uppercase, lowercase, capitalize
```

### Borders & Shadows
```jsx
border, border-2, border-4
border-neutral-200, border-primary
rounded, rounded-lg, rounded-full
shadow, shadow-lg, shadow-2xl
ring-2, ring-primary
```

### Flexbox & Grid
```jsx
flex, flex-col, flex-row
items-center, items-start, items-end
justify-center, justify-between, justify-around
grid, grid-cols-2, grid-cols-3
gap-4, gap-8, gap-12
```

### Effects
```jsx
hover:bg-primary
hover:scale-105
hover:shadow-lg
transition-all
duration-300
opacity-50
backdrop-blur-lg
```

---

## 🎯 Next Steps

1. **Explore Components** - Look at existing component files
2. **Experiment** - Try changing classes and see what happens
3. **Use DevTools** - Inspect elements to see applied styles
4. **Reference Tailwind Docs** - https://tailwindcss.com/docs
5. **Create Custom Components** - Build reusable styled components

---

## 📖 Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Tailwind Colors:** https://tailwindcss.com/docs/customizing-colors
- **Tailwind Cheat Sheet:** https://nerdcave.com/tailwind-cheat-sheet
- **Component Examples:** https://tailwindui.com/components

---

**Need Help?** Check the component files to see real examples of Tailwind classes in use!
## Related Documentation

- **Quick Start**: [setup.md](./setup.md)
- **Blocks Reference**: [blocks-reference.md](./blocks-reference.md)
- **GSAP Animations**: [gsap-animations.md](./gsap-animations.md)
- **All Docs**: [index.md](./index.md)
