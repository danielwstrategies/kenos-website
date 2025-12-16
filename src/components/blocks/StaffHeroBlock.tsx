'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaffHeroBlockProps {
  block: {
    heading?: string
    headingLogo?: {
      url?: string
      alt?: string
    }
    subheading?: string
    content?: string
    backgroundImage?: {
      url?: string
      alt?: string
    }
    overlayImage?: {
      url?: string
      alt?: string
    }
    primaryButton?: {
      text?: string
      link?: string
    }
    secondaryButton?: {
      text?: string
      link?: string
    }
    sectionBackground?: 'none' | 'beige' | 'white'
  }
}

export default function StaffHeroBlock({ block }: StaffHeroBlockProps) {
  const {
    heading = 'Our',
    headingLogo,
    subheading = 'Family',
    content,
    backgroundImage,
    overlayImage,
    primaryButton,
    secondaryButton,
    sectionBackground = 'none',
  } = block

  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayImageRef = useRef<HTMLDivElement>(null)

  // Map background options to colors
  const backgroundColors: Record<string, string> = {
    none: 'transparent',
    beige: '#F0E3D9',
    white: '#FFFFFF',
  }

  // Add padding when background is visible
  const hasSectionBg = sectionBackground !== 'none'

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Animate content
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }

    // Animate overlay image
    if (overlayImageRef.current) {
      tl.fromTo(
        overlayImageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      className={`relative ${hasSectionBg ? 'px-2 lg:px-4 pt-2 lg:pt-4 pb-2 lg:pb-4' : ''}`}
      style={{ backgroundColor: backgroundColors[sectionBackground] }}
    >
      <section
        ref={containerRef}
        className="relative overflow-visible"
      >
        {/* Background Image */}
        {backgroundImage?.url && (
          <div className={`absolute inset-0 z-0 rounded-2xl overflow-hidden ${hasSectionBg ? '' : 'mx-2 lg:mx-4 mt-2 lg:mt-4'}`}>
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || 'Background'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-10 lg:px-16 pt-24 lg:pt-48 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div ref={contentRef} className="max-w-full lg:max-w-lg opacity-0 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Heading with Logo */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 lg:gap-4 mb-4 lg:mb-6 max-w-full">
                <span className="font-yeseva text-2xl lg:text-5xl text-white whitespace-nowrap">
                  {heading}
                </span>
                {headingLogo?.url ? (
                  <Image
                    src={headingLogo.url}
                    alt={headingLogo.alt || "Keno's"}
                    width={180}
                    height={90}
                    className="h-8 lg:h-16 w-auto flex-shrink-0"
                  />
                ) : (
                  <Image
                    src="/media/kenos-logo.png"
                    alt="Keno's"
                    width={180}
                    height={90}
                    className="h-8 lg:h-16 w-auto flex-shrink-0"
                  />
                )}
                <span className="font-yeseva text-2xl lg:text-5xl text-white whitespace-nowrap">
                  {subheading}
                </span>
              </div>

              {/* Content */}
              {content && (
                <p className="font-montserrat text-xs lg:text-base text-white/90 mb-6 lg:mb-8 leading-relaxed max-w-full">
                  {content}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
                {primaryButton?.text && primaryButton?.link && (
                  <Link href={primaryButton.link} className="kenos-btn-primary text-sm lg:text-base">
                    {primaryButton.text}
                  </Link>
                )}
                {secondaryButton?.text && secondaryButton?.link && (
                  <Link href={secondaryButton.link} className="kenos-btn-secondary text-sm lg:text-base">
                    {secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>

            {/* Overlay Image - below content on mobile/tablet, right side on desktop */}
            {overlayImage?.url && (
              <div
                ref={overlayImageRef}
                className="flex justify-center -mb-12 lg:justify-end opacity-0 relative z-[100]
          "
              >
                <div
                  className="relative w-[200px] lg:w-[400px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
                  style={{ border: '5px solid #DB0A1A' }}
                >
                  <Image
                    src={overlayImage.url}
                    alt={overlayImage.alt || 'Staff photo'}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
