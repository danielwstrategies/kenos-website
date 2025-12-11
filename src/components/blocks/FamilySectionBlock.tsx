'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import localFont from 'next/font/local'

gsap.registerPlugin(ScrollTrigger)

const marbleDreams = localFont({
  src: '../../fonts/MarbleDreams.ttf',
  display: 'swap',
})

interface FamilySectionBlockProps {
  block: {
    heading?: string
    content?: string
    image?: {
      url?: string
      alt?: string
    }
    button?: {
      text?: string
      link?: string
    }
  }
}

export default function FamilySectionBlock({ block }: FamilySectionBlockProps) {
  const { 
    heading = 'FAMILY', 
    content = '', 
    image,
    button = { text: 'Meet the Team', link: '/team' }
  } = block

  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim())

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      lineRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut' },
      '-=0.4'
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      imageRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 lg:py-[60px]"
      style={{ backgroundColor: '#F5EBE0' }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Heading with decorative line */}
        <div className="mb-12 md:mb-16 flex items-center gap-6 md:gap-8">
          <h2
            ref={headingRef}
            className={`${marbleDreams.className} text-5xl md:text-6xl lg:text-7xl flex-shrink-0 opacity-0`}
            style={{ color: '#8B2332' }}
          >
            {heading}
          </h2>
          <div
            ref={lineRef}
            className="h-px flex-grow origin-left"
            style={{ backgroundColor: '#8B2332' }}
          />
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Text content */}
          <div ref={contentRef} className="opacity-0">
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: '#2C2013' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Button */}
            {button?.text && button?.link && (
              <div ref={buttonRef} className="mt-8 opacity-0">
                <Link
                  href={button.link}
                  className="inline-block px-8 py-3 border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: '#8B2332',
                    color: '#8B2332',
                  }}
                >
                  {button.text}
                </Link>
              </div>
            )}
          </div>

          {/* Image */}
          {image?.url && (
            <div ref={imageRef} className="opacity-0">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={image.url}
                  alt={image.alt || 'Family photo'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
