import type { Metadata } from 'next'
import Link from 'next/link'
import { NEIGHBORHOODS } from '@/lib/season'
import { IMG } from '@/lib/images'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: "Chicago Neighborhoods We Serve | Ben's Blinds",
  description:
    "Ben's Blinds serves every Chicago neighborhood: from Lincoln Park bay windows to West Loop loft glass. Free in-home consultation throughout Chicagoland.",
}

const NEIGHBORHOOD_DETAILS: Record<string, {
  headline: string
  intro: string
  commonWindows: string[]
  topProducts: string[]
}> = {
  lincolnPark: {
    headline: 'Lincoln Park Window Treatments',
    intro: 'Lincoln Park\'s Victorian-era greystone two-flats and courtyard buildings feature tall, narrow windows with elaborate millwork. We specialize in custom solutions that honor the architecture.',
    commonWindows: ['Floor-to-ceiling bay windows', 'Tall Victorian double-hungs', 'Transom windows above doors', 'Sunroom windows'],
    topProducts: ['Wood blinds', 'Roman shades', 'Plantation shutters'],
  },
  lakeview: {
    headline: 'Lakeview Window Treatments',
    intro: 'Lakeview mixes high-rise condos with vintage bungalows. East-facing lake views demand solar shades that protect against glare while keeping the vista.',
    commonWindows: ['East-facing high-rise glass', 'Vintage bungalow double-hungs', 'Rooftop deck skylights', 'Condo building standards'],
    topProducts: ['Solar shades', 'Roller shades', 'Motorized shades'],
  },
  goldCoast: {
    headline: 'Gold Coast Window Treatments',
    intro: 'Gold Coast pre-war cooperatives and modern condos on Lake Shore Drive demand premium treatments. We match the architecture\'s sophistication.',
    commonWindows: ['Pre-war casement windows', 'Modern floor-to-ceiling glass', 'Large formal living room windows', 'Master bedroom privacy needs'],
    topProducts: ['Plantation shutters', 'Motorized shades', 'Drapery'],
  },
  wickerPark: {
    headline: 'Wicker Park Window Treatments',
    intro: 'Wicker Park\'s 19th-century workers\' cottages and Italianate greystones have unique window profiles. Our measurement expertise handles every vintage frame.',
    commonWindows: ['Greystone bay windows', 'Vintage sash windows', 'Original wavy glass panes', 'Corner window pairs'],
    topProducts: ['Wood blinds', 'Cellular shades', 'Roman shades'],
  },
  logan: {
    headline: 'Logan Square Window Treatments',
    intro: 'Logan Square\'s two-flats and courtyard buildings are being renovated by design-conscious homeowners who want modern window treatments that respect the vintage architecture.',
    commonWindows: ['Bay window groupings', 'Original double-hung wood frames', 'Formal parlor windows', 'Kitchen window pairs'],
    topProducts: ['Roller shades', 'Roman shades', 'Wood blinds'],
  },
  westLoop: {
    headline: 'West Loop Window Treatments',
    intro: 'The West Loop\'s converted warehouse lofts and new construction high-rises feature oversized industrial windows that demand specialized motorized solutions.',
    commonWindows: ['Industrial steel-frame windows', 'Floor-to-ceiling loft glass', 'South-facing warehouse windows', 'Open-plan living glass'],
    topProducts: ['Motorized shades', 'Solar shades', 'Roller shades'],
  },
  hydePark: {
    headline: 'Hyde Park Window Treatments',
    intro: 'Hyde Park\'s historic landmark buildings and University of Chicago faculty homes have distinctive architectural character worth preserving.',
    commonWindows: ['Prairie-style horizontal bands', 'Gothic arch windows', 'Historic casements', 'Sunroom enclosures'],
    topProducts: ['Plantation shutters', 'Wood blinds', 'Cellular shades'],
  },
  pilsen: {
    headline: 'Pilsen Window Treatments',
    intro: 'Pilsen\'s colorful row-house bungalows and artist live/work spaces call for treatments that blend practicality with creative personality.',
    commonWindows: ['Bungalow picture windows', 'Studio skylight needs', 'Street-facing privacy windows', 'Brick-frame original windows'],
    topProducts: ['Cellular shades', 'Roller shades', 'Roman shades'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bensblinds.com' },
    { '@type': 'ListItem', position: 2, name: 'Neighborhoods', item: 'https://bensblinds.com/neighborhoods' },
  ],
}

export default function NeighborhoodsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
            Service Areas
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '1rem',
            }}
          >
            We Know Every Chicago Neighborhood
          </h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '1.0625rem', fontFamily: 'var(--font-body)' }}>
            From Gold Coast penthouses to Pilsen bungalows: we understand your building type, your window profiles, and what actually works in Chicago architecture.
          </p>
        </div>
      </section>

      {/* Neighborhood grid */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {NEIGHBORHOODS.map((n) => {
              const details = NEIGHBORHOOD_DETAILS[n.hood]
              const slug = n.name.toLowerCase().replace(/\s+/g, '-')
              return (
                <Link key={n.name} href={`/neighborhoods/${slug}`} style={{ textDecoration: 'none' }}>
                  <div id={slug} className="card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                    <div style={{ lineHeight: 0, height: '160px', overflow: 'hidden', background: 'var(--surface-2)' }}>
                      <img
                        src={IMG[n.hood as keyof typeof IMG] as string ?? IMG.heroLiving}
                        alt={`${n.name} Chicago neighborhood — custom window treatments by Ben's Blinds`}
                        style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                        {n.name}
                      </h2>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}>
                        {n.sub}
                      </p>
                      {details && (
                        <>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.5, fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}>
                            {details.intro.split('.')[0]}.
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {details.topProducts.map((p) => (
                              <span
                                key={p}
                                style={{
                                  background: 'var(--surface-2)',
                                  color: 'var(--text-2)',
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  fontFamily: 'var(--font-body)',
                                }}
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                      <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--brand)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                        View {n.name} guide →
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--brand)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' }}>
            Serving Your Neighborhood Since 2005
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
            Book a free in-home consultation. We come to you, anywhere in Chicagoland.
          </p>
          <Link
            href="/quote"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#fff',
              color: 'var(--brand)',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            Book Free In-Home Visit <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
