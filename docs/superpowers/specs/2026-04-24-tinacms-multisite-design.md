# TinaCMS Integration + Multi-Location Site Restructure
**Date:** 2026-04-24  
**Status:** Approved — executing Phase 1

---

## Overview

This spec covers two integrated workstreams:

1. **TinaCMS visual CMS integration** — full click-to-edit, page builder, drag-and-drop blocks, media library, and draft/publish workflow for the existing Ben's Blinds Chicago site.
2. **Multi-location restructure** — expand the single-city site into a two-location Next.js app: Steamboat Springs at `bensblinds.com/` (root) and Chicago at `bensblinds.com/chicago`, sharing a design system with per-location content.

---

## Part 1: TinaCMS Integration

### Goals
- Any non-technical editor can update all site content without touching code
- Click any visible element on the preview site → sidebar field opens immediately
- Drag homepage sections to reorder them
- Upload and manage images through a built-in media library
- Save changes to a staging preview; publish to production with one button
- All 49 existing pages remain visually and functionally identical post-migration
- All SEO schemas (Review, LocalBusiness, FAQPage, BreadcrumbList) remain intact

### Architecture

**Branch Strategy**
```
main branch          → production (bensblinds.com / Netlify production site)
content branch       → preview (auto-deploys on every TinaCMS save)
```

Editors work exclusively on the `content` branch via `/admin`. The "Publish to Production" button triggers a GitHub API merge of `content → main`, which triggers a Netlify production deploy (~2 min).

**Upgrade path:** Switching to Tina Cloud Business ($29/mo) at any point requires: (1) upgrading the plan, (2) enabling Editorial Workflow toggle in Tina Cloud dashboard, (3) removing the custom publish button. No code changes to schemas or components.

**Authentication**
- Tina Cloud handles editor login (email/password or GitHub OAuth)
- `/admin` route is gated — unauthenticated users redirected to login
- Public site has zero Tina UI artifacts

**Media Library**
- Repo-based: images stored in `public/images/` and committed to the `content` branch
- Tina's built-in media manager handles upload, crop, select
- No external CDN required at launch; can migrate to Cloudinary later without schema changes

### Content Types

#### 1. Homepage (Page Builder)
File: `content/pages/home.md`  
Schema type: `page` with `blocks` field (array of typed block objects)

Blocks (each has enabled toggle + drag-to-reorder):
- **HeroBlock** — headline, subheadline, CTA text, CTA href, background image, badge text
- **ProductsBlock** — heading, subheading, featured product keys (multi-select from Products collection)
- **NeighborhoodsBlock** — heading, subheading, featured neighborhood slugs
- **ReviewsBlock** — heading, subheading, reviews array (author, body, rating, date, location)
- **BlogBlock** — heading, subheading, number of posts to show (defaults to 3)
- **PartnersBlock** — heading, partner items array (name, logo image, href)

Each block has a `label` and `description` on every field so the editor knows exactly what they're changing.

#### 2. Blog Posts (Collection)
Path: `content/blog/{slug}.md`  
12 existing posts migrated from `src/lib/blog.ts`

Fields: `slug`, `title`, `date`, `excerpt`, `image` (media picker), `imageAlt`, `keywords` (tag list), `sections` (rich text with h2/h3/body/list support), `relatedPosts` (reference to other blog posts)

#### 3. Products (Collection)
Path: `content/products/{key}.md`  
8 existing products migrated from `src/lib/season.ts`

Fields: `key`, `name`, `tagline`, `description`, `heroImage`, `heroImageAlt`, `features` (list), `faqs` (array of question/answer), `relatedProducts` (reference list)

#### 4. Neighborhoods (Collection)
Path: `content/neighborhoods/{slug}.md`  
12 existing neighborhoods migrated from `src/lib/season.ts`

Fields: `name`, `slug`, `description`, `heroImage`, `heroImageAlt`, `commonWindowTypes` (list), `topProducts` (reference list with reason text), `faqs` (array of question/answer)

#### 5. Navigation (Single Document)
Path: `content/settings/navigation.json`

