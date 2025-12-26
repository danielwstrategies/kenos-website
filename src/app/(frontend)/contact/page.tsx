import React from 'react'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: "Contact Us | Keno's Restaurant",
  description: "Get in touch with Keno's Restaurant. We're here to answer your questions and hear your feedback.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#2C2013] to-[#3d2d1a] text-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
          <h1 className="font-yeseva text-4xl md:text-5xl lg:text-6xl mb-4">
            Get In Touch
          </h1>
          <p className="font-montserrat text-white/80 text-lg">
            Have a question, comment, or special request? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-yeseva text-2xl md:text-3xl text-[#2C2013] mb-6">
                  Visit Us
                </h2>
                
                {/* Address */}
                <div className="mb-6">
                  <h3 className="font-montserrat font-semibold text-[#73060E] mb-2">
                    Address
                  </h3>
                  <p className="font-montserrat text-neutral-700 leading-relaxed mb-3">
                    5750 E La Palma Ave<br />
                    Anaheim Hills, CA 92807
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://maps.apple.com/?address=5750+E+La+Palma+Ave,Anaheim+Hills,CA,92807"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      Apple Maps
                    </a>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=5750+E+La+Palma+Ave,Anaheim+Hills,CA+92807"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors font-medium text-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Google Maps
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <h3 className="font-montserrat font-semibold text-[#73060E] mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+17147779511"
                    className="font-montserrat text-neutral-700 hover:text-[#73060E] transition-colors"
                  >
                    (714) 777-9511
                  </a>
                </div>

                {/* Hours */}
                <div className="mb-6">
                  <h3 className="font-montserrat font-semibold text-[#73060E] mb-2">
                    Hours
                  </h3>
                  <div className="font-montserrat text-neutral-700 space-y-1">
                    <p>Sunday - Thursday: 7 AM - 9 PM</p>
                    <p>Friday - Saturday: 7 AM - 10 PM</p>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-montserrat font-semibold text-[#73060E] mb-2">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/p/Kenos-Restaurant-Anaheim-Hills-100091390488208/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 hover:text-[#73060E] transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/kenosrestaurant/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 hover:text-[#73060E] transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="font-yeseva text-2xl md:text-3xl text-[#2C2013] mb-2">
                Send Us a Message
              </h2>
              <p className="font-montserrat text-neutral-600 mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8447384746557!2d-117.75825842378547!3d33.86655352795943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd5f0d0d0d0d1%3A0x1234567890abcdef!2s5750%20E%20La%20Palma%20Ave%2C%20Anaheim%2C%20CA%2092807!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Keno's Restaurant Location"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
