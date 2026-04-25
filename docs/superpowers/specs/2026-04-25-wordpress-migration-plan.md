# WordPress → bensblinds.com Migration Plan

**Date:** 2026-04-25  
**Author:** Ben's Blinds Chicago  
**Status:** Planning  
**Scope:** Migrate the live WordPress site at bensblinds.com to the Next.js codebase currently deployed at bens-blinds-chicago.netlify.app

---

## Architecture Decision: National Site + /chicago Route

The new architecture resolves as follows:

| URL | Content |
|-----|---------|
| `bensblinds.com` | Broad/national Ben's Blinds homepage (to be built, or redirect to /chicago for now) |
| `bensblinds.com/chicago` | All current Next.js site content (products, blog, neighborhoods, quote, FAQ, etc.) |
| `bensblinds.com/chicago/products/cellular` | Current `/products/cellular` page |
| `bensblinds.com/chicago/blog/[slug]` | Current `/blog/[slug]` pages |

**Short-term option (recommended while national site is not built):** Deploy the current Next.js app as-is to bensblinds.com. Prefix all app routes with `/chicago` via a Next.js route group or `basePath`. Redirects from legacy WordPress URLs go directly to `/chicago/*` equivalents. bensblinds.com root either shows a landing page or 301s to `/chicago`.

**Long-term option:** Build a national bensblinds.com homepage that links to `/chicago` and future city sites.

---

## 1. Current WordPress Site Audit Approach

### 1.1 Pre-Audit Goals

Before any migration work begins, create a complete inventory of what exists on the live WordPress site. This inventory is the master reference for the redirect map, content migration checklist, and SEO continuity plan.

### 1.2 Tools

**Screaming Frog SEO Spider (primary crawl tool)**
- Download from screamingfrog.co.uk (free tier handles up to 500 URLs; paid license ~$200/yr for larger sites)
- Configuration: Spider → Configuration → Spider → check "Crawl all subdomains"; set user agent to Googlebot
- Export: All URLs, page titles, meta descriptions, H1s, canonical tags, response codes, inlinks, word count
- Also export: XML sitemap data, robots.txt directives, redirect chains

**Google Search Console** (before cutover)
- Verify bensblinds.com as a property if not already done
- Export: Search Analytics → Queries, filtered by page — identifies which pages drive actual search traffic (the ones that matter most for SEO continuity)
- Export: Coverage report — shows crawled/indexed URLs including those not linked internally
- Export: Links → Top linked pages — identifies which pages have external backlinks

**WP All Export plugin** (WordPress content export)
- Install on the live WordPress site
- Export: All posts (with custom fields, categories, tags, featured images, slugs)
- Export: All pages (same fields)
- Export: Any custom post types (products, services, testimonials, portfolio items if present)
- Export format: CSV with all fields + XML for structured data
- Also export: All media attachments (file URLs, alt text, captions)

**Manual crawl supplement**
- Review wp-admin → Posts, Pages, Media, and any custom post type menus
- Document any password-protected pages, draft content, or pages excluded from the sitemap
- Check for WooCommerce if products are sold online (separate migration concern)

### 1.3 Content Types to Identify

| Type | WordPress Location | Volume (est.) | Migration Priority |
|------|-------------------|---------------|-------------------|
| Home page | Pages | 1 | Critical |
| Service/product pages | Pages or CPT | 5–20 | Critical |
| Blog posts | Posts | Unknown | High |
| Location/neighborhood pages | Pages or CPT | Unknown | High |
| Contact / Quote pages | Pages | 1–3 | Critical |
| FAQ | Page or CPT | 1 | High |
| About / Team | Pages | 1–2 | Medium |
| Partner / Vendor pages | Pages | Unknown | Medium |
| Testimonials | CPT or embedded | Unknown | Low |
| Media (images, PDFs) | Media Library | Unknown | High (for images referenced in content) |

### 1.4 Audit Checklist

- [ ] Screaming Frog full crawl of bensblinds.com — export all URLs with status codes
- [ ] Google Search Console: export top 50 pages by impressions and top 50 by clicks
- [ ] Google Search Console: export all external links (backlink-bearing pages)
- [ ] WP All Export: posts, pages, CPTs, media
- [ ] Screenshot or record page layout for all critical pages (for content parity check post-migration)
- [ ] Record any forms, embedded widgets, or third-party scripts on each page (Gravity Forms, Calendly, chat widgets, etc.)
- [ ] Document WordPress plugins in use that affect frontend output (Yoast/RankMath meta, WooCommerce, events plugins, etc.)

---

## 2. URL Structure Plan

### 2.1 Current WordPress URL Patterns (Assumed)

Based on standard WordPress configurations for a local service business, the live bensblinds.com site likely uses patterns like these. Verify against the Screaming Frog crawl.

| WordPress URL | Type |
|---|---|
| `/` | Home |
| `/blinds-chicago/` | Main service page |
| `/cellular-shades-chicago/` | Product page |
| `/roller-shades-chicago/` | Product page |
| `/wood-blinds-chicago/` | Product page |
| `/solar-shades-chicago/` | Product page |
| `/plantation-shutters-chicago/` | Product page |
| `/roman-shades-chicago/` | Product page |
| `/motorized-blinds-chicago/` | Product page |
| `/drapery-chicago/` | Product page |
| `/free-estimate/` or `/contact/` | Lead gen page |
| `/about/` | About page |
| `/blog/` | Blog archive |
| `/blog/post-slug/` | Blog post |
| `/neighborhoods/lincoln-park-blinds/` | Neighborhood page (if exists) |
| `/faq/` | FAQ page |
| `/partners/` | Partners |

### 2.2 New Next.js URL Structure

The current Next.js app has these routes (all will live under `/chicago/` in the new architecture):

