import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS, SEASONS } from '@/lib/season'
import { getPartnersForProduct, TIER_LABELS } from '@/lib/partners'
import { IMG } from '@/lib/images'
import { Icon } from '@/components/ui/Icon'

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.key }))
}

const PRODUCT_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  cellular: {
    title: "Cellular Shades Chicago | Insulating Honeycomb Blinds",
    description: "Custom cellular shades in Chicago. Honeycomb construction cuts heat loss by 40% — ideal for Chicago winters. Single, double, and triple-cell options. Free in-home measurement and installation.",
    keywords: ['cellular shades chicago', 'honeycomb shades chicago', 'insulating blinds chicago', 'energy efficient shades chicago', 'blackout cellular shades chicago'],
  },
  solar: {
    title: "Solar Shades Chicago | UV-Blocking Window Screens",
    description: "Solar shades installed in Chicago. Block 85–99% of UV and solar heat while preserving your view. Perfect for south/west-facing windows and high-rise condos. Free consultation.",
    keywords: ['solar shades chicago', 'solar screens chicago', 'UV blocking shades chicago', 'view through shades chicago', 'sun shades chicago'],
  },
  roller: {
    title: "Roller Shades Chicago | Custom Blackout & Sheer Shades",
    description: "Custom roller shades in Chicago. Blackout to sheer, cordless to motorized. Fits any Chicago home from Wicker Park greystone to West Loop loft. Free in-home consultation.",
    keywords: ['roller shades chicago', 'roller blinds chicago', 'blackout roller shades chicago', 'custom roller shades chicago', 'cordless roller shades chicago'],
  },
  wood: {
    title: "Wood Blinds Chicago | Real & Faux Wood Window Blinds",
    description: "Custom wood blinds in Chicago. Real basswood and faux wood options, stained or painted to match your trim. Perfect for Victorian, craftsman, and vintage Chicago homes. Free measurement.",
    keywords: ['wood blinds chicago', 'wooden blinds chicago', 'faux wood blinds chicago', 'basswood blinds chicago', 'custom wood blinds chicago'],
  },
  shutters: {
    title: "Plantation Shutters Chicago | Custom Interior Shutters",
    description: "Plantation shutters custom-built for Chicago homes. Adds resale value, architectural character, and lifetime durability. Hardwood, poly, and composite options. Free in-home consultation.",
    keywords: ['plantation shutters chicago', 'interior shutters chicago', 'custom shutters chicago', 'wood shutters chicago', 'window shutters chicago'],
  },
  roman: {
    title: "Roman Shades Chicago | Custom Fabric Window Shades",
    description: "Custom roman shades in Chicago. Flat, relaxed, and hobbled fold styles. Hundreds of fabrics, blackout lining available. Perfect for Chicago living rooms, bedrooms, and offices. Free quote.",
    keywords: ['roman shades chicago', 'fabric shades chicago', 'custom roman blinds chicago', 'roman blinds chicago', 'soft shades chicago'],
  },
  motorized: {
    title: "Motorized Shades Chicago | Smart Blinds & Somfy Systems",
    description: "Motorized window shades in Chicago. Somfy and Lutron motors, compatible with Alexa, Google Home, and Apple HomeKit. Perfect for high windows and smart homes. Free consultation.",
    keywords: ['motorized shades chicago', 'smart blinds chicago', 'electric blinds chicago', 'automated shades chicago', 'somfy shades chicago', 'remote control blinds chicago'],
  },
  drapery: {
    title: "Custom Drapery Chicago | Curtains & Drapes Installation",
    description: "Custom drapery and curtains in Chicago. Locally fabricated to your exact size. Rod, track, and ripple-fold systems. Pairs with any shade for the layered designer look. Free in-home visit.",
    keywords: ['custom drapery chicago', 'curtains chicago', 'drapes chicago', 'custom curtains chicago', 'drapery installation chicago', 'window curtains chicago'],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.key === slug)
  if (!product) return {}
  const meta = PRODUCT_META[slug]
  return {
    title: meta?.title ?? `${product.name} in Chicago`,
    description: meta?.description ?? `${product.blurb} Custom ${product.name.toLowerCase()} measured and installed throughout Chicago. Free in-home consultation.`,
    keywords: meta?.keywords,
    openGraph: {
      title: meta?.title ?? `${product.name} | Ben's Blinds Chicago`,
      description: meta?.description,
    },
    alternates: { canonical: `https://bensblinds.com/products/${slug}` },
  }
}

