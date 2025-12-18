'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HistoryTimelineTickerBlockProps {
  block: {
    displayMode?: 'ticker' | 'notecard'
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
  const { displayMode = 'notecard', showYear = true, yearLabel = 'EST.', year = '1983', images } = block
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const tickerWrapperRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  
  // Audio refs for sound effects
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      hoverSoundRef.current = new Audio('/media/UI_CLICK_Bottom_Short_01.wav')
      clickSoundRef.current = new Audio('/media/page-turning.mp3')
      
      // Set volume for hover sound (quieter)
      if (hoverSoundRef.current) {
        hoverSoundRef.current.volume = 0.4
      }
      
      // Set volume for click sound
      if (clickSoundRef.current) {
        clickSoundRef.current.volume = 0.5
      }
    }
  }, [])

  // Get image URLs
  const imageUrls = images?.map(img => img?.image?.url).filter(Boolean) || []
  
  // Duplicate images for seamless loop (ticker mode only)
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

    if (displayMode === 'notecard') {
      // Animate cards in with stagger
      const cards = cardsRef.current?.querySelectorAll('.photo-card')
      if (cards && cards.length > 0) {
        entranceTl.fromTo(
          cards,
          { opacity: 0, y: 40, rotation: 0 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)'
          },
          showYear ? '-=0.3' : '0'
        )
      }
    } else {
      // Ticker mode entrance
      entranceTl.fromTo(
        tickerWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        showYear ? '-=0.3' : '0'
      )

      // Infinite ticker animation
      const ticker = tickerRef.current
      if (ticker) {
        const imageWidth = 320 + 32 // lg:w-[320px] + lg:gap-8 (32px)
        const singleSetWidth = imageUrls.length * imageWidth

        gsap.set(ticker, { x: 0 })

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
      }
    }

    return () => {
      entranceTl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [imageUrls.length, showYear, displayMode])

  // Card rotation angles for layered effect (notecard mode)
  const getCardStyle = (index: number, total: number) => {
    const rotations = [-6, -3, 0, 3, 6, -4, 2, -2, 4]
    const rotation = rotations[index % rotations.length]
    const zIndex = total - index
    
    return {
      '--rotation': `${rotation}deg`,
      zIndex,
    } as React.CSSProperties
  }

  const handleCardClick = (index: number) => {
    // Play page turning sound when opening image
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch(err => console.log('Audio play failed:', err))
    }
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // Play hover sound
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0
      hoverSoundRef.current.play().catch(err => console.log('Audio play failed:', err))
    }

    // GSAP hover animation - lift, scale, and slight tilt
    const card = e.currentTarget.querySelector('.photo-card-inner')
    if (card) {
      gsap.to(card, {
        scale: 1.08,
        rotateZ: gsap.utils.random(-2, 2),
        y: -15,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reset animation on mouse leave
    const card = e.currentTarget.querySelector('.photo-card-inner')
    if (card) {
      gsap.to(card, {
        scale: 1,
        rotateZ: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }
  }

  const closeModal = () => {
    setExpandedIndex(null)
  }

  return (
    <>
      <section 
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: '#F5EBE0',
          paddingTop: '30px',
          paddingBottom: '60px'
        }}
      >
        {/* Gradient fade overlays (ticker mode only) */}
        {displayMode === 'ticker' && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #F5EBE0 0%, transparent 100%)' }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #F5EBE0 0%, transparent 100%)' }}
            />
          </>
        )}

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

        {/* NOTECARD MODE */}
        {displayMode === 'notecard' && (
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div 
              ref={cardsRef}
              className="flex flex-wrap justify-center gap-6 md:gap-8"
            >
              {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="photo-card group cursor-pointer"
                    style={getCardStyle(index, imageUrls.length)}
                    onClick={() => handleCardClick(index)}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <div 
                      className="photo-card-inner relative w-[180px] md:w-[220px] lg:w-[260px] aspect-[4/3] rounded-sm overflow-hidden"
                      style={{
                        transform: `rotate(var(--rotation))`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        padding: '8px',
                      }}
                    >
                      {/* Paper/polaroid frame effect */}
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={url!}
                          alt={images?.[index]?.image?.alt || `Historical photo ${index + 1}`}
                          fill
                          className="object-cover"
                          style={{ filter: 'sepia(0.2) saturate(0.9)' }}
                          priority
                        />
                      </div>
                      {/* Paper texture overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)'
                        }}
                      />
                    </div>
                    {/* Click hint on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                      <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                // Placeholder cards
                [...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="photo-card"
                    style={getCardStyle(index, 5)}
                  >
                    <div 
                      className="relative w-[180px] md:w-[220px] lg:w-[260px] aspect-[4/3] rounded-sm overflow-hidden"
                      style={{
                        transform: `rotate(var(--rotation))`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        padding: '8px',
                      }}
                    >
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: '#D4C4B0' }}
                      >
                        <span className="font-montserrat text-sm text-white/50">
                          Historical Photo {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TICKER MODE */}
        {displayMode === 'ticker' && (
          <div 
            ref={tickerWrapperRef}
            className="relative w-full overflow-hidden opacity-0"
          >
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
                      priority
                    />
                  </div>
                ))
              ) : (
                // Placeholder images
                [...Array(9)].map((_, index) => (
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
                ))
              )}
            </div>
          </div>
        )}
      </section>

      {/* Lightbox Modal (notecard mode only) */}
      {displayMode === 'notecard' && expandedIndex !== null && imageUrls[expandedIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 text-white hover:text-gray-300 transition-colors"
            onClick={closeModal}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {imageUrls.length > 1 && (
            <>
              <button
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors p-2 bg-black/30 md:bg-transparent rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedIndex(expandedIndex === 0 ? imageUrls.length - 1 : expandedIndex - 1)
                }}
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors p-2 bg-black/30 md:bg-transparent rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedIndex(expandedIndex === imageUrls.length - 1 ? 0 : expandedIndex + 1)
                }}
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Enlarged image */}
          <div 
            className="relative z-10 mx-14 md:mx-20 max-h-[85vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              padding: '8px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
          >
            <div className="relative overflow-hidden">
              <Image
                src={imageUrls[expandedIndex]!}
                alt={images?.[expandedIndex]?.image?.alt || `Historical photo ${expandedIndex + 1}`}
                width={1200}
                height={900}
                className="w-auto h-auto max-w-[calc(100vw-7rem)] md:max-w-[calc(100vw-12rem)] max-h-[calc(85vh-16px)] object-contain"
                style={{ filter: 'sepia(0.15) saturate(0.95)' }}
                priority
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .photo-card {
          position: relative;
        }
        
        .photo-card:hover {
          z-index: 50 !important;
        }

        .photo-card-inner {
          will-change: transform;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  )
}