| Current Next.js Route | New URL at bensblinds.com |
|---|---|
| `/` | `/chicago` |
| `/products` | `/chicago/products` |
| `/products/cellular` | `/chicago/products/cellular` |
| `/products/solar` | `/chicago/products/solar` |
| `/products/roller` | `/chicago/products/roller` |
| `/products/wood` | `/chicago/products/wood` |
| `/products/shutters` | `/chicago/products/shutters` |
| `/products/roman` | `/chicago/products/roman` |
| `/products/motorized` | `/chicago/products/motorized` |
| `/products/drapery` | `/chicago/products/drapery` |
| `/quote` | `/chicago/quote` |
| `/blog` | `/chicago/blog` |
| `/blog/[slug]` | `/chicago/blog/[slug]` |
| `/neighborhoods` | `/chicago/neighborhoods` |
| `/neighborhoods/[slug]` | `/chicago/neighborhoods/[slug]` |
| `/faq` | `/chicago/faq` |
| `/seasonal` | `/chicago/seasonal` |
| `/partners` | `/chicago/partners` |

### 2.3 Implementing the /chicago Route Prefix

**Option A: Next.js `basePath` (simplest, no route changes needed)**

```ts
// next.config.ts
const nextConfig: NextConfig = {
  basePath: '/chicago',
  // ... rest of config
}
```

Pros: Zero changes to app code; all routes automatically prefixed. Cons: All internal links, `<Link>` components, and `next/image` paths must work with basePath; sitemap and canonical URLs must reference `/chicago` prefix. The `basePath` option in Next.js handles this automatically for `<Link>` and `next/router` but requires manual update of hardcoded string paths.

**Option B: Route group directory `(chicago)` with a `/chicago` layout**

Create `src/app/chicago/` as the parent route, moving all page files there. Root `/` becomes a new national homepage.

Pros: Clean separation; national homepage at `/` is independent. Cons: All file paths move; more refactor work.

**Recommendation:** Use `basePath: '/chicago'` for the initial cutover. This gets the site live on bensblinds.com/chicago fastest with minimum code changes. Migrate to Option B when/if a genuine national homepage is built.

**basePath implementation steps:**

1. Add `basePath: '/chicago'` to `next.config.ts`
2. Update all hardcoded URL strings in the codebase (sitemap, robots, layout schema, metadata):
   - `src/app/sitemap.ts` — BASE constant is already `'https://bensblinds.com'`; append `/chicago` to all route paths
   - `src/app/robots.ts` — sitemap URL becomes `https://bensblinds.com/chicago/sitemap.xml`
   - `src/app/layout.tsx` — all `localBusinessSchema` and `REVIEWS_SCHEMA` URL strings need `/chicago` prefix
   - `metadataBase` in layout.tsx stays as `https://bensblinds.com`; canonical alternates get `/chicago` prefix

3. Update `netlify.toml` to ensure the `/chicago` prefix is handled correctly

4. Verify image `remotePatterns`, `<Link>` hrefs, and any hardcoded `/products/`, `/blog/`, etc. strings in components

### 2.4 SEO URL Decision Framework

**Rule:** Preserve existing WordPress URLs where they have SEO value (backlinks, GSC impressions). Redirect them cleanly to the equivalent Next.js URL. Never leave an old URL returning a 404.

**Decision tree for each WordPress URL:**
1. Does it appear in GSC top-50 by impressions? → Must have a 301 redirect to the equivalent new URL.
2. Does it have external backlinks (per GSC Links report)? → Critical: must have a 301 redirect. Verify the redirect actually works post-cutover.
3. Does it map logically to an existing Next.js route? → Create a 1:1 301 redirect.
4. Does it have no traffic, no backlinks, and no equivalent? → Still add a redirect to the most relevant page (homepage or category page). Never 404 an old WordPress URL.

---

## 3. Redirect Map Strategy (WordPress → Next.js)

### 3.1 Canonical Redirect Map

This is the initial redirect map based on typical WordPress patterns. Verify each source URL against the Screaming Frog crawl before cutover.

| Source (WordPress URL) | Destination (New Next.js URL) | Type |
|---|---|---|
| `/` | `/chicago` | 301 |
| `/blinds-chicago/` | `/chicago` | 301 |
| `/blinds-chicago` | `/chicago` | 301 |
| `/cellular-shades-chicago/` | `/chicago/products/cellular` | 301 |
| `/cellular-shades-chicago` | `/chicago/products/cellular` | 301 |
| `/roller-shades-chicago/` | `/chicago/products/roller` | 301 |
| `/solar-shades-chicago/` | `/chicago/products/solar` | 301 |
| `/wood-blinds-chicago/` | `/chicago/products/wood` | 301 |
| `/plantation-shutters-chicago/` | `/chicago/products/shutters` | 301 |
| `/roman-shades-chicago/` | `/chicago/products/roman` | 301 |
| `/motorized-blinds-chicago/` | `/chicago/products/motorized` | 301 |
| `/drapery-chicago/` | `/chicago/products/drapery` | 301 |
| `/free-estimate/` | `/chicago/quote` | 301 |
| `/contact/` | `/chicago/quote` | 301 |
| `/get-quote/` | `/chicago/quote` | 301 |
| `/about/` | `/chicago` | 301 |
| `/blog/` | `/chicago/blog` | 301 |
| `/blog/:slug/` | `/chicago/blog/:slug` | 301 |
| `/faq/` | `/chicago/faq` | 301 |
| `/partners/` | `/chicago/partners` | 301 |
| `/seasonal/` | `/chicago/seasonal` | 301 |
| `/neighborhoods/` | `/chicago/neighborhoods` | 301 |
| `/neighborhoods/:slug/` | `/chicago/neighborhoods/:slug` | 301 |
| `/wp-admin/` | `/chicago` | 301 (block or redirect) |
| `/wp-login.php` | `/chicago` | 301 |
| `/feed/` | `/chicago/blog` | 301 |

