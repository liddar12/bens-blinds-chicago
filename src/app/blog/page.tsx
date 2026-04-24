import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: "Chicago Window Treatment Guide & Blog | Ben's Blinds",
  description:
    "Expert guides on window treatments for Chicago homes: energy efficiency, smart home integration, greystone windows, solar shades, cellular shades, and more from Ben's Blinds Chicago.",
  keywords: [
    'chicago window treatment blog',
    'blinds guide chicago',
    'window covering tips chicago',
    'custom shades chicago advice',
    'chicago home improvement blog',
  ],
  alternates: { canonical: 'https://bensblinds.com/blog' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bensblinds.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bensblinds.com/blog' },
  ],
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
            Chicago Window Treatment Guides
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Expert Advice for Chicago Homes
          </h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '1.0625rem', fontFamily: 'var(--font-body)' }}>
            From insulating against polar vortex conditions to controlling Lake Michigan glare: real guides from Chicago's most experienced window treatment team.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ lineHeight: 0, height: '180px', overflow: 'hidden', background: 'var(--surface-2)' }}>
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>
                      {formatDate(post.date)}
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)', marginBottom: '0.625rem', lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6, fontFamily: 'var(--font-body)', flex: 1 }}>
                      {post.excerpt}
                    </p>
                    <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--brand)', fontWeight: 600, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      Read guide <Icon name="arrow" size={12} />
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--brand)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.875rem', color: '#fff', marginBottom: '0.75rem' }}>
            Ready to Talk to a Chicago Window Expert?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
            Free in-home consultation. We measure, recommend, and install throughout Chicagoland.
          </p>
          <Link
            href="/quote"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: 'var(--brand)', fontWeight: 700, fontSize: '1rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
          >
            Book Free Consultation <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
