'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

interface HistoryHeroBlockProps {
  block: {
    heading: string
    content?: string
    backgroundImage?: any
    overlayImage?: any
  }
}

export default function HistoryHeroBlock({ block }: HistoryHeroBlockProps) {
  const { heading, content, backgroundImage, overlayImage } = block
  
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayImageRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)

  const bgImageUrl = backgroundImage?.url || '/images/kenos-exterior.jpg'
  const overlayImageUrl = overlayImage?.url

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(
      backgroundImageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2 }
    )
    .fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      overlayImageRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative min-h-[500px] md:min-h-[550px] flex items-center overflow-visible pb-32 md:pb-0">
        {/* Background Image with Overlay */}
        <div ref={backgroundImageRef} className="absolute inset-0 z-0 opacity-0">
          <Image
            src={bgImageUrl}
            alt="History background"
            fill
            className="object-cover"
            priority
          />
          {/* Warm brown/sepia gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5D3A1A]/80 via-[#8B5A2B]/70 to-[#A0522D]/60" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start pt-8 md:pt-16">
            {/* Left side - Overlay Image (hanging below) */}
            <div 
              ref={overlayImageRef}
              className="relative opacity-0 order-2 md:order-1"
            >
              {overlayImageUrl && (
                <div className="relative w-full max-w-md mx-auto md:mx-0">
                  {/* Single image with frame effect */}
                  <div className="relative aspect-[4/3] md:translate-y-20 lg:translate-y-28 rounded-md overflow-hidden shadow-2xl border-[6px] border-white/30">
                    <Image
                      src={overlayImageUrl}
                      alt="Historical photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Text Content */}
            <div className="text-white text-center md:text-left order-1 md:order-2">
              <h1
                ref={headingRef}
                className="font-yeseva text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight opacity-0"
              >
                {heading}
              </h1>

              {content && (
                <div 
                  ref={contentRef}
                  className="font-montserrat text-sm md:text-base leading-relaxed text-white/90 max-w-lg opacity-0"
                >
                  {content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for the hanging image on desktop */}
      <div className="hidden md:block h-24 lg:h-32" />
    </section>
  )
}