### 3.2 next.config.ts Redirect Implementation

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/chicago',
  cacheComponents: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // WordPress product page redirects
      { source: '/blinds-chicago', destination: '/chicago', permanent: true },
      { source: '/blinds-chicago/', destination: '/chicago', permanent: true },
      { source: '/cellular-shades-chicago', destination: '/chicago/products/cellular', permanent: true },
      { source: '/cellular-shades-chicago/', destination: '/chicago/products/cellular', permanent: true },
      { source: '/roller-shades-chicago', destination: '/chicago/products/roller', permanent: true },
      { source: '/roller-shades-chicago/', destination: '/chicago/products/roller', permanent: true },
      { source: '/solar-shades-chicago', destination: '/chicago/products/solar', permanent: true },
      { source: '/solar-shades-chicago/', destination: '/chicago/products/solar', permanent: true },
      { source: '/wood-blinds-chicago', destination: '/chicago/products/wood', permanent: true },
      { source: '/wood-blinds-chicago/', destination: '/chicago/products/wood', permanent: true },
      { source: '/plantation-shutters-chicago', destination: '/chicago/products/shutters', permanent: true },
      { source: '/plantation-shutters-chicago/', destination: '/chicago/products/shutters', permanent: true },
      { source: '/roman-shades-chicago', destination: '/chicago/products/roman', permanent: true },
      { source: '/roman-shades-chicago/', destination: '/chicago/products/roman', permanent: true },
      { source: '/motorized-blinds-chicago', destination: '/chicago/products/motorized', permanent: true },
      { source: '/motorized-blinds-chicago/', destination: '/chicago/products/motorized', permanent: true },
      { source: '/drapery-chicago', destination: '/chicago/products/drapery', permanent: true },
      { source: '/drapery-chicago/', destination: '/chicago/products/drapery', permanent: true },

      // Lead gen / contact
      { source: '/free-estimate', destination: '/chicago/quote', permanent: true },
      { source: '/free-estimate/', destination: '/chicago/quote', permanent: true },
      { source: '/contact', destination: '/chicago/quote', permanent: true },
      { source: '/contact/', destination: '/chicago/quote', permanent: true },
      { source: '/get-quote', destination: '/chicago/quote', permanent: true },
      { source: '/get-quote/', destination: '/chicago/quote', permanent: true },
      { source: '/request-estimate', destination: '/chicago/quote', permanent: true },
      { source: '/request-estimate/', destination: '/chicago/quote', permanent: true },

      // Blog — specific posts (add as you identify them from WP export)
      // Pattern-based blog redirect (covers all /blog/* slugs)
      { source: '/blog/:slug', destination: '/chicago/blog/:slug', permanent: true },
      { source: '/blog/:slug/', destination: '/chicago/blog/:slug', permanent: true },
      { source: '/blog', destination: '/chicago/blog', permanent: true },
      { source: '/blog/', destination: '/chicago/blog', permanent: true },

      // Static pages
      { source: '/about', destination: '/chicago', permanent: true },
      { source: '/about/', destination: '/chicago', permanent: true },
      { source: '/faq', destination: '/chicago/faq', permanent: true },
      { source: '/faq/', destination: '/chicago/faq', permanent: true },
      { source: '/partners', destination: '/chicago/partners', permanent: true },
      { source: '/partners/', destination: '/chicago/partners', permanent: true },
      { source: '/seasonal', destination: '/chicago/seasonal', permanent: true },

      // Neighborhoods
      { source: '/neighborhoods/:slug', destination: '/chicago/neighborhoods/:slug', permanent: true },
      { source: '/neighborhoods/:slug/', destination: '/chicago/neighborhoods/:slug', permanent: true },
      { source: '/neighborhoods', destination: '/chicago/neighborhoods', permanent: true },

      // WordPress admin paths — redirect to homepage to avoid 404s being indexed
      { source: '/wp-admin', destination: '/chicago', permanent: true },
      { source: '/wp-login.php', destination: '/chicago', permanent: true },
      { source: '/feed', destination: '/chicago/blog', permanent: true },
      { source: '/feed/', destination: '/chicago/blog', permanent: true },
    ]
  },
}

export default nextConfig
```

**Important notes on Next.js redirects:**
- `permanent: true` emits HTTP 308 in Next.js (semantically equivalent to 301 for SEO). To force true 301, use `statusCode: 301` instead of `permanent: true` (check Next.js docs for your version).
- Redirects in `next.config.ts` run before middleware and before the filesystem. They apply to both static and dynamic routes.
- The `:slug` parameter syntax matches any single path segment. For nested paths use `:slug*` to match multiple segments.
- Pattern rules are evaluated in order. More specific rules should appear before less specific ones.
- With `basePath: '/chicago'`, the redirects `source` paths are relative to the base path — confirm this behavior in your Next.js version. You may need to prefix source paths with `/chicago` or handle root-level legacy URLs in a Netlify `_redirects` file instead (see below).

### 3.3 Netlify `_redirects` File (Fallback Layer)

The `_redirects` file in `/public/` handles redirects at the CDN layer — these fire before Next.js even sees the request. Use this as a fallback safety net for any WordPress URLs that Next.js might not catch (e.g., if `basePath` affects how redirects sources are evaluated).

Create `/public/_redirects`:

```
# Netlify _redirects
# WordPress product pages → Next.js /chicago routes

/blinds-chicago          /chicago         301
/blinds-chicago/         /chicago         301
/cellular-shades-chicago /chicago/products/cellular  301
/cellular-shades-chicago/ /chicago/products/cellular 301
/roller-shades-chicago   /chicago/products/roller     301
/roller-shades-chicago/  /chicago/products/roller     301
/solar-shades-chicago    /chicago/products/solar      301
/solar-shades-chicago/   /chicago/products/solar      301
/wood-blinds-chicago     /chicago/products/wood       301
/wood-blinds-chicago/    /chicago/products/wood       301
/plantation-shutters-chicago /chicago/products/shutters 301
/plantation-shutters-chicago/ /chicago/products/shutters 301
/roman-shades-chicago    /chicago/products/roman      301
/motorized-blinds-chicago /chicago/products/motorized 301
/drapery-chicago         /chicago/products/drapery    301

