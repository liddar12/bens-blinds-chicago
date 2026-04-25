'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BbMark } from '@/components/ui/BbMark'
import { Icon } from '@/components/ui/Icon'
import { PRODUCTS } from '@/lib/season'
import siteSettings from '@/../content/settings/site.json'

const PRODUCT_LINKS = PRODUCTS.map((p) => ({
  label: p.name,
  href: `/products/${p.key}`,
}))

const NAV_LINKS = [
  { label: 'Products', href: '/products', mega: true },
  { label: 'Neighborhoods', href: '/neighborhoods' },
  { label: 'Blog', href: '/blog' },
  { label: 'Partners', href: '/partners' },
  { label: 'Seasonal Guide', href: '/seasonal' },
  { label: 'FAQ', href: '/faq' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  return (
    <header
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '0 1.5rem',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}
        >
          <BbMark size={32} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            Ben&apos;s Blinds
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) =>
            link.mega ? (
              <div key={link.label} style={{ position: 'relative' }}>
                <button
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={() => setMegaOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    borderRadius: 'var(--radius-sm)',
                  }}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                >
                  {link.label}
                  <Icon name="chevronDown" size={14} />
                </button>
                {megaOpen && (
                  <div
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: '1rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.25rem',
                      minWidth: '360px',
                      zIndex: 200,
                    }}
                    role="menu"
                  >
                    {PRODUCT_LINKS.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        role="menuitem"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          textDecoration: 'none',
                          color: 'var(--text)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                        onClick={() => setMegaOpen(false)}
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  padding: '0.5rem 0.75rem',
                  textDecoration: 'none',
                  color: 'var(--text)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
          <a
            href={`tel:+1${siteSettings.phone.replace(/\D/g, '')}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              color: 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
            className="nav-phone"
          >
            <Icon name="phone" size={15} />
            {siteSettings.phone}
          </a>
          <Link href="/quote" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.125rem' }}>
            Free Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="nav-hamburger"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text)',
            padding: '0.5rem',
          }}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--text)',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={`tel:+1${siteSettings.phone.replace(/\D/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              <Icon name="phone" size={16} />
              {siteSettings.phone}
            </a>
            <Link href="/quote" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              Free Quote
            </Link>
          </div>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-phone { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
