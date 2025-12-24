'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
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
  bio?: string
}

interface StaffGridBlockProps {
  block: {
    heading?: string
    introText?: string
    staffMembers?: StaffMember[]
  }
}

// Bio Modal Component - WCAG Compliant
function BioModal({ 
  member, 
  isOpen, 
  onClose 
}: { 
  member: StaffMember | null
  isOpen: boolean
  onClose: () => void 
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return

    // Focus the close button when modal opens
    closeButtonRef.current?.focus()

    // Handle escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !member) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        role="document"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#73060E] focus:ring-offset-2"
          aria-label="Close bio modal"
        >
          <svg 
            className="w-5 h-5 text-[#2C2013]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Image */}
        {member.image?.url && (
          <div className="flex justify-center bg-neutral-100 rounded-t-2xl p-4">
            <Image
              src={member.image.url}
              alt={member.image.alt || member.name || 'Staff member'}
              width={300}
              height={400}
              className="max-h-[250px] md:max-h-[300px] w-auto object-contain rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Name */}
          {member.name && (
            <h2 
              id="modal-title"
              className="font-yeseva text-2xl md:text-3xl mb-1"
              style={{ color: '#73060E' }}
            >
              {member.name}
            </h2>
          )}
          
          {/* Title */}
          {member.title && (
            <p 
              className="font-yeseva   mb-4"
              style={{ color: '#73060E' }}
            >
              {member.title}
            </p>
          )}

          {/* Bio */}
          {member.bio && (
            <p 
              className="font-montserrat text-sm  leading-relaxed"
              style={{ color: '#2C2013' }}
            >
              {member.bio.split('\n\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  {index < member.bio!.split('\n\n').length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* No bio message */}
          {!member.bio && (
            <p 
              className="font-montserrat text-sm  italic"
              style={{ color: '#666' }}
            >
              Bio coming soon!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function StaffGridBlock({ block }: StaffGridBlockProps) {
  const { heading, introText, staffMembers } = block
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const containerRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const openModal = useCallback((member: StaffMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    // Delay clearing member to allow for exit animation
    setTimeout(() => setSelectedMember(null), 200)
  }, [])

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
    <>
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
                className="font-montserrat text-xs md:text-sm  leading-relaxed italic"
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
                <button
                  key={index}
                  className="staff-card flex flex-col items-start opacity-0 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#73060E] focus:ring-offset-2 rounded-lg"
                  onClick={() => openModal(member)}
                  aria-label={`View bio for ${member.name || 'team member'}`}
                >
                  {/* Image */}
                  <div className="relative w-full md:w-[160px] lg:w-[180px] aspect-[3/4] rounded-lg overflow-hidden mb-2 md:mb-3 bg-gray-200 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
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
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="font-montserrat text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded-full">
                        View Bio
                      </span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div>
                    {member.name && (
                      <p
                        className="font-yeseva   lg:text-xl mb-0.5 group-hover:underline"
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
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bio Modal */}
      <BioModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
