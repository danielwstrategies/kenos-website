'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PromotionSectionBlockProps {
  block: {
    heading: string
    subheading?: string
    showDateBox?: boolean
    dateBoxLine1?: string
    dateBoxLine2?: string
    dateBoxLine3?: string
    button?: {
      text: string
      link: string
    }
    promotionImages?: Array<{
      image: any
    }>
    backgroundImage?: any
  }
}

export default function PromotionSectionBlock({ block }: PromotionSectionBlockProps) {
  const { 
    heading, 
    subheading,
    showDateBox,
    dateBoxLine1,
    dateBoxLine2,
    dateBoxLine3,
    button, 
    promotionImages,
    backgroundImage 
  } = block

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const dateBoxRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])

  const bgImageUrl = backgroundImage?.url || '/images/promo-bg.jpg'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true, // Only play once for better performance
        },
      })

      // Animate text content with will-change
      if (headingRef.current) {
        gsap.set(headingRef.current, { willChange: 'transform, opacity' })
        tl.fromTo(
          headingRef.current,
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.6, 
            ease: 'power2.out',
            clearProps: 'willChange',
          },
          0
        )
      }

      if (subheadingRef.current) {
        gsap.set(subheadingRef.current, { willChange: 'transform, opacity' })
        tl.fromTo(
          subheadingRef.current,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: 'power2.out',
            clearProps: 'willChange',
          },
          0.1
        )
      }

      if (dateBoxRef.current) {
        gsap.set(dateBoxRef.current, { willChange: 'transform, opacity' })
        tl.fromTo(
          dateBoxRef.current,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            ease: 'power2.out',
            clearProps: 'willChange',
          },
          0.2
        )
      }

      if (buttonRef.current) {
        gsap.set(buttonRef.current, { willChange: 'transform, opacity' })
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            ease: 'power2.out',
            clearProps: 'willChange',
          },
          0.25
        )
      }

      // Wipe animation for images
      imagesRef.current.forEach((img, index) => {
        if (img) {
          const imgElement = img.querySelector('img')
          if (imgElement) {
            gsap.set(imgElement, { willChange: 'clip-path' })
            tl.fromTo(
              imgElement,
              { 
                clipPath: 'inset(0 100% 0 0)',
              },
              { 
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.2,
                ease: 'power3.out',
                clearProps: 'willChange',
              },
              0.3 + (index * 0.15)
            )
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12 overflow-visible">
      {/* Background Image with Dark Blue-Green Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt="Promotion background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 28, 32, 0.95)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-[30%] flex-shrink-0 flex flex-col">
            {/* Heading */}
            <h2 
              ref={headingRef}
              className="font-yeseva text-3xl md:text-4xl lg:text-5xl mb-1 text-white leading-tight opacity-0"
            >
              {heading}
            </h2>
            
            {/* Subheading */}
            {subheading && (
              <p 
                ref={subheadingRef}
                className="font-montserrat text-base md:text-lg text-white/90 mb-6 opacity-0"
              >
                {subheading}
              </p>
            )}

            {/* Date Box */}
            {showDateBox && (
              <div 
                ref={dateBoxRef}
                className="border-2 px-4 py-3 mb-4 text-white inline-block w-fit opacity-0"
                style={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                <div className="font-montserrat">
                  {dateBoxLine1 && <p className="text-sm md:text-base font-semibold">{dateBoxLine1}</p>}
                  {dateBoxLine2 && <p className="text-sm">{dateBoxLine2}</p>}
                  {dateBoxLine3 && <p className="text-xs italic">{dateBoxLine3}</p>}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {button?.text && button?.link && (
              <div ref={buttonRef} className="opacity-0">
                <a
                  href={button.link}
                  target={button.link.startsWith('http') ? '_blank' : undefined}
                  rel={button.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="kenos-btn-primary text-base px-8 py-3 inline-block"
                >
                  {button.text}
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Images */}
          <div className="w-full md:flex-1 flex flex-row gap-4 items-center justify-center md:justify-end relative mt-6 md:mt-0 md:-my-24">
            {promotionImages?.map((item, index) => {
              const imageUrl = item.image?.url
              if (!imageUrl) return null
              return (
                <div 
                  key={index}
                  ref={(el) => { if (el) imagesRef.current[index] = el }}
                  className="flex-1 h-[400px] md:h-[500px] overflow-hidden rounded-xl"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 12px 24px -8px rgba(0, 0, 0, 0.4)' 
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Promotion ${index + 1}`}
                    width={item.image?.width || 400}
                    height={item.image?.height || 500}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
