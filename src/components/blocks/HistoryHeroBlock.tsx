'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayImageRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)
  const parallaxImageRef = useRef<HTMLDivElement>(null)

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

    // Parallax effect for background
    const parallaxAnimation = gsap.to(parallaxImageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tl.kill()
      parallaxAnimation.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      {/* Hero Section */}
      <div className="relative min-h-[500px] md:min-h-[550px] flex items-end overflow-visible pb-32 md:pb-0">
        {/* Background Image with Overlay */}
        <div ref={backgroundImageRef} className="absolute inset-0 z-0 opacity-0 overflow-hidden">
          <div ref={parallaxImageRef} className="absolute inset-0 scale-110">
            <Image
              src={bgImageUrl}
              alt="History background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/60" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left side - Overlay Image (hanging below) */}
            <div 
              ref={overlayImageRef}
              className="relative opacity-0 order-2 md:order-1"
            >
              {overlayImageUrl && (
                <div className="relative w-full max-w-md mx-auto md:mx-0">
                  {/* Single image with frame effect */}
                  <div className="relative aspect-[4/3] md:translate-y-8 lg:translate-y-12 rounded-xl overflow-hidden shadow-2xl">
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
    </section>
  )
}
