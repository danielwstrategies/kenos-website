'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

interface NavItem {
  label: string
  href: string
  openInNewTab?: boolean
}

interface NavigationProps {
  mainNav?: NavItem[]
}

const defaultNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({ mainNav }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = mainNav && mainNav.length > 0 ? mainNav : defaultNav

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isScrolled ? 'rgba(61, 26, 26, 0.95)' : 'transparent',
        duration: 0.3,
      })
    }
  }, [isScrolled])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 transition-all duration-300"
      style={{
        background: isScrolled
          ? 'rgba(61, 26, 26, 0.95)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-heading text-2xl font-bold">
          Keno&apos;s
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              target={item.openInNewTab ? '_blank' : undefined}
              className="hover:text-accent-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary-brown/95 py-4">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              target={item.openInNewTab ? '_blank' : undefined}
              className="block px-8 py-3 text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
