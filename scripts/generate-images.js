#!/usr/bin/env node
/**
 * Ben's Blinds Chicago — Image Asset Generator
 * Builds all missing image assets using sharp + SVG compositing.
 *
 * Generates:
 *  - public/og-default.png              (1200×630 branded OG card)
 *  - public/images/home/hero-summer.jpg (warm sun-bleached grade)
 *  - public/images/home/hero-fall.jpg   (golden amber grade)
 *  - public/images/partners/hunter-douglas-room.jpg
 *  - public/images/partners/sunpro-patio.jpg
 *  - public/images/gallery additions    (before/after loft, morning/evening/midday)
 *  - public/images/products/*-card.jpg  (4:3 card crops from existing heroes)
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const pub  = (...p) => path.join(ROOT, 'public', ...p)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

/** Apply a colour overlay to an existing image */
async function colourGrade(src, dest, { r=0, g=0, b=0, alpha=0.18, brightness=1, saturation=1 } = {}) {
  const meta = await sharp(src).metadata()
  const overlay = Buffer.alloc(meta.width * meta.height * 4)
  for (let i = 0; i < meta.width * meta.height; i++) {
    overlay[i * 4 + 0] = r
    overlay[i * 4 + 1] = g
    overlay[i * 4 + 2] = b
    overlay[i * 4 + 3] = Math.round(alpha * 255)
  }

  await sharp(src)
    .modulate({ brightness, saturation })
    .composite([{
      input: overlay,
      raw: { width: meta.width, height: meta.height, channels: 4 },
      blend: 'over',
    }])
    .jpeg({ quality: 88 })
    .toFile(dest)
  console.log('✓', path.relative(ROOT, dest))
}

/** Render an SVG string to a PNG file */
async function svgToPng(svg, dest, { width, height } = {}) {
  await ensureDir(path.dirname(dest))
  const buf = Buffer.from(svg)
  let pipeline = sharp(buf, { density: 144 })
  if (width && height) pipeline = pipeline.resize(width, height)
  await pipeline.png({ quality: 95 }).toFile(dest)
  console.log('✓', path.relative(ROOT, dest))
}

/** Crop + resize an existing image into a 4:3 card */
async function cardCrop(src, dest, { width = 800, height = 600 } = {}) {
  await sharp(src)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85 })
    .toFile(dest)
  console.log('✓', path.relative(ROOT, dest))
}

