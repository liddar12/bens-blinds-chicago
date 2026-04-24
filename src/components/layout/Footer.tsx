import Link from 'next/link'
import { BbMark } from '@/components/ui/BbMark'
import { Skyline } from '@/components/ui/Skyline'
import { Icon } from '@/components/ui/Icon'
import { PRODUCTS, NEIGHBORHOODS } from '@/lib/season'

const PRODUCT_LINKS = PRODUCTS.map((p) => ({ label: p.name, href: `/products/${p.key}` }))
const NEIGHBORHOOD_LINKS = NEIGHBORHOODS.slice(0, 6).map((n) => ({
  label: n.name,
  href: `/neighborhoods#${n.name.toLowerCase().replace(/\s+/g, '-')}`,
}))

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--navy, #0a1628)',
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'var(--font-body)',
        marginTop: 'auto',
      }}
    >
      {/* Skyline decoration */}
      <div style={{ lineHeight: 0 }}>
        <Skyline height={80} opacity={0.12} color="#fff" />
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', marginBottom: '1rem' }}
            >
              <BbMark size={30} color="#fff" />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#fff',
                }}
              >
                Ben&apos;s Blinds
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Chicago&apos;s trusted window treatment specialists since 2005. Free in-home consultations throughout Chicagoland.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <a
                href="tel:+13123610908"
                style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Icon name="phone" size={14} />
                (312) 361-0908
              </a>
              <a
                href="mailto:info@bensblinds.com"
                style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Icon name="mail" size={14} />
                info@bensblinds.com
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Products
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {PRODUCT_LINKS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Neighborhoods
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NEIGHBORHOOD_LINKS.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Brand Partners', href: '/partners' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Seasonal Guide', href: '/seasonal' },
                { label: 'Get a Quote', href: '/quote' },
                { label: 'Our Process', href: '/#process' },
                { label: 'Service Areas', href: '/neighborhoods' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; 2025 Ben&apos;s Blinds Chicago. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
