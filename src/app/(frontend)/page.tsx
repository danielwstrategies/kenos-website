import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch the homepage data
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const page = pages.docs[0]

  if (!page) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
        <h1>No Homepage Found</h1>
        <p>
          Please create a homepage in the{' '}
          <a href="/admin/collections/pages" style={{ color: 'var(--primary-red)' }}>
            admin panel
          </a>
          .
        </p>
      </main>
    )
  }

  return (
    <>
      {/* Navigation */}
      <nav style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
      }}>
        <div style={{ width: '120px', height: '80px', position: 'relative' }}>
          {/* Logo placeholder - replace with actual logo */}
          <div style={{ 
            color: 'white', 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Keno's
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          fontSize: '0.9rem',
          fontWeight: '500',
          color: 'white'
        }}>
          <a href="#home" style={{ color: 'white' }}>Home</a>
          <a href="#menus" style={{ color: 'white' }}>Current Menus & Ordering</a>
          <a href="#entertainment" style={{ color: 'white' }}>Entertainment</a>
          <a href="#history" style={{ color: 'white' }}>Our Story</a>
          <a href="#gallery" style={{ color: 'white' }}>Gallery</a>
          <a href="#contact" style={{ color: 'white' }}>Contact</a>
        </div>
      </nav>

      <main style={{ fontFamily: 'var(--font-body)' }}>
        {/* Render each block */}
        {page.layout?.map((block: any, index: number) => {
          switch (block.blockType) {
            case 'hero':
              return (
                <section
                  key={index}
                  id="home"
                  style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundImage: 'url(/hero-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#8B6F47',
                  }}
                >
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                  }} />
                  
                  <div style={{ 
                    position: 'relative', 
                    zIndex: 10, 
                    color: 'white',
                    padding: '2rem',
                    maxWidth: '900px'
                  }}>
                    <h1 style={{ 
                      fontSize: 'clamp(3rem, 8vw, 6rem)',
                      marginBottom: '1rem', 
                      fontWeight: '400',
                      fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      lineHeight: '1.1'
                    }}>
                      Eat <span style={{ fontStyle: 'italic', fontWeight: '400' }}>TOGETHER</span>
                    </h1>
                    {block.subheading && (
                      <p style={{ 
                        fontSize: '1.125rem', 
                        marginBottom: '2.5rem', 
                        fontWeight: '300',
                        letterSpacing: '0.05em'
                      }}>
                        {block.subheading || "At Keno's, you're a stranger only once."}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <a
                        href="#menu"
                        className="btn btn-primary"
                        style={{
                          background: 'var(--primary-red)',
                          color: 'white',
                          padding: '1rem 2.5rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          fontSize: '0.9rem',
                          letterSpacing: '0.5px'
                        }}
                      >
                        See Menu
                      </a>
                      <a
                        href="#history"
                        className="btn btn-secondary"
                        style={{
                          background: 'transparent',
                          color: 'white',
                          padding: '1rem 2.5rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          border: '2px solid white',
                          textTransform: 'uppercase',
                          fontSize: '0.9rem',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Our History
                      </a>
                    </div>
                  </div>
                </section>
              )

            case 'about':
              return (
                <section 
                  key={index} 
                  id="about"
                  style={{ 
                    padding: '5rem 2rem', 
                    maxWidth: '1200px', 
                    margin: '0 auto',
                    background: 'var(--cream-bg)'
                  }}
                >
                  {/* Award Badges */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '3rem',
                    marginBottom: '4rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '180px',
                        height: '180px',
                        background: 'var(--primary-brown)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                      }}>
                        <div style={{ 
                          color: 'white', 
                          padding: '2rem',
                          textAlign: 'center',
                          fontFamily: 'var(--font-heading)'
                        }}>
                          <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>EST 1992</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Keno's</div>
                          <div style={{ fontSize: '0.75rem' }}>RESTAURANT</div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'var(--accent-gold)',
                      borderRadius: '50%',
                      width: '200px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem',
                      position: 'relative',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
                    }}>
                      <div style={{ fontSize: '0.7rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>VOTED</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.3' }}>
                        Best Breakfast<br/>in Orange County
                      </div>
                      <div style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>OC HOTLIST</div>
                    </div>

                    <div style={{
                      background: 'var(--accent-gold)',
                      borderRadius: '50%',
                      width: '200px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem',
                      position: 'relative',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
                    }}>
                      <div style={{ fontSize: '0.7rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>VOTED</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.3' }}>
                        #2 Best Family<br/>Style Restaurant<br/>in Orange County
                      </div>
                      <div style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>OC REGISTER</div>
                    </div>
                  </div>

                  {block.subtitle && (
                    <p style={{ 
                      color: 'var(--primary-red)', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '0.9rem'
                    }}>
                      {block.subtitle}
                    </p>
                  )}
                  <h2 style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    marginBottom: '2rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-dark)'
                  }}>
                    {block.title}
                  </h2>
                  <div style={{ marginBottom: '2rem', lineHeight: '1.8', color: 'var(--text-gray)', fontSize: '1.05rem' }}>
                    {block.content?.map((paragraph: any, i: number) => (
                      <p key={i} style={{ marginBottom: '1rem' }}>
                        {paragraph.children?.map((child: any) => child.text).join('')}
                      </p>
                    ))}
                  </div>
                  {block.features && block.features.length > 0 && (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '2rem', 
                      marginTop: '3rem' 
                    }}>
                      {block.features.map((feature: any, i: number) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                          <h3 style={{ 
                            fontSize: '1.25rem', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-heading)'
                          }}>
                            {feature.title}
                          </h3>
                          <p style={{ color: 'var(--text-gray)' }}>{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )

            case 'menuHighlights':
              return (
                <section key={index} id="menu" style={{ padding: '5rem 2rem', background: 'white' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                      <h2 style={{ 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text-dark)'
                      }}>
                        Order Online
                      </h2>
                      <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        For Pickup or Delivery
                      </p>
                      <a
                        href="#order"
                        style={{
                          display: 'inline-block',
                          background: 'var(--primary-red)',
                          color: 'white',
                          padding: '1rem 3rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          fontSize: '0.9rem',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Order Now
                      </a>
                    </div>

                    {/* Food Images Grid */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1.5rem',
                      marginTop: '3rem'
                    }}>
                      {block.items?.map((item: any, i: number) => (
                        <div 
                          key={i} 
                          style={{ 
                            background: 'white', 
                            borderRadius: '8px', 
                            overflow: 'hidden',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <div style={{ 
                            width: '100%', 
                            height: '250px', 
                            background: '#f0f0f0',
                            position: 'relative'
                          }}>
                            {/* Placeholder for food image */}
                          </div>
                          <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                                {item.name}
                              </h3>
                              {item.price && (
                                <span style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '1.125rem' }}>
                                  {item.price}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )

            case 'testimonials':
              return (
                <section 
                  key={index} 
                  style={{ 
                    padding: '5rem 2rem', 
                    background: 'var(--light-cream)',
                    position: 'relative'
                  }}
                >
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* A Destination Section */}
                    <div style={{
                      background: 'var(--primary-brown)',
                      color: 'white',
                      padding: '4rem 3rem',
                      borderRadius: '8px',
                      marginBottom: '4rem'
                    }}>
                      <h2 style={{ 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'white'
                      }}>
                        A Destination
                      </h2>
                      <p style={{ 
                        fontSize: '1.05rem', 
                        lineHeight: '1.8',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        color: 'rgba(255,255,255,0.9)'
                      }}>
                        Keno's Family Restaurant located in Anaheim Hills, CA is truly your full service neighborhood restaurant. Nestled at the base of the beautiful Anaheim Hills canyon, and for the last 31 years has been owned and operated by the Cooper family.
                      </p>
                      <a
                        href="#menu"
                        style={{
                          display: 'inline-block',
                          background: 'var(--primary-red)',
                          color: 'white',
                          padding: '0.875rem 2rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          fontSize: '0.9rem',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Our Menu
                      </a>
                    </div>

                    {block.testimonials && block.testimonials.length > 0 && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '2rem' 
                      }}>
                        {block.testimonials.map((testimonial: any, i: number) => (
                          <div 
                            key={i} 
                            style={{ 
                              background: 'white', 
                              borderRadius: '8px', 
                              padding: '2rem',
                              boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                            }}
                          >
                            <div style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                              {'★'.repeat(testimonial.rating || 5)}
                            </div>
                            <p style={{ 
                              fontStyle: 'italic', 
                              marginBottom: '1.5rem', 
                              color: 'var(--text-dark)', 
                              lineHeight: '1.6' 
                            }}>
                              "{testimonial.quote}"
                            </p>
                            <div>
                              <p style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>
                                {testimonial.author}
                              </p>
                              {testimonial.role && (
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                                  {testimonial.role}
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

            case 'cta':
              return (
                <section
                  key={index}
                  style={{
                    padding: '5rem 2rem',
                    background: 'var(--cream-bg)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Owner Section */}
                    <div style={{ marginBottom: '2rem' }}>
                      <p style={{ 
                        color: 'var(--primary-red)', 
                        fontWeight: '600', 
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                      }}>
                        OWNER
                      </p>
                      <h2 style={{ 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text-dark)'
                      }}>
                        Steve Cooper
                      </h2>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '3rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: '#ccc',
                        overflow: 'hidden'
                      }}>
                        {/* Owner photo placeholder */}
                      </div>
                      
                      <div style={{ maxWidth: '500px', textAlign: 'left' }}>
                        <p style={{ 
                          color: 'var(--text-gray)', 
                          lineHeight: '1.8',
                          fontSize: '1.05rem',
                          marginBottom: '1rem'
                        }}>
                          Steve Cooper has been an active member of the food industry for over 30 years. After over 20 years at Kenos, Steve's passion and dedication to the restaurant shows through daily.
                        </p>
                        <p style={{ 
                          color: 'var(--text-gray)', 
                          lineHeight: '1.8',
                          fontSize: '1.05rem'
                        }}>
                          Steve's dedication to his family and his values are just a few of the reasons why he is so well-respected by the community and other members of the industry.
                        </p>
                      </div>
                    </div>
                    
                    {block.button && (
                      <a
                        href={block.button.link || '#team'}
                        style={{
                          display: 'inline-block',
                          background: 'var(--primary-red)',
                          color: 'white',
                          padding: '1rem 2.5rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {block.button.text || 'See The Team'}
                      </a>
                    )}
                  </div>
                </section>
              )

            case 'contact':
              return (
                <section key={index} id="contact" style={{ padding: '5rem 2rem', background: 'white' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                      <h2 style={{ 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text-dark)'
                      }}>
                        {block.title || 'Contact Us'}
                      </h2>
                    </div>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                      gap: '3rem' 
                    }}>
                      <div>
                        <h3 style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: 'bold', 
                          marginBottom: '1rem',
                          fontFamily: 'var(--font-heading)'
                        }}>
                          📍 Address
                        </h3>
                        <p style={{ whiteSpace: 'pre-line', color: 'var(--text-gray)', lineHeight: '1.8' }}>
                          {block.address || 'Restaurant Hours\nSunday-Thursday 7 AM to 9 PM\nFriday-Saturday 7 AM to 10 PM'}
                        </p>
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: 'bold', 
                          marginBottom: '1rem',
                          fontFamily: 'var(--font-heading)'
                        }}>
                          📞 Contact
                        </h3>
                        {block.phone && (
                          <p style={{ color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                            Phone: <a href={`tel:${block.phone}`} style={{ color: 'var(--primary-red)' }}>
                              {block.phone}
                            </a>
                          </p>
                        )}
                        {block.email && (
                          <p style={{ color: 'var(--text-gray)' }}>
                            Email: <a href={`mailto:${block.email}`} style={{ color: 'var(--primary-red)' }}>
                              {block.email}
                            </a>
                          </p>
                        )}
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: 'bold', 
                          marginBottom: '1rem',
                          fontFamily: 'var(--font-heading)'
                        }}>
                          🕐 Hours
                        </h3>
                        {block.hours?.map((hour: any, i: number) => (
                          <p key={i} style={{ color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                            <strong>{hour.day}:</strong> {hour.hours}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )

            case 'content':
              return (
                <section
                  key={index}
                  style={{
                    padding: '5rem 2rem',
                    background: block.backgroundColor === 'dark' 
                      ? 'var(--dark-brown)' 
                      : block.backgroundColor === 'light-gray' 
                      ? 'var(--light-cream)' 
                      : block.backgroundColor === 'primary' 
                      ? 'var(--primary-brown)' 
                      : 'white',
                    color: block.backgroundColor === 'dark' || block.backgroundColor === 'primary' 
                      ? 'white' 
                      : 'var(--text-dark)',
                  }}
                >
                  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {block.title && (
                      <h2 style={{ 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)'
                      }}>
                        {block.title}
                      </h2>
                    )}
                    <div style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                      {block.content?.map((paragraph: any, i: number) => (
                        <p key={i} style={{ marginBottom: '1rem' }}>
                          {paragraph.children?.map((child: any) => child.text).join('')}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              )

            default:
              return null
          }
        })}

        {/* Footer */}
        <footer style={{ 
          background: 'var(--dark-brown)', 
          color: 'white', 
          padding: '4rem 2rem 2rem' 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '3rem',
              marginBottom: '3rem'
            }}>
              <div>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '1rem'
                }}>
                  Keno's
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                  Restaurant Hours<br/>
                  Sunday-Thursday 7 AM to 9 PM<br/>
                  Friday-Saturday 7 AM to 10 PM
                </p>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Links</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#home" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#menus" style={{ color: 'rgba(255,255,255,0.7)' }}>Current Menus and Ordering</a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#entertainment" style={{ color: 'rgba(255,255,255,0.7)' }}>Entertainment</a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#history" style={{ color: 'rgba(255,255,255,0.7)' }}>Our History</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Connect</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#contact" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact Us</a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#jobs" style={{ color: 'rgba(255,255,255,0.7)' }}>Jobs</a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#vip" style={{ color: 'rgba(255,255,255,0.7)' }}>Become a VIP</a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a href="#privacy" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{ 
              borderTop: '1px solid rgba(255,255,255,0.1)', 
              paddingTop: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                © 2024 Keno's Restaurant. All rights reserved.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <a href="/admin" style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>
                  Edit in Admin Panel
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}