const PRODUCT_DETAILS: Record<string, {
  headline: string
  intro: string
  benefits: string[]
  bestFor: string[]
  startingPrice: string
  leadTime: string
}> = {
  cellular: {
    headline: 'Cellular Shades: Chicago\'s Insulation Workhorse',
    intro: 'Honeycomb cellular shades trap air in their cells, creating a thermal barrier that cuts heat loss by up to 40%. Essential for Chicago winters.',
    benefits: ['Single, double, or triple-cell construction', 'Top-down/bottom-up options for privacy with light', 'Light-filtering to blackout opacity options', 'Cordless and motorized available', 'Energy Star certified options'],
    bestFor: ['North-facing rooms', 'Older Chicago greystones with drafty windows', 'Bedrooms needing blackout', 'Living rooms facing the L tracks'],
    startingPrice: '$89/panel',
    leadTime: '2–3 weeks',
  },
  solar: {
    headline: 'Solar Shades: View-Through UV Protection',
    intro: 'Solar screens block 85–99% of UV and solar heat while maintaining your view of the Chicago skyline. No glare, no sacrifice.',
    benefits: ['1%–14% openness factor options', 'Reduces solar heat gain 40–80%', 'Protects furniture and floors from UV fade', 'Motorized options with Somfy or Lutron', 'Works with smart home systems'],
    bestFor: ['South and west facing windows', 'Home offices with screen glare', 'River North and Gold Coast high-rises', 'Rooms with floor-to-ceiling glass'],
    startingPrice: '$79/panel',
    leadTime: '2–3 weeks',
  },
  roller: {
    headline: 'Roller Shades: Clean, Modern, Effortless',
    intro: 'The most versatile shade on the market. Roller shades fit any Chicago home from Wicker Park greystone to West Loop loft.',
    benefits: ['Blackout to sheer fabric options', 'Dozens of textures and colors', 'Cordless, motorized, or chain control', 'Easy to clean and maintain', 'Custom width to the nearest 1/8 inch'],
    bestFor: ['Modern and contemporary interiors', 'Kitchens and bathrooms', 'Rental units and staging', 'Children\'s rooms (cordless)'],
    startingPrice: '$69/panel',
    leadTime: '2–3 weeks',
  },
  wood: {
    headline: 'Wood Blinds: Warmth That Chicago Winters Demand',
    intro: 'Real wood blinds bring natural warmth to Chicago\'s Victorian and craftsman homes. Custom stained or painted to match your trim.',
    benefits: ['Real basswood or faux wood construction', 'Stain and paint-match to existing trim', '2-inch or 2.5-inch slat options', 'Cordless and motorized available', 'Moisture-resistant faux wood for kitchens'],
    bestFor: ['Lincoln Park and Logan Square vintage flats', 'Craftsman and Victorian homes', 'Dining rooms and studies', 'Oak Park Prairie-style homes'],
    startingPrice: '$99/panel',
    leadTime: '3 weeks',
  },
  shutters: {
    headline: 'Plantation Shutters: Permanent Chicago Character',
    intro: 'Plantation shutters are the only window treatment that adds to your home\'s resale value. A permanent architectural statement.',
    benefits: ['Custom-built to your exact window', 'Full height, café style, or tier-on-tier', 'Hardwood, poly, or composite materials', 'Tilt rod or hidden tilt options', 'Lifetime warranty available'],
    bestFor: ['Historic Chicago homes', 'Homes going on the market', 'Bathrooms and kitchens', 'Any window with character'],
    startingPrice: '$249/panel',
    leadTime: '4–5 weeks',
  },
  roman: {
    headline: 'Roman Shades: Tailored Fabric Elegance',
    intro: 'Soft, tailored folds that look custom because they are. Roman shades add fabric warmth to any Chicago room.',
    benefits: ['Flat, relaxed, or hobbled fold styles', 'Hundreds of fabric options', 'Blackout lining available', 'Cordless and motorized', 'Custom pattern matching'],
    bestFor: ['Living and dining rooms', 'Bedrooms with upholstered headboards', 'Home offices needing warmth', 'Historic homes with crown molding'],
    startingPrice: '$149/panel',
    leadTime: '3–4 weeks',
  },
  motorized: {
    headline: 'Motorized & Smart Shades: One Tap, All Windows',
    intro: 'Somfy-powered motorized shades that work with Alexa, Google Home, Apple HomeKit, and Lutron. Control every shade from your phone.',
    benefits: ['Somfy, Lutron, or Rollease motors', 'Works with major smart home platforms', 'Programmable schedules and scenes', 'Rechargeable or hardwired options', 'Retrofit existing shades in some cases'],
    bestFor: ['High or hard-to-reach windows', 'Smart home enthusiasts', 'Floor-to-ceiling glass walls', 'Vacation and second homes'],
    startingPrice: '$229/panel',
    leadTime: '3–4 weeks',
  },
  drapery: {
    headline: 'Drapery & Curtains: The Finishing Layer',
    intro: 'Custom drapery fabricated locally and paired with any shade for the layered, designer look you\'ve been pinning.',
    benefits: ['Custom fabrication to your exact size', 'Hundreds of fabric selections', 'Rod, track, or ripple-fold systems', 'Blackout, thermal, or sheer lining', 'Pairs with any shade treatment'],
    bestFor: ['Formal living and dining rooms', 'Master bedrooms', 'Staging and design projects', 'Any room needing the final touch'],
    startingPrice: '$189/panel',
    leadTime: '4–5 weeks',
  },
}

