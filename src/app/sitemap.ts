import type { MetadataRoute } from 'next'
import { PRODUCTS, NEIGHBORHOODS } from '@/lib/season'
import { BLOG_POSTS } from '@/lib/blog'

const BASE = 'https://bensblinds.com'
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${p.key}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const neighborhoodRoutes = NEIGHBORHOODS.map((n) => ({
    url: `${BASE}/neighborhoods/${n.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    { url: BASE,                      lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/products`,        lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/quote`,           lastModified: NOW, changeFrequency: 'monthly', priority: 0.95 },
    ...productRoutes,
    { url: `${BASE}/neighborhoods`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.82 },
    ...neighborhoodRoutes,
    { url: `${BASE}/blog`,            lastModified: NOW, changeFrequency: 'weekly',  priority: 0.78 },
    ...blogRoutes,
    { url: `${BASE}/faq`,             lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/seasonal`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/partners`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
