# Ben's Blinds Chicago — AI Images & Site Enhancement Plan

**Date:** 2026-04-23  
**Status:** Draft — pending user approval

---

## Migration Recommendation: Option C → Option A

**Start with `/public/images/` (Option C).** Get real AI images on the site within days. No setup friction.  
**Migrate to Sanity (Option A)** once images are finalized and Ben's team needs to swap photos without code changes.

Migration effort is low: change `src="/images/..."` → Sanity CDN URLs in `images.ts`. No redesign required.

---

## Image Folder Structure (`/public/images/`)

```
public/images/
├── home/
│   ├── hero-spring.jpg        # Lincoln Park living room, roller shades, spring morning
│   ├── hero-summer.jpg        # River North high-rise, solar shades, skyline
│   ├── hero-fall.jpg          # Wicker Park greystone, wood blinds, golden hour
│   └── hero-winter.jpg        # Gold Coast condo, cellular shades, snow outside
├── products/
│   ├── cellular-hero.jpg      # Greystone bay window, honeycomb shades, winter
│   ├── cellular-card.jpg      # 4:3 crop of above
│   ├── cellular-texture.jpg   # Close-up fabric cell detail
│   ├── solar-hero.jpg         # River North floor-to-ceiling glass, solar shades
│   ├── solar-card.jpg
│   ├── solar-texture.jpg
│   ├── roller-hero.jpg        # West Loop loft, roller shades, industrial brick
│   ├── roller-card.jpg
│   ├── roller-texture.jpg
│   ├── wood-hero.jpg          # Lincoln Park craftsman, wood blinds, warm tones
│   ├── wood-card.jpg
│   ├── wood-texture.jpg
│   ├── shutters-hero.jpg      # Hyde Park historic, plantation shutters
│   ├── shutters-card.jpg
│   ├── shutters-texture.jpg
│   ├── roman-hero.jpg         # Gold Coast formal living room, roman shades
│   ├── roman-card.jpg
│   ├── roman-texture.jpg
│   ├── motorized-hero.jpg     # Modern open-plan, motorized shades app control
│   ├── motorized-card.jpg
│   ├── drapery-hero.jpg       # Lincoln Park formal dining, layered drapery
│   ├── drapery-card.jpg
│   └── drapery-texture.jpg
├── neighborhoods/
│   ├── lincoln-park.jpg       # Bay window greystone exterior + room
│   ├── lakeview.jpg           # East-facing high-rise, Lake Michigan light
│   ├── gold-coast.jpg         # Pre-war condo, ornate trim, floor-to-ceiling
│   ├── wicker-park.jpg        # Greystone sash windows, vintage flat
│   ├── logan-square.jpg       # Two-flat bay windows, warm tones
│   ├── pilsen.jpg             # Row-house bungalow, colorful light
│   ├── west-loop.jpg          # Industrial loft, exposed beam, roller shades
│   └── hyde-park.jpg          # Historic landmark windows, shutters
├── gallery/
│   ├── before-greystone.jpg   # Bare bay window, greystone living room
│   ├── after-greystone.jpg    # Same room, wood blinds installed
│   ├── before-loft.jpg        # Bare industrial loft windows
│   ├── after-loft.jpg         # Same loft, solar shades + motorized
│   ├── morning-bedroom.jpg    # Bedroom, roller blackout, soft morning glow
│   ├── evening-living.jpg     # Living room, roman shades, warm lamp light
│   └── midday-office.jpg      # Home office, solar shades, no glare
└── partners/
    ├── hunter-douglas-room.jpg  # Duette shades in Chicago high-rise
    └── sunpro-patio.jpg         # Motorized awning, Chicago deck
```

**Total: ~45 images**

---

## AI Image Prompt Library

### Style Consistency Guide (embed in ALL prompts)

Use these 5 descriptors across every image for visual cohesion:

1. **"architectural interior photography"** — sets the photographic style
2. **"Chicago Lake Michigan diffused natural light"** — consistent light quality
3. **"warm neutrals, navy, aged brass, dark walnut"** — palette anchoring
4. **"f/8 35mm lens, shallow depth of field"** — camera feel
5. **"no people, pristine condition, editorial quality"** — content consistency

### Negative Prompts (Midjourney)

```
--no cartoon, illustration, render, 3D, CGI, watermark, text, logo, 
people, person, messy, clutter, suburbia, generic, purple, 
artificial lighting only, overexposed, HDR look, stock photo feel
```

---

