'use client'

import { useState } from 'react'

export function PublishButton({ secret }: { secret: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'noop' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handlePublish() {
    setState('loading')
    setMessage('')
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: secret ? { Authorization: `Bearer ${secret}` } : {},
      })
      const json = await res.json()
      if (!res.ok) {
        setState('error')
        setMessage(json.error ?? 'Unknown error')
        return
      }
      if (json.status === 'no-op') {
        setState('noop')
        setMessage(json.message)
      } else {
        setState('success')
        setMessage(json.message)
      }
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Network error')
    }
  }

  const isLoading = state === 'loading'

  return (
    <>
      <button
        onClick={handlePublish}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.875rem 1.5rem',
          background: isLoading ? 'var(--text-3)' : 'var(--brand)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '1rem',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.15s',
        }}
      >
        {isLoading ? 'Publishing…' : 'Publish to Production'}
      </button>
      {message && (
        <div style={{
          marginTop: '1rem',
          padding: '0.875rem 1rem',
          borderRadius: 'var(--radius)',
          background: state === 'error' ? '#fef2f2' : state === 'success' ? '#f0fdf4' : 'var(--surface-2)',
          border: `1px solid ${state === 'error' ? '#fca5a5' : state === 'success' ? '#86efac' : 'var(--border)'}`,
          color: state === 'error' ? '#dc2626' : state === 'success' ? '#16a34a' : 'var(--text-2)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          lineHeight: 1.5,
        }}>
          {message}
        </div>
      )}
    </>
  )
}