// ---------------------------------------------------------------------------
// 1. og-default.png  (1200 × 630)
// ---------------------------------------------------------------------------
async function buildOgDefault() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   style="stop-color:#1a0a02;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3d1a08;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   style="stop-color:#c8702a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
    </linearGradient>
    <!-- Blind slat texture -->
    <pattern id="slats" x="0" y="0" width="1200" height="28" patternUnits="userSpaceOnUse">
      <rect width="1200" height="2"  y="13" fill="rgba(255,255,255,0.04)"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#slats)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="url(#accent)"/>

  <!-- Decorative window frame right side -->
  <rect x="820" y="60" width="320" height="510" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
  <line x1="820" y1="315" x2="1140" y2="315" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
  <line x1="980" y1="60"  x2="980"  y2="570" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
  <!-- Blind slats in the window frame -->
  <g opacity="0.12">
    <rect x="824" y="80"  width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="100" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="120" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="140" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="160" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="180" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="200" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="220" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="240" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="260" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="280" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="320" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="340" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="360" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="380" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="400" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="420" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="440" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="460" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="480" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="500" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="520" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="540" width="312" height="14" rx="2" fill="#c8702a"/>
    <rect x="824" y="560" width="312" height="14" rx="2" fill="#c8702a"/>
  </g>

  <!-- Brand name -->
  <text x="76" y="248"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="72"
    font-weight="700"
    fill="white"
    letter-spacing="-1">Ben's Blinds</text>

  <!-- City accent -->
  <text x="80" y="305"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="40"
    font-weight="400"
    fill="#c8702a"
    letter-spacing="8">CHICAGO</text>

  <!-- Divider -->
  <rect x="80" y="328" width="560" height="2" fill="rgba(200,112,42,0.4)"/>

  <!-- Tagline -->
  <text x="80" y="374"
    font-family="Arial, Helvetica, sans-serif"
    font-size="24"
    fill="rgba(255,255,255,0.75)"
    letter-spacing="1">Custom Blinds · Shades · Shutters</text>

  <!-- Supporting line -->
  <text x="80" y="418"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20"
    fill="rgba(255,255,255,0.45)"
    letter-spacing="0.5">Free In-Home Consultation · Licensed &amp; Insured · Since 2005</text>

  <!-- CTA pill -->
  <rect x="80" y="454" width="280" height="52" rx="26" fill="url(#accent)"/>
  <text x="220" y="487"
    font-family="Arial, Helvetica, sans-serif"
    font-size="19"
    font-weight="700"
    fill="white"
    text-anchor="middle"
    letter-spacing="0.5">Get a Free Quote</text>

  <!-- URL -->
  <text x="80" y="560"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18"
    fill="rgba(255,255,255,0.35)"
    letter-spacing="1">bensblinds.com</text>

  <!-- Stars rating -->
  <text x="80" y="595"
    font-family="Arial, Helvetica, sans-serif"
    font-size="16"
    fill="#c8702a">★★★★★</text>
  <text x="170" y="595"
    font-family="Arial, Helvetica, sans-serif"
    font-size="16"
    fill="rgba(255,255,255,0.5)">4.9 · 318 Chicago reviews</text>
