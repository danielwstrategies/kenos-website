import { getPayload } from 'payload'
import config from '@/payload.config'

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
      <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>No Homepage Found</h1>
        <p>
          Please create a homepage in the{' '}
          <a href="/admin/collections/pages" style={{ color: 'blue' }}>
            admin panel
          </a>
          .
        </p>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Render each block */}
      {page.layout?.map((block: any, index: number) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <section
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '6rem 2rem',
                  textAlign: 'center',
                }}
              >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                  {block.heading}
                </h1>
                {block.subheading && (
                  <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                    {block.subheading}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  {block.primaryButton && (
                    <a
                      href={block.primaryButton.link}
                      style={{
                        background: 'white',
                        color: '#667eea',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      {block.primaryButton.text}
                    </a>
                  )}
                  {block.secondaryButton && (
                    <a
                      href={block.secondaryButton.link}
                      style={{
                        background: 'transparent',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        border: '2px solid white',
                      }}
                    >
                      {block.secondaryButton.text}
                    </a>
                  )}
                </div>
              </section>
            )

          case 'about':
            return (
              <section key={index} style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                {block.subtitle && (
                  <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {block.subtitle}
                  </p>
                )}
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{block.title}</h2>
                <div style={{ marginBottom: '2rem', lineHeight: '1.8', color: '#4a5568' }}>
                  {block.content?.map((paragraph: any, i: number) => (
                    <p key={i} style={{ marginBottom: '1rem' }}>
                      {paragraph.children?.map((child: any) => child.text).join('')}
                    </p>
                  ))}
                </div>
                {block.features && block.features.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    {block.features.map((feature: any, i: number) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                          {feature.title}
                        </h3>
                        <p style={{ color: '#718096' }}>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )

          case 'menuHighlights':
            return (
              <section key={index} style={{ padding: '4rem 2rem', background: '#f7fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>{block.title}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {block.items?.map((item: any, i: number) => (
                      <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.name}</h3>
                          {item.price && (
                            <span style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.125rem' }}>
                              {item.price}
                            </span>
                          )}
                        </div>
                        {item.category && (
                          <span style={{ color: '#718096', fontSize: '0.875rem' }}>{item.category}</span>
                        )}
                        {item.description && (
                          <p style={{ color: '#4a5568', marginTop: '1rem', lineHeight: '1.6' }}>
                            {item.description}
                          </p>
                        )}
                        {item.featured && (
                          <span style={{ display: 'inline-block', marginTop: '1rem', background: '#667eea', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'testimonials':
            return (
              <section key={index} style={{ padding: '4rem 2rem', background: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>{block.title}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {block.testimonials?.map((testimonial: any, i: number) => (
                      <div key={i} style={{ background: '#f7fafc', borderRadius: '12px', padding: '2rem' }}>
                        <div style={{ color: '#667eea', fontSize: '2rem', marginBottom: '1rem' }}>
                          {'⭐'.repeat(testimonial.rating || 5)}
                        </div>
                        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#2d3748', lineHeight: '1.6' }}>
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <p style={{ fontWeight: 'bold', color: '#1a202c' }}>{testimonial.author}</p>
                          {testimonial.role && (
                            <p style={{ color: '#718096', fontSize: '0.875rem' }}>{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'cta':
            return (
              <section
                key={index}
                style={{
                  padding: '4rem 2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textAlign: block.style === 'centered' ? 'center' : block.style === 'left' ? 'left' : 'right',
                }}
              >
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                    {block.heading}
                  </h2>
                  {block.description && (
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                      {block.description}
                    </p>
                  )}
                  {block.button && (
                    <a
                      href={block.button.link}
                      style={{
                        display: 'inline-block',
                        background: 'white',
                        color: '#667eea',
                        padding: '1rem 2.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1.125rem',
                      }}
                    >
                      {block.button.text}
                    </a>
                  )}
                </div>
              </section>
            )

          case 'contact':
            return (
              <section key={index} style={{ padding: '4rem 2rem', background: '#f7fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>{block.title}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        📍 Address
                      </h3>
                      <p style={{ whiteSpace: 'pre-line', color: '#4a5568', lineHeight: '1.8' }}>
                        {block.address}
                      </p>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        📞 Contact
                      </h3>
                      {block.phone && (
                        <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                          Phone: <a href={`tel:${block.phone}`} style={{ color: '#667eea' }}>{block.phone}</a>
                        </p>
                      )}
                      {block.email && (
                        <p style={{ color: '#4a5568' }}>
                          Email: <a href={`mailto:${block.email}`} style={{ color: '#667eea' }}>{block.email}</a>
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        🕐 Hours
                      </h3>
                      {block.hours?.map((hour: any, i: number) => (
                        <p key={i} style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
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
                  padding: '4rem 2rem',
                  background: block.backgroundColor === 'dark' ? '#2d3748' : block.backgroundColor === 'light-gray' ? '#f7fafc' : block.backgroundColor === 'primary' ? '#667eea' : 'white',
                  color: block.backgroundColor === 'dark' || block.backgroundColor === 'primary' ? 'white' : '#2d3748',
                }}
              >
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  {block.title && (
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{block.title}</h2>
                  )}
                  <div style={{ lineHeight: '1.8' }}>
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
      <footer style={{ background: '#2d3748', color: 'white', padding: '2rem', textAlign: 'center' }}>
        <p>© 2024 Keno's Restaurant. All rights reserved.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.8 }}>
          <a href="/admin" style={{ color: '#667eea', textDecoration: 'underline' }}>
            Edit in Admin Panel
          </a>
        </p>
      </footer>
    </main>
  )
}