### HERO / BANNER IMAGES (16:9, 1920×1080)

| Scene | Category | Midjourney v7 | GPT-4o / DALL-E 3 | Flux.1 Dev |
|-------|----------|---------------|-------------------|------------|
| **hero-spring** | Home Hero | `architectural interior photography, Lincoln Park Chicago greystone living room, tall bay windows with light-filtering white roller shades half-raised, spring morning Lake Michigan diffused light streaming in, white oak floors, warm neutrals, navy accent cushions, aged brass fixtures, lush houseplants, no people --ar 16:9 --style raw --v 7` | A photorealistic architectural interior photo of a Chicago Lincoln Park greystone living room in spring. Tall bay windows fitted with light-filtering white roller shades, raised halfway. Lake Michigan diffused morning light fills the room. White oak hardwood floors, warm neutral walls, navy accent cushions, aged brass light fixtures. Lush green houseplants. Pristine, editorial quality. No people. | `chicago greystone living room, bay windows, white roller shades half-raised, spring morning light, white oak floors, navy accents, aged brass fixtures, editorial interior photography, f/8 35mm` |
| **hero-summer** | Home Hero | `architectural interior photography, River North Chicago modern high-rise condo, floor-to-ceiling glass walls fitted with charcoal solar shades 5% openness, Chicago skyline view visible through, summer midday Lake Michigan light, white walls, warm neutrals, dark walnut furniture, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a River North Chicago luxury high-rise condo. Floor-to-ceiling glass windows with charcoal solar shades that maintain a clear view of the Chicago skyline. Bright summer midday light filtered through. White walls, dark walnut furniture, minimal decor. No people. Editorial interior photography. | `river north chicago highrise, floor-to-ceiling glass, charcoal solar shades 5% openness, skyline view, summer light, dark walnut, white walls, architectural interior photography` |
| **hero-fall** | Home Hero | `architectural interior photography, Wicker Park Chicago greystone vintage flat, tall double-hung windows with rich walnut wood blinds at 45-degree angle, warm golden hour fall light from west, exposed brick accent wall, aged brass hardware, dark walnut floors, warm ochre and forest green accents, no people --ar 16:9 --style raw --v 7` | A photorealistic interior of a Wicker Park Chicago vintage greystone flat in autumn. Tall double-hung windows with dark walnut wood blinds tilted at 45 degrees. Warm western golden-hour light. Exposed brick accent wall, aged brass hardware, dark walnut hardwood floors, ochre and forest green throw pillows. No people. Editorial quality. | `wicker park greystone flat, double-hung windows, walnut wood blinds 45deg, golden hour fall light, exposed brick, aged brass, forest green accents, editorial interior photography` |
| **hero-winter** | Home Hero | `architectural interior photography, Gold Coast Chicago pre-war condo, tall casement windows fitted with cream double-cell cellular honeycomb shades fully raised, winter grey Lake Michigan light, white ornate crown molding, navy blue walls, white oak floors, cashmere throw, warm lamp glow, snow visible outside, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a Gold Coast Chicago pre-war condo in winter. Tall casement windows with cream double-cell cellular honeycomb shades raised. Grey winter Lake Michigan light outside, snow falling. White ornate crown molding, deep navy blue walls, white oak floors, cashmere throw on sofa, warm table lamp glow. No people. Editorial quality. | `gold coast chicago pre-war condo, casement windows, cream cellular honeycomb shades, winter grey light, snow outside, navy walls, white crown molding, warm lamp, editorial photography` |
| **cellular-hero** | Product Hero | `architectural interior photography, Chicago Lincoln Park greystone bay window, cream double-cell honeycomb cellular shades installed, winter morning light diffused through shade fabric showing cell pattern, white oak floors, craftsman window trim, no people --ar 16:9 --style raw --v 7` | Photorealistic interior showing a Chicago Lincoln Park greystone bay window fitted with cream double-cell honeycomb cellular shades. Winter morning light diffuses through the fabric, softly illuminating the room. White oak floors, craftsman white trim. The shade's honeycomb cell texture is visible. No people. | `lincoln park greystone bay window, cream cellular honeycomb shades, winter morning diffused light, cell texture visible, white oak floors, craftsman trim, architectural photography` |
| **solar-hero** | Product Hero | `architectural interior photography, River North Chicago high-rise office, floor-to-ceiling glass walls with charcoal 5% solar roller screens installed, Chicago skyline and Lake Michigan visible through screens, summer midday light, no glare on desk surface, white walls, dark walnut desk, MacBook on desk, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a River North Chicago high-rise home office with floor-to-ceiling glass. Charcoal solar roller screens at 5% openness are installed, maintaining a clear view of the Chicago skyline and Lake Michigan while eliminating screen glare. Dark walnut desk, MacBook laptop, no people. Editorial quality. | `river north highrise office, floor-to-ceiling glass, charcoal solar screens 5%, chicago skyline view, no screen glare, dark walnut desk, summer midday light, architectural interior photography` |
| **roller-hero** | Product Hero | `architectural interior photography, West Loop Chicago industrial loft, tall warehouse windows fitted with cream linen roller shades halfway raised, exposed timber ceiling beams, exposed brick walls, polished concrete floors, mid-century modern furniture, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a West Loop Chicago industrial loft. Tall warehouse-style windows fitted with cream linen roller shades raised halfway. Exposed timber ceiling beams, exposed brick walls, polished concrete floors, mid-century modern furniture. No people. Editorial interior photography. | `west loop chicago loft, warehouse windows, cream linen roller shades half-raised, exposed timber beams, exposed brick, polished concrete, mid-century furniture, editorial photography` |
| **wood-hero** | Product Hero | `architectural interior photography, Lincoln Park Chicago craftsman home study, tall double-hung windows fitted with dark walnut wood blinds at 45-degree angle, warm afternoon light, built-in bookshelves, leather armchair, persian rug, dark walnut floors, white trim, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a Lincoln Park Chicago craftsman home study. Double-hung windows with dark walnut wood blinds tilted at 45 degrees. Warm afternoon light. Built-in bookshelves with books, leather armchair, persian rug, dark walnut hardwood floors, white craftsman trim. No people. | `lincoln park craftsman study, double-hung windows, dark walnut wood blinds 45deg, warm afternoon light, built-in bookshelves, leather armchair, persian rug, architectural photography` |
| **shutters-hero** | Product Hero | `architectural interior photography, Hyde Park Chicago historic Victorian living room, tall double-hung windows fitted with bright white plantation shutters open at 45-degree louver angle, morning light, ornate plaster crown molding, original hardwood floors, period-appropriate furniture, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a Hyde Park Chicago historic Victorian living room. Tall windows with bright white plantation shutters, louvers open at 45 degrees. Morning light streams in. Ornate plaster crown molding, original hardwood floors, period-appropriate upholstered furniture. No people. Editorial quality. | `hyde park chicago victorian, tall windows, white plantation shutters 45deg louvers, morning light, ornate plaster molding, original hardwood floors, architectural interior photography` |
| **roman-hero** | Product Hero | `architectural interior photography, Gold Coast Chicago formal living room, tall windows with flat-fold sage green roman shades fully lowered, evening lamp light, white ornate trim, white walls, navy blue sofa, aged brass coffee table, dark walnut floors, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a Gold Coast Chicago formal living room. Tall windows with flat-fold sage green roman shades fully lowered. Warm evening lamp light. White ornate crown molding, white walls, navy blue velvet sofa, aged brass coffee table, dark walnut floors. No people. | `gold coast chicago formal living room, tall windows, sage green roman shades flat fold, evening lamp light, white ornate molding, navy velvet sofa, aged brass, dark walnut floors` |
| **motorized-hero** | Product Hero | `architectural interior photography, modern River North Chicago open-plan apartment, six large windows with charcoal motorized roller shades in motion descending simultaneously, golden hour evening light, white walls, concrete floors, Lutron Caseta keypad on wall, smartphone on coffee table showing shade app, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a modern River North Chicago open-plan apartment. Six large windows with charcoal motorized roller shades descending simultaneously. Golden hour evening light. White walls, polished concrete floors, Lutron keypad visible on wall, smartphone showing shade control app on coffee table. No people. | `river north open-plan apartment, motorized charcoal roller shades descending, golden hour, white walls, concrete floors, lutron keypad visible, smartphone shade app, editorial photography` |
| **drapery-hero** | Product Hero | `architectural interior photography, Lincoln Park Chicago formal dining room, tall bay windows with floor-to-ceiling ivory linen drapery panels on brass rod, drapery pooling slightly on dark walnut floor, morning light, white wainscoting, round dining table, upholstered chairs, fresh flowers, no people --ar 16:9 --style raw --v 7` | Photorealistic interior of a Lincoln Park Chicago formal dining room. Tall bay windows draped with floor-to-ceiling ivory linen curtain panels on a brass rod, pooling slightly at the floor. Morning light. White wainscoting, dark walnut dining table, upholstered dining chairs, fresh white flower arrangement. No people. | `lincoln park formal dining, bay windows, ivory linen drapery floor-to-ceiling, brass rod, slight pool, morning light, white wainscoting, dark walnut table, editorial photography` |

