'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'

interface NavItem {
  label: string
  href: string
  openInNewTab?: boolean | null
  id?: string | null
}

interface NavigationProps {
  mainNav?: NavItem[]
}

export default function Navigation({ mainNav }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = mainNav || []

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  // Animate menu open/close
  useEffect(() => {
    if (menuRef.current && overlayRef.current) {
      if (isMenuOpen) {
        // Prevent body scroll
        document.body.style.overflow = 'hidden'
        
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(menuRef.current, {
          x: 0,
          duration: 0.4,
          ease: 'power3.out',
        })
      } else {
        // Restore body scroll
        document.body.style.overflow = ''
        
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
        gsap.to(menuRef.current, {
          x: '100%',
          duration: 0.3,
          ease: 'power3.in',
        })
      }
    }
  }, [isMenuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
        }}
      >
        <div className="w-full mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/media/kenos-logo-1.png"
              alt="Keno's Restaurant"
              width={120}
              height={50}
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Hamburger Menu Button - Always visible */}
          <button
            className={`text-white p-3 z-50 relative rounded-lg transition-all duration-300 ${
              isScrolled ? 'bg-[#3D1A1A]/95' : ''
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-40 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ opacity: 0 }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Slide-out Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full md:w-[40%] bg-[#3D1A1A] z-50 flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            className="text-white p-2"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              target={item.openInNewTab ? '_blank' : undefined}
              className="block py-4 text-white text-2xl md:text-3xl font-yeseva hover:text-accent-gold transition-colors border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="p-8 md:p-12 text-white/70 font-montserrat text-sm">
          <p>Keno&apos;s Restaurant</p>
          <p>Anaheim Hills, CA</p>
        </div>
      </div>
    </>
  )
}
