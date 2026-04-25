import type { Metadata } from 'next'
import Link from 'next/link'
import { PARTNERS, TIER_LABELS } from '@/lib/partners'
import { PRODUCTS } from '@/lib/season'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: "Our Brand Partners",
  description:
    "Ben's Blinds Chicago is an authorized dealer for Hunter Douglas, Horizons Window Fashions, EXUS Custom Shutters, ALTA Window Fashions, and SUNPRO. Premium window treatment brands, expert local installation.",
  alternates: { canonical: 'https://bensblinds.com/partners' },
}

const TIER_ORDER: Record<string, number> = { premier: 0, certified: 1, authorized: 2 }

const sortedPartners = [...PARTNERS].sort(
  (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]
)

export default function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <p className="eyebrow" style={{ color: 'var(--brand)', marginBottom: '0.75rem' }}>
            Trusted Brand Partners
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '1rem',
            }}
          >
            The Brands Behind Every Installation
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-2)',
              lineHeight: 1.7,
              maxWidth: '680px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Ben&apos;s Blinds partners exclusively with manufacturers who share our
            commitment to quality craftsmanship and long-term performance. Every
            brand on this page is one we&apos;ve installed, tested, and stand behind.
          </p>
        </div>
      </section>

      {/* Partner cards */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {sortedPartners.map((partner) => {
              const partnerProducts = PRODUCTS.filter((p) =>
                partner.products.includes(p.key)
              )

              return (
                <div
                  key={partner.key}
                  id={partner.key}
                  className="card"
                  style={{ padding: '2.5rem', scrollMarginTop: '5rem' }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '1.5rem',
                            color: 'var(--text)',
                            margin: 0,
                          }}
                        >
                          {partner.name}
                        </h2>
                        <span
                          className="chip"
                          style={{
                            background: partner.tier === 'premier'
                              ? 'var(--brand)'
                              : partner.tier === 'certified'
                              ? 'var(--brand-subtle)'
                              : 'var(--gray-100)',
                            color: partner.tier === 'premier'
                              ? '#fff'
                              : partner.tier === 'certified'
                              ? 'var(--brand)'
                              : 'var(--text-secondary)',
                          }}
                        >
                          {TIER_LABELS[partner.tier]}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9375rem',
                          color: 'var(--text-3)',
                          margin: 0,
                        }}
                      >
                        {partner.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '2.5rem',
                    }}
                  >
                    {/* Left: description + highlights */}
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9375rem',
                          color: 'var(--text-2)',
                          lineHeight: 1.65,
                          marginBottom: '1.25rem',
                        }}
                      >
                        {partner.description}
                      </p>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        {partner.highlights.map((h) => (
                          <li
                            key={h}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.875rem',
                              color: 'var(--text-2)',
                            }}
                          >
                            <Icon
                              name="check"
                              size={14}
                              style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '3px' }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: products + CTA */}
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          color: 'var(--text)',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        Available Products
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1.75rem',
                        }}
                      >
                        {partnerProducts.map((product) => (
                          <Link
                            key={product.key}
                            href={`/products/${product.key}`}
                            className="pill-link"
                          >
                            <Icon name="chevron-right" size={12} />
                            {product.name}
                          </Link>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <Link href="/quote" className="btn btn-primary btn-sm">
                          Get a Quote
                        </Link>
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                        >
                          Visit {partner.name.split(' ')[0]}
                          <Icon name="external-link" size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Become a customer CTA */}
      <section
        style={{
          padding: '4rem 1.5rem',
          background: 'var(--brand)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.75rem',
              color: '#fff',
              marginBottom: '0.75rem',
            }}
          >
            Access Every Brand: One Consultation
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            We bring samples from all our partner brands to your home. You compare
            materials and colors in your actual light: no showroom guessing.
          </p>
          <Link
            href="/quote"
            className="btn"
            style={{
              background: '#fff',
              color: 'var(--brand)',
              fontSize: '1rem',
              padding: '0.875rem 2rem',
            }}
          >
            Book Free In-Home Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