---

### PRODUCT CARD THUMBNAILS (4:3, 1200×900)

Same prompts as hero images but with `--ar 4:3` and tighter crop instructions:  
Add to each: `tight crop, window and shade filling 80% of frame`

---

### TEXTURE / DETAIL SHOTS (1:1, 800×800)

| Scene | Midjourney v7 | GPT-4o / DALL-E 3 | Flux.1 Dev |
|-------|---------------|-------------------|------------|
| **Cellular fabric** | `macro photography, honeycomb cellular window shade fabric close-up, cream white, double cell construction visible, soft diffused light from behind illuminating cells, studio white background --ar 1:1 --style raw --v 7` | Macro product photography of honeycomb cellular window shade fabric. Cream white color, double-cell construction clearly visible. Soft backlit studio lighting illuminates the individual cells. White background. | `macro honeycomb cellular shade fabric, cream double-cell, backlit, cells visible, product photography, white studio background, 1:1` |
| **Solar screen mesh** | `macro photography, solar roller shade screen mesh close-up, charcoal 5% openness weave texture, sunlight partially filtered through, studio lighting --ar 1:1 --style raw --v 7` | Macro product photo of charcoal solar roller shade screen mesh. 5% openness weave clearly visible. Sunlight filtering through the mesh texture. Studio lighting. White background. | `macro solar shade mesh, charcoal 5% openness weave, sunlight through mesh, product photography, studio lighting, white background` |
| **Linen roller** | `macro photography, natural linen roller shade fabric texture close-up, warm cream weave, soft directional light, studio --ar 1:1 --style raw --v 7` | Macro product photo of natural linen roller shade fabric. Warm cream woven texture visible in fine detail. Soft directional studio lighting. White background. | `macro linen roller shade fabric, cream warm weave texture, soft directional light, product photography, white studio` |
| **Wood slat** | `macro photography, real basswood horizontal blind slat close-up, dark walnut stain, wood grain visible, soft side lighting, studio --ar 1:1 --style raw --v 7` | Macro product photo of a dark walnut-stained basswood horizontal blind slat. Wood grain clearly visible. Soft directional studio lighting. White background. | `macro basswood blind slat, dark walnut stain, wood grain, soft side lighting, product photography, white studio` |
| **Shutter louver** | `macro photography, white plantation shutter louver close-up, poly-resin material, clean painted finish, soft top lighting revealing depth, studio --ar 1:1 --style raw --v 7` | Macro product photo of a white plantation shutter louver. Clean poly-resin painted finish. Soft top-down studio lighting showing depth and shadow. White background. | `macro plantation shutter louver, white poly-resin finish, soft top lighting, depth shadow, product photography, white studio` |
| **Roman fold** | `macro photography, sage green roman shade fabric fold close-up, flat fold construction, soft woven fabric texture, studio lighting --ar 1:1 --style raw --v 7` | Macro product photo of a sage green roman shade fabric fold. Flat fold construction showing the fold crease. Soft woven fabric texture. Studio lighting. White background. | `macro roman shade fold, sage green woven fabric, flat fold crease visible, studio lighting, white background, product photography` |

