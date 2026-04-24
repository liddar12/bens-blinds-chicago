import type { Metadata } from 'next'
import { Montserrat, Roboto, JetBrains_Mono } from 'next/font/google'
import { SeasonProvider } from '@/contexts/SeasonContext'
import { WeatherBanner } from '@/components/layout/WeatherBanner'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bensblinds.com'),
  title: {
    default: "Ben's Blinds Chicago | Custom Window Treatments",
    template: "%s | Ben's Blinds Chicago",
  },
  description:
    "Chicago's trusted source for custom blinds, shades, and shutters. Free in-home consultations throughout Chicagoland. Hunter Douglas dealer. Cellular, roller, solar shades, wood blinds, and more.",
  keywords: [
    "blinds chicago",
    "custom window treatments chicago",
    "hunter douglas chicago",
    "cellular shades chicago",
    "roller shades chicago",
    "shutters chicago",
    "window coverings chicago",
    "free in-home consultation blinds",
  ],
  authors: [{ name: "Ben's Blinds Chicago" }],
  creator: "Ben's Blinds Chicago",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bensblinds.com',
    siteName: "Ben's Blinds Chicago",
    title: "Ben's Blinds Chicago | Custom Window Treatments",
    description:
      "Chicago's trusted source for custom blinds, shades, and shutters. Free in-home consultations throughout Chicagoland.",
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: "Ben's Blinds Chicago",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ben's Blinds Chicago",
    description: "Custom window treatments for every Chicago home and season.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: 'https://bensblinds.com' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://bensblinds.com/#localbusiness',
  name: "Ben's Blinds Chicago",
  description:
    "Custom window treatments including blinds, shades, and shutters serving Chicagoland since 2005.",
  url: 'https://bensblinds.com',
  telephone: '+13123610908',
  email: 'info@bensblinds.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 N Michigan Ave',
    addressLocality: 'Chicago',
    addressRegion: 'IL',
    postalCode: '60601',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.8827,
    longitude: -87.6233,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Chicago', containsPlace: [
      { '@type': 'Neighborhood', name: 'Lincoln Park' },
      { '@type': 'Neighborhood', name: 'Wicker Park' },
      { '@type': 'Neighborhood', name: 'River North' },
      { '@type': 'Neighborhood', name: 'Gold Coast' },
      { '@type': 'Neighborhood', name: 'Lakeview' },
      { '@type': 'Neighborhood', name: 'Logan Square' },
      { '@type': 'Neighborhood', name: 'West Loop' },
      { '@type': 'Neighborhood', name: 'Hyde Park' },
      { '@type': 'Neighborhood', name: 'Pilsen' },
      { '@type': 'Neighborhood', name: 'Lincoln Square' },
      { '@type': 'Neighborhood', name: 'Edgewater' },
    ]},
    { '@type': 'City', name: 'Evanston', containedInPlace: { '@type': 'State', name: 'Illinois' } },
    { '@type': 'City', name: 'Oak Park', containedInPlace: { '@type': 'State', name: 'Illinois' } },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '318',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom Window Treatments',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cellular Shades Installation', url: 'https://bensblinds.com/products/cellular' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Solar Shades Installation', url: 'https://bensblinds.com/products/solar' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roller Shades Installation', url: 'https://bensblinds.com/products/roller' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wood Blinds Installation', url: 'https://bensblinds.com/products/wood' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plantation Shutters Installation', url: 'https://bensblinds.com/products/shutters' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roman Shades Installation', url: 'https://bensblinds.com/products/roman' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motorized Shades Installation', url: 'https://bensblinds.com/products/motorized' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Drapery Installation', url: 'https://bensblinds.com/products/drapery' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Free In-Home Consultation', url: 'https://bensblinds.com/quote' } },
    ],
  },
  sameAs: [
    'https://www.facebook.com/bensblinds',
    'https://www.instagram.com/bensblinds',
    'https://www.yelp.com/biz/bens-blinds-chicago',
    'https://www.houzz.com/professionals/bens-blinds',
  ],
}

const REVIEWS_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', '@id': 'https://bensblinds.com/#localbusiness', name: "Ben's Blinds Chicago" },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Sarah M.' },
    reviewBody: "Ben's Blinds transformed our Lincoln Park greystone with custom cellular shades. The installer was on time, the measurement was perfect, and the shades have made a noticeable difference in our heating bill. Highly recommend for any Chicago home.",
    datePublished: '2025-11-15',
    publisher: { '@type': 'Organization', name: 'Google Reviews' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', '@id': 'https://bensblinds.com/#localbusiness', name: "Ben's Blinds Chicago" },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Marcus T.' },
    reviewBody: "We have a West Loop loft with massive industrial windows and Ben's Blinds handled the motorized solar shades perfectly. The Somfy system works flawlessly with our Google Home setup and the installation team was professional and efficient. Worth every penny.",
    datePublished: '2025-12-03',
    publisher: { '@type': 'Organization', name: 'Google Reviews' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', '@id': 'https://bensblinds.com/#localbusiness', name: "Ben's Blinds Chicago" },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Jennifer K.' },
    reviewBody: "Our Gold Coast cooperative has strict appearance rules and Ben's Blinds knew exactly which treatments would comply while still looking beautiful inside. The plantation shutters in our living room are stunning and the whole process was seamless.",
    datePublished: '2025-10-22',
    publisher: { '@type': 'Organization', name: 'Google Reviews' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', '@id': 'https://bensblinds.com/#localbusiness', name: "Ben's Blinds Chicago" },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'David R.' },
    reviewBody: "Just moved into a Logan Square two-flat and had Ben's Blinds do the whole building — roller shades in the rental unit upstairs, Roman shades and wood blinds for our owner unit. The team measured everything in one visit and installation was done in a day. Incredible service.",
    datePublished: '2026-01-08',
    publisher: { '@type': 'Organization', name: 'Google Reviews' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', '@id': 'https://bensblinds.com/#localbusiness', name: "Ben's Blinds Chicago" },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Amara O.' },
    reviewBody: "I have an east-facing Lakeview condo with lake views I didn't want to lose. Ben recommended solar shades with a dual bracket blackout system for the bedroom. Perfect solution — I can enjoy the lake view during the day and have complete blackout for sleep. Five stars.",
    datePublished: '2026-02-14',
    publisher: { '@type': 'Organization', name: 'Google Reviews' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', '@id': 'https://bensblinds.com/#localbusiness', name: "Ben's Blinds Chicago" },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Patricia W.' },
    reviewBody: "Our Oak Park Prairie-style home needed treatments that worked with the architecture, not against it. Ben's Blinds understood immediately — wood blinds throughout with cellular shades for the bedrooms. The measurer even knew which rooms were Wright-influenced and made recommendations accordingly.",
    datePublished: '2026-03-01',
    publisher: { '@type': 'Organization', name: 'Google Reviews' },
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#8B4513" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        {REVIEWS_SCHEMA.map((r, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(r) }} />
        ))}
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <SeasonProvider>
          <WeatherBanner />
          <Nav />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </SeasonProvider>
      </body>
    </html>
  )
}
