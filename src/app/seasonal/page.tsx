import type { Metadata } from 'next'
import Link from 'next/link'
import { SEASONS, PRODUCTS, type SeasonKey } from '@/lib/season'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: "Chicago Window Treatment Seasonal Guide",
  description:
    "The complete guide to window treatments for every Chicago season: spring light-filtering to polar vortex insulation. Expert advice matched to Chicago's climate.",
  alternates: { canonical: 'https://bensblinds.com/seasonal' },
}

const SEASONAL_CONTENT: Record<SeasonKey, {
  months: string
  challenge: string
  solution: string
  tips: string[]
}> = {
  spring: {
    months: 'March · April · May',
    challenge: 'Chicago springs are unpredictable: 55°F and sunny one day, 38°F and rainy the next. You need flexibility.',
    solution: 'Light-filtering roller and cellular shades that let you modulate natural light without committing to blackout.',
    tips: [
      'Choose light-filtering fabrics that diffuse the strengthening spring sun',
      'Top-down/bottom-up cellular shades give privacy while letting in sky light',
      'Solar shades with 10–14% openness let in spring air while filtering UV',
      'Consider layering sheers with blackout for maximum flexibility',
    ],
  },
  summer: {
    months: 'June · July · August',
    challenge: 'Chicago summers hit 88°F+ with brutal humidity and south/west sun that turns rooms into ovens. Lake breezes help but windows face all directions.',
    solution: 'Solar shades with 1–5% openness block 85–99% of UV while keeping your city view. Motorized shades let you adjust throughout the day.',
    tips: [
      'South and west windows benefit most from 1–3% openness solar shades',
      'Motorized shades with sunrise/sunset schedules maximize passive cooling',
      'Light-colored shade fabrics reflect heat better than dark ones',
      'Layering blackout with solar gives you total control',
    ],
  },
  fall: {
    months: 'September · October · November',
    challenge: 'Fall in Chicago means dramatic temperature swings. You want to capture the warm golden light while preparing for what\'s coming.',
    solution: 'Wood blinds and Roman shades add warmth visually, while cellular shades begin to earn their keep as temperatures drop.',
    tips: [
      'This is the ideal time to add cellular shades before heating season',
      'Wood tones and autumn fabric palettes create cozy interiors',
      'Keep solar shades on south windows: fall sun angle can still heat rooms',
      'Check your window seals and add insulating shades before November',
    ],
  },
  winter: {
    months: 'December · January · February',
    challenge: 'Chicago winter is brutal. Average temps in the teens and twenties. Older windows and drafty greystones lose enormous heat through bare glass.',
    solution: 'Double or triple-cell cellular shades are non-negotiable. They create air pocket barriers that reduce heat loss by up to 40%.',
    tips: [
      'Double-cell honeycomb shades for most rooms, triple-cell for north-facing',
      'Close shades at dusk to trap heat: open during sunny days for solar gain',
      'Cordless cellular shades are safer for children and easier to operate daily',
      'Roman shades over cellular shades adds another insulating layer',
    ],
  },
  severe: {
    months: 'Polar Vortex Events',
    challenge: 'Chicago\'s polar vortex events bring -20°F wind chills. Standard windows become heat sieves. Pipes freeze. Utility bills spike dangerously.',
    solution: 'Triple-cell blackout cellular shades, ideally combined with blackout drapery for maximum insulation on the most exposed windows.',
    tips: [
      'Triple-cell cellular shades reduce heat loss by up to 40% vs bare windows',
      'Add blackout Roman shades or drapery as a second insulating layer',
      'Focus first on north-facing windows: they get no solar gain in winter',
      'Check for drafts around frames: no shade compensates for a bad seal',
    ],
  },
  heatwave: {
    months: 'Heat Events · June–August',
    challenge: 'Chicago heat emergencies hit 100°F+ with extreme humidity. South and west windows can add 10°F to room temperature. Cooling costs spike.',
    solution: 'Tight-weave solar shades (1–3% openness) block 97–99% of UV and cut solar heat gain dramatically. Motorization lets you automate during peak hours.',
    tips: [
      '1% openness solar shades are most effective during extreme heat',
      'Dark-colored shade fabrics absorb and block more solar heat',
      'Automate to close shades before peak sun hours (10am–4pm)',
      'Interior shades help, but exterior shades block heat before it enters',
    ],
  },
}

const seasonOrder: SeasonKey[] = ['spring', 'summer', 'fall', 'winter', 'severe', 'heatwave']

export default function SeasonalPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
            Seasonal Guide
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Window Treatments for Every Chicago Season
          </h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '1.0625rem', fontFamily: 'var(--font-body)' }}>
            Chicago has five seasons: spring, summer, fall, winter, and polar vortex. Your window treatments should handle all of them.
          </p>
        </div>
      </section>

      {/* Season sections */}
      {seasonOrder.map((key, i) => {
        const info = SEASONS[key]
        const content = SEASONAL_CONTENT[key]
        const recommended = PRODUCTS.filter((p) => p.recommend.includes(key))
        const isEven = i % 2 === 0

        return (
          <section
            key={key}
            id={key}
            style={{ padding: '4rem 1.5rem', background: isEven ? 'var(--surface)' : 'var(--surface-2)' }}
          >
            <div className="container" style={{ maxWidth: '900px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '3rem',
                  alignItems: 'start',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'var(--brand)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon name={info.icon} size={20} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text)', margin: 0 }}>
                        {info.label}
                      </h2>
                      <p style={{ color: 'var(--text-3)', fontSize: '0.8125rem', fontFamily: 'var(--font-body)', margin: 0 }}>
                        {content.months}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem', fontFamily: 'var(--font-body)' }}>
                      The Challenge
                    </p>
                    <p style={{ color: 'var(--text-2)', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}>
                      {content.challenge}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem', fontFamily: 'var(--font-body)' }}>
                      Our Solution
                    </p>
                    <p style={{ color: 'var(--text)', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500 }}>
                      {content.solution}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {recommended.map((p) => (
                      <Link
                        key={p.key}
                        href={`/products/${p.key}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: 'var(--brand)',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.3rem 0.625rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '1rem' }}>
                    Expert Tips
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {content.tips.map((tip) => (
                      <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <Icon name="check" size={15} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--brand)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' }}>
            Year-Round Chicago Experts
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
            Tell us your season, your exposure, and your windows: we&apos;ll match you to the perfect treatment.
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
            Book Free Consultation <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
