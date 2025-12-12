'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ClassicsSectionBlockProps {
  block: {
    subtitle?: string
    content?: string
    images?: Array<{
      image: any
    }>
  }
}

export default function ClassicsSectionBlock({ block }: ClassicsSectionBlockProps) {
  const { subtitle, content, images } = block

  const sectionRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { willChange: 'transform, opacity' })
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: 'power2.out',
            clearProps: 'willChange',
          },
          0
        )
      }

      if (contentRef.current) {
        gsap.set(contentRef.current, { willChange: 'transform, opacity' })
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: 'power2.out',
            clearProps: 'willChange',
          },
          0.15
        )
      }

      if (imagesContainerRef.current) {
        const imageElements = imagesContainerRef.current.querySelectorAll('.classics-image')
        imageElements.forEach((img, index) => {
          gsap.set(img, { willChange: 'opacity' })
          tl.fromTo(
            img,
            { opacity: 0 },
            { 
              opacity: 1, 
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'willChange',
            },
            0.2 + (index * 0.15)
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 bg-[#F5EBE0]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 md:order-1">
            {subtitle && (
              <p 
                ref={subtitleRef}
                className="font-montserrat text-xs md:text-sm tracking-[0.3em] text-[#8B1538] mb-4 uppercase opacity-0"
              >
                {subtitle}
              </p>
            )}
            
            {content && (
              <div 
                ref={contentRef}
                className="font-montserrat text-sm md:text-base leading-relaxed text-[#2F0C0C]/80 opacity-0"
              >
                {content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Staggered Images */}
          <div 
            ref={imagesContainerRef}
            className="order-1 md:order-2 relative min-h-[300px]"
          >
            {images && images.length > 0 && (
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                {/* First image */}
                {images[0]?.image?.url && (
                  <div className="classics-image relative w-full md:w-[55%] aspect-[4/3] opacity-0 z-10">
                    <Image
                      src={images[0].image.url}
                      alt="Classic dish"
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover rounded-lg shadow-xl"
                    />
                  </div>
                )}
                
                {/* Second image */}
                {images[1]?.image?.url && (
                  <div className="classics-image relative w-full md:w-[55%] aspect-[4/3] opacity-0 md:-ml-12 md:mt-12">
                    <Image
                      src={images[1].image.url}
                      alt="Classic dish"
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover rounded-lg shadow-xl"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

