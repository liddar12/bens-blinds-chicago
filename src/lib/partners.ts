export type PartnerKey = 'hunter-douglas' | 'horizons' | 'exus' | 'alta' | 'sunpro'

export interface Partner {
  key: PartnerKey
  name: string
  tagline: string
  description: string
  specialty: string
  products: string[]          // PRODUCTS keys
  tier: 'premier' | 'certified' | 'authorized'
  website: string
  logoAlt: string
  accentColor: string
  highlights: string[]
}

export const PARTNERS: Partner[] = [
  {
    key: 'hunter-douglas',
    name: 'Hunter Douglas',
    tagline: 'The world\'s #1 window covering brand',
    description: 'Hunter Douglas pioneered many of the window treatment categories we know today: from the original Duette® honeycomb shade to PowerView® motorization. Their products are engineered in the Netherlands and backed by lifetime warranties on most lines.',
    specialty: 'Full product line: premium motorized, cellular, roller, and more',
    tier: 'premier',
    website: 'https://www.hunterdouglas.com',
    logoAlt: 'Hunter Douglas logo',
    accentColor: '#1a3a6b',
    highlights: [
      'Duette® honeycomb shades: industry-leading insulation',
      'PowerView® motorization with app + voice control',
      'Silhouette® shadings for soft, diffused light',
      'Plantation shutters with lifetime warranty',
      'Authorized dealer with certified installation team',
    ],
    products: ['cellular', 'solar', 'roller', 'wood', 'shutters', 'roman', 'motorized', 'drapery'],
  },
  {
    key: 'horizons',
    name: 'Horizons Window Fashions',
    tagline: 'Beautifully crafted fabric window treatments',
    description: 'Horizons specializes in soft, fabric-forward window fashions made in North America. Their woven wood shades, soft roman shades, and custom drapery are favorites among interior designers throughout the Midwest.',
    specialty: 'Fabric treatments: roman shades, drapery, woven wood, soft roller',
    tier: 'certified',
    website: 'https://www.horizonswf.com',
    logoAlt: 'Horizons Window Fashions logo',
    accentColor: '#5a3e28',
    highlights: [
      'Woven wood & bamboo shades: natural texture',
      'Custom roman shades with 200+ fabric options',
      'Soft-fold drapery panels and traverse systems',
      'North American manufacturing with quick lead times',
      'Pattern-matching and lining options available',
    ],
    products: ['roman', 'drapery', 'roller', 'cellular'],
  },
  {
    key: 'exus',
    name: 'EXUS Custom Shutters',
    tagline: 'Precision-crafted shutters built to last generations',
    description: 'EXUS builds plantation shutters with a level of precision rare in the industry. Each shutter is custom-measured, custom-cut, and custom-finished: offered in hardwood, poly-resin composite, and their signature moisture-barrier material for bathrooms and kitchens.',
    specialty: 'Plantation shutters: hardwood, poly, moisture-barrier',
    tier: 'authorized',
    website: 'https://www.exusshutters.com',
    logoAlt: 'EXUS Custom Shutters logo',
    accentColor: '#3d2b1f',
    highlights: [
      'Custom shutter frames built to your exact window',
      'Full-height, café, and tier-on-tier configurations',
      'Hidden tilt and traditional tilt rod options',
      'Moisture-barrier material for wet rooms',
      '25-year structural warranty',
    ],
    products: ['shutters'],
  },
  {
    key: 'alta',
    name: 'ALTA Window Fashions',
    tagline: 'Quality window treatments at accessible price points',
    description: 'ALTA delivers solid performance across cellular, roller, and roman shades at price points that make custom window treatments accessible to every Chicago home. Their manufacturing standards rival premium brands, making them Ben\'s top recommendation for rental properties and budget-conscious projects.',
    specialty: 'Value tier: cellular, roller, solar, roman, wood',
    tier: 'authorized',
    website: 'https://www.altawindowfashions.com',
    logoAlt: 'ALTA Window Fashions logo',
    accentColor: '#1c4a6e',
    highlights: [
      'Custom cellular shades from $69/panel installed',
      'Wide fabric and opacity selection across all lines',
      'Cordless and motorized options on most products',
      'Fast 2-week lead times on core styles',
      'Ideal for multi-unit buildings and staging projects',
    ],
    products: ['cellular', 'roller', 'solar', 'roman', 'wood'],
  },
  {
    key: 'sunpro',
    name: 'SUNPRO Motorized Awnings & Screens',
    tagline: 'Extend your living space with motorized outdoor shading',
    description: 'SUNPRO engineers outdoor living solutions that bring the inside out: motorized retractable awnings, solar screens for patios and decks, and insect-screen systems for three-season rooms. Their products withstand Chicago\'s full weather spectrum from summer heat to early winter winds.',
    specialty: 'Outdoor: motorized awnings, patio screens, solar screens',
    tier: 'authorized',
    website: 'https://www.sunproawnings.com',
    logoAlt: 'SUNPRO Motorized Awnings & Screens logo',
    accentColor: '#b85c1a',
    highlights: [
      'Motorized retractable awnings for decks and patios',
      'Wind-rated frames engineered for Chicago weather',
      'Solar screens with view-through fabric options',
      'Somfy motor integration for smart home control',
      'Insect screen systems for three-season rooms',
    ],
    products: ['motorized', 'solar'],
  },
]

export const TIER_LABELS: Record<Partner['tier'], string> = {
  premier: 'Premier Dealer',
  certified: 'Certified Dealer',
  authorized: 'Authorized Dealer',
}

export function getPartnersForProduct(productKey: string): Partner[] {
  return PARTNERS.filter((p) => p.products.includes(productKey))
}
