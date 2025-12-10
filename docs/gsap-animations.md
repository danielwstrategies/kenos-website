# GSAP Animation Implementation Guide

## The Problem
When using Server-Side Rendering (Next.js/Payload), content loads visible, then JavaScript animates it - causing a flash of content before animations play.

## The Solution
Use CSS classes to hide elements initially, then GSAP animates them in.

---

## How It Works

### 1. CSS Classes (in `globals.css`)

```css
.gsap-fade-in {
  opacity: 0;
}

.gsap-fade-up {
  opacity: 0;
  transform: translateY(20px);
}

.gsap-fade-left {
  opacity: 0;
  transform: translateX(-30px);
}

.gsap-fade-right {
  opacity: 0;
  transform: translateX(30px);
}

.gsap-scale {
  opacity: 0;
  transform: scale(0.9);
}
```

### 2. Add Classes to HTML Elements

```tsx
<h1 className="gsap-fade-up">Heading</h1>
<p className="gsap-fade-up">Text</p>
<div className="gsap-scale">Photo</div>
<div className="gsap-fade-left">Image on left</div>
<div className="gsap-fade-right">Image on right</div>
```

### 3. Animate with GSAP

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.gsap-fade-up', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    })
  })

  return () => ctx.revert()
}, [])
```

---

## Key Points

- **CSS hides elements immediately** when page loads
- **GSAP animates them in** when ready
- **No flash of visible content**
- Use `gsap.to()` not `gsap.from()` when using CSS classes
- Always clean up with `ctx.revert()`

---

## For Scroll Animations

Add ScrollTrigger:

```tsx
gsap.to('.gsap-fade-up', {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
  y: 0,
  opacity: 1,
  duration: 0.6,
  ease: 'power3.out',
})
```

---

## Files Modified

- `src/app/globals.css` - Added CSS classes
- `src/components/blocks/FirstMateHero.tsx` - Hero animations
- `src/components/blocks/ImageTextSection.tsx` - Scroll animations
- `src/components/blocks/ServicesGrid.tsx` - Grid animations
- `src/components/blocks/ScheduleSection.tsx` - Section animations
- `src/app/(frontend)/about/page.tsx` - About page animations
## Related Documentation

- **Lottie Animations**: [lottie-troubleshooting.md](./lottie-troubleshooting.md)
- **Styling Guide**: [styling-guide.md](./styling-guide.md)
- **Quick Start**: [setup.md](./setup.md)
- **All Docs**: [index.md](./index.md)
