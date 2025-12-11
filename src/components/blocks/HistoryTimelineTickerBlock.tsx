'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HistoryTimelineTickerBlockProps {
  block: {
    showYear?: boolean
    yearLabel?: string
    year?: string
    images?: Array<{
      image?: {
        url?: string
        alt?: string
      }
    }>
  }
}

export default function HistoryTimelineTickerBlock({ block }: HistoryTimelineTickerBlockProps) {
  const { showYear = true, yearLabel = 'EST.', year = '1983', images } = block
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const tickerWrapperRef = useRef<HTMLDivElement>(null)

  // Get image URLs, fallback to placeholders
  const imageUrls = images?.map(img => img?.image?.url).filter(Boolean) || []
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...imageUrls, ...imageUrls, ...imageUrls]

  useEffect(() => {
    // Entrance animations with ScrollTrigger
    const entranceTl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    })
    
    // Only animate year section if it's visible
    if (showYear && headingRef.current && lineRef.current) {
      entranceTl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 }
      )
      .fromTo(
        lineRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power2.inOut' },
        '-=0.4'
      )
    }
    
    entranceTl.fromTo(
      tickerWrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      showYear ? '-=0.3' : '0'
    )

    // Infinite ticker animation
    const ticker = tickerRef.current
    if (!ticker) return

    // Calculate the width of one set of images
    const imageWidth = 320 + 32 // lg:w-[320px] + lg:gap-8 (32px)
    const singleSetWidth = imageUrls.length * imageWidth

    // Set initial position
    gsap.set(ticker, { x: 0 })

    // Create infinite scroll animation
    const tickerAnimation = gsap.to(ticker, {
      x: -singleSetWidth,
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % singleSetWidth
        })
      }
    })

    return () => {
      entranceTl.kill()
      tickerAnimation.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [imageUrls.length, showYear])

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        backgroundColor: '#F5EBE0',
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: '60px'
      }}
    >
      {/* Gradient fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F5EBE0 0%, transparent 100%)' }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F5EBE0 0%, transparent 100%)' }}
      />

      {showYear && (
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Header with year and line */}
          <div className="flex items-center gap-6 md:gap-10 mb-12 md:mb-16">
            {/* EST. Year */}
            <div ref={headingRef} className="flex-shrink-0 opacity-0">
              <span 
                className="block font-montserrat text-xs md:text-sm tracking-[0.3em] uppercase mb-1"
                style={{ color: '#8B2332' }}
              >
                {yearLabel}
              </span>
              <span 
                className="block font-yeseva text-5xl md:text-6xl lg:text-7xl leading-none"
                style={{ color: '#8B2332' }}
              >
                {year}
              </span>
            </div>

            {/* Horizontal line */}
            <div 
              ref={lineRef}
              className="flex-1 h-px origin-left"
              style={{ backgroundColor: '#C4A484' }}
            />
          </div>
        </div>
      )}

      {/* Ticker wrapper - full width, outside container */}
      <div 
        ref={tickerWrapperRef}
        className="relative w-full overflow-hidden opacity-0"
      >
        {/* Animated ticker */}
        <div 
          ref={tickerRef}
          className="flex gap-4 md:gap-6 lg:gap-8 w-max"
        >
          {duplicatedImages.length > 0 ? (
            duplicatedImages.map((url, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 w-[200px] md:w-[280px] lg:w-[320px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
                style={{ 
                  filter: 'sepia(0.3) saturate(0.9)',
                }}
              >
                <Image
                  src={url!}
                  alt={images?.[index % imageUrls.length]?.image?.alt || `Historical photo ${(index % imageUrls.length) + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            // Placeholder images if none provided - also duplicated for ticker effect
            <>
              {[...Array(9)].map((_, index) => (
                <div 
                  key={index}
                  className="relative flex-shrink-0 w-[200px] md:w-[280px] lg:w-[320px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
                  style={{ 
                    backgroundColor: '#D4C4B0',
                    filter: 'sepia(0.3) saturate(0.9)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <span className="font-montserrat text-sm">Historical Photo {(index % 3) + 1}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
