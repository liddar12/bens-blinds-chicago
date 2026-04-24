import type { Metadata } from 'next'
import Link from 'next/link'
import { PRODUCTS, SEASONS } from '@/lib/season'
import { IMG } from '@/lib/images'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: "Window Treatments Chicago | Blinds, Shades & Shutters",
  description:
    "Shop all custom window treatments from Ben's Blinds Chicago: cellular shades, solar screens, roller shades, wood blinds, plantation shutters, roman shades, motorized shades, and drapery. Free in-home measurement and installation throughout Chicagoland.",
  keywords: [
    'window treatments chicago',
    'custom blinds chicago',
    'shades chicago',
    'shutters chicago',
    'cellular shades chicago',
    'roller shades chicago',
    'solar shades chicago',
    'wood blinds chicago',
    'motorized shades chicago',
    'roman shades chicago',
  ],
  openGraph: {
    title: "All Window Treatments | Ben's Blinds Chicago",
    description:
      "Custom blinds, shades, shutters, and drapery — measured and installed throughout Chicago. Hunter Douglas dealer.",
  },
  alternates: { canonical: 'https://bensblinds.com/products' },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Ben's Blinds Chicago — Window Treatment Products",
  description: "Custom window treatments measured and installed throughout Chicagoland",
  url: 'https://bensblinds.com/products',
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://bensblinds.com/products/${p.key}`,
    name: p.name,
    description: p.blurb,
  })),
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
            Custom Window Treatments
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Every Window. Every Style. Every Budget.
          </h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '1.0625rem', fontFamily: 'var(--font-body)', marginBottom: '2rem' }}>
            Eight product lines, all custom-measured and professionally installed throughout Chicago. We carry Hunter Douglas, Horizons, and more — and every quote starts with a free in-home visit.
          </p>
          <Link href="/quote" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            Book Free Consultation
          </Link>
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {PRODUCTS.map((product) => {
              const seasonLabels = product.recommend.map((s) => SEASONS[s].label).join(', ')
              return (
                <Link
                  key={product.key}
                  href={`/products/${product.key}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ lineHeight: 0, height: '200px', overflow: 'hidden', background: 'var(--surface-2)' }}>
                      <img
                        src={IMG[product.key as keyof typeof IMG] as string || IMG.heroLiving}
                        alt={`${product.name} installed in a Chicago home — custom window treatment`}
                        style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                        {product.name}
                      </h2>
                      <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '1rem', flex: 1 }}>
                        {product.blurb}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                          Best for: {seasonLabels}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
                          Learn more <Icon name="arrow" size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ padding: '3rem 1.5rem', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { icon: 'measure', label: 'Free In-Home Measurement', sub: 'We come to you anywhere in Chicagoland' },
              { icon: 'install', label: 'Expert Installation', sub: 'Licensed, insured, Chicago-based team' },
              { icon: 'check', label: 'No-Pressure Quotes', sub: 'Every quote is free and obligation-free' },
              { icon: 'star', label: '4.9★ · 312 Reviews', sub: 'Chicago\'s most trusted window treatment dealer' },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-3)' }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
            Not sure which product is right for your windows?
          </h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
            Our Chicago window specialists will assess your space, lighting needs, and budget — and recommend exactly the right treatment for every room.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Book Free Consultation
            </Link>
            <Link href="/faq" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Common Questions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
