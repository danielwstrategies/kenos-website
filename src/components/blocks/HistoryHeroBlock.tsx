'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HistoryHeroBlockProps {
  block: {
    heading: string
    content?: string
    backgroundImage?: {
      url?: string
      alt?: string
    }
    logo?: {
      url?: string
      alt?: string
    }
    button?: {
      text?: string
      link?: string
    }
  }
}

export default function HistoryHeroBlock({ block }: HistoryHeroBlockProps) {
  const { heading, content, backgroundImage, logo, button } = block
  
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)

  const bgImageUrl = backgroundImage?.url || '/images/kenos-exterior.jpg'

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(
      backgroundImageRef.current,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 1 }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative mx-2 md:mx-4 rounded-2xl overflow-hidden">
        {/* Background Image with Overlay */}
        <div ref={backgroundImageRef} className="absolute inset-0 z-0 opacity-0">
          <Image
            src={bgImageUrl}
            alt={backgroundImage?.alt || 'History background'}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <div 
            ref={contentRef}
            className="max-w-xl opacity-0"
          >
            {/* Logo */}
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || "Keno's"}
                width={100}
                height={50}
                className="h-8 md:h-10 w-auto mb-2 md:mb-3"
              />
            ) : (
              <Image
                src="/media/kenos-logo.png"
                alt="Keno's"
                width={100}
                height={50}
                className="h-8 md:h-10 w-auto mb-2 md:mb-3"
              />
            )}

            {/* Heading */}
            <h2 className="font-yeseva text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 leading-tight">
              {heading}
            </h2>

            {/* Content */}
            {content && (
              <p className="font-montserrat text-xs md:text-sm lg:text-base leading-relaxed text-white/90 mb-6 md:mb-8">
                {content}
              </p>
            )}

            {/* Button */}
            {button?.text && button?.link && (
              <Link
                href={button.link}
                className="kenos-btn-outline-white text-sm md:text-base"
              >
                {button.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
