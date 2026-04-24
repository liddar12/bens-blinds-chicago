import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'

const BASE = 'https://bensblinds.com'

type NeighborhoodData = {
  name: string
  slug: string
  image: string
  sub: string
  headline: string
  intro: string
  longDesc: string
  commonWindows: string[]
  topProducts: { key: string; name: string; reason: string }[]
  faqs: { q: string; a: string }[]
  keywords: string[]
}

const NEIGHBORHOOD_DATA: Record<string, NeighborhoodData> = {
  'lincoln-park': {
    name: 'Lincoln Park',
    slug: 'lincoln-park',
    image: '/images/neighborhoods/lincolnPark.jpg',
    sub: 'Bay windows · tall ceilings',
    headline: 'Lincoln Park Window Treatments',
    intro: "Lincoln Park's Victorian-era greystones, courtyard buildings, and two-flats feature some of Chicago's most architecturally distinctive windows.",
    longDesc: "From tall double-hung windows with elaborate millwork to sweeping bay windows overlooking tree-lined streets, Lincoln Park homes demand window treatments that honor their historic character. Ben's Blinds has outfitted hundreds of Lincoln Park properties — we know which treatments fit the original wood frames, how to handle the deep bay window projections, and which styles complement the neighborhood's classic aesthetic without looking out of place.",
    commonWindows: ['Floor-to-ceiling bay windows', 'Tall Victorian double-hung windows', 'Transom windows above doors', 'Sunroom enclosures', 'Original wood sash frames'],
    topProducts: [
      { key: 'wood', name: 'Wood Blinds', reason: 'Complement Victorian millwork and original wood trim perfectly' },
      { key: 'roman', name: 'Roman Shades', reason: 'Tailored fabric folds suit formal parlors and dining rooms' },
      { key: 'shutters', name: 'Plantation Shutters', reason: 'Architectural permanence that matches greystone character' },
    ],
    faqs: [
      { q: 'Can you fit window treatments to original Victorian window frames in Lincoln Park?', a: 'Absolutely. Our Lincoln Park installations regularly involve out-of-square Victorian frames, irregular mullion spacing, and non-standard depths. We custom-measure every opening and can fit inside-mount or outside-mount treatments to any historic frame without damaging the original woodwork.' },
      { q: 'What window treatments work best for Lincoln Park bay windows?', a: "Bay windows are one of our specialties in Lincoln Park. We typically recommend a combination approach: cellular shades or roller shades on each individual pane for light control, with a coordinating Roman shade or drapery treatment on the center panel for a cohesive look that doesn't fight the architecture." },
      { q: 'Do I need special treatments for Lincoln Park greystone two-flats?', a: "Greystone two-flats often have tall, narrow windows that benefit from floor-to-ceiling treatments that emphasize the height. We also frequently work with original wavy glass panes that require outside-mount solutions. We'll assess your specific windows during the free in-home visit." },
      { q: 'How much do custom window treatments cost in Lincoln Park?', a: "Pricing depends on window count, product type, and any motorization. For a typical Lincoln Park two-flat or single-family home, most customers invest between $800–$3,500 for a full-home treatment. We offer free in-home quotes with no obligation, so you'll know exact pricing before committing." },
      { q: "How long does installation take for a Lincoln Park home?", a: "Most Lincoln Park installations are completed in a single day once your custom treatments arrive (typically 3–5 weeks after measurement). We handle everything: measurement, professional installation, and cleanup. We work around your schedule and can accommodate evening and weekend appointments." },
    ],
    keywords: ['lincoln park window treatments', 'lincoln park blinds chicago', 'lincoln park custom shades', 'window coverings lincoln park chicago', 'greystone window treatments chicago'],
  },
  'lakeview': {
    name: 'Lakeview',
    slug: 'lakeview',
    image: '/images/neighborhoods/lakeview.jpg',
    sub: 'East-facing high-rises · vintage bungalows',
    headline: 'Lakeview Window Treatments',
    intro: "Lakeview blends east-facing lakefront high-rises with vintage bungalows — two completely different window challenges that we solve daily.",
    longDesc: "East-facing condos in Lakeview get intense morning sun off Lake Michigan that demands solar shades capable of preserving the lake view while eliminating glare. Vintage bungalows on the west side of the neighborhood have original double-hung windows that benefit from inside-mount cellular or roller shades. Ben's Blinds has served Lakeview homeowners and renters for years — we know the building management rules in major high-rises and can work within condo association guidelines.",
    commonWindows: ['East-facing high-rise floor-to-ceiling glass', 'Vintage bungalow double-hung windows', 'Rooftop deck skylight needs', 'Condo building standard window sizes', 'Corner unit panoramic glass'],
    topProducts: [
      { key: 'solar', name: 'Solar Screens', reason: 'Blocks lake glare while preserving the lakefront view' },
      { key: 'roller', name: 'Roller Shades', reason: 'Clean, modern look preferred in Lakeview condos and renovated bungalows' },
      { key: 'motorized', name: 'Motorized Shades', reason: 'Ideal for high-rise units with hard-to-reach windows' },
    ],
    faqs: [
      { q: 'What window treatments block morning lake glare in Lakeview high-rises?', a: "East-facing Lakeview units get intense morning sun off Lake Michigan. We recommend 3%–5% openness solar shades in charcoal or bronze — they reduce glare by 85%+ while keeping your lake view visible. For blackout needs, pair with a roller shade on a dual-bracket system so you can choose between view-through and blackout." },
      { q: 'Do condo associations in Lakeview have rules about window treatments?', a: "Many Lakeview high-rises require treatments to appear white or off-white from the exterior. We work with these requirements daily and always recommend solar or roller shades with white backing, which satisfies most association rules while giving you full interior color choice on the room-facing side." },
      { q: 'Can I get motorized shades for hard-to-reach windows in my Lakeview high-rise?', a: "Yes — motorized shades are particularly popular in Lakeview high-rise units where windows may be above kitchen cabinets, on high walls, or accessible only over furniture. We install Somfy-powered motorized shades compatible with Alexa, Google Home, and Apple HomeKit, with optional scheduling." },
      { q: 'What treatments work for vintage bungalow windows in Lakeview?', a: "Lakeview bungalows often have original wood double-hung frames that may be slightly out of square. We recommend inside-mount cellular shades (great for insulation in Chicago winters) or roller shades for a clean modern look. Our measurement team specializes in fitting custom treatments to non-standard vintage frames." },
      { q: 'How do I get a quote for my Lakeview apartment or condo?', a: "We offer free in-home consultations throughout Lakeview and all of Chicago. Our specialist comes to you, measures every window, shows you samples in your actual light conditions, and provides a written quote on the spot. No pressure, no obligation. Most appointments take 45–60 minutes." },
    ],
    keywords: ['lakeview window treatments', 'lakeview blinds chicago', 'lakeview condo shades', 'solar shades lakeview chicago', 'window coverings lakeview chicago'],
  },
  'gold-coast': {
    name: 'Gold Coast',
    slug: 'gold-coast',
    image: '/images/neighborhoods/goldCoast.jpg',
    sub: 'Pre-war condos · lakefront luxury',
    headline: 'Gold Coast Window Treatments',
    intro: "Gold Coast's pre-war cooperatives, modern Lake Shore Drive condos, and historic mansions demand premium window treatments that match the neighborhood's sophistication.",
    longDesc: "Whether you're in a 1920s cooperative on Astor Street with casement windows and plaster moldings, or a modern Lake Shore Drive condo with floor-to-ceiling glass overlooking the lake, Ben's Blinds delivers treatments at the quality level Gold Coast homes expect. We carry Hunter Douglas's top motorized and manual lines, source custom European fabrics for drapery, and provide white-glove installation with no shortcuts.",
    commonWindows: ['Pre-war casement windows with original hardware', 'Modern floor-to-ceiling Lake Shore Drive glass', 'Large formal living room windows', 'Master bedroom privacy requirements', 'Formal dining room windows with privacy needs'],
    topProducts: [
      { key: 'shutters', name: 'Plantation Shutters', reason: 'Architectural permanence befitting Gold Coast historic interiors' },
      { key: 'motorized', name: 'Motorized Shades', reason: 'Premium automation for Lake Shore Drive high-rises' },
      { key: 'drapery', name: 'Custom Drapery', reason: 'Luxury fabric treatments for formal Gold Coast interiors' },
    ],
    faqs: [
      { q: 'What window treatments are appropriate for Gold Coast pre-war cooperative apartments?', a: "Pre-war cooperatives on Astor Street and Lake Shore Drive have high ceilings, original casement windows, and formal room layouts that suit plantation shutters, custom drapery, or Roman shades in premium fabrics. We source European fabrics and work with your interior designer to ensure treatments complement existing architectural details." },
      { q: 'Do you offer motorized window treatments for Gold Coast Lake Shore Drive buildings?', a: "Yes — motorized shades are extremely popular in Gold Coast high-rises. We install Somfy-powered systems compatible with Alexa, Google Home, and Apple HomeKit. For large Lake Shore Drive windows with panoramic lake views, we recommend dual-bracket systems with sheer solar shade + blackout roller for flexible light control." },
      { q: 'Can you work with Gold Coast building management and doorman buildings?', a: "We work with Gold Coast doorman buildings regularly. We coordinate with building management for access, use freight elevators, and protect common areas during installation. Our team arrives on time, works efficiently, and leaves your home spotless — no surprises for your building staff." },
      { q: 'What are the best window treatments for privacy on the Gold Coast?', a: "Gold Coast ground-floor units and lakefront-facing condos often need strong privacy solutions. We recommend top-down/bottom-up cellular shades (you can lower from the top for privacy while keeping daylight), or sheer drapery layered with a blackout roller shade for complete flexibility." },
      { q: 'Do you carry Hunter Douglas in the Gold Coast area?', a: "Yes — Ben's Blinds is an authorized Hunter Douglas dealer. We carry the full Hunter Douglas line including Silhouette, Luminette, Alustra, and PowerView motorization. For Gold Coast clients seeking premium treatments, we also work with European brands and custom fabric drapery houses." },
    ],
    keywords: ['gold coast window treatments chicago', 'gold coast blinds chicago', 'lake shore drive window shades', 'pre-war condo window treatments chicago', 'luxury blinds gold coast chicago'],
  },
  'wicker-park': {
    name: 'Wicker Park',
    slug: 'wicker-park',
    image: '/images/neighborhoods/wickerPark.jpg',
    sub: 'Greystones · vintage sash windows',
    headline: 'Wicker Park Window Treatments',
    intro: "Wicker Park's 19th-century workers' cottages, Italianate greystones, and converted loft buildings each present unique window measurement challenges.",
    longDesc: "Wicker Park has some of Chicago's most varied architecture on a block-by-block basis — an Italianate greystone sits next to a converted warehouse loft which sits next to a 1990s new construction. Our Wicker Park installation teams handle them all. We specialize in fitting custom treatments to vintage sash windows with original wavy glass, to greystone bay windows with non-standard depths, and to loft-style industrial frames.",
    commonWindows: ['Greystone bay windows with deep frames', 'Vintage wood sash windows (possibly out of square)', 'Original wavy glass panes requiring outside mount', 'Corner window pairs', 'Converted warehouse loft windows'],
    topProducts: [
      { key: 'wood', name: 'Wood Blinds', reason: 'Warm, craftsman aesthetic that complements greystone interiors' },
      { key: 'cellular', name: 'Cellular Shades', reason: 'Insulation for Wicker Park vintage buildings with drafty windows' },
      { key: 'roman', name: 'Roman Shades', reason: 'Fabric texture and pattern to personalize Wicker Park vintage spaces' },
    ],
    faqs: [
      { q: 'Can you fit treatments to vintage sash windows in Wicker Park?', a: "Yes — vintage sash windows are extremely common in Wicker Park, and we fit them regularly. The key challenges are out-of-square frames, shallow inside-mount depths, and original hardware that limits mounting options. We measure every dimension (width at top, middle, and bottom; depth; squareness) and recommend the best mount method for each window." },
      { q: 'What do you recommend for Wicker Park greystone bay windows?', a: "Wicker Park greystone bay windows typically have three panes at different angles. We usually fit each pane with its own inside-mount treatment (wood blinds or cellular shades work well), with the option to add a Roman shade or drapery treatment to the central pane for a layered look. The angled side panes require custom-cut treatments that we handle in-house." },
      { q: 'Do your treatments work with original wavy glass?', a: "Original wavy glass (often seen in pre-1940 Wicker Park buildings) requires outside-mount treatments since inside-mount can be difficult without perfect frame integrity. We recommend outside-mount cellular or roller shades with a wide enough overlap to cover the frame adequately. We assess this during the free in-home measurement." },
      { q: 'What window treatments are popular in Wicker Park converted lofts?', a: "Wicker Park converted lofts often have industrial steel-frame windows with large panes. Roller shades and motorized shades are most popular — they provide clean lines that complement exposed brick and timber beams without visual clutter. Solar shades work well for south-facing loft windows that get intense afternoon sun." },
      { q: 'How long do custom treatments take to install in Wicker Park?', a: "After your free in-home measurement, custom treatments are typically fabricated in 3–5 weeks. Installation is usually completed in a single day. We confirm the appointment, arrive on time, install everything, dispose of packaging, and do a final walkthrough with you before leaving." },
    ],
    keywords: ['wicker park window treatments', 'wicker park blinds chicago', 'wicker park custom shades', 'greystone window treatments chicago', 'vintage window treatments wicker park'],
  },
  'logan-square': {
    name: 'Logan Square',
    slug: 'logan-square',
    image: '/images/neighborhoods/logan.jpg',
    sub: 'Two-flats · bay windows · courtyard buildings',
    headline: 'Logan Square Window Treatments',
    intro: "Logan Square's two-flats and courtyard buildings are being renovated by design-conscious homeowners who want modern window treatments that respect the vintage architecture.",
    longDesc: "Logan Square is one of Chicago's most active renovation markets, and window treatments are often one of the last finishing touches homeowners add. We work with Logan Square buyers who are gut-rehabbing two-flats, owners who want to update their courtyard apartment units with modern roller shades, and renters who want to personalize their spaces without permanent changes. Our team understands the neighborhood's blend of original architectural character and contemporary taste.",
    commonWindows: ['Bay window groupings on two-flat buildings', 'Original double-hung wood frames', 'Formal parlor windows with tall ceilings', 'Kitchen window pairs over sinks', 'Courtyard building standard units'],
    topProducts: [
      { key: 'roller', name: 'Roller Shades', reason: 'Modern look that complements Logan Square renovation aesthetics' },
      { key: 'roman', name: 'Roman Shades', reason: 'Fabric personality for design-conscious Logan Square homeowners' },
      { key: 'wood', name: 'Wood Blinds', reason: 'Craftsman warmth that honors the original two-flat character' },
    ],
    faqs: [
      { q: 'What window treatments work in Logan Square two-flat buildings?', a: "Logan Square two-flats typically have bay windows in the front rooms and standard double-hung windows elsewhere. We recommend Roman shades or roller shades for the main living areas (they suit the design-conscious renovation aesthetic), with cellular shades in bedrooms for insulation and blackout capability in Chicago winters." },
      { q: 'Do you work with Logan Square courtyard apartment buildings?', a: "Yes — Logan Square courtyard buildings are a common installation type for us. We work with individual unit owners and can coordinate timing to minimize disruption. Courtyard apartments often have light challenges (units on lower floors may face the courtyard interior), and we help select opacity levels for each window." },
      { q: "I'm renovating a Logan Square two-flat. When should I order window treatments?", a: "We recommend ordering during your renovation — ideally 4–6 weeks before move-in — so treatments are ready when you are. We can measure rough openings during construction if final windows are already installed. This is common in Logan Square gut rehabs and we know how to work around active construction sites." },
      { q: 'What are the most popular window treatment styles in Logan Square?', a: "Logan Square homeowners currently favor roller shades in linen or warm white tones, Roman shades in pattern fabrics for statement rooms, and wood blinds for kitchens and bathrooms. Motorized treatments are gaining popularity in new construction and full renovations where smart home wiring is being added." },
      { q: 'Do you offer window treatment consultations in Logan Square?', a: "Yes — we offer free in-home consultations throughout Logan Square and all of Chicago. Our specialist brings a full sample library, measures every window, and provides a written quote on the spot. Most consultations take 45–60 minutes. We can schedule evenings and weekends to accommodate renovation timelines." },
    ],
    keywords: ['logan square window treatments', 'logan square blinds chicago', 'logan square custom shades', 'two flat window treatments chicago', 'window coverings logan square chicago'],
  },
  'pilsen': {
    name: 'Pilsen',
    slug: 'pilsen',
    image: '/images/neighborhoods/pilsen.jpg',
    sub: 'Row-house bungalows · artist live/work spaces',
    headline: 'Pilsen Window Treatments',
    intro: "Pilsen's colorful row-house bungalows and artist live/work spaces call for window treatments that blend practicality with creative personality.",
    longDesc: "Pilsen is one of Chicago's most creative neighborhoods, and window treatments here often reflect that personality. We work with Pilsen homeowners who want bold pattern Roman shades, artists who need light-blocking blackout treatments for studio spaces, and families in traditional bungalows who want practical, affordable solutions that hold up to Chicago's temperature swings. We understand Pilsen's mix of longtime residents and newer arrivals and serve both with the same quality and care.",
    commonWindows: ['Bungalow picture windows', 'Artist studio skylight and large north-facing windows', 'Street-facing ground floor privacy windows', 'Original brick-frame windows', 'Live/work space industrial windows'],
    topProducts: [
      { key: 'cellular', name: 'Cellular Shades', reason: 'Insulation and affordability for Pilsen bungalow homes' },
      { key: 'roller', name: 'Roller Shades', reason: 'Clean lines for artist studios and renovated live/work spaces' },
      { key: 'roman', name: 'Roman Shades', reason: 'Pattern and personality for Pilsen creative homeowners' },
    ],
    faqs: [
      { q: 'What window treatments work best for Pilsen bungalow picture windows?', a: "Pilsen bungalows often have large picture windows in the front room that need both light control and privacy from the street. We recommend cellular shades in a top-down/bottom-up configuration — you can lower the top half for daylight while keeping the bottom raised for street privacy. Roller shades with room-darkening fabric are also popular for their affordability and clean look." },
      { q: 'Do you have blackout treatments for artist studios in Pilsen?', a: "Yes — we regularly work with Pilsen artists who need specific light conditions in their studios. We offer blackout roller shades, blackout cellular shades, and blackout Roman shades. For north-facing studio windows, we can also recommend light-filtering options that reduce glare without eliminating the diffused north light artists value." },
      { q: 'What are affordable window treatment options in Pilsen?', a: "Our most affordable options are roller shades and cellular shades, which start around $80–$150 per window installed. We believe quality window treatments should be accessible to all Chicago homeowners, and we offer options at every budget level. Our free in-home quote includes pricing across multiple product tiers so you can choose what fits." },
      { q: 'How do I add privacy to street-facing windows in Pilsen without losing light?', a: "For Pilsen street-facing windows, we recommend solar shades with a 3%–5% openness factor — they reduce visibility from outside (especially at night when interior is lit) while maintaining daylight. For full privacy, top-down/bottom-up cellular shades let you keep the top half open while blocking sightlines from the sidewalk." },
      { q: 'Can you install window treatments in Pilsen live/work spaces?', a: "Yes — we install in residential and mixed-use live/work spaces throughout Pilsen. For commercial-facing storefronts or studio spaces, we carry commercial-grade roller shades and solar shades designed for larger spans and more frequent operation than standard residential products." },
    ],
    keywords: ['pilsen window treatments chicago', 'pilsen blinds chicago', 'pilsen custom shades', 'bungalow window treatments chicago', 'affordable blinds pilsen chicago'],
  },
  'west-loop': {
    name: 'West Loop',
    slug: 'west-loop',
    image: '/images/neighborhoods/westLoop.jpg',
    sub: 'Converted lofts · industrial windows · new high-rises',
    headline: 'West Loop Window Treatments',
    intro: "The West Loop's converted warehouse lofts and new construction high-rises feature oversized industrial windows that demand specialized motorized and roller shade solutions.",
    longDesc: "West Loop window treatments present some of Chicago's most technically demanding installations. Industrial steel-frame windows in converted warehouses can span 8–12 feet and require motorization for practical operation. New construction glass towers have floor-to-ceiling panels that need precise inside-mount depth assessment. Ben's Blinds has outfitted dozens of West Loop properties — we carry the motorization hardware, the oversized shade fabric, and the installation expertise these buildings require.",
    commonWindows: ['Industrial steel-frame warehouse windows (8–12 ft spans)', 'Floor-to-ceiling loft glass walls', 'South-facing warehouse windows with intense afternoon sun', 'Open-plan living spaces needing flexible light zones', 'New construction high-rise glass panels'],
    topProducts: [
      { key: 'motorized', name: 'Motorized Shades', reason: 'Essential for oversized West Loop loft windows that cannot be reached manually' },
      { key: 'solar', name: 'Solar Screens', reason: 'Blocks south/west sun while preserving city views from West Loop buildings' },
      { key: 'roller', name: 'Roller Shades', reason: 'Clean industrial aesthetic that complements exposed brick and steel beams' },
    ],
    faqs: [
      { q: 'What window treatments work for large industrial windows in West Loop lofts?', a: "West Loop warehouse lofts often have steel-frame windows that span 8–12 feet wide and 6–8 feet tall — too large for manual operation. We recommend motorized roller shades or motorized solar shades in these spaces. Somfy-powered motors allow you to control large spans from a remote, wall switch, or smartphone, and they handle the weight of oversized fabric that manual systems cannot." },
      { q: 'Do motorized shades work with smart home systems in West Loop buildings?', a: "Yes — our Somfy-powered motorized shades integrate with Alexa, Google Home, Apple HomeKit, and SmartThings. In West Loop new construction buildings with modern wiring, we can hard-wire motors for reliable operation without battery replacement. For older loft conversions, we offer rechargeable battery motors that charge via USB and last 6–12 months per charge." },
      { q: 'What window treatments handle south-facing sun in the West Loop?', a: "South-facing West Loop windows get intense afternoon sun that can create serious heat and glare. We recommend 1%–3% openness solar shades in charcoal or bronze — they reduce solar heat gain by up to 60% while maintaining city views. For west-facing windows that get late afternoon sun, blackout or room-darkening options provide complete control when needed." },
      { q: 'Can you handle the custom installation requirements of West Loop loft buildings?', a: "Yes — West Loop installations are among our most technically complex. We assess ceiling heights, beam obstructions, steel frame mounting constraints, and weight loads before selecting hardware. Our installation team includes specialists in large-format commercial-grade mounting who handle the West Loop's unique architectural challenges routinely." },
      { q: 'How much do motorized window treatments cost in the West Loop?', a: "Motorized shades for a West Loop loft typically range from $400–$900 per window installed, depending on size and fabric. A single large industrial window with a motorized solar shade runs approximately $600–$800. Full-apartment motorization in a 2-bedroom West Loop loft commonly runs $3,500–$6,000. We provide detailed quotes with no obligation during your free in-home visit." },
    ],
    keywords: ['west loop window treatments chicago', 'west loop blinds chicago', 'motorized shades west loop chicago', 'loft window treatments chicago', 'industrial window blinds chicago'],
  },
  'hyde-park': {
    name: 'Hyde Park',
    slug: 'hyde-park',
    image: '/images/neighborhoods/hydePark.jpg',
    sub: 'Historic landmark buildings · University of Chicago',
    headline: 'Hyde Park Window Treatments',
    intro: "Hyde Park's landmark buildings, University of Chicago campus faculty homes, and historic courtyard apartments require window treatments that respect architectural pedigree.",
    longDesc: "Hyde Park is one of Chicago's most architecturally significant neighborhoods, home to Frank Lloyd Wright Prairie-style buildings, Gothic Revival university structures, and 1920s courtyard apartments with distinctive character. Window treatments here must navigate landmark restrictions, co-op board requirements, and the need to complement historic architectural details without disrupting them. Ben's Blinds has long experience serving Hyde Park's unique requirements.",
    commonWindows: ['Prairie-style horizontal window bands', 'Gothic arch windows on historic buildings', 'Casement windows in courtyard apartments', 'Sunroom enclosures in faculty homes', 'University-area rental units with standard double-hungs'],
    topProducts: [
      { key: 'shutters', name: 'Plantation Shutters', reason: 'Architectural permanence that complements Hyde Park historic interiors' },
      { key: 'wood', name: 'Wood Blinds', reason: 'Warm craftsman aesthetic suited to Prairie-style and vintage Hyde Park homes' },
      { key: 'cellular', name: 'Cellular Shades', reason: 'Energy efficiency for Hyde Park older buildings with single-pane windows' },
    ],
    faqs: [
      { q: 'Are there landmark restrictions on window treatments in Hyde Park?', a: "Some Hyde Park buildings are designated landmarks or located in historic districts with exterior appearance requirements. These typically regulate what appears from the street, not interior treatments. Our Hyde Park specialists are familiar with these restrictions and can recommend inside-mount treatments or those with white exterior backing that comply with most landmark guidelines." },
      { q: 'What treatments work for Prairie-style windows in Hyde Park?', a: "Frank Lloyd Wright-influenced Prairie-style homes in Hyde Park often have horizontal window bands and low ceilings that require treatments with clean horizontal lines. Wood blinds and roller shades work extremely well — their horizontal orientation complements Prairie-style architecture. We avoid Roman shades and drapery in these spaces as they can visually fight the horizontal emphasis." },
      { q: 'Do you serve University of Chicago faculty housing in Hyde Park?', a: "Yes — we've outfitted many University of Chicago faculty homes and university-owned properties in Hyde Park. We understand the co-op board requirements common in older Hyde Park buildings and can provide treatments that satisfy exterior appearance standards while delivering the interior function and aesthetics faculty homeowners want." },
      { q: 'What are the best treatments for casement windows in Hyde Park apartments?', a: "Casement windows that open outward require inside-mount treatments that don't interfere with the opening mechanism. We recommend roller shades or cellular shades with inside-mount headrails positioned above the window, and bottom tracks that allow the window to open without catching the shade. We assess each window during the free in-home consultation." },
      { q: 'Can you recommend energy-efficient window treatments for older Hyde Park buildings?', a: "Hyde Park has many pre-war buildings with single-pane or poorly-sealed windows. Cellular shades are our top recommendation for energy efficiency — their honeycomb construction creates an insulating air pocket that reduces heat loss in Chicago winters and heat gain in summers. Double-cell cellular shades provide approximately 40% better insulation than single-cell options." },
    ],
    keywords: ['hyde park window treatments chicago', 'hyde park blinds chicago', 'hyde park custom shades', 'historic window treatments chicago', 'university of chicago area blinds'],
  },
  'river-north': {
    name: 'River North',
    slug: 'river-north',
    image: '/images/neighborhoods/goldCoast.jpg',
    sub: 'Gallery district · floor-to-ceiling glass',
    headline: 'River North Window Treatments',
    intro: "River North's gallery-district condos and luxury high-rises feature expansive floor-to-ceiling glass with city views that demand treatments balancing sun control with style.",
    longDesc: "River North is one of Chicago's premier luxury condo markets, with buildings featuring dramatic floor-to-ceiling glass walls overlooking the Chicago River and city skyline. These windows require treatments sophisticated enough to match River North's premium aesthetic while providing real sun control for south and west exposures. Ben's Blinds serves River North residents with premium motorized, solar, and designer shade solutions.",
    commonWindows: ['Floor-to-ceiling high-rise glass walls', 'South and west-facing city-view windows', 'Gallery and loft-style large format windows', 'Open-plan luxury condo glass', 'Chicago River-facing panoramic windows'],
    topProducts: [
      { key: 'motorized', name: 'Motorized Shades', reason: 'Sleek automation for River North luxury condos with hard-to-reach windows' },
      { key: 'solar', name: 'Solar Screens', reason: 'Preserve city views while blocking intense sun on south and west exposures' },
      { key: 'roller', name: 'Roller Shades', reason: 'Minimal profile that suits River North gallery and modern loft aesthetics' },
    ],
    faqs: [
      { q: 'What window treatments work best for River North luxury condos?', a: "River North luxury condos typically have floor-to-ceiling glass with premium finishes throughout. We recommend motorized roller shades or solar shades in designer fabrics — they provide a seamless, architecturally-integrated look while giving full control from a remote or smartphone app. For premium finishes, we carry Lutron and Somfy motorization systems favored in high-end residential installations." },
      { q: 'How do I protect art and furniture from sun damage in my River North condo?', a: "UV protection is a major concern for River North gallery-district residents and art collectors. We recommend solar shades with UV protection ratings of 95%+ — these block the UV wavelengths that fade artwork and furniture while maintaining your view. For maximum protection, we offer dual-bracket systems that allow you to add a light-filtering layer for additional UV reduction." },
      { q: 'Can you install treatments in River North buildings with doormen and strict move-in hours?', a: "Yes — we regularly work in River North luxury buildings. We coordinate with building management in advance, provide certificates of insurance, use freight elevators, and schedule within building-designated installation windows. Our team is professional and efficient, and we've developed relationships with many River North building managers." },
      { q: 'What motorization systems do you install in River North?', a: "We install Somfy, Lutron Serena, and Hunter Douglas PowerView motorization systems. In River North buildings where smart home integration is important, we recommend Lutron Caseta (most compatible with luxury home automation systems) or Somfy TaHoma (best for large window spans). We program all remotes, wall switches, and app integrations during installation." },
      { q: 'Do you offer designer fabric options for River North window treatments?', a: "Yes — for River North clients seeking premium aesthetics, we offer designer fabric collections from Phifer, Mermet, and other European manufacturers. We also work with interior designers who specify particular fabrics or colors. Our showroom consultant can bring samples to your home, or you can visit us to see the full collection in person." },
    ],
    keywords: ['river north window treatments chicago', 'river north blinds chicago', 'river north motorized shades', 'luxury condo window treatments chicago', 'window shades river north chicago'],
  },
  'lincoln-square': {
    name: 'Lincoln Square',
    slug: 'lincoln-square',
    image: '/images/neighborhoods/lincolnPark.jpg',
    sub: 'Craftsman bungalows · wood trim · family homes',
    headline: 'Lincoln Square Window Treatments',
    intro: "Lincoln Square's craftsman bungalows, brick two-flats, and family-oriented single-family homes have warmth and character that wood blinds and cellular shades complement perfectly.",
    longDesc: "Lincoln Square is one of Chicago's most beloved family neighborhoods, with a mix of craftsman bungalows, classic brick two-flats, and well-maintained vintage single-family homes. Window treatments here prioritize durability, insulation for Chicago winters, and aesthetics that complement the neighborhood's warm craftsman character. Ben's Blinds has served Lincoln Square families for years and understands both the window challenges and the budget considerations of this community.",
    commonWindows: ['Craftsman bungalow picture windows', 'Original double-hung wood frames', 'Kitchen window pairs', 'Bedroom windows needing blackout capability', 'Formal front parlor windows'],
    topProducts: [
      { key: 'wood', name: 'Wood Blinds', reason: 'Natural warmth that complements Lincoln Square craftsman interiors' },
      { key: 'cellular', name: 'Cellular Shades', reason: 'Maximum insulation for Chicago winters in Lincoln Square family homes' },
      { key: 'roller', name: 'Roller Shades', reason: 'Durable, easy-to-operate choice popular with Lincoln Square families' },
    ],
    faqs: [
      { q: 'What window treatments are best for craftsman bungalows in Lincoln Square?', a: "Lincoln Square craftsman bungalows have warm wood trim, original hardware, and rooms with character that benefit from natural materials. Wood blinds are our most popular recommendation — their warmth and texture complement original wood floors, trim, and millwork. For bedrooms, cellular shades provide the blackout and insulation capability families need." },
      { q: 'How do I choose window treatments that are durable for a family home in Lincoln Square?', a: "For Lincoln Square families with children and pets, we recommend cordless cellular shades (no dangling cords — safer for kids), or roller shades with motorization that puts the operating mechanism out of reach. Wood blinds with a protective coating are also durable and easy to wipe clean. All of our products come with manufacturer warranties." },
      { q: 'What are energy-efficient window treatments for Lincoln Square winters?', a: "Chicago winters in Lincoln Square can be brutal, and older bungalows with original windows benefit enormously from insulating cellular shades. Our double-cell cellular shades reduce window-related heat loss by up to 40%, which translates to measurable savings on heating bills. We offer free in-home energy efficiency consultations alongside our window treatment quotes." },
      { q: 'Do you offer child-safe window treatments in Lincoln Square?', a: "Yes — child safety is our default recommendation for any home with young children. We offer cordless lift systems, motorized systems (no cords at all), and top-down/bottom-up systems with continuous cord loops that are less hazardous than traditional dangling cords. All of our recommendations for family homes default to the safest operating systems." },
      { q: 'What does a typical window treatment project cost for a Lincoln Square bungalow?', a: "A typical 3-bedroom Lincoln Square craftsman bungalow (8–12 windows) runs approximately $1,200–$2,800 installed, depending on product choice and window sizes. Cellular shades are typically most affordable; wood blinds mid-range; motorized treatments at the higher end. Our free in-home quote provides exact pricing across multiple options so you can compare." },
    ],
    keywords: ['lincoln square window treatments chicago', 'lincoln square blinds chicago', 'craftsman bungalow window treatments chicago', 'lincoln square custom shades', 'family blinds lincoln square chicago'],
  },
  'edgewater': {
    name: 'Edgewater',
    slug: 'edgewater',
    image: '/images/neighborhoods/lakeview.jpg',
    sub: 'Lakefront light · vintage highrises · bungalows',
    headline: 'Edgewater Window Treatments',
    intro: "Edgewater's lakefront condos, vintage high-rises, and bungalows all benefit from thoughtful window treatments that manage Lake Michigan light through Chicago's dramatic seasons.",
    longDesc: "Edgewater sits at the northern edge of the lakefront, where Lake Michigan light has a particular quality — intense morning sun from the east, diffused afternoon light, and dramatic winter skies that shift the character of interiors throughout the day. Window treatments in Edgewater need to manage this varied light effectively. Ben's Blinds serves Edgewater's mix of high-rise condo residents, vintage courtyard apartment dwellers, and single-family homeowners with solutions tailored to each building type.",
    commonWindows: ['East-facing lakefront high-rise glass', 'Vintage courtyard apartment double-hungs', 'Bungalow picture windows', 'High-rise corner units with panoramic glass', 'Vintage building original frame windows'],
    topProducts: [
      { key: 'solar', name: 'Solar Screens', reason: 'Manages intense east-facing lake light in Edgewater high-rises' },
      { key: 'cellular', name: 'Cellular Shades', reason: 'Insulation for Edgewater vintage buildings and winter lake-effect cold' },
      { key: 'roller', name: 'Roller Shades', reason: 'Versatile solution for Edgewater mixed building stock' },
    ],
    faqs: [
      { q: 'What window treatments handle lakefront light in Edgewater high-rises?', a: "East-facing Edgewater high-rise units get intense morning sun off Lake Michigan, similar to Lakeview. We recommend 3%–5% openness solar shades in charcoal — they reduce glare by 85%+ while maintaining the lake view. For nights when interior lighting makes units visible from outside, we recommend a secondary blackout roller shade on a dual-bracket system." },
      { q: 'What are the best treatments for older Edgewater courtyard buildings?', a: "Edgewater courtyard apartments in older buildings often have original wood double-hung frames that may not be perfectly square. We measure every dimension and recommend inside-mount cellular or roller shades with appropriate inside-mount depth clearance. For lower-floor units facing the courtyard interior, we recommend blackout options to manage ambient light from other units." },
      { q: 'Do you handle condo association requirements in Edgewater buildings?', a: "Yes — many Edgewater high-rises have exterior appearance standards requiring white or light-colored backing on window treatments visible from outside. We always recommend compliant products and can provide documentation of compliance to your building management if needed." },
      { q: 'What window treatments are best for Edgewater winters?', a: "Edgewater is exposed to lake-effect weather that can make winters particularly cold in lakefront units. Cellular shades are our top winter recommendation — they create an insulating air pocket that reduces heat loss significantly. For lakefront units on higher floors, we also offer cellular shades with heavy-duty headrails designed to handle strong window drafts." },
      { q: 'How do I get a free consultation for my Edgewater apartment or condo?', a: "Call us at (312) 361-0908 or use our online booking form to schedule a free in-home consultation. We serve all of Edgewater and arrive with a full sample library. Most consultations take about an hour, we measure every window, and we leave you with a written quote covering multiple product options and price points." },
    ],
    keywords: ['edgewater window treatments chicago', 'edgewater blinds chicago', 'edgewater condo shades', 'lakefront window treatments chicago', 'window coverings edgewater chicago'],
  },
  'oak-park': {
    name: 'Oak Park',
    slug: 'oak-park',
    image: '/images/neighborhoods/lincolnPark.jpg',
    sub: 'Prairie style · Frank Lloyd Wright · craftsman homes',
    headline: 'Oak Park Window Treatments',
    intro: "Oak Park's Frank Lloyd Wright Prairie-style homes, craftsman bungalows, and Victorian houses require window treatments that honor their extraordinary architectural heritage.",
    longDesc: "Oak Park is home to the world's largest collection of Frank Lloyd Wright architecture, plus hundreds of craftsman bungalows and Victorian homes that define early 20th-century American residential design. Window treatments here must respect horizontal Prairie lines, complement original woodwork and art glass, and provide function without visually dominating the architecture. Ben's Blinds has specialized expertise in Oak Park's historic home stock and serves homeowners throughout the village.",
    commonWindows: ['Prairie-style horizontal window bands and clerestories', 'Art glass and leaded glass windows requiring careful treatment', 'Craftsman bungalow picture windows', 'Victorian double-hung windows with ornate frames', 'Modern additions to historic homes'],
    topProducts: [
      { key: 'wood', name: 'Wood Blinds', reason: 'Horizontal lines and natural material that complements Prairie-style architecture' },
      { key: 'cellular', name: 'Cellular Shades', reason: 'Clean look that recedes from view and lets architecture be the focus' },
      { key: 'roller', name: 'Roller Shades', reason: 'Minimal profile suited to craftsman interiors wanting modern function' },
    ],
    faqs: [
      { q: 'What window treatments are appropriate for Frank Lloyd Wright-style homes in Oak Park?', a: "Prairie-style architecture in Oak Park emphasizes horizontal lines, natural materials, and integration of interior and exterior. Wood blinds are our primary recommendation — their horizontal slats echo Prairie architectural language and their natural material suits the organic aesthetic. We specifically avoid Roman shades and drapery in these spaces as they introduce vertical emphasis that fights the Prairie design philosophy." },
      { q: 'How do you handle art glass and leaded glass windows in Oak Park historic homes?', a: "Art glass and leaded glass windows in Oak Park homes are irreplaceable architectural features that we always treat with extreme care. We typically recommend outside-mount treatments positioned above the art glass so the glass remains visible when treatments are raised. For privacy where art glass is present, we suggest sheer roller shades that filter light without obscuring the glass." },
      { q: 'Are there historical commission requirements for window treatments in Oak Park?', a: "Oak Park has a Historic Preservation Commission that reviews exterior changes to historic properties. Interior window treatments are generally not subject to review, but anything visible from the exterior (exterior roller shutters, exterior solar screens, or visible treatment backing) may be subject to approval. We recommend compliant products with white or neutral exterior backing as a default." },
      { q: 'What treatments work for craftsman bungalows in Oak Park?', a: "Oak Park craftsman bungalows have original wood trim, built-in cabinetry, and warm interiors that benefit from natural materials. We recommend wood blinds for living and dining areas, cellular shades for bedrooms (energy efficiency and blackout capability), and roller shades for kitchens and bathrooms where practicality matters most." },
      { q: 'Do you serve Oak Park as part of your Chicago service area?', a: "Yes — Ben's Blinds serves all of Oak Park and the surrounding west suburbs. We offer free in-home consultations with no mileage charge for Oak Park. Our installation teams work throughout Chicagoland and we're familiar with the specific window challenges of Oak Park's historic home stock." },
    ],
    keywords: ['oak park window treatments', 'oak park blinds chicago', 'prairie style window treatments oak park', 'frank lloyd wright home window treatments', 'oak park custom shades chicago'],
  },
}

