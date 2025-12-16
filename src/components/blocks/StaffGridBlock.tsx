'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaffMember {
  name?: string
  title?: string
  image?: {
    url?: string
    alt?: string
  }
}

interface StaffGridBlockProps {
  block: {
    heading?: string
    introText?: string
    staffMembers?: StaffMember[]
  }
}

export default function StaffGridBlock({ block }: StaffGridBlockProps) {
  const { heading, introText, staffMembers } = block

  const containerRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Intro text animation
    if (introRef.current) {
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }

    // Stagger cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.staff-card')
      tl.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=0.4'
      )
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="pt-24 md:pt-24 lg:pt-28 pb-10 md:pb-16 lg:pb-20 relative z-0"
      style={{ backgroundColor: '#FFF8F3' }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Intro Text */}
        {introText && (
          <div ref={introRef} className="max-w-full mb-8 md:mb-12 lg:mb-16 opacity-0 mx-auto">
            <p
              className="font-montserrat text-xs md:text-sm lg:text-base leading-relaxed italic"
              style={{ color: '#2C2013' }}
            >
              {introText.split('\n\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  {index < introText.split('\n\n').length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        )}

        {/* Staff Grid - 2x2 on mobile, flex on larger */}
        {staffMembers && staffMembers.length > 0 && (
          <div
            ref={cardsRef}
            className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-6 lg:gap-8"
          >
            {staffMembers.map((member, index) => (
              <div
                key={index}
                className="staff-card flex flex-col items-start opacity-0"
              >
                {/* Image */}
                <div className="relative w-full md:w-[160px] lg:w-[180px] aspect-[3/4] rounded-lg overflow-hidden mb-2 md:mb-3 bg-gray-200">
                  {member.image?.url ? (
                    <Image
                      src={member.image.url}
                      alt={member.image.alt || member.name || 'Staff member'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                      <span className="font-montserrat text-xs text-neutral-400">
                        Photo
                      </span>
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <div>
                  {member.name && (
                    <p
                      className="font-yeseva text-base md:text-lg lg:text-xl mb-0.5"
                      style={{ color: '#73060E' }}
                    >
                      {member.name}
                    </p>
                  )}
                  {member.title && (
                    <p
                      className="font-yeseva text-xs md:text-sm"
                      style={{ color: '#73060E' }}
                    >
                      {member.title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