---

### NEIGHBORHOOD IMAGES (4:3, 1200×900)

| Neighborhood | Midjourney v7 | GPT-4o | Flux |
|-------------|---------------|--------|------|
| **Lincoln Park** | `architectural interior photography, Lincoln Park Chicago greystone bay window room, tall casement windows, warm neutrals, morning light, dark walnut floors, craftsman trim --ar 4:3 --style raw --v 7` | Photorealistic interior of a Lincoln Park Chicago greystone home. Large bay window with morning light, craftsman white trim, dark walnut hardwood floors, warm neutral walls. No people. | `lincoln park greystone interior, bay window, morning light, craftsman trim, dark walnut floors, warm neutrals` |
| **Gold Coast** | `architectural interior photography, Gold Coast Chicago pre-war condo interior, floor-to-ceiling windows, ornate plaster crown molding, navy walls, white trim, aged brass, morning light --ar 4:3 --style raw --v 7` | Photorealistic interior of a Gold Coast Chicago pre-war condo. Floor-to-ceiling windows, ornate plaster crown molding, deep navy walls, white trim, aged brass fixtures. Morning light. No people. | `gold coast chicago pre-war condo, floor-to-ceiling windows, ornate plaster molding, navy walls, aged brass, morning light` |
| **West Loop** | `architectural interior photography, West Loop Chicago industrial loft interior, warehouse windows, exposed timber ceiling beams, exposed brick wall, polished concrete floors, afternoon light --ar 4:3 --style raw --v 7` | Photorealistic interior of a West Loop Chicago industrial loft. Large warehouse-style windows, exposed timber ceiling beams, exposed brick accent wall, polished concrete floors. Afternoon light. No people. | `west loop chicago industrial loft, warehouse windows, exposed timber beams, exposed brick, polished concrete, afternoon light` |
| **Wicker Park** | `architectural interior photography, Wicker Park Chicago vintage greystone flat interior, tall double-hung sash windows, exposed brick, original hardwood floors, golden hour western light --ar 4:3 --style raw --v 7` | Photorealistic interior of a Wicker Park Chicago vintage greystone flat. Tall double-hung sash windows, exposed brick, original hardwood floors, golden hour western light. No people. | `wicker park greystone flat, double-hung sash windows, exposed brick, original hardwood, golden hour light` |
| **River North** | `architectural interior photography, River North Chicago luxury high-rise condo, floor-to-ceiling glass walls, Chicago skyline view, white walls, dark walnut accents, midday summer light --ar 4:3 --style raw --v 7` | Photorealistic interior of a River North Chicago luxury high-rise condo. Floor-to-ceiling glass windows with Chicago skyline view. White walls, dark walnut accents. Midday summer light. No people. | `river north highrise condo, floor-to-ceiling glass, chicago skyline, white walls, dark walnut, midday summer light` |
| **Hyde Park** | `architectural interior photography, Hyde Park Chicago historic Victorian home interior, tall double-hung windows, ornate trim, original oak floors, morning light, period appropriate --ar 4:3 --style raw --v 7` | Photorealistic interior of a Hyde Park Chicago historic Victorian home. Tall double-hung windows with ornate trim, original oak hardwood floors. Morning light. Period-appropriate details. No people. | `hyde park chicago victorian interior, tall double-hung windows, ornate trim, original oak floors, morning light` |

