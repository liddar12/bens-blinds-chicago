'use client'

import Link from 'next/link'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Icon } from '@/components/ui/Icon'
import type { BlogQuery, BlogQueryVariables } from '../../../tina/__generated__/types'

interface Props {
  query: string
  variables: BlogQueryVariables
  data: BlogQuery
  related: Array<{ slug: string; title: string; date: string }>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function BlogPostClient({ query, variables, data: initialData, related }: Props) {
  const { data } = useTina<BlogQuery>({ query, variables, data: initialData })
  const post = data.blog

  return (
    <>
      {/* Hero image */}
      <div style={{ height: '320px', overflow: 'hidden', background: 'var(--surface-2)' }}>
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt ?? ''}
            data-tina-field={tinaField(post, 'image')}
            style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        )}
      </div>

      {/* Article */}
      <article style={{ padding: '3rem 1.5rem 4rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p
            data-tina-field={tinaField(post, 'date')}
            style={{ fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}
          >
            {formatDate(post.date)} · Ben&apos;s Blinds Chicago
          </p>
          <h1
            data-tina-field={tinaField(post, 'title')}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', color: 'var(--text)', marginBottom: '1.25rem', lineHeight: 1.2 }}
          >
            {post.title}
          </h1>
          <p
            data-tina-field={tinaField(post, 'excerpt')}
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '2.5rem', borderLeft: '3px solid var(--brand)', paddingLeft: '1rem' }}
          >
            {post.excerpt}
          </p>

          {/* Rich-text body from TinaCMS */}
          <div
            data-tina-field={tinaField(post, 'body')}
            className="prose"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1.0625rem' }}
          >
            <TinaMarkdown
              content={post.body}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              h2: (props: any) => (
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: 'var(--text)', margin: '2rem 0 0.75rem' }}>
                    {props.children}
                  </h2>
                ),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              h3: (props: any) => (
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', color: 'var(--text)', margin: '1.5rem 0 0.625rem' }}>
                    {props.children}
                  </h3>
                ),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              p: (props: any) => (
                  <p style={{ marginBottom: '1.25rem', lineHeight: 1.75 }}>{props.children}</p>
                ),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ul: (props: any) => (
                  <ul style={{ margin: '0.75rem 0 1.25rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {props.children}
                  </ul>
                ),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              li: (props: any) => (
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '1rem', lineHeight: 1.6 }}>
                    <Icon name="check" size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '4px' }} />
                    <span>{props.children}</span>
                  </li>
                ),
              }}
            />
          </div>

          {/* CTA inline */}
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface-2)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--brand)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
              Ready for a free in-home consultation?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              We come to you, measure every window, and give you a written quote on the spot. Serving all Chicago neighborhoods.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/quote" className="btn btn-primary" style={{ fontSize: '0.9375rem' }}>
                Book Free Consultation
              </Link>
              <a href="tel:+13123610908" className="btn btn-secondary" style={{ fontSize: '0.9375rem' }}>
                (312) 361-0908
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ padding: '3rem 1.5rem 4rem', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
              More Chicago Window Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '1.25rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '0.375rem' }}>
                      {formatDate(p.date)}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--brand)', fontWeight: 600, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      Read guide <Icon name="arrow" size={12} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
