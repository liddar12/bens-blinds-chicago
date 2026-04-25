'use client'

import Link from 'next/link'
import { useSeasonContext } from '@/contexts/SeasonContext'
import { SEASONS, PRODUCTS, NEIGHBORHOODS, type SeasonKey } from '@/lib/season'
import { PARTNERS } from '@/lib/partners'
import { BLOG_POSTS } from '@/lib/blog'
import { Icon } from '@/components/ui/Icon'
import { IMG } from '@/lib/images'

const HERO_COPY: Record<SeasonKey, { headline: string; sub: string; cta: string }> = {
  spring:   { headline: 'Let Spring In: Without the Glare', sub: 'Light-filtering shades that celebrate Chicago\'s renewal.', cta: 'Explore Spring Styles' },
  summer:   { headline: 'Stay Cool All Summer', sub: 'Solar shades block 85% of UV while keeping your skyline view.', cta: 'Beat the Heat' },
  fall:     { headline: 'Warm Up Your Windows for Fall', sub: 'Wood blinds and layered drapery for Chicago\'s crisp autumn.', cta: 'Shop Fall Favorites' },
  winter:   { headline: 'Insulate Against the Chicago Cold', sub: 'Cellular shades cut heat loss by up to 40%. Stay warm.', cta: 'Insulating Shades' },
  severe:   { headline: 'Polar Vortex Protection Starts Here', sub: 'Our blackout cellular shades are the warmest you can buy.', cta: 'Emergency Warmth' },
  heatwave: { headline: 'Block the Scorching Heat', sub: 'Heat-blocking solar shades: free in-home install consultation.', cta: 'Cool My Home' },
}

const PROCESS_STEPS = [
  { icon: 'calendar', title: 'Book a Free Consult', body: 'Pick a time online or call. We come to you: no showroom hassle.' },
  { icon: 'ruler',    title: 'Measure & Design',    body: 'Our expert measures every window and helps you pick the perfect product.' },
  { icon: 'clipboard', title: 'Custom Fabrication', body: 'Your treatments are made to spec and delivered in 2–3 weeks.' },
  { icon: 'check',    title: 'Professional Install', body: 'We hang everything, clean up, and make sure you love the result.' },
]

const REVIEWS = [
  { name: 'Sarah M.', hood: 'Lincoln Park', stars: 5, text: 'Ben\'s Blinds transformed our bay windows. The cellular shades are gorgeous and our heating bill dropped noticeably.' },
  { name: 'James K.', hood: 'Wicker Park',  stars: 5, text: 'Called on a Tuesday, had measurements Thursday, blinds installed the following week. Absolute pros.' },
  { name: 'Rita L.',  hood: 'Gold Coast',   stars: 5, text: 'Best decision I made for my condo. The motorized shades work flawlessly with HomeKit. 10/10 recommend.' },
]

interface TinaFieldMap {
  heroHeadline?: string
  heroSub?: string
  heroCta?: string
  ctaHeadline?: string
  ctaBody?: string
  reviewFields?: Array<{ name?: string; hood?: string; text?: string }>
}

interface HomeClientProps {
  heroOverride?: { headline: string; sub: string; cta: string }
  reviewsOverride?: Array<{ name: string; hood: string; stars: number; text: string }>
  ctaOverride?: { headline: string; body: string }
  tinaFields?: TinaFieldMap
}