---

### GALLERY / INSPIRATION (4:3, 1200×900)

| Scene | Midjourney v7 | GPT-4o | Flux |
|-------|---------------|--------|------|
| **Before: greystone** | `architectural interior photography, Chicago greystone living room with bare uncovered bay windows, morning light, white oak floors, some furniture, slightly cold feeling, no window treatments --ar 4:3 --style raw --v 7` | Photorealistic interior of a Chicago greystone living room with completely bare uncovered bay windows. Morning light but harsh. White oak floors, simple furniture. Slightly cold and unfinished feeling. No window coverings. No people. | `chicago greystone living room, bare uncovered bay windows, harsh morning light, white oak floors, no window treatments, slightly cold` |
| **After: greystone** | `architectural interior photography, same Chicago greystone living room bay windows now fitted with dark walnut wood blinds at 45 degrees, warm transformed atmosphere, morning light warm and filtered, white oak floors, cozy --ar 4:3 --style raw --v 7` | Photorealistic interior of the same Chicago greystone living room, now transformed. The bay windows are fitted with dark walnut wood blinds tilted at 45 degrees. The room is now warm, cozy, and inviting. Morning light is beautifully filtered. No people. | `chicago greystone bay windows, dark walnut wood blinds 45deg installed, warm transformed atmosphere, morning filtered light, white oak floors, cozy` |
| **Morning bedroom** | `architectural interior photography, Chicago bedroom, east-facing windows with white blackout roller shades allowing thin edge of morning light, soft dawn glow, linen bedding, white walls, minimal, peaceful --ar 4:3 --style raw --v 7` | Photorealistic bedroom interior in Chicago. East-facing windows with white blackout roller shades raised slightly, allowing a thin edge of warm morning light. Soft dawn glow. White linen bedding, white walls. Peaceful and minimal. No people. | `chicago bedroom, east window, white blackout roller shade slight gap, dawn morning glow, white linen bedding, peaceful minimal` |
| **Evening living room** | `architectural interior photography, Chicago living room, windows with flat-fold roman shades fully lowered, warm evening lamp light, candles, velvet sofa, dark walnut, intimate cozy atmosphere --ar 4:3 --style raw --v 7` | Photorealistic Chicago living room interior in the evening. Windows fully covered with flat-fold roman shades. Warm lamp light, candles on coffee table, navy velvet sofa, dark walnut accents. Cozy, intimate atmosphere. No people. | `chicago living room evening, roman shades lowered, warm lamp candlelight, navy velvet sofa, dark walnut, intimate cozy` |
| **Midday home office** | `architectural interior photography, Chicago home office, south-facing windows with charcoal solar roller screens, no glare on laptop screen, bright productive atmosphere, midday light, dark walnut desk --ar 4:3 --style raw --v 7` | Photorealistic Chicago home office. South-facing windows with charcoal solar roller screens installed, eliminating glare on the laptop screen. Bright, productive midday atmosphere. Dark walnut desk, laptop with clear screen. No people. | `chicago home office, south windows, charcoal solar screens, no laptop glare, bright midday productive, dark walnut desk` |