Fields: `navLinks` (array of label + href), `ctaText`, `ctaHref`, `phone`

#### 6. Site Settings (Single Document)
Path: `content/settings/site.json`

Fields: `phone`, `email`, `address` (street, city, state, zip), `socialLinks` (facebook, instagram, yelp, houzz), `seoDefaults` (title template, description)

### Click-to-Edit Implementation

Each page component that reads from TinaCMS content uses the `useTina()` hook in client context. Every editable DOM element receives a `data-tina-field` attribute matching its schema path. When `/admin` is active, TinaCMS overlays highlight rings on hover and open the sidebar field on click.

Field labels and descriptions follow this convention:
- Label: short noun ("Hero Headline", "CTA Button Text")
- Description: one sentence explaining impact ("Displayed in large type at the top of the homepage. Keep under 60 characters.")

### Publish Button

A `<PublishButton>` component in the `/admin` layout calls a Next.js API route (`/api/publish`) that uses the GitHub API to create a merge commit from `content` into `main`. The route is authenticated with a `GITHUB_PUBLISH_TOKEN` env var (fine-grained PAT with contents:write on the repo). After merge, Netlify automatically rebuilds production.

### QA Gates Per Phase

| Phase | Gate |
|-------|------|
| 2 — GitHub/Netlify | Production URL unchanged; preview branch live |
| 3 — TinaCMS install | `/admin` loads; Tina Cloud login works; build passes |
| 4 — Blog/Nav/Settings migration | All 12 posts render identically; sitemap correct; edit in /admin saves to GitHub |
| 5 — Products/Neighborhoods migration | All 20 pages render identically; SEO schemas intact in page source |
| 6 — Contextual editing | Click any field → sidebar opens; changes appear in preview within seconds; public site shows no Tina UI |
| 7 — Homepage blocks | Drag reorders sections; toggle hides block; click hero headline → editable; Core Web Vitals not regressed |
| 8 — Publish + audit | Upload image → appears in media library; Publish button → production live in <2 min; all 49 pages indexed |

---

## Part 2: Multi-Location Restructure

### Goal

Expand Ben's Blinds from a single Chicago site into a two-location Next.js application within a single repo and single Netlify deployment:

- **Steamboat Springs** — primary location at `bensblinds.com/` (root)
- **Chicago** — existing location at `bensblinds.com/chicago`
- **Shared design system** — same component library, globals.css, font variables, card patterns, color tokens
- **Per-location content** — separate CMS collections, SEO metadata, neighborhood pages, and blog posts per location
- **Path-based routing** — single Next.js App Router app, no subdomains

### Routing Architecture

```
/                          → Steamboat Springs homepage
/products/[slug]           → Steamboat product pages
/neighborhoods/[slug]      → Steamboat neighborhood pages (e.g. /neighborhoods/old-town)
/blog/[slug]               → Steamboat blog posts
/quote                     → Steamboat quote form
/faq                       → Steamboat FAQ

/chicago                   → Chicago homepage
/chicago/products/[slug]   → Chicago product pages
/chicago/neighborhoods/[slug] → Chicago neighborhood pages
/chicago/blog/[slug]       → Chicago blog posts
/chicago/quote             → Chicago quote form
/chicago/faq               → Chicago FAQ
```

### App Router File Structure

```
src/app/
├── layout.tsx                    # Root layout (shared fonts, globals)
├── page.tsx                      # Steamboat homepage
├── products/[slug]/page.tsx      # Steamboat products
├── neighborhoods/[slug]/page.tsx # Steamboat neighborhoods
├── blog/[slug]/page.tsx          # Steamboat blog
├── quote/page.tsx                # Steamboat quote
├── faq/page.tsx                  # Steamboat FAQ
└── chicago/
    ├── layout.tsx                # Chicago layout (inherits root, adds /chicago context)
    ├── page.tsx                  # Chicago homepage (HomeClient with chicago data)
    ├── products/[slug]/page.tsx  # Chicago products
    ├── neighborhoods/[slug]/page.tsx
    ├── blog/[slug]/page.tsx
    ├── quote/page.tsx
    └── faq/page.tsx
```

