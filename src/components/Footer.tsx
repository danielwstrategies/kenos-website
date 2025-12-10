'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FooterNav {
  label: string
  href: string
  openInNewTab?: boolean
}

interface FooterProps {
  leftColumn?: FooterNav[]
  rightColumn?: FooterNav[]
  hoursTitle?: string
  hoursLine1?: string
  hoursLine2?: string
}

const defaultLeftColumn: FooterNav[] = [
  { label: 'Home', href: '/' },
  { label: 'Current Menus and Ordering', href: '/menu' },
  { label: 'Entertainment', href: '/entertainment' },
  { label: 'Our History', href: '/history' },
  { label: 'Our Staff', href: '/staff' },
  { label: 'Gallery', href: '/gallery' },
]

const defaultRightColumn: FooterNav[] = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Jobs', href: '/jobs' },
  { label: "Keno's News", href: '/news' },
  { label: 'Become a VIP', href: '/vip' },
  { label: 'Site Map', href: '/sitemap' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export default function Footer({ 
  leftColumn, 
  rightColumn,
  hoursTitle = 'Restaurant Hours',
  hoursLine1 = 'Sunday-Thursday 7 AM-9 PM',
  hoursLine2 = 'Friday-Saturday: 7 AM-10 PM'
}: FooterProps) {
  const leftNav = leftColumn && leftColumn.length > 0 ? leftColumn : defaultLeftColumn
  const rightNav = rightColumn && rightColumn.length > 0 ? rightColumn : defaultRightColumn

  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const hoursRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })

      // Logo fade in
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0
        )
      }

      // Hours box
      if (hoursRef.current) {
        tl.fromTo(
          hoursRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0.15
        )
      }

      // Left column links stagger
      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current.querySelectorAll('li'),
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
          0.2
        )
      }

      // Right column links stagger
      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current.querySelectorAll('li'),
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
          0.3
        )
      }

      // Copyright
      if (copyrightRef.current) {
        tl.fromTo(
          copyrightRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power3.out' },
          0.5
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="text-white py-16 px-8"
      style={{
        background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #0d0d0d 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Left - Logo and Hours */}
          <div className="md:col-span-4">
            {/* Logo */}
            <div ref={logoRef} className="mb-8 opacity-0">
              <Image
                src="/media/kenos-logo-1.png"
                alt="Keno's Restaurant"
                width={200}
                height={180}
                className="w-48 h-auto"
              />
            </div>

            {/* Hours Box */}
            <div ref={hoursRef} className="border border-white/30 p-6 inline-block opacity-0">
              <h4 className="font-montserrat font-semibold text-lg mb-3 text-white">
                {hoursTitle}
              </h4>
              <p className="font-montserrat text-white/80 text-sm leading-relaxed">
                {hoursLine1}
                <br />
                {hoursLine2}
              </p>
            </div>
          </div>

          {/* Middle - Navigation Column 1 */}
          <div ref={leftColRef} className="md:col-span-4">
            <ul className="space-y-4">
              {leftNav.map((item, i) => (
                <li key={i} className="opacity-0">
                  <Link
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : undefined}
                    className="font-montserrat text-white/90 hover:text-white transition-colors text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Navigation Column 2 */}
          <div ref={rightColRef} className="md:col-span-4">
            <ul className="space-y-4">
              {rightNav.map((item, i) => (
                <li key={i} className="opacity-0">
                  <Link
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : undefined}
                    className="font-montserrat text-white/90 hover:text-white transition-colors text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div ref={copyrightRef} className="pt-8 opacity-0">
          <p className="font-montserrat text-sm text-white/60">
            © {new Date().getFullYear()} Keno&apos;s Restaurant. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