</svg>`

  await svgToPng(svg, pub('og-default.png'), { width: 1200, height: 630 })
}

// ---------------------------------------------------------------------------
// 2. Hero summer  (warm, high-brightness sun wash over spring)
// ---------------------------------------------------------------------------
async function buildHeroSummer() {
  await colourGrade(
    pub('images/home/hero-spring.jpg'),
    pub('images/home/hero-summer.jpg'),
    { r: 255, g: 180, b: 40, alpha: 0.14, brightness: 1.08, saturation: 1.15 }
  )
}

// ---------------------------------------------------------------------------
// 3. Hero fall  (amber-gold grade over spring)
// ---------------------------------------------------------------------------
async function buildHeroFall() {
  await colourGrade(
    pub('images/home/hero-spring.jpg'),
    pub('images/home/hero-fall.jpg'),
    { r: 200, g: 100, b: 20, alpha: 0.22, brightness: 0.96, saturation: 1.1 }
  )
}

// ---------------------------------------------------------------------------
// 4. Partners images  (branded room scenes from existing product heroes)
// ---------------------------------------------------------------------------
async function buildPartnerImages() {
  await ensureDir(pub('images/partners'))

  // Hunter Douglas room — warm crop from cellular hero
  await sharp(pub('images/products/cellular-hero.jpg'))
    .resize(1200, 800, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 1.05, saturation: 0.95 })
    .jpeg({ quality: 88 })
    .toFile(pub('images/partners/hunter-douglas-room.jpg'))
  console.log('✓ images/partners/hunter-douglas-room.jpg')

  // SUNPRO patio — warmer tint from roller shades hero
  await sharp(pub('images/products/roller-hero.jpg'))
    .resize(1200, 800, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 1.1, saturation: 1.1 })
    .jpeg({ quality: 88 })
    .toFile(pub('images/partners/sunpro-patio.jpg'))
  console.log('✓ images/partners/sunpro-patio.jpg')
}

// ---------------------------------------------------------------------------
// 5. Gallery images  (before/after loft + time-of-day variants)
// ---------------------------------------------------------------------------
async function buildGalleryImages() {
  await ensureDir(pub('images/gallery'))

  // Before loft — desaturated industrial look from motorized hero
  await sharp(pub('images/products/motorized-hero.jpg'))
    .resize(1200, 900, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.88, saturation: 0.3 })
    .jpeg({ quality: 85 })
    .toFile(pub('images/gallery/before-loft.jpg'))
  console.log('✓ images/gallery/before-loft.jpg')

  // After loft — same, but with solar shades warm grade
  await sharp(pub('images/products/motorized-hero.jpg'))
    .resize(1200, 900, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 1.05, saturation: 1.05 })
    .jpeg({ quality: 88 })
    .toFile(pub('images/gallery/after-loft.jpg'))
  console.log('✓ images/gallery/after-loft.jpg')

  // Morning bedroom — soft cool blue from roller hero
  await colourGrade(
    pub('images/products/roller-hero.jpg'),
    pub('images/gallery/morning-bedroom.jpg'),
    { r: 180, g: 200, b: 255, alpha: 0.12, brightness: 0.92, saturation: 0.85 }
  )

  // Evening living — warm amber from roman hero
  await colourGrade(
    pub('images/products/roman-hero.jpg'),
    pub('images/gallery/evening-living.jpg'),
    { r: 255, g: 160, b: 60, alpha: 0.18, brightness: 0.9, saturation: 1.05 }
  )

  // Midday office — bright neutral from solar hero
  await sharp(pub('images/products/solar-hero.jpg'))
    .resize(1200, 900, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 1.12, saturation: 0.9 })
    .jpeg({ quality: 88 })
    .toFile(pub('images/gallery/midday-office.jpg'))
  console.log('✓ images/gallery/midday-office.jpg')
}

// ---------------------------------------------------------------------------
// 6. Product card crops  (800×600 4:3 from existing hero shots)
// ---------------------------------------------------------------------------
const PRODUCTS = [
  'cellular', 'solar', 'roller', 'wood', 'shutters', 'roman', 'motorized', 'drapery'
]

async function buildProductCards() {
  for (const p of PRODUCTS) {
    const src = pub(`images/products/${p}-hero.jpg`)
    const dest = pub(`images/products/${p}-card.jpg`)
    if (!fs.existsSync(src)) { console.warn('⚠ missing', src); continue }
    await cardCrop(src, dest)
  }
}

// ---------------------------------------------------------------------------
// 6b. Product texture close-ups  (600×600 tight centre crop)
// ---------------------------------------------------------------------------
async function buildProductTextures() {
  const texturePairs = [
    ['cellular', { left: 600, top: 200, width: 600, height: 600 }],
    ['solar',    { left: 800, top: 300, width: 600, height: 600 }],
    ['roller',   { left: 700, top: 200, width: 600, height: 600 }],
    ['wood',     { left: 500, top: 250, width: 600, height: 600 }],
    ['shutters', { left: 600, top: 200, width: 600, height: 600 }],
    ['roman',    { left: 600, top: 200, width: 600, height: 600 }],
  ]
  for (const [p, crop] of texturePairs) {
    const src  = pub(`images/products/${p}-hero.jpg`)
    const dest = pub(`images/products/${p}-texture.jpg`)
    if (!fs.existsSync(src)) { console.warn('⚠ missing', src); continue }
    try {
      await sharp(src)
        .extract(crop)
        .resize(600, 600, { fit: 'cover' })
        .modulate({ saturation: 1.1 })
        .jpeg({ quality: 90 })
        .toFile(dest)
      console.log('✓', path.relative(ROOT, dest))
    } catch (e) {
      console.warn('⚠ texture crop failed for', p, e.message)
    }
  }
}

// ---------------------------------------------------------------------------
// Run all
// ---------------------------------------------------------------------------
;(async () => {
  console.log('\n🖼  Generating Ben\'s Blinds image assets...\n')
  try {
    await buildOgDefault()
    await buildHeroSummer()
    await buildHeroFall()
    await buildPartnerImages()
    await buildGalleryImages()
    await buildProductCards()
    await buildProductTextures()
    console.log('\n✅  All images generated.\n')
  } catch (err) {
    console.error('\n❌', err)
    process.exit(1)
  }
})()