---

## Site Enhancement Phases

### Phase 1 — Real Images (2–4 weeks)
*Replaces SVG placeholder system*

- Generate all 45 images using the prompt library above
- Drop into `/public/images/` folder structure
- Update `src/lib/images.ts` to export static paths instead of SVG data URLs
- Switch all `<img>` tags to Next.js `<Image>` with proper `sizes` prop
- Add `alt` text from scene descriptions above
- **Result**: Site looks like a real business

### Phase 2 — Trust Layer (2–3 weeks)
*From ui-ux-pro-max: "Trust & Authority" pattern*

- **Before/After slider** on home page — interactive CSS comparison slider (before-greystone / after-greystone images)
- **Photo reviews** — add headshot avatars to existing review cards (generate 5 diverse Chicago homeowner portraits)
- **Certification badges** — Hunter Douglas Premier Dealer badge, NWFA member, licensed & insured
- **Project counter** — animated stat: "1,200+ Chicago windows dressed" 
- **Result**: Passes the "do I trust this?" test on first visit

### Phase 3 — Gallery Section (2–3 weeks)
*New page: `/gallery`*

- Full inspiration gallery with masonry or grid layout
- Filter by: product type, neighborhood, room type, light condition
- Morning / evening / midday lighting variants
- Before/after pairs shown side-by-side
- Lightbox viewer for full-size images
- **Result**: Gives fence-sitters the visual proof they need

### Phase 4 — Performance & CMS (1–2 weeks)
*Migrate C → A: /public → Sanity*

- Create Sanity schemas for: `productImage`, `neighborhoodImage`, `galleryPhoto`
- Upload all `/public/images/` to Sanity media library
- Update `images.ts` to use `urlFor()` from Sanity client
- Enable `next/image` remote patterns for `cdn.sanity.io` (already in config)
- Add Sanity env vars to Netlify dashboard
- **Result**: Ben's team can swap/add photos without code changes

### Phase 5 — UX Polish (ongoing)
*From frontend-design skill: micro-interactions, scroll reveals, animation*

- Scroll-triggered fade-in for product cards and neighborhood grid
- Before/after hover reveal effect on home page gallery strip
- Seasonal hero image crossfade transition (spring→summer→fall→winter loop on home page)
- Product card hover: zoom image + show "View Details" overlay
- Quote wizard step transitions (slide instead of instant swap)
- Weather banner entrance animation
- Mobile drawer slide-in refinement
- **Result**: Site feels alive and premium, not static

---

## Recommended Generation Order

1. `hero-spring.jpg` — home page hero, most visible
2. `hero-winter.jpg` — seasonal variant, cellular shades primary product
3. `cellular-hero.jpg` + `solar-hero.jpg` — top 2 products by revenue
4. `before-greystone.jpg` + `after-greystone.jpg` — trust-building before/after
5. All remaining product heroes (6 more)
6. Neighborhood images (8)
7. Texture/detail shots (6)
8. Remaining gallery scenes (3)

---

## Tools to Use

| Priority | Tool | Cost | Best For |
|----------|------|------|---------|
| 1st | **Midjourney v7** | ~$10/mo | Hero images, neighborhood scenes |
| 2nd | **DALL-E 3 (ChatGPT Plus)** | ~$20/mo | Product heroes, quick iterations |
| 3rd | **Flux.1 Dev (fal.ai)** | ~$0.003/image | Texture shots, bulk product cards |

Run the same scene through all 3 tools for key images (hero-spring, hero-winter) and pick the best result.
