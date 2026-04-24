'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { PRODUCTS, NEIGHBORHOODS } from '@/lib/season'

type Step = 1 | 2 | 3 | 4

interface FormData {
  // Step 1 - Room & needs
  rooms: string[]
  needs: string[]
  // Step 2 - Product interest
  products: string[]
  // Step 3 - Contact
  name: string
  email: string
  phone: string
  address: string
  neighborhood: string
  // Step 4 - Schedule
  preferredDate: string
  preferredTime: string
  notes: string
}

const ROOM_OPTIONS = ['Living Room', 'Master Bedroom', 'Child\'s Bedroom', 'Kitchen', 'Bathroom', 'Home Office', 'Dining Room', 'Basement', 'Sunroom']
const NEED_OPTIONS = ['Privacy', 'Light Control', 'Energy Savings', 'UV Protection', 'Blackout for Sleep', 'Smart Home', 'Aesthetics / Style', 'Sound Reduction']
const TIME_OPTIONS = ['8am–10am', '10am–12pm', '12pm–2pm', '2pm–4pm', '4pm–6pm']

const STEPS = [
  { label: 'Rooms & Needs', icon: 'home' },
  { label: 'Products',      icon: 'star' },
  { label: 'Your Info',     icon: 'user' },
  { label: 'Schedule',      icon: 'calendar' },
]

export default function QuotePage() {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    rooms: [], needs: [], products: [],
    name: '', email: '', phone: '', address: '', neighborhood: '',
    preferredDate: '', preferredTime: '', notes: '',
  })

  function toggle<K extends 'rooms' | 'needs' | 'products'>(field: K, value: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }))
  }

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit() {
    // In production this would POST to a Netlify form or serverless function
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '520px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--brand)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <Icon name="check" size={28} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
            We&apos;ll be in touch shortly!
          </h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '2rem' }}>
            Thanks {form.name.split(' ')[0]}! One of our Chicago window specialists will call you within 1 business day to confirm your consultation time.
          </p>
          <Link href="/" className="btn btn-secondary">Back to Home</Link>
        </div>
      </section>
    )
  }

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.5rem 1rem',
    borderRadius: '100px',
    border: `2px solid ${active ? 'var(--brand)' : 'var(--border)'}`,
    background: active ? 'var(--brand)' : 'var(--surface)',
    color: active ? '#fff' : 'var(--text)',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.15s',
  })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)',
    color: 'var(--text)',
    background: 'var(--surface)',
    boxSizing: 'border-box',
  }

  return (
    <section style={{ padding: '4rem 1.5rem 6rem' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--text)', marginBottom: '0.5rem' }}>
            Get Your Free Quote
          </h1>
          <p style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
            Free in-home consultation · No pressure · Chicago experts
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', marginBottom: '2.5rem', position: 'relative' }}>
          {STEPS.map((s, i) => {
            const n = (i + 1) as Step
            const isActive = step === n
            const isDone = step > n
            return (
              <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {i > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '-50%',
                      top: '18px',
                      width: '100%',
                      height: '2px',
                      background: isDone ? 'var(--brand)' : 'var(--border)',
                      zIndex: 0,
                    }}
                  />
                )}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isActive || isDone ? 'var(--brand)' : 'var(--surface-2)',
                    color: isActive || isDone ? '#fff' : 'var(--text-3)',
                    border: `2px solid ${isActive || isDone ? 'var(--brand)' : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    position: 'relative',
                    zIndex: 1,
                    marginBottom: '0.375rem',
                  }}
                >
                  {isDone ? <Icon name="check" size={16} /> : n}
                </div>
                <span style={{ fontSize: '0.75rem', color: isActive ? 'var(--brand)' : 'var(--text-3)', fontWeight: isActive ? 600 : 400, fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Steps */}
        <div className="card" style={{ padding: '2rem' }}>
          {step === 1 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                Which rooms need new window treatments?
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', marginBottom: '1.25rem' }}>
                Select all that apply.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {ROOM_OPTIONS.map((r) => (
                  <button key={r} onClick={() => toggle('rooms', r)} style={chipStyle(form.rooms.includes(r))}>
                    {r}
                  </button>
                ))}
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                What matters most to you?
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', marginBottom: '1.25rem' }}>
                Select all that apply.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {NEED_OPTIONS.map((n) => (
                  <button key={n} onClick={() => toggle('needs', n)} style={chipStyle(form.needs.includes(n))}>
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={form.rooms.length === 0}
              >
                Next: Product Interests <Icon name="arrow" size={16} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                Any products you&apos;re interested in?
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', marginBottom: '1.25rem' }}>
                Not sure yet? No worries: we&apos;ll recommend during your visit.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {PRODUCTS.map((p) => (
                  <button key={p.key} onClick={() => toggle('products', p.key)} style={chipStyle(form.products.includes(p.key))}>
                    {p.name}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2 }}>
                  Next: Your Info <Icon name="arrow" size={16} />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
                Where should we send your specialist?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Full name *"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  required
                />
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="Email address *"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  required
                />
                <input
                  style={inputStyle}
                  type="tel"
                  placeholder="Phone number *"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  required
                />
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Street address"
                  value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                />
                <select
                  style={inputStyle}
                  value={form.neighborhood}
                  onChange={(e) => set('neighborhood', e.target.value)}
                >
                  <option value="">Select your neighborhood</option>
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n.name} value={n.name}>{n.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                  disabled={!form.name || !form.email || !form.phone}
                >
                  Next: Schedule <Icon name="arrow" size={16} />
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
                When works best for you?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--font-body)', marginBottom: '0.375rem' }}>
                    Preferred date
                  </label>
                  <input
                    style={inputStyle}
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => set('preferredDate', e.target.value)}
                    min={new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--font-body)', marginBottom: '0.375rem' }}>
                    Preferred time
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {TIME_OPTIONS.map((t) => (
                      <button key={t} onClick={() => set('preferredTime', t)} style={chipStyle(form.preferredTime === t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--font-body)', marginBottom: '0.375rem' }}>
                    Additional notes (optional)
                  </label>
                  <textarea
                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                    placeholder="Anything we should know? Parking, building access, specific windows..."
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '1.25rem' }}>
                By submitting you agree to be contacted by Ben&apos;s Blinds. We never share your information.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={() => setStep(3)} className="btn btn-secondary" style={{ flex: 1 }}>
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  Book My Free Consultation ✓
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
