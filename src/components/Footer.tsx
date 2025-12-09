'use client'

import React from 'react'
import Link from 'next/link'

interface FooterNav {
  label: string
  href: string
  openInNewTab?: boolean
}

interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  yelp?: string
}

interface FooterProps {
  footerNav?: FooterNav[]
  socialLinks?: SocialLinks
}

const defaultFooterNav: FooterNav[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer({ footerNav, socialLinks }: FooterProps) {
  const navItems = footerNav && footerNav.length > 0 ? footerNav : defaultFooterNav

  return (
    <footer className="bg-secondary text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold font-heading mb-4">
              Keno&apos;s
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Restaurant Hours
              <br />
              Sunday-Thursday 7 AM to 9 PM
              <br />
              Friday-Saturday 7 AM to 10 PM
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : undefined}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#jobs" className="text-white/70 hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#vip" className="text-white/70 hover:text-white transition-colors">
                  Become a VIP
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            
            {/* Social Links */}
            {socialLinks && (
              <div className="flex gap-4 mt-6">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                    Facebook
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                    Instagram
                  </a>
                )}
                {socialLinks.yelp && (
                  <a href={socialLinks.yelp} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                    Yelp
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Keno&apos;s Restaurant. All rights reserved.
          </p>
          <p className="mt-4 text-sm">
            <Link href="/admin" className="text-primary hover:underline">
              Edit in Admin Panel
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