export async function generateStaticParams() {
  return Object.keys(NEIGHBORHOOD_DATA).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const n = NEIGHBORHOOD_DATA[slug]
  if (!n) return {}

  return {
    title: n.headline,
    description: `${n.intro} Free in-home consultation throughout ${n.name} and all of Chicago.`,
    keywords: n.keywords,
    openGraph: {
      title: `${n.headline} | Ben's Blinds Chicago`,
      description: `${n.intro} Ben's Blinds: custom window treatments, free in-home measurement, professional installation.`,
      images: [{ url: n.image, width: 1200, height: 630, alt: `${n.name} Chicago — Custom Window Treatments by Ben's Blinds` }],
    },
    alternates: { canonical: `${BASE}/neighborhoods/${slug}` },
  }
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const n = NEIGHBORHOOD_DATA[slug]
  if (!n) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}` },
      { '@type': 'ListItem', position: 2, name: 'Neighborhoods', item: `${BASE}/neighborhoods` },
      { '@type': 'ListItem', position: 3, name: n.name, item: `${BASE}/neighborhoods/${slug}` },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE}/#localbusiness`,
    name: "Ben's Blinds Chicago",
    url: BASE,
    telephone: '+13123610908',
    areaServed: { '@type': 'Neighborhood', name: n.name, containedInPlace: { '@type': 'City', name: 'Chicago' } },
    description: `Custom window treatments in ${n.name}, Chicago. ${n.intro}`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: n.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb nav */}
      <nav aria-label="breadcrumb" style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', padding: '0.625rem 1.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--text-3)', fontFamily: 'var(--font-body)', flexWrap: 'wrap' }}>
            <li><Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link></li>
            <li style={{ opacity: 0.5 }}>/</li>
            <li><Link href="/neighborhoods" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Neighborhoods</Link></li>
            <li style={{ opacity: 0.5 }}>/</li>
            <li style={{ color: 'var(--text-2)', fontWeight: 500 }}>{n.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img
          src={n.image}
          alt={`${n.name} Chicago neighborhood — custom window treatments by Ben's Blinds`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
            Service Area
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            {n.headline}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.0625rem', fontFamily: 'var(--font-body)', maxWidth: '560px', lineHeight: 1.6 }}>
            {n.sub}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '3.5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1rem' }}>
            Window Treatments Designed for {n.name}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1.0625rem', marginBottom: '1rem' }}>
            {n.intro}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1.0625rem' }}>
            {n.longDesc}
          </p>
        </div>
      </section>

      {/* Common Windows + Top Products */}
      <section style={{ padding: '0 1.5rem 3.5rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Common windows */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '1rem' }}>
                Common Window Types in {n.name}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {n.commonWindows.map((w) => (
                  <li key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontFamily: 'var(--font-body)', color: 'var(--text-2)', fontSize: '0.9375rem', lineHeight: 1.4 }}>
                    <Icon name="check" size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: '2px' }} />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top products */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '1rem' }}>
                Most Popular in {n.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {n.topProducts.map((p) => (
                  <Link key={p.key} href={`/products/${p.key}`} style={{ textDecoration: 'none' }}>
                    <div style={{ borderLeft: '3px solid var(--brand)', paddingLeft: '0.875rem' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                        {p.name}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)', fontSize: '0.8125rem', lineHeight: 1.4 }}>
                        {p.reason}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'var(--surface-2)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text)', marginBottom: '2rem', textAlign: 'center' }}>
            {n.name} Window Treatment Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {n.faqs.map(({ q, a }) => (
              <div key={q} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
                  {q}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.9375rem', margin: 0 }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--brand)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.875rem', color: '#fff', marginBottom: '0.75rem' }}>
            Get a Free In-Home Consultation in {n.name}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'var(--font-body)', fontSize: '1.0625rem' }}>
            We come to you, measure every window, show you samples in your actual light, and give you a written quote on the spot. No pressure. No obligation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/quote"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#fff', color: 'var(--brand)', fontWeight: 700,
                fontSize: '1rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius)',
                textDecoration: 'none', fontFamily: 'var(--font-body)',
              }}
            >
              Book Free Visit <Icon name="arrow" size={16} />
            </Link>
            <a
              href="tel:+13123610908"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', color: '#fff', fontWeight: 700,
                fontSize: '1rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius)',
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                border: '2px solid rgba(255,255,255,0.5)',
              }}
            >
              (312) 361-0908
            </a>
          </div>
        </div>
      </section>

      {/* Explore other neighborhoods */}
      <section style={{ padding: '3.5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            We serve all of Chicago and Chicagoland
          </p>
          <Link href="/neighborhoods" style={{ color: 'var(--brand)', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            View all service areas <Icon name="arrow" size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
