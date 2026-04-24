import type { Metadata } from 'next'
import QuoteClient from './QuoteClient'

export const metadata: Metadata = {
  title: "Free In-Home Consultation | Ben's Blinds Chicago",
  description:
    "Book your free in-home window treatment consultation with Ben's Blinds Chicago. We measure every window, recommend the right product, and provide a no-obligation quote. Serving all Chicago neighborhoods.",
  keywords: [
    'free in-home consultation blinds chicago',
    'window treatment quote chicago',
    'blinds installation estimate chicago',
    'free blinds measurement chicago',
    'custom window treatment consultation',
  ],
  openGraph: {
    title: "Book a Free In-Home Consultation | Ben's Blinds Chicago",
    description:
      "We come to you anywhere in Chicagoland. Free measurement, expert advice, no-obligation quote.",
  },
  alternates: { canonical: 'https://bensblinds.com/quote' },
}

export default function QuotePage() {
  return <QuoteClient />
}
