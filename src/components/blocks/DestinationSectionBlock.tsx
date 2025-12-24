'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface DestinationSectionBlockProps {
  block: {
    heading: string
    content: string
    button?: {
      text: string
      link: string
    }
    backgroundImage: any
  }
}

export default function DestinationSectionBlock({ block }: DestinationSectionBlockProps) {
  const { heading, content, button, backgroundImage } = block
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const bgImageUrl = backgroundImage?.url || '/images/dd2f44cfb12e3bf337ce28ec6eed1768f2a8bd90.png'

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

      // Animate the vertical line
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 0.8, ease: 'power3.out' },
          0
        )
      }

      // Animate heading
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          0.2
        )
      }

      // Animate content
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.4
        )
      }

      // Animate button
      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.5
        )
      }

      // Wipe animation for image
      if (imageRef.current) {
        const imgContainer = imageRef.current.querySelector('div')
        if (imgContainer) {
          gsap.set(imgContainer, { willChange: 'clip-path' })
          tl.fromTo(
            imgContainer,
            { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
            { 
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: 1.2,
              ease: 'power3.out',
              clearProps: 'willChange',
            },
            0.3
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: '#0c1418' }}>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="flex gap-8 md:gap-12 flex-1">
            {/* Vertical accent line */}
            <div 
              ref={lineRef}
              className="w-[2px] bg-gradient-to-b from-white/80 via-white/40 to-transparent flex-shrink-0"
              style={{ minHeight: '200px' }}
            />
            
            <div className="flex flex-col justify-center">
              {/* Heading */}
              <h2 
                ref={headingRef}
                className="font-yeseva text-3xl md:text-4xl lg:text-5xl text-white mb-6 opacity-0"
              >
                {heading}
              </h2>
              
              {/* Content with better line height */}
              <p 
                ref={contentRef}
                className="font-montserrat text-sm md:text-base text-white/70 mb-10 leading-relaxed max-w-xl opacity-0"
              >
                {content}
              </p>
              
              {/* Button */}
              {button?.text && button?.link && (
                <div ref={buttonRef} className="opacity-0">
                  <a
                    href={button.link}
                    target={button.link.startsWith('http') ? '_blank' : undefined}
                    rel={button.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="kenos-btn-secondary"
                  >
                    {button.text}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right - Image */}
          <div 
            ref={imageRef}
            className="flex-1 max-w-md lg:max-w-lg"
            style={{ 
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' 
            }}
          >
            <div 
              className="relative h-[400px] md:h-[500px] rounded-md overflow-hidden"
            >
              <Image
                src={bgImageUrl}
                alt="Destination"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