const FAQ_SCHEMA_ITEMS: Record<string, Array<{ q: string; a: string }>> = {
  cellular: [
    { q: 'How much do cellular shades save on energy bills in Chicago?', a: 'Double-cell cellular shades can reduce heat loss by up to 40% compared to bare windows. In Chicago winters, most homeowners see a noticeable reduction in heating costs within the first season. Triple-cell options provide even greater savings for north-facing or older greystone windows.' },
    { q: 'What is the difference between single, double, and triple-cell cellular shades?', a: 'Single-cell shades have one air pocket and work well in moderate climates. Double-cell adds a second pocket for significantly better insulation, which is ideal for Chicago winters. Triple-cell provides maximum insulation and is the best choice for severe cold, polar vortex conditions, or north-facing windows.' },
    { q: 'Can cellular shades be installed inside or outside the window frame?', a: 'Yes. Cellular shades can be mounted inside the window frame for a clean, built-in look, or outside the frame to maximize coverage and block more light around the edges. Our Chicago installers will assess your window type and recommend the best mount during your free in-home consultation.' },
    { q: 'Do cellular shades work with top-down/bottom-up operation?', a: 'Yes. Many of our cellular shade options include top-down/bottom-up (TDBU) functionality, which lets you lower the top of the shade while keeping the bottom raised for privacy. This is especially popular in Chicago first-floor units and brownstone ground floors.' },
    { q: 'How long does cellular shade installation take in Chicago?', a: 'Most installations take 2–4 hours depending on the number of windows. We custom-measure during your free consultation, and shades are typically ready for installation within 2–3 weeks. Our team handles everything from delivery to final adjustment.' },
  ],
  solar: [
    { q: 'Will solar shades block my view of the city?', a: 'Solar shades with a 5% openness factor let you see outside clearly while blocking 95% of UV and significantly reducing glare. The lower the percentage, the more privacy and heat blockage but slightly reduced view clarity. We recommend 3–5% for most Chicago high-rise applications.' },
    { q: 'Can solar shades replace air conditioning in Chicago summers?', a: 'Not entirely, but they reduce solar heat gain by 40–80%, which meaningfully reduces how hard your AC has to work during Chicago summers. South and west-facing units see the biggest impact.' },
    { q: 'What openness factor should I choose for my Chicago apartment?', a: 'For east-facing Lakeview and Gold Coast units where morning glare is the main issue, a 5–10% openness works well. For south or west-facing windows that receive intense afternoon sun, we recommend 1–3% for maximum heat rejection while still maintaining daytime privacy.' },
    { q: 'Are solar shades compatible with smart home systems?', a: 'Yes. We offer solar shades with Somfy and Lutron motorization that integrate with Amazon Alexa, Google Home, Apple HomeKit, and most smart home platforms. Motorized solar shades are especially popular in West Loop lofts and River North condos with floor-to-ceiling glass.' },
    { q: 'Do solar shades provide privacy at night?', a: 'Standard solar shades provide very limited night privacy because when interior lights are on, they reverse the visibility effect. For full privacy day and night, we recommend pairing solar shades with a blackout roller or drapery layer. Our team can design the right combination during your free consultation.' },
  ],
  roller: [
    { q: 'What is the difference between blackout and light-filtering roller shades?', a: 'Blackout roller shades block 100% of light and are ideal for bedrooms, home theaters, and Chicago-facing windows with street lighting. Light-filtering shades soften and diffuse incoming light while maintaining daytime privacy. Sheer roller shades provide minimal privacy but a beautiful, luminous effect.' },
    { q: 'Can roller shades be motorized in a Chicago apartment?', a: 'Yes. Roller shades are among the easiest window treatments to motorize, and battery-powered options require no wiring, making them ideal for Chicago rental apartments and condos. We offer Somfy and Lutron motors with app, remote, and voice control.' },
    { q: 'How do I clean roller shades?', a: 'Most roller shade fabrics can be spot-cleaned with a damp cloth and mild soap. For deeper cleaning, some fabrics can be removed from the roller and hand-washed. We recommend dusting regularly with a soft brush attachment to prevent buildup, especially important in Chicago urban environments.' },
    { q: 'What size roller shades do you make for large Chicago loft windows?', a: 'We custom-fabricate roller shades to the nearest 1/8 inch, so there is no standard size limit. For very wide West Loop loft windows, we can create fascia-joined shade systems that span 12 feet or more seamlessly. Our installers assess your space during the free consultation.' },
    { q: 'Are cordless roller shades required for homes with children in Chicago?', a: 'Cordless operation is strongly recommended for all windows accessible to young children, and in some cases required by building codes. We offer cordless lift, motorized, and spring-operated roller shades that are completely safe and still offer the full range of opacity options.' },
  ],
  wood: [
    { q: 'Will real wood blinds warp in Chicago humidity?', a: 'Chicago\'s humidity swings between very dry winters and humid summers. Real basswood blinds can be affected by extreme moisture, but high-quality factory-sealed wood resists this well. For bathrooms, kitchens, or basement windows that experience high moisture, we recommend our faux wood blinds which are completely moisture-resistant and look identical.' },
    { q: 'Can wood blinds be stained to match existing trim in a Chicago greystone?', a: 'Absolutely. We offer stain matching and custom finishes to coordinate with your existing woodwork, which is especially valuable in Lincoln Park, Logan Square, and Wicker Park vintage flats with original oak trim. Bring a sample of your trim to the consultation or we will match it on-site.' },
    { q: 'What slat size is best for wood blinds in a Chicago home?', a: '2-inch slats are the most popular choice and provide a classic, traditional look. 2.5-inch slats offer a slightly more modern, airy look with fewer slats visible. For very tall Victorian windows common in Chicago greystones, the 2.5-inch slat reduces the visual busyness of too many narrow slats.' },
    { q: 'Are wood blinds energy efficient for Chicago winters?', a: 'Wood blinds provide moderate insulation when fully closed, better than aluminum blinds but less effective than cellular shades. Many Chicago homeowners pair wood blinds with insulating cellular shades or drapery for maximum winter performance while maintaining the wood aesthetic they prefer.' },
    { q: 'How long does it take to get custom wood blinds in Chicago?', a: 'Custom wood blinds are typically ready for installation within 3 weeks of your measurement appointment. Rush options may be available depending on fabric and finish selection. Our team contacts you as soon as your order arrives to schedule the installation at your convenience.' },
  ],
  shutters: [
    { q: 'Do plantation shutters add value to a Chicago home?', a: 'Yes. Plantation shutters are one of the few window treatments that real estate appraisers and buyers consider a permanent improvement to a home. In competitive Chicago markets like Lincoln Park and Gold Coast, shutters are often listed as a selling feature and can return their full cost at sale.' },
    { q: 'Can plantation shutters be installed on Chicago bay windows?', a: 'Yes, and bay windows are one of our most common shutter applications in Lincoln Park and Wicker Park. We build custom shutter panels that fit the exact angles of your bay, including curved bays. Each panel is measured and built to the millimeter.' },
    { q: 'What is the difference between hardwood and poly shutters?', a: 'Hardwood shutters have a premium look and feel, stain beautifully, and are ideal for formal rooms. Poly (polysatin composite) shutters are 100% moisture-resistant, making them the best choice for bathrooms and kitchens, and they never warp or crack. Both options offer the same architectural aesthetics.' },
    { q: 'Are plantation shutters suitable for historic Chicago buildings?', a: 'Yes. We work with Chicago landmark buildings and historic properties regularly. We can match shutter profiles and finishes to existing architectural details. For landmarked properties, interior shutters require no exterior modification, so no historic review is typically needed.' },
    { q: 'How are plantation shutters cleaned in a Chicago home?', a: 'Plantation shutters are one of the easiest window treatments to clean. Simply wipe louvers with a damp cloth or a microfiber duster. Unlike fabric shades, shutters never need professional cleaning or replacement due to fading. This long-term durability makes them a great investment for Chicago homeowners.' },
  ],
  roman: [
    { q: 'What roman shade fold style is most popular in Chicago homes?', a: 'The flat fold is the most popular in contemporary Chicago condos and West Loop lofts for its clean, tailored look. The relaxed fold is preferred in traditional and vintage Chicago homes, such as Logan Square two-flats, for its softer, more organic drape. We carry all three styles: flat, relaxed, and hobbled.' },
    { q: 'Can roman shades have a blackout lining?', a: 'Yes. We offer blackout lining as an upgrade on all of our roman shade fabrics. This is very popular for Chicago bedrooms where urban light intrusion is a concern, especially on street-facing windows. The lining adds slight stiffness to the fabric which also improves the crispness of the folds.' },
    { q: 'Are custom roman shades more expensive than off-the-shelf options?', a: 'Custom roman shades start at $149 per panel, which is more than mass-market options, but they are made to fit your exact window dimensions, use fabrics that off-the-shelf brands do not offer, and are measured and installed by our Chicago team with a warranty on both product and installation.' },
    { q: 'How do roman shades work with pattern matching?', a: 'For fabric patterns, we align the repeat across multiple shades in the same room so that stripes, florals, and geometric patterns align perfectly between panels. This is included in our measurement process and is not available from most online shade retailers. We confirm pattern placement with you before cutting.' },
    { q: 'Do roman shades work in Chicago kitchen windows?', a: 'Roman shades can be used in kitchens, but we recommend choosing an easy-clean or wipeable fabric and adding a blackout lining to protect the fabric from grease and moisture. For kitchen windows directly above a sink, we may recommend a faux wood blind or roller shade for better long-term durability.' },
  ],
  motorized: [
    { q: 'What smart home systems are compatible with your motorized shades in Chicago?', a: 'Our Somfy-powered shades integrate with Amazon Alexa, Google Home, Apple HomeKit, Samsung SmartThings, and Lutron Caseta. Our Lutron-powered shades work natively with Lutron smart lighting systems for seamless scene control. We also carry Rollease Acmeda motors for budget-conscious motorization projects.' },
    { q: 'Do motorized shades require hardwiring in a Chicago apartment?', a: 'No. We offer rechargeable battery-powered motorized shades that require no wiring and work identically to hardwired versions. They charge via USB like a phone, typically once or twice a year depending on usage. This makes motorization accessible to renters and condo owners without renovation.' },
    { q: 'Can existing shades be converted to motorized in Chicago?', a: 'In some cases, yes. Roller shades and certain cellular shades can be retrofitted with a motor if the tube diameter is compatible. We assess retrofit feasibility during your free consultation. For older or non-standard window treatments, replacement with new motorized shades is typically the more reliable solution.' },
    { q: 'What is the range of motorized shades for high windows in Chicago lofts?', a: 'Our wireless remote controls have a range of up to 65 feet through walls, which covers all but the largest West Loop loft spaces. For app control via smartphone, there is no range limit as long as you have WiFi or cellular service. Schedules and scene programming are done through the respective smart home app.' },
    { q: 'How much do motorized shades cost compared to manual in Chicago?', a: 'Motorized shades typically add $100–$200 per panel to the cost of manual shades, depending on the motor brand. For large, hard-to-reach windows or whole-home installations, this premium quickly pays for itself in convenience and daily use. We offer package pricing for whole-home motorization projects.' },
  ],
  drapery: [
    { q: 'Are custom drapery and curtains fabricated locally in Chicago?', a: 'Yes. All of our drapery and curtains are fabricated locally, which allows for faster turnaround, easier adjustments, and pattern matching that is not possible with offshore production. Our Chicago workroom handles everything from lining to pleating to hardware installation.' },
    { q: 'What is the difference between ripple-fold and pinch-pleat drapery?', a: 'Ripple-fold drapery creates uniform, evenly spaced waves when opened or closed and is the most modern drapery style, very popular in River North and West Loop condos. Pinch-pleat has classic structured folds at the header and reads as more traditional, which suits Gold Coast pre-war apartments and Lincoln Park Victorian homes beautifully.' },
    { q: 'Can drapery be paired with roller shades or cellular shades in Chicago?', a: 'Yes, and layering is one of our most popular design solutions in Chicago. Drapery paired with a blackout roller shade gives you full light control plus the finished, layered look that makes a room feel complete. It also solves the common Chicago problem of beautiful fabric curtains that still let in morning light.' },
    { q: 'How long does custom drapery fabrication take in Chicago?', a: 'Custom drapery takes 4–5 weeks from measurement to installation. This includes fabric sourcing, local fabrication, and scheduling your installation appointment. For time-sensitive projects like staging a home for sale, we offer expedited fabrication on select fabrics.' },
    { q: 'What drapery rod and track systems do you install in Chicago?', a: 'We install traditional decorative rods, ceiling-mounted tracks, and motorized ripple-fold track systems. Ceiling-mounted tracks are especially popular in Chicago condos where ceiling height is limited and you want to maximize the visual height of your windows. We handle all hardware installation including drywall anchoring into concrete ceilings common in Chicago high-rises.' },
  ],
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.key === slug)
  if (!product) notFound()

  const details = PRODUCT_DETAILS[slug]
  const currentSeason = 'spring' as const
  const isRecommended = product.recommend.includes(currentSeason)
  const seasonInfo = SEASONS[currentSeason]
  const faqs = FAQ_SCHEMA_ITEMS[slug] ?? []
  const productPartners = getPartnersForProduct(slug)

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: details?.headline ?? product.name,
    description: details?.intro ?? product.blurb,
    url: `https://bensblinds.com/products/${slug}`,
    image: `https://bensblinds.com/images/products/${slug}-hero.jpg`,
    brand: { '@type': 'Brand', name: "Ben's Blinds Chicago" },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: details?.startingPrice?.replace(/[^0-9]/g, '') ?? '69',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: details?.startingPrice?.replace(/[^0-9]/g, '') ?? '69',
        priceCurrency: 'USD',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'panel' },
      },
      seller: {
        '@type': 'LocalBusiness',
        name: "Ben's Blinds Chicago",
        telephone: '+13123610908',
        url: 'https://bensblinds.com',
      },
      availability: 'https://schema.org/InStock',
      areaServed: { '@type': 'City', name: 'Chicago', containedInPlace: { '@type': 'State', name: 'Illinois' } },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bensblinds.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://bensblinds.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://bensblinds.com/products/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ padding: '0.75rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-body)', color: 'var(--text-3)', flexWrap: 'wrap' }}>
            <li><Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/products" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Products</Link></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: 'var(--text)', fontWeight: 500 }} aria-current="page">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--surface-2)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {isRecommended && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: 'var(--brand)',
                color: '#fff',
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '0.25rem 0.75rem',
                borderRadius: '100px',
                marginBottom: '1rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Icon name={seasonInfo.icon} size={13} />
              Recommended for Chicago {seasonInfo.label}
            </div>
          )}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '1rem',
            }}
          >
            {details?.headline ?? product.name}
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '680px', fontFamily: 'var(--font-body)', marginBottom: '2rem' }}>
            {details?.intro ?? product.blurb}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/quote" className="btn btn-primary">
              Get a Free Quote
            </Link>
            <span style={{ color: 'var(--text-3)', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
              Starting at {details?.startingPrice ?? 'custom pricing'} · {details?.leadTime ?? '2–4 weeks'} lead time
            </span>
          </div>
        </div>
      </section>

      {/* Room image */}
      <div style={{ lineHeight: 0, maxHeight: '440px', overflow: 'hidden' }}>
        <img
          src={(IMG[slug as keyof typeof IMG] as string) || IMG.heroLiving}
          alt={`Custom ${product.name.toLowerCase()} professionally installed in a Chicago home by Ben's Blinds`}
          style={{ width: '100%', objectFit: 'cover', maxHeight: '440px', display: 'block' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Details */}
      {details && (
        <section style={{ padding: '4rem 1.5rem' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: 'var(--text)', marginBottom: '1rem' }}>
                  Key Features
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {details.benefits.map((b) => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--text-2)' }}>
                      <Icon name="check" size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '2px' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: 'var(--text)', marginBottom: '1rem' }}>
                  Best For
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {details.bestFor.map((b) => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--text-2)' }}>
                      <Icon name="building" size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '2px' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section style={{ padding: '4rem 1.5rem', background: 'var(--surface-2)' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text)', marginBottom: '2rem' }}>
              Common Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faqs.map((f) => (
                <div key={f.q} className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                    {f.q}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners for this product */}
      {productPartners.length > 0 && (
        <section style={{ padding: '3rem 1.5rem', borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: '1rem',
              }}
            >
              Available From Our Brand Partners
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {productPartners.map((partner) => (
                <Link
                  key={partner.key}
                  href={`/partners#${partner.key}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--r-pill)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    color: 'var(--text-2)',
                    textDecoration: 'none',
                  }}
                >
                  {partner.name}
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      color: 'var(--text-3)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {TIER_LABELS[partner.tier]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      <section style={{ padding: '3rem 1.5rem', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', marginBottom: '1.25rem' }}>
            Also Popular in Chicago
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {PRODUCTS.filter((p) => p.key !== slug).slice(0, 4).map((p) => (
              <Link
                key={p.key}
                href={`/products/${p.key}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1.125rem',
                  borderRadius: 'var(--r-pill)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: 'var(--text-2)',
                  textDecoration: 'none',
                }}
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.125rem',
                borderRadius: 'var(--r-pill)',
                border: '1px solid var(--brand)',
                background: 'transparent',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'var(--brand)',
                textDecoration: 'none',
              }}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
            Ready to Get {product.name} for Your Chicago Home?
          </h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
            Book a free in-home consultation. We measure every window and help you choose the perfect product.
          </p>
          <Link href="/quote" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            Book Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