### Shared Design System

A `LocationContext` provides the active location to all shared components:

```typescript
type Location = 'steamboat' | 'chicago'
const LocationContext = createContext<Location>('steamboat')
```

Shared components that are location-aware:
- `Nav` — reads location for logo, phone number, CTA href
- `Footer` — reads location for address, phone, social links
- `WeatherBanner` — reads location for weather API city param
- `QuoteForm` — reads location for form submission routing
- `SEO metadata` — per-location metadataBase, title template, LocalBusiness schema

Color tokens remain shared. Location-specific overrides (if any) are handled via CSS custom property overrides in the location layout.

### TinaCMS Multi-Location Content Model

Content directories split by location:
```
content/
├── steamboat/
│   ├── pages/home.md
│   ├── blog/*.md
│   ├── products/*.md
│   ├── neighborhoods/*.md
│   └── settings/
│       ├── navigation.json
│       └── site.json
└── chicago/
    ├── pages/home.md
    ├── blog/*.md          (12 existing posts)
    ├── products/*.md      (8 existing)
    ├── neighborhoods/*.md (12 existing)
    └── settings/
        ├── navigation.json
        └── site.json
```

Tina collections are namespaced by location (`steamboat-blog`, `chicago-blog`) so editors can clearly see which location they're editing in `/admin`. A location switcher dropdown in the `/admin` sidebar filters the visible collections.

### SEO Per Location

Each location gets its own:
- `metadataBase` URL
- `LocalBusiness` schema with correct address, phone, geo coordinates, areaServed
- Sitemap section (Steamboat URLs at root, Chicago URLs under `/chicago`)
- `robots.txt` canonical references

Steamboat Springs business details (to be filled in during Steamboat content buildout):
- Address, phone, hours, service area neighborhoods (Old Town, Fish Creek, Base Area, etc.)
- Steamboat-specific product recommendations (motorized shades for ski lodge light control, etc.)

### Implementation Order

Multi-location restructure is intentionally sequenced **after** TinaCMS is fully operational. This ensures:
1. Chicago content is already in CMS-managed markdown files before the `/chicago` path prefix is added
2. The routing restructure is a surgical Next.js change (add `chicago/` directory, update Nav/Footer location awareness) rather than a full rebuild
3. Steamboat content can be authored in TinaCMS from day one

### Migration Risk Mitigations

- Chicago URLs do not change until the restructure phase — zero SEO impact during TinaCMS phases
- All existing Chicago redirects, sitemap entries, and canonical URLs remain at current paths until the explicit restructure deployment
- The restructure deployment adds 301 redirects for any Chicago URLs that move (if any)
- Steamboat goes live at root only after its content is authored and QA'd — Chicago remains at `/chicago` serving its full existing page set

---

## Phase Summary

| # | Phase | Est. Time | Session |
|---|-------|-----------|---------|
| 1 | Page-by-page QA audit + fixes | ~3 hrs | Session 1 |
| 2 | GitHub repo + Netlify git integration | ~1 hr | Session 2 |
| 3 | TinaCMS install + Tina Cloud setup | ~2 hrs | Session 2 |
| 4 | Content migration: blog + nav + settings | ~3 hrs | Session 3 |
| 5 | Content migration: products + neighborhoods | ~3 hrs | Session 4 |
| 6 | Contextual editing across all pages | ~4 hrs | Session 5 |
| 7 | Homepage page builder (blocks) | ~5 hrs | Session 6 |
| 8 | Publish button + media library + full audit | ~2 hrs | Session 7 |
| 9 | Write multi-location spec + TinaCMS multi-site model | ~2 hrs | Session 8 |

**Total: ~25 hours across 8 sessions**

---

## Open Questions (to resolve during execution)

1. Steamboat Springs address, phone number, hours — needed for Phase 9 spec detail
2. Steamboat service area neighborhoods — needed for Phase 9
3. Whether Steamboat shares the same product catalog as Chicago or has a different set
4. Domain setup: does bensblinds.com currently point anywhere, or is it a new domain?
5. GitHub account username to create the repo under
