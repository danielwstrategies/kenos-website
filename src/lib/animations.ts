'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Default animation settings
const defaults = {
  duration: 0.8,
  ease: 'power3.out',
}

// Fade in from bottom
export const fadeInUp = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      y: 40 
    },
    {
      opacity: 1,
      y: 0,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options,
    }
  )
}

// Fade in from left
export const fadeInLeft = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      x: -40 
    },
    {
      opacity: 1,
      x: 0,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options,
    }
  )
}

// Fade in from right
export const fadeInRight = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      x: 40 
    },
    {
      opacity: 1,
      x: 0,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options,
    }
  )
}

// Simple fade in
export const fadeIn = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options,
    }
  )
}

// Scale in with fade
export const scaleIn = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      scale: 0.9 
    },
    {
      opacity: 1,
      scale: 1,
      duration: defaults.duration,
      ease: 'back.out(1.2)',
      ...options,
    }
  )
}

// Stagger children animation
export const staggerFadeInUp = (parent: string | Element | null, childSelector: string, options?: gsap.TweenVars) => {
  if (!parent) return
  return gsap.fromTo(
    `${parent} ${childSelector}`,
    { 
      opacity: 0, 
      y: 30 
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: defaults.ease,
      stagger: 0.1,
      ...options,
    }
  )
}

// Create scroll-triggered animation
export const scrollTriggerFadeInUp = (
  element: string | Element | null, 
  options?: gsap.TweenVars & { trigger?: string | Element }
) => {
  if (!element) return
  const trigger = options?.trigger || element
  
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      y: 50 
    },
    {
      opacity: 1,
      y: 0,
      duration: defaults.duration,
      ease: defaults.ease,
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  )
}

// Create scroll-triggered scale animation
export const scrollTriggerScaleIn = (
  element: string | Element | null, 
  options?: gsap.TweenVars & { trigger?: string | Element }
) => {
  if (!element) return
  const trigger = options?.trigger || element
  
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      scale: 0.85 
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  )
}

// Parallax effect on scroll
export const parallax = (element: string | Element | null, speed: number = 0.5) => {
  if (!element) return
  return gsap.to(element, {
    y: () => window.innerHeight * speed * -1,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Text reveal animation (character by character)
export const textReveal = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { 
      opacity: 0,
      y: 20,
      clipPath: 'inset(100% 0% 0% 0%)',
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      ease: 'power4.out',
      ...options,
    }
  )
}

// Hero specific animation timeline
export const heroAnimation = (refs: {
  heading?: Element | null
  subtext?: Element | null
  buttons?: Element | null
  backgroundImage?: Element | null
}) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  if (refs.backgroundImage) {
    tl.fromTo(
      refs.backgroundImage,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2 },
      0
    )
  }
  
  if (refs.heading) {
    tl.fromTo(
      refs.heading,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      0.3
    )
  }
  
  if (refs.subtext) {
    tl.fromTo(
      refs.subtext,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.6
    )
  }
  
  if (refs.buttons) {
    tl.fromTo(
      refs.buttons,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.9
    )
  }
  
  return tl
}

// Clean up ScrollTrigger instances
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Refresh ScrollTrigger (useful after dynamic content changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}
