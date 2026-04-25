import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: "Window Treatment FAQs",
  description:
    "Answers to common questions about blinds, shades, and shutters in Chicago: installation, pricing, energy savings, smart home integration, and more.",
  alternates: { canonical: 'https://bensblinds.com/faq' },
}

const FAQS = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How does your free in-home consultation work?',
        a: 'We come to your home, measure every window, walk through your goals (privacy, light control, energy savings), and show you samples on-site. The consultation is completely free with no pressure. Most consultations take 45–90 minutes.',
      },
      {
        q: 'What areas of Chicago do you serve?',
        a: 'We serve all Chicago neighborhoods plus the north and south suburbs. That includes Lincoln Park, Wicker Park, Logan Square, Gold Coast, Lakeview, West Loop, Hyde Park, Pilsen, River North, Evanston, Oak Park, and beyond.',
      },
      {
        q: 'How long does installation take after I order?',
        a: 'Standard products ship in 2–3 weeks. Plantation shutters and custom drapery take 4–5 weeks. We schedule installation as soon as products arrive: usually within 1–2 days of delivery.',
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        q: 'How much do custom window treatments cost?',
        a: 'Roller and solar shades start around $69–$79 per panel. Cellular shades start at $89. Wood blinds start at $99. Roman shades start around $149. Plantation shutters start at $249 per panel. Motorized options add $100–$200 per treatment. We provide a detailed quote after measuring your windows.',
      },
      {
        q: 'Do you offer financing?',
        a: 'Yes, we offer 12-month interest-free financing through our partner program. Ask about financing options during your consultation.',
      },
      {
        q: 'Is installation included in the price?',
        a: 'Professional installation is included in all our quotes. We handle everything: mounting hardware, adjustments, and cleanup.',
      },
    ],
  },
  {
    category: 'Energy & Chicago Climate',
    items: [
      {
        q: 'Which window treatments work best for Chicago winters?',
        a: 'Cellular (honeycomb) shades are the gold standard for Chicago winters. Double-cell construction creates two air pockets that reduce heat loss by up to 40% compared to bare windows. For severe cold snaps, triple-cell with blackout lining provides maximum insulation.',
      },
      {
        q: 'How do I reduce heat and glare during Chicago summers?',
        a: 'Solar shades with 1–5% openness factor block 85–99% of UV radiation and dramatically reduce solar heat gain while maintaining your view. Motorized shades make it easy to adjust throughout the day as the sun moves.',
      },
      {
        q: 'Can window treatments actually lower my utility bills?',
        a: 'Yes, measurably so. Department of Energy studies show cellular shades can reduce heating and cooling costs by 10–15%. In a drafty Chicago greystone or a south-facing condo, the savings are often more significant.',
      },
    ],
  },
  {
    category: 'Smart Home & Motorization',
    items: [
      {
        q: 'Do your motorized shades work with Alexa and Google Home?',
        a: 'Yes. We install Somfy, Lutron, and Rollease motors: all compatible with Alexa, Google Home, Apple HomeKit, and SmartThings. You can control shades by voice, schedule, or phone app.',
      },
      {
        q: 'How are motorized shades powered?',
        a: 'Most of our motorized shades use rechargeable battery motors charged via USB: no electrician needed. For permanent installations, we can coordinate hardwired motors as well.',
      },
      {
        q: 'Can I motorize my existing shades?',
        a: 'Sometimes yes. Many shade brands support retrofit motors. During your consultation, we can assess whether your existing shades are motorization candidates.',
      },
    ],
  },
  {
    category: 'Installation & Warranty',
    items: [
      {
        q: 'What if my windows are oddly shaped or non-standard?',
        a: 'Non-standard windows are our specialty. We handle arches, skylights, bay windows, angled ceilings, oversized frames, and historic casements. We measure everything to the nearest 1/8 inch.',
      },
      {
        q: 'What warranty do your products carry?',
        a: 'Most of our products carry a 3–5 year manufacturer warranty. Hunter Douglas products carry lifetime warranties on most mechanisms. Plantation shutters can be covered with a lifetime warranty. We also warranty our installation workmanship.',
      },
      {
        q: 'What happens if something breaks after installation?',
        a: 'Call us. We stand behind our work and our products. For warranty claims, we coordinate directly with the manufacturer on your behalf. For out-of-warranty service, we offer a flat service call rate.',
      },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.flatMap((cat) =>
    cat.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))
  ),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
            FAQ
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Common Window Treatment Questions
          </h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '1.0625rem', fontFamily: 'var(--font-body)' }}>
            Everything you need to know before booking your free consultation.
          </p>
        </div>
      </section>

      {/* FAQ body */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {FAQS.map((cat) => (
            <div key={cat.category} style={{ marginBottom: '3.5rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'var(--brand)',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--border)',
                }}
              >
                {cat.category}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cat.items.map((f) => (
                  <details
                    key={f.q}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      overflow: 'hidden',
                    }}
                  >
                    <summary
                      style={{
                        padding: '1rem 1.25rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        listStyle: 'none',
                        userSelect: 'none',
                      }}
                    >
                      {f.q}
                      <Icon name="chevronDown" size={16} style={{ flexShrink: 0, color: 'var(--text-3)' }} />
                    </summary>
                    <div
                      style={{
                        padding: '0 1.25rem 1.25rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.7,
                      }}
                    >
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '2rem',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
              Still have questions?
            </h3>
            <p style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', marginBottom: '1.25rem' }}>
              We&apos;re happy to answer anything before you book.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/quote" className="btn btn-primary">Book Free Consultation</Link>
              <a href="tel:+13123610908" className="btn btn-secondary">
                <Icon name="phone" size={16} />
                (312) 361-0908
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