# Contact / lead gen
/free-estimate           /chicago/quote   301
/free-estimate/          /chicago/quote   301
/contact                 /chicago/quote   301
/contact/                /chicago/quote   301
/get-quote               /chicago/quote   301
/request-estimate        /chicago/quote   301

# Blog (Netlify splat syntax covers all slugs)
/blog/*                  /chicago/blog/:splat  301
/blog                    /chicago/blog    301

# Static pages
/about                   /chicago         301
/about/                  /chicago         301
/faq                     /chicago/faq     301
/faq/                    /chicago/faq     301
/partners                /chicago/partners 301
/seasonal                /chicago/seasonal 301

# Neighborhoods
/neighborhoods/*         /chicago/neighborhoods/:splat  301
/neighborhoods           /chicago/neighborhoods  301

# WordPress admin
/wp-admin/*              /chicago         301
/wp-login.php            /chicago         301
/feed                    /chicago/blog    301

# Catch-all: Next.js handles everything else
/*                       /chicago/:splat  200
```

**Note:** The final `/*` catch-all with `200` is a rewrite rule, not a redirect — it tells Netlify to serve the Next.js app for all requests, letting Next.js routing handle them. Remove or adjust this if it conflicts with Netlify's Next.js plugin behavior.

### 3.4 Priority Rules for Conflicting Redirects

1. Netlify `_redirects` file rules fire first (CDN layer), before Next.js
2. Next.js `redirects()` in `next.config.ts` fire next (server layer)
3. Next.js middleware fires after redirects
4. Next.js pages/routes resolve last

If a URL matches both a `_redirects` rule and a `next.config.ts` rule, the `_redirects` rule wins. Avoid duplication between the two — put WordPress legacy URL redirects in `_redirects`, and application-level redirects (e.g., old Next.js routes you're renaming) in `next.config.ts`.

---

## 4. SEO Continuity Plan

### 4.1 Google Search Console

**Before cutover:**
- Verify bensblinds.com property in GSC if not already verified (HTML file method or DNS TXT record)
- Also verify `www.bensblinds.com` as a separate property or as a combined property via domain verification
- Export current data: Top queries, Top pages, Coverage report, Links report — save as CSV baseline
- Submit current WordPress sitemap to document pre-migration indexed URL count

**After cutover:**
- Submit new sitemap: `https://bensblinds.com/chicago/sitemap.xml`
- Use URL Inspection tool to request indexing of the most important pages:
  - `https://bensblinds.com/chicago`
  - `https://bensblinds.com/chicago/products/cellular`
  - `https://bensblinds.com/chicago/quote`
  - Top 10 pages by GSC impressions
- Monitor Coverage report daily for the first 2 weeks — look for spike in "Not Found (404)" errors
- Monitor Search Analytics for traffic drops on key pages — compare week-over-week

### 4.2 Canonical Tag Strategy

The current Next.js app sets `metadataBase: new URL('https://bensblinds.com')` in `layout.tsx`. With `basePath: '/chicago'`, canonical URLs must include the `/chicago` prefix.

**During migration (both sites live):**
- WordPress site (if kept running on wp.bensblinds.com): add canonical tags pointing to Next.js `/chicago` equivalents to prevent duplicate content between the two live versions

**After cutover:**
- Every Next.js page should have an explicit canonical tag pointing to its own bensblinds.com/chicago URL
- Update `metadataBase` if needed and verify all generated `<link rel="canonical">` tags in page source
- Check that `alternates.canonical` in layout.tsx resolves correctly with basePath

**Code update needed in `src/app/layout.tsx`:**
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://bensblinds.com'),
  alternates: {
    // With basePath: '/chicago', Next.js should prepend /chicago automatically
    // Verify this by inspecting rendered HTML after adding basePath
    canonical: 'https://bensblinds.com/chicago',
  },
  // ...
}
```

Each page-level `generateMetadata` or exported `metadata` should also set its own canonical:
```ts
// Example for src/app/products/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    alternates: {
      canonical: `https://bensblinds.com/chicago/products/${params.slug}`,
    },
  }
}
```

### 4.3 Robots.txt

Current `src/app/robots.ts`:
```ts
// Current
rules: { userAgent: '*', allow: '/', disallow: '/api/' },
sitemap: 'https://bensblinds.com/sitemap.xml',
```

After migration with basePath, update to:
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/tools/'] },
    ],
    sitemap: 'https://bensblinds.com/chicago/sitemap.xml',
  }
}
```

Also add a `public/robots.txt` as a static fallback (Netlify serves static files before Next.js for non-dynamic routes) or rely on the dynamic `robots.ts` — confirm which takes precedence with the Netlify Next.js plugin.

**WordPress-era directives to remove:** The live WordPress robots.txt likely disallows `/wp-admin/` and `/wp-includes/`. These are no longer relevant on the Next.js site — no need to carry them over.

### 4.4 Structured Data Continuity

The `localBusinessSchema` in `src/app/layout.tsx` is well-structured and already references `https://bensblinds.com`. Post-migration updates required:

1. **URL fields**: Update all URL values to include `/chicago` prefix:
   - `url`: Change from `'https://bensblinds.com'` to `'https://bensblinds.com/chicago'`
   - `@id`: Change from `'https://bensblinds.com/#localbusiness'` to `'https://bensblinds.com/chicago/#localbusiness'`
   - All `hasOfferCatalog` item URLs: add `/chicago` prefix (e.g., `'https://bensblinds.com/chicago/products/cellular'`)

2. **Review schema**: Update `itemReviewed['@id']` to match the updated `@id` above

3. **Validate**: After cutover, use Google's Rich Results Test (search.google.com/test/rich-results) on the live URL to confirm structured data parses correctly

4. **Blog post schema**: Consider adding `Article` or `BlogPosting` structured data to blog post pages — not currently present but valuable for search appearance

### 4.5 Internal Linking Audit

After adding the `/chicago` basePath, audit all internal links in the codebase:

```bash
# Find hardcoded URL strings in source files
grep -r 'href="/' src/ --include="*.tsx" --include="*.ts"
grep -r "href='/" src/ --include="*.tsx" --include="*.ts"

# Find bensblinds.com URLs in content files
grep -r 'bensblinds.com' content/ --include="*.mdx" --include="*.json"
```

Expected areas needing updates:
- `src/components/layout/Nav.tsx` — navigation links
- `src/components/layout/Footer.tsx` — footer links
- Blog post MDX content — any internal links to other pages
- Any CTA links in product pages

With `basePath` configured, `<Link href="/products/cellular">` should automatically resolve to `/chicago/products/cellular`. However, hardcoded `href="https://bensblinds.com/products/cellular"` strings will not be updated automatically.

### 4.6 Backlink Preservation

From the GSC Links export, identify the top 20 pages with external backlinks. For each:

1. Confirm the redirect from the WordPress URL to the new Next.js URL is in the redirect map
2. Test the redirect chain post-cutover — ensure it's a single 301, not a chain (e.g., /cellular-shades-chicago/ → /chicago/products/cellular, not /cellular-shades-chicago/ → /cellular-shades-chicago → /chicago/products/cellular)
3. If any of those backlinked URLs do not map to an existing Next.js route, create a new page or confirm the redirect destination is the closest relevant page

Highest-risk pages for backlink loss (based on typical local service business SEO):
- Homepage (`/`) — likely has the most backlinks
- Any city service page (e.g., `/blinds-chicago/`) — typically the most-linked service page
- Any "Hunter Douglas dealer" or "authorized dealer" page
- Any page featured in local press/blog mentions (Chicago Tribune, local neighborhood blogs)

---

## 5. Content Migration Steps

### 5.1 Blog Posts

**Current state:** 12 blog posts exist in `content/blog/*.mdx` with established frontmatter schema (title, excerpt, date, slug, category, image, imageAlt).

**WordPress blog posts to migrate:**

1. Export all WordPress posts via WP All Export (CSV + HTML content)
2. For each post, create an MDX file in `content/blog/` with this frontmatter schema:

```mdx
---
title: "Post Title Here"
excerpt: "The excerpt from WordPress (Yoast meta description if available, otherwise excerpt field)"
date: "2025-06-15T00:00:00.000Z"
slug: post-slug-here
category: Category Name
image: /images/blog/post-slug-here-hero.jpg
imageAlt: Descriptive alt text for the hero image
keywords:
  - keyword one chicago
  - keyword two chicago
---

Post body content here, converted from WordPress HTML to Markdown/MDX.
```

3. Convert WordPress HTML to MDX: use Pandoc (`pandoc -f html -t markdown`) for initial conversion, then manually clean up formatting artifacts
4. Download all images referenced in blog posts from the WordPress media library; save to `/public/images/blog/`
5. Update image `src` attributes in MDX to use `/images/blog/` paths
6. Preserve original publish dates — important for GSC crawl freshness signals

**Slug matching:** If a WordPress blog post slug exactly matches an existing `content/blog/*.mdx` file (e.g., `cellular-shades-energy-efficiency-chicago`), that redirect can go to the existing page. If the WordPress slug differs, add a specific redirect.

### 5.2 WordPress Pages → Next.js Routes

| WordPress Page | Next.js Route | Action |
|---|---|---|
| Home page | `src/app/page.tsx` | Compare content; merge any WordPress-unique content into Next.js home |
| Service/product pages | `src/app/products/[slug]/` | Merge any unique copy from WordPress into existing product MDX files |
| Contact / Quote | `src/app/quote/` | Verify form fields match; migrate any Gravity Forms logic to existing quote form |
| About page | No current equivalent | Either create `src/app/about/page.tsx` or merge into homepage |
| FAQ | `src/app/faq/` | Merge WordPress FAQ items into `content/pages/faq.json` |

### 5.3 Images: WordPress Media Library → /public

1. Download entire WordPress media library (wp-content/uploads/) via FTP/SFTP or a WordPress backup plugin
2. Organize images into the existing public directory structure:
   - Product hero images → `/public/images/products/`
   - Blog images → `/public/images/blog/`
   - Neighborhood images → `/public/images/neighborhoods/`
   - General/site images → `/public/images/`
3. Preserve file names where possible to avoid broken references in migrated content
4. Run all images through squoosh.app or `sharp` CLI to convert to WebP/AVIF before uploading — the Next.js image optimizer will serve them in the right format, but starting with optimized sources reduces origin storage size
5. Update any hardcoded WordPress image URLs (e.g., `https://bensblinds.com/wp-content/uploads/2024/...`) in migrated content to local `/images/` paths

**Regarding Cloudinary/CDN:** The current Next.js site uses local `/public` images. For the initial migration, continue using local images — simpler deployment, no additional service dependency. Evaluate Cloudinary only if image storage becomes unwieldy (hundreds of MB) or if you need image transformation on-the-fly for user-generated content.

### 5.4 Metadata: Yoast/RankMath → Next.js Metadata

The WordPress site uses Yoast SEO or RankMath to set per-page title tags, meta descriptions, Open Graph data, and canonical URLs. The WP All Export export should include these fields if you configure it to.

**Migration approach:**

1. From WP All Export, map these fields:
   - Yoast `_yoast_wpseo_title` or RankMath `rank_math_title` → Next.js `metadata.title`
   - Yoast `_yoast_wpseo_metadesc` or RankMath `rank_math_description` → Next.js `metadata.description`
   - Yoast `_yoast_wpseo_canonical` → Next.js `metadata.alternates.canonical`
   - Yoast OG image → Next.js `metadata.openGraph.images`

2. For each migrated page/post, set a page-level `metadata` export or `generateMetadata` function with the values from WordPress

3. Prioritize: any page in the GSC top-50 by impressions should have its exact WordPress title tag and meta description preserved in the Next.js version — changes to these can affect CTR and rankings

4. Post-cutover: use Google's Page Inspect in GSC to verify title and description are being read correctly for top pages

---

## 6. DNS Cutover Strategy

### 6.1 Pre-Cutover: Custom Domain on Netlify

1. In Netlify dashboard → Site settings → Domain management → Add custom domain
2. Add `bensblinds.com` and `www.bensblinds.com`
3. Netlify will provision a Let's Encrypt SSL certificate automatically
4. **Do not change DNS yet** — just configure the domain in Netlify so the certificate can be issued once DNS is pointed
5. Verify SSL provisioning is complete in Netlify dashboard before proceeding

**Current DNS situation:** bensblinds.com points to WordPress hosting. The current WordPress host may be a managed WP host (WP Engine, Kinsta, SiteGround, etc.) or a VPS. Identify the registrar (likely GoDaddy, Namecheap, or Google Domains) and the current DNS host (may be same as registrar or may be Cloudflare).

### 6.2 TTL Reduction

**48 hours before planned cutover:**
- Lower all bensblinds.com DNS record TTLs to 60 seconds (from whatever they currently are, typically 3600 or 14400)
- Records to update: A record for `@` (or `bensblinds.com`), A record for `www`, any CNAME for `www`
- This ensures that when you change the DNS at cutover, the change propagates globally within ~60 seconds rather than up to 4 hours

**How to check current TTL:**
```bash
dig bensblinds.com A +short
dig bensblinds.com A | grep TTL
```

### 6.3 Cutover Sequence

**T-48h:**
- [ ] Lower DNS TTLs to 60s
- [ ] Confirm Netlify custom domain shows SSL certificate as "Provisioned" (not "Awaiting")
- [ ] Do a final Screaming Frog crawl of the WordPress site — capture the baseline
- [ ] Test all redirects on the Netlify staging URL (bens-blinds-chicago.netlify.app) by manually visiting every important WordPress URL with `/` prepended to the Netlify domain to verify redirects work
- [ ] Smoke test the full Next.js site on the Netlify staging URL

**T-0 (Cutover day):**
1. At a low-traffic time (early Tuesday–Thursday morning, ~6 AM CT is ideal for a Chicago local business)
2. In DNS registrar/host: Change A record for `bensblinds.com` from WordPress host IP to Netlify's load balancer IP
   - Netlify's IP: Check in Netlify dashboard under Domain settings → it provides the specific IP to use
3. Change `www` CNAME to point to `[your-site-id].netlify.app` (or use Netlify's automatic www redirect)
4. Verify propagation: `dig bensblinds.com A` — watch for new IP to appear (should happen within 60s given TTL reduction)
5. Test bensblinds.com in browser — should load Next.js site with SSL
6. Test 5 critical redirects manually (e.g., `/cellular-shades-chicago/` → `/chicago/products/cellular`)
7. Test the quote form — submit a test inquiry and verify it goes to the right email
8. Run Google's Mobile-Friendly Test on bensblinds.com/chicago

**T+1h:**
- [ ] Check Netlify deploy logs for any errors
- [ ] Check Google Search Console for any immediate crawl errors (may not appear for a few hours)
- [ ] Verify Netlify shows SSL as active for bensblinds.com
- [ ] Raise DNS TTLs back to 3600 (once satisfied with cutover)

### 6.4 Rollback Plan

If critical issues are found within the first 2 hours:

1. Change DNS A record back to the WordPress host IP
2. DNS propagation with 60s TTL means rollback takes effect globally in ~1 minute
3. WordPress site is restored; no data loss (WordPress DB was never touched)
4. Note: If any GSC canonical tag confusion occurred during the short window, it will self-resolve once WordPress is back on the domain

**Rollback trigger conditions:**
- Quote form is broken and submitting nothing
- More than 30% of WordPress redirects return 404 instead of redirecting
- SSL certificate is not working (HTTPS broken)
- Netlify deploy is failing repeatedly

### 6.5 Post-Cutover Monitoring

**First 24 hours:**
- Monitor Netlify analytics for request volume (should be similar to WordPress traffic levels)
- Monitor for 404 responses in Netlify access logs (Netlify → Site analytics → or use Netlify Log Drains)
- Check GSC Coverage for new "Not Found" errors — these indicate missing redirects

**First 2 weeks:**
- Review GSC Search Analytics weekly: compare impressions and clicks to pre-migration baseline
- Check GSC Index Coverage: watch for drop in indexed pages (expected temporarily; should recover within 2–4 weeks)
- Monitor Google Analytics (GA4): compare sessions, bounce rate, and conversions (quote form submissions) vs. prior period
- Run a Screaming Frog crawl of the new site — check for any unintended 404s, redirect chains longer than 1 hop, or pages missing title/description

**Uptime monitoring:**
- Set up Netlify's built-in alerting (Netlify → Site → Notifications → Deploy notifications + Failed deploy alerts)
- Add bensblinds.com to UptimeRobot (free) or StatusCake for 5-minute uptime checks with email alert to liddar@gmail.com

---

## 7. Technical Checklist

### Pre-Cutover

- [ ] `basePath: '/chicago'` added to `next.config.ts` and tested on staging
- [ ] All hardcoded URL strings updated to include `/chicago` prefix (sitemap, robots, layout schema, canonical tags)
- [ ] `src/app/sitemap.ts` updated — BASE includes `/chicago` on all paths
- [ ] `src/app/robots.ts` updated — sitemap URL points to `/chicago/sitemap.xml`
- [ ] `src/app/layout.tsx` — LocalBusiness schema URLs updated to include `/chicago`
- [ ] `public/_redirects` file created with all WordPress → Next.js redirect rules
- [ ] `next.config.ts` redirects array populated with all WordPress URL patterns
- [ ] Netlify custom domain `bensblinds.com` configured and SSL certificate provisioned
- [ ] `www.bensblinds.com` configured in Netlify (redirect to apex or vice versa — pick one as canonical)
- [ ] All redirects tested on staging URL (bens-blinds-chicago.netlify.app):
  - [ ] `/cellular-shades-chicago/` → `/chicago/products/cellular`
  - [ ] `/blog/[any-slug]/` → `/chicago/blog/[slug]`
  - [ ] `/contact/` → `/chicago/quote`
  - [ ] `/free-estimate/` → `/chicago/quote`
  - [ ] `/` → `/chicago` (or national home page)
- [ ] GSC property for `bensblinds.com` verified
- [ ] GSC baseline data exported (queries, pages, links)
- [ ] GA4 property for `bensblinds.com` configured (or existing property updated with new domain)
- [ ] Quote form tested end-to-end on staging URL
- [ ] Screaming Frog crawl of Next.js staging site — 0 unexpected 404s
- [ ] Mobile-Friendly Test passed for key pages on staging
- [ ] Rich Results Test passed for homepage structured data on staging
- [ ] DNS TTLs lowered to 60s (48 hours before cutover)
- [ ] WordPress kept running on same host (do not take it down yet)

### Post-Cutover

- [ ] SSL certificate active on bensblinds.com (HTTPS works, no certificate warnings)
- [ ] bensblinds.com loads Next.js site (not WordPress)
- [ ] 5 critical redirects tested on live domain
- [ ] Quote form tested on live domain (submit real test inquiry)
- [ ] New sitemap submitted to GSC: `https://bensblinds.com/chicago/sitemap.xml`
- [ ] GA4 real-time report shows traffic hitting bensblinds.com
- [ ] UptimeRobot or StatusCake monitoring configured for bensblinds.com
- [ ] DNS TTLs raised back to 3600
- [ ] WordPress kept running on `wp.bensblinds.com` or similar subdomain for 30 days as fallback
- [ ] GSC Coverage report checked at Day 3, Day 7, Day 14 — no unexpected 404 spike
- [ ] Screaming Frog crawl of live bensblinds.com at Day 7 — verify no redirect chains

---

## 8. Risk Assessment

### 8.1 Traffic Loss Scenarios and Mitigation

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Incomplete redirect map — some WordPress URLs return 404 | Medium | High (SEO loss) | Complete Screaming Frog audit before cutover; `_redirects` catch-all |
| Google re-crawls key pages and sees different content | Low-Medium | Medium | Preserve title tags and meta descriptions exactly from WordPress |
| Quote form broken post-cutover | Low | Critical (business impact) | Test end-to-end on staging before cutover; test immediately post-cutover |
| SSL certificate not provisioning for bensblinds.com | Low | Critical | Pre-provision in Netlify 48h before cutover; verify before changing DNS |
| WordPress canonical tags not updated (duplicate content) | Medium | Medium | Add rel=canonical to WordPress pointing to Next.js URLs during transition; or redirect immediately |
| Redirect chain: WP URL → intermediate → final URL (3+ hops) | Low | Low-Medium | Audit all redirects in Screaming Frog pre-cutover; ensure single-hop chains |
| Google drops ranking for key terms during transition | Low | High | Normal; rankings typically recover within 4–8 weeks after a clean migration |
| blog post slugs in Next.js don't match WordPress post slugs | Medium | Medium | Audit WP export slugs against content/blog/*.mdx slugs; add specific redirects for mismatches |

### 8.2 WordPress Fallback Plan

**Do not shut down WordPress immediately after cutover.**

1. After DNS cutover, move WordPress to a subdomain: `wp.bensblinds.com` or `old.bensblinds.com`
   - Update your WordPress hosting to respond to this subdomain
   - Add `noindex` to the WordPress site (via Yoast/RankMath or wp-admin → Settings → Reading → Discourage search engines) to prevent duplicate indexing
2. Keep WordPress running for 30 days post-cutover
3. During this 30-day window: verify all redirects, identify any 404s appearing in GSC, and use the WordPress site as reference for any content questions
4. After 30 days with no critical issues: shut down WordPress hosting
5. After 90 days: safely delete the WordPress database backup (or archive it permanently — it's small)

**If you need to completely roll back:**
1. Change DNS A record back to WordPress hosting IP (instant with 60s TTL)
2. WordPress is fully functional immediately — no database changes were made
3. Deactivate `basePath: '/chicago'` in next.config.ts and redeploy to Netlify for the next attempt

### 8.3 Known Technical Risks Specific to This Codebase

1. **`basePath` interaction with TinaCloud CMS:** TinaCMS editorial interface is served at `/admin`. With `basePath: '/chicago'`, the TinaCMS admin will move to `/chicago/admin`. Verify TinaCloud configuration accepts the new URL and update any `tinaCloud.branch` or callback URLs accordingly.

2. **`cacheComponents: true` in next.config.ts:** This is a newer Next.js feature (`use cache` / partial pre-rendering). Ensure it behaves correctly after adding `basePath`. Test that cached pages serve the correct `/chicago` URLs and don't have stale cached responses from the staging URL.

3. **Weather API route (`/api/weather`):** The weather banner fetches from `/api/weather`. With `basePath`, this becomes `/chicago/api/weather`. The `WeatherBanner` component must use a relative fetch path (which Next.js handles automatically) or update to the absolute path. Check `src/components/layout/WeatherBanner.tsx` for any hardcoded API URL.

4. **Publish API route (`/api/publish`):** Same consideration as weather API.

5. **SeasonContext fetching:** If any client component constructs absolute URLs for API calls, those need to be updated.

---

## 9. Timeline

### Phase 0: Audit (Week 1) — ~8 hours

| Task | Hours | Dependency |
|---|---|---|
| Run Screaming Frog crawl of bensblinds.com | 1 | Access to live site |
| Export GSC data (queries, pages, links) | 1 | GSC access |
| WP All Export: posts, pages, CPTs, media list | 2 | WP admin access |
| Build complete redirect map (WordPress → Next.js) | 2 | Screaming Frog output |
| Identify content gaps (WP pages not in Next.js) | 1 | WP export + audit |
| Identify blog slug mismatches | 1 | WP export + content/blog/ |

**Deliverable:** Complete redirect map spreadsheet; list of content gaps; list of blog posts requiring migration

### Phase 1: Code Changes (Week 2) — ~6 hours

| Task | Hours | Dependency |
|---|---|---|
| Add `basePath: '/chicago'` to next.config.ts | 0.5 | — |
| Update all hardcoded URL strings (sitemap, robots, layout schema) | 2 | basePath decision |
| Add `next.config.ts` redirects array | 1 | Redirect map |
| Create `public/_redirects` file | 1 | Redirect map |
| Fix API route references in WeatherBanner and any hardcoded API URLs | 0.5 | Code audit |
| Test TinaCloud admin access under /chicago/admin | 0.5 | basePath change |
| Smoke test on local dev with `basePath` enabled | 0.5 | Code changes |

**Deliverable:** All code changes on a feature branch; staging deploy passes smoke test

### Phase 2: Content Migration (Weeks 2–3) — ~12–20 hours (scales with WordPress content volume)

| Task | Hours | Dependency |
|---|---|---|
| Download WordPress media library | 1 | FTP/SFTP access |
| Optimize and move images to /public/images/ | 2 | Media downloaded |
| Convert WordPress blog posts to MDX (per post: ~30–60 min each) | Variable | WP export |
| Migrate unique page content from WordPress to Next.js pages | 3 | WP export |
| Merge WordPress FAQ items into content/pages/faq.json | 1 | WP export |
| Update canonical/metadata for all migrated pages | 2 | Content migrated |

**Deliverable:** All WordPress content represented in Next.js codebase; no content orphans

### Phase 3: Pre-Cutover Testing (Week 3) — ~4 hours

| Task | Hours | Dependency |
|---|---|---|
| Screaming Frog crawl of staging Netlify URL | 1 | Phase 1+2 complete |
| Test all redirects on staging URL | 1 | _redirects + next.config.ts |
| Test quote form end-to-end on staging | 0.5 | — |
| Rich Results Test on staging | 0.5 | — |
| Mobile-Friendly Test on staging | 0.5 | — |
| Configure Netlify custom domain + SSL | 0.5 | Netlify access |
| Lower DNS TTLs to 60s | 0.25 | DNS access |

**Deliverable:** Staging passes all checks; Netlify domain configured; DNS TTLs reduced; go/no-go decision

### Phase 4: Cutover (Day 1 of Week 4) — ~2 hours active

| Task | Hours | Dependency |
|---|---|---|
| Change DNS A record to Netlify | 0.25 | Phase 3 complete |
| Monitor propagation + verify live site | 0.5 | DNS change |
| Test 5 critical redirects on live domain | 0.25 | DNS live |
| Test quote form on live domain | 0.25 | DNS live |
| Submit new sitemap to GSC | 0.25 | DNS live |
| Move WordPress to subdomain (wp.bensblinds.com) | 0.5 | Hosting access |

**Deliverable:** bensblinds.com serving Next.js; WordPress on subdomain; sitemap submitted

### Phase 5: Post-Cutover Monitoring (Weeks 4–6) — ~2 hours/week

| Task | Cadence |
|---|---|
| GSC Coverage report check | Daily for first week; then weekly |
| GSC Search Analytics (impressions/clicks vs. baseline) | Weekly |
| Screaming Frog crawl of live site | Day 7 post-cutover |
| 404 monitoring via Netlify logs or UptimeRobot | Continuous/automated |
| GA4 traffic check vs. prior period | Weekly |

**Deliverable:** Migration confirmed stable at Day 30; WordPress hosting can be shut down

### Total Timeline: 4–5 weeks from audit start to stable post-cutover

---

## Appendix A: Redirect Testing Script

Use this bash script to verify redirects are working on the staging or live domain before/after cutover. Run it against `https://bens-blinds-chicago.netlify.app` pre-cutover and `https://bensblinds.com` post-cutover.

```bash
#!/bin/bash
# test-redirects.sh
# Usage: BASE_URL=https://bens-blinds-chicago.netlify.app bash test-redirects.sh

BASE="${BASE_URL:-https://bensblinds.com}"
PASS=0
FAIL=0

check_redirect() {
  local from="$1"
  local expected_to="$2"
  local actual
  actual=$(curl -s -o /dev/null -w "%{redirect_url}" -I "$BASE$from")
  if [[ "$actual" == *"$expected_to"* ]]; then
    echo "PASS: $from → $expected_to"
    ((PASS++))
  else
    echo "FAIL: $from → expected $expected_to, got $actual"
    ((FAIL++))
  fi
}

check_redirect "/cellular-shades-chicago/" "/chicago/products/cellular"
check_redirect "/roller-shades-chicago/" "/chicago/products/roller"
check_redirect "/solar-shades-chicago/" "/chicago/products/solar"
check_redirect "/wood-blinds-chicago/" "/chicago/products/wood"
check_redirect "/plantation-shutters-chicago/" "/chicago/products/shutters"
check_redirect "/motorized-blinds-chicago/" "/chicago/products/motorized"
check_redirect "/contact/" "/chicago/quote"
check_redirect "/free-estimate/" "/chicago/quote"
check_redirect "/blog/" "/chicago/blog"
check_redirect "/faq/" "/chicago/faq"

echo ""
echo "Results: $PASS passed, $FAIL failed"
```

## Appendix B: sitemap.ts Update for /chicago basePath

```ts
// src/app/sitemap.ts — updated for basePath: '/chicago'
import type { MetadataRoute } from 'next'
import { PRODUCTS, NEIGHBORHOODS } from '@/lib/season'
import { BLOG_POSTS } from '@/lib/blog'

const BASE = 'https://bensblinds.com/chicago'
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
    { url: BASE,                        lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/products`,          lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/quote`,             lastModified: NOW, changeFrequency: 'monthly', priority: 0.95 },
    ...productRoutes,
    { url: `${BASE}/neighborhoods`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.82 },
    ...neighborhoodRoutes,
    { url: `${BASE}/blog`,              lastModified: NOW, changeFrequency: 'weekly',  priority: 0.78 },
    ...blogRoutes,
    { url: `${BASE}/faq`,               lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/seasonal`,          lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/partners`,          lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
```
