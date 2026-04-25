import { PublishButton } from './PublishButton'

export const metadata = { title: 'Publish to Production — Ben\'s Blinds' }

export default function PublishPage() {
  const secret = process.env.PUBLISH_SECRET ?? ''
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', padding: '2rem' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', maxWidth: '480px', width: '100%', boxShadow: 'var(--shadow)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
          Publish to Production
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          This merges the <strong>content</strong> branch into <strong>main</strong> and triggers a Netlify production deploy (~2 min).
        </p>
        <PublishButton secret={secret} />
        <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
          After publishing, the live site at <strong>bensblinds.com</strong> will update automatically.
        </p>
      </div>
    </main>
  )
}
