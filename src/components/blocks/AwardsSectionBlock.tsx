'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AwardsSectionBlockProps {
  block: {
    awards: Array<{
      title: string
      subtitle?: string
      source?: 'hotlist' | 'register'
      badgeImage?: any
    }>
    centerLogo?: any
  }
}

export default function AwardsSectionBlock({ block }: AwardsSectionBlockProps) {
  const { awards, centerLogo } = block
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const awardsRef = useRef<HTMLDivElement[]>([])

  const getSourceLogo = (source?: string) => {
    if (source === 'hotlist') {
      return '/images/dbf08834bffa1cd3a705e8e289ac2c2141a45f66.png'
    }
    if (source === 'register') {
      return '/images/9aba22d7fbe22957603df2a5207cfffb7fe310cd.png'
    }
    return null
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Animate awards with stagger
      awardsRef.current.forEach((award, index) => {
        if (award) {
          gsap.fromTo(
            award,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: 0.15 * index,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pb-16 -mt-16 md:pb-32 md:-mt-8" style={{ backgroundColor: '#FFFCF8' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Logo - Above on mobile, left on desktop */}
        <div className="flex justify-center md:hidden mb-6">
          <div ref={logoRef} className="relative w-40 h-40 opacity-0">
            <Image
              src="/media/Keno's Logo 1.png"
              alt="Kenos Restaurant Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-row md:flex-row items-center justify-center gap-4 md:gap-12 lg:gap-16">
          {/* Logo - Hidden on mobile, shown on desktop */}
          <div ref={logoRef} className="hidden md:block flex-shrink-0 opacity-0">
            <div className="relative w-64 h-64">
              <Image
                src="/media/Keno's Logo 1.png"
                alt="Kenos Restaurant Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Awards */}
          {awards?.map((award, index) => {
            const sourceLogo = getSourceLogo(award.source)
            return (
              <div
                key={index}
                ref={(el) => { if (el) awardsRef.current[index] = el }}
                className="flex-shrink-0 opacity-0"
              >
                <div
                  className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
                >
                  {/* Star Background */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/Star 1.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <p className="font-montserrat text-[0.5rem] sm:text-xs tracking-[0.2em] text-[#980914] mb-1 sm:mb-2 uppercase">
                      Voted
                    </p>
                    <h3 className="font-yeseva text-xs sm:text-sm md:text-lg lg:text-xl text-[#2D1810] mb-2 sm:mb-3 md:mb-4 leading-tight text-center max-w-[100px] sm:max-w-[120px] md:max-w-[180px]">
                      {award.title}
                    </h3>
                    {sourceLogo && (
                      <div className="relative w-16 h-5 sm:w-28 sm:h-6 md:w-36 md:h-10 mt-1 md:mt-2 overflow-hidden">
                        <Image
                          src={sourceLogo}
                          alt={award.source === 'hotlist' ? 'Orange County Hotlist' : 'The Orange County Register'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
