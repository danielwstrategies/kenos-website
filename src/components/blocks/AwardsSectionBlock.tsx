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
  const logoMobileRef = useRef<HTMLDivElement>(null)
  const logoDesktopRef = useRef<HTMLDivElement>(null)
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
      // Animate mobile logo
      if (logoMobileRef.current) {
        gsap.fromTo(
          logoMobileRef.current,
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

      // Animate desktop logo
      if (logoDesktopRef.current) {
        gsap.fromTo(
          logoDesktopRef.current,
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
    <section ref={sectionRef} className="pb-8 -mt-16 lg:pb-32 lg:-mt-8" style={{ backgroundColor: '#FFFCF8' }}>
      <div className="container mx-auto px-2 max-w-7xl">
        {/* Logo - Above on mobile, left on desktop */}
        <div className="flex justify-center lg:hidden mb-4">
          <div ref={logoMobileRef} className="relative w-32 h-32 opacity-0">
            <Image
              src="/media/kenos-logo-1.png"
              alt="Kenos Restaurant Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-row lg:flex-row items-center justify-center gap-2 lg:gap-12">
          {/* Logo - Hidden on mobile, shown on desktop */}
          <div ref={logoDesktopRef} className="hidden lg:block flex-shrink-0 opacity-0">
            <div className="relative w-64 h-64">
              <Image
                src="/media/kenos-logo-1.png"
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
                  className="relative w-36 h-36 lg:w-72 lg:h-72 xl:w-80 xl:h-80 flex flex-col items-center justify-center p-3 lg:p-8"
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
                    <p className="font-montserrat text-[0.45rem] lg:text-xs tracking-[0.2em] text-[#980914] mb-1 lg:mb-2 uppercase">
                      Voted
                    </p>
                    <h3 className="font-yeseva text-[0.65rem] lg:text-lg xl:text-xl text-[#2D1810] mb-1 lg:mb-4 leading-tight text-center max-w-[90px] lg:max-w-[180px]">
                      {award.title}
                    </h3>
                    {sourceLogo && (
                      <div className="relative w-14 h-4 lg:w-36 lg:h-10 mt-1 lg:mt-2 overflow-hidden">
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