export function HomeClient({ heroOverride, reviewsOverride, ctaOverride, tinaFields }: HomeClientProps = {}) {
  const { season, tempF } = useSeasonContext()
  const copy = heroOverride ?? HERO_COPY[season]
  const seasonInfo = SEASONS[season]
  const reviews = reviewsOverride ?? REVIEWS

  const recommendedProducts = PRODUCTS.filter((p) => p.recommend.includes(season))
  const otherProducts = PRODUCTS.filter((p) => !p.recommend.includes(season))
  const sortedProducts = [...recommendedProducts, ...otherProducts]

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--surface-2)',
          padding: '5rem 1.5rem 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'var(--brand)',
              color: '#fff',
              fontSize: '0.8125rem',
              fontWeight: 600,
              padding: '0.25rem 0.75rem',
              borderRadius: '100px',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            <Icon name={seasonInfo.icon} size={13} />
            Chicago {seasonInfo.label}{tempF !== null ? ` · ${tempF}°F` : ` · ${seasonInfo.cond}`}
          </div>
          <h1
            data-tina-field={tinaFields?.heroHeadline}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.1,
              marginBottom: '1rem',
              maxWidth: '800px',
              margin: '0 auto 1rem',
            }}
          >
            {copy.headline}
          </h1>
          <p
            data-tina-field={tinaFields?.heroSub}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-2)',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
            }}
          >
            {copy.sub}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }} data-tina-field={tinaFields?.heroCta}>
              {copy.cta}
            </Link>
            <a href="tel:+13123610908" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              <Icon name="phone" size={16} />
              (312) 361-0908
            </a>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            ★★★★★ 4.9 · 312 Chicago reviews · Free in-home consultation
          </p>
        </div>

        {/* Hero room illustration */}
        <div
          style={{
            marginTop: '3rem',
            maxWidth: '900px',
            margin: '3rem auto 0',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            lineHeight: 0,
          }}
        >
          <img
            src={IMG.heroLiving}
            alt="Chicago living room with custom window treatments"
            style={{ width: '100%', display: 'block' }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1.25rem 1.5rem' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {[
            { icon: 'star',    label: '4.9 Stars · 312 Reviews' },
            { icon: 'shield',  label: 'Licensed & Insured' },
            { icon: 'home',    label: 'Free In-Home Consultation' },
            { icon: 'clock',   label: '20+ Years Chicago Experience' },
            { icon: 'wrench',  label: 'Professional Installation' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-2)',
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
              }}
            >
              <Icon name={item.icon} size={16} style={{ color: 'var(--brand)' }} />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Products ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
              Window Treatments
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: '0.75rem',
              }}
            >
              The Right Shade for Every Chicago Window
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              {seasonInfo.rec}. All products custom-measured and professionally installed.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {sortedProducts.map((product) => {
              const isRecommended = product.recommend.includes(season)
              return (
                <Link
                  key={product.key}
                  href={`/products/${product.key}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="card"
                    style={{
                      height: '100%',
                      cursor: 'pointer',
                      padding: 0,
                      border: isRecommended ? '2px solid var(--brand)' : undefined,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {isRecommended && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          background: 'var(--brand)',
                          color: '#fff',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontFamily: 'var(--font-body)',
                          zIndex: 1,
                        }}
                      >
                        {seasonInfo.label} Pick
                      </div>
                    )}
                    <div style={{ lineHeight: 0, height: '160px', overflow: 'hidden', background: 'var(--surface-2)', flexShrink: 0 }}>
                      <img
                        src={(IMG[product.key as keyof typeof IMG] as string) || IMG.heroLiving}
                        alt={product.name}
                        style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)', marginBottom: '0.375rem' }}>
                        {product.name}
                      </h3>
                      <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.5, fontFamily: 'var(--font-body)', marginBottom: '0.75rem', flex: 1 }}>
                        {product.blurb}
                      </p>
                      <span style={{ color: 'var(--brand)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-body)' }}>
                        Learn more <Icon name="arrow" size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Neighborhoods ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--surface-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
              Service Areas
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: '0.75rem',
              }}
            >
              We Know Chicago&apos;s Neighborhoods
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              From Gold Coast penthouses to Pilsen bungalows: every window type, every architecture.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {NEIGHBORHOODS.slice(0, 8).map((n) => (
              <Link
                key={n.name}
                href={`/neighborhoods/${n.name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
                  style={{ padding: '1.25rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <Icon name="map" size={14} style={{ color: 'var(--brand)' }} />
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                      {n.name}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-2)', lineHeight: 1.4, fontFamily: 'var(--font-body)', margin: 0 }}>
                    {n.sub}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/neighborhoods" className="btn btn-secondary">
              View All Neighborhoods <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" style={{ padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
              How It Works
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text)',
              }}
            >
              From First Call to Perfect Fit
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--brand)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    position: 'relative',
                  }}
                >
                  <Icon name={step.icon} size={22} />
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'var(--surface)',
                      border: '2px solid var(--brand)',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      color: 'var(--brand)',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--surface-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
              Reviews
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text)' }}>
              Chicagoans Love Their New Windows
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {reviews.map((r, i) => (
              <div key={r.name} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.125rem', marginBottom: '0.75rem' }}>
                  {Array.from({ length: r.stars }).map((_, si) => (
                    <Icon key={si} name="star" size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  ))}
                </div>
                <p data-tina-field={tinaFields?.reviewFields?.[i]?.text} style={{ color: 'var(--text)', fontSize: '0.9375rem', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--brand)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      flexShrink: 0,
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p data-tina-field={tinaFields?.reviewFields?.[i]?.name} style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', fontFamily: 'var(--font-body)', margin: 0 }}>{r.name}</p>
                    <p data-tina-field={tinaFields?.reviewFields?.[i]?.hood} style={{ fontSize: '0.8125rem', color: 'var(--text-2)', fontFamily: 'var(--font-body)', margin: 0 }}>{r.hood}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ color: 'var(--brand)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem', fontFamily: 'var(--font-body)' }}>
                Chicago Window Guides
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
                From the Blog
              </h2>
            </div>
            <Link href="/blog" style={{ color: 'var(--brand)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
              All guides <Icon name="arrow" size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ lineHeight: 0, height: '140px', overflow: 'hidden', background: 'var(--surface-2)', flexShrink: 0 }}>
                    <img src={post.image} alt={post.imageAlt} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.5rem', flex: 1 }}>
                      {post.title}
                    </h3>
                    <span style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      Read guide <Icon name="arrow" size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Partners ── */}
      <section style={{ padding: '3.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Authorized Dealer For
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            {PARTNERS.map((partner) => (
              <Link
                key={partner.key}
                href={`/partners#${partner.key}`}
                className="partner-brand-pill"
              >
                {partner.tier === 'premier' && (
                  <Icon name="star" size={13} style={{ color: 'var(--brand)' }} />
                )}
                {partner.name}
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center' }}>
            <Link
              href="/partners"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--brand)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Learn about our brand partners →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'var(--brand)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2
            data-tina-field={tinaFields?.ctaHeadline}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            {ctaOverride?.headline ?? 'Ready for New Windows That Work for Chicago?'}
          </h2>
          <p data-tina-field={tinaFields?.ctaBody} style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.6, fontSize: '1.0625rem', fontFamily: 'var(--font-body)' }}>
            {ctaOverride?.body ?? 'Book a free in-home consultation. We measure, design, and install: you just enjoy the view.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
              Get Your Free Quote
            </Link>
            <a
              href="tel:+13123610908"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius)',
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Icon name="phone" size={16} />
              (312) 361-0908
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
