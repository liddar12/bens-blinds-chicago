import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { BLOG_POSTS } from '@/lib/blog'
import { tinaClient } from '@/lib/tina-client'
import { BlogPostClient } from '@/components/blog/BlogPostClient'

const fetchTinaBlog = cache(async (slug: string) => {
  'use cache'
  try {
    return await tinaClient.queries.blog({ relativePath: `${slug}.mdx` })
  } catch {
    return null
  }
})

const BASE = 'https://bensblinds.com'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ["Ben's Blinds Chicago"],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    alternates: { canonical: `${BASE}/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fallback = BLOG_POSTS.find((p) => p.slug === slug)
  if (!fallback) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
  }))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fallback.title,
    description: fallback.excerpt,
    image: `${BASE}${fallback.image}`,
    datePublished: fallback.date,
    dateModified: fallback.date,
    author: { '@type': 'Organization', name: "Ben's Blinds Chicago", url: BASE },
    publisher: {
      '@type': 'Organization',
      name: "Ben's Blinds Chicago",
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/og-default.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: fallback.title, item: `${BASE}/blog/${slug}` },
    ],
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tinaProps: { query: string; variables: { relativePath: string }; data: any } | null = null
  const tinaData = await fetchTinaBlog(slug)
  if (tinaData) {
    tinaProps = { query: tinaData.query, variables: tinaData.variables, data: tinaData.data }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', padding: '0.625rem 1.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', flexWrap: 'wrap' }}>
            <li><a href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</a></li>
            <li style={{ opacity: 0.5 }}>/</li>
            <li><a href="/blog" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Blog</a></li>
            <li style={{ opacity: 0.5 }}>/</li>
            <li style={{ color: 'var(--text-2)', fontWeight: 500 }}>{fallback.title}</li>
          </ol>
        </div>
      </nav>

      {tinaProps ? (
        <BlogPostClient {...tinaProps} related={related} />
      ) : (
        // Fallback render when TinaCMS not available (static hardcoded data)
        <FallbackBlogContent post={fallback} related={related} />
      )}
    </>
  )
}

import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { BlogPost } from '@/lib/blog'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function FallbackBlogContent({ post, related }: { post: BlogPost; related: Array<{ slug: string; title: string; date: string }> }) {
  return (
    <>
      <div style={{ height: '320px', overflow: 'hidden', background: 'var(--surface-2)' }}>
        <img src={post.image} alt={post.imageAlt} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} loading="eager" fetchPriority="high" decoding="async" />
      </div>
      <article style={{ padding: '3rem 1.5rem 4rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}>
            {formatDate(post.date)} · Ben&apos;s Blinds Chicago
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', color: 'var(--text)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '2.5rem', borderLeft: '3px solid var(--brand)', paddingLeft: '1rem' }}>
            {post.excerpt}
          </p>
          {post.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: '1.75rem' }}>
              {section.h2 && <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: 'var(--text)', marginBottom: '0.75rem' }}>{section.h2}</h2>}
              {section.h3 && <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', color: 'var(--text)', marginBottom: '0.625rem' }}>{section.h3}</h3>}
              {section.body && <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1.0625rem' }}>{section.body}</p>}
              {section.list && (
                <ul style={{ margin: '0.75rem 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {section.list.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontFamily: 'var(--font-body)', color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.6 }}>
                      <Icon name="check" size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '4px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface-2)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--brand)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)', marginBottom: '0.5rem' }}>Ready for a free in-home consultation?</p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>We come to you, measure every window, and give you a written quote on the spot. Serving all Chicago neighborhoods.</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/quote" className="btn btn-primary" style={{ fontSize: '0.9375rem' }}>Book Free Consultation</Link>
              <a href="tel:+13123610908" className="btn btn-secondary" style={{ fontSize: '0.9375rem' }}>(312) 361-0908</a>
            </div>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section style={{ padding: '3rem 1.5rem 4rem', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '1.5rem' }}>More Chicago Window Guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '1.25rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', marginBottom: '0.375rem' }}>{formatDate(p.date)}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--brand)', fontWeight: 600, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read guide <Icon name="arrow" size={12} /></p>
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
