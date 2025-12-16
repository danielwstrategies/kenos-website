'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { heroAnimation } from '@/lib/animations'

interface KenosHeroBlockProps {
  block: {
    heading: string
    address?: string
    addressLink?: string
    backgroundImage: any
    primaryButton?: {
      text: string
      link: string
    }
    secondaryButton?: {
      text: string
      link: string
    }
  }
}

export default function KenosHeroBlock({ block }: KenosHeroBlockProps) {
  const { heading, address, addressLink, backgroundImage, primaryButton, secondaryButton } = block
  
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)

  const bgImageUrl = backgroundImage?.url || '/images/KENOS(Hero Group Shot)15986.jpg'

  useEffect(() => {
    const animation = heroAnimation({
      heading: headingRef.current,
      subtext: subtextRef.current,
      buttons: buttonsRef.current,
      backgroundImage: backgroundImageRef.current,
    })

    return () => {
      animation?.kill()
    }
  }, [])

  return (
    <section className="px-2 pt-2 md:px-2 md:pt-2">
      <div className="relative h-[600px] md:h-[700px] flex items-center justify-center rounded-lg md:rounded-xl overflow-hidden">
        {/* Background Image with Overlay */}
        <div ref={backgroundImageRef} className="absolute inset-0 z-0 rounded-lg md:rounded-xl overflow-hidden opacity-0">
          <Image
            src={bgImageUrl}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 w-full max-w-[95%] mx-auto">
        {/* Main Headline */}
        <h1
          ref={headingRef}
          className="font-yeseva mb-8 leading-none opacity-0 whitespace-nowrap"
          style={{ fontSize: 'clamp(1.25rem, 5.5vw, 3.5rem)' }}
        >
          {heading}
        </h1>

        {/* Dine with us text and Address */}
        {address && (
          <div ref={subtextRef} className="mb-8 font-montserrat opacity-0">
            <p className="text-base md:text-lg mb-2">Dine with us at the original Keno&apos;s</p>
            <a
              href={addressLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm underline hover:text-accent-gold transition-colors whitespace-pre-line"
            >
              {address}
            </a>
          </div>
        )}

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
          {primaryButton?.text && (
            <a
              href={primaryButton.link}
              className="kenos-btn-primary"
            >
              {primaryButton.text}
            </a>
          )}
          {secondaryButton?.text && (
            <a
              href={secondaryButton.link}
              className="kenos-btn-secondary"
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
      </div>
    </section>
  )
}
