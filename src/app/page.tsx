import type { Metadata } from 'next'
import { HomeClient } from '@/components/home/HomeClient'

export const metadata: Metadata = {
  title: "Ben's Blinds Chicago | Custom Blinds, Shades & Shutters",
  description:
    "Chicago's trusted window treatment specialists. Custom blinds, shades, shutters, and drapery. Free in-home consultations. Hunter Douglas dealer serving all Chicago neighborhoods.",
}

export default function HomePage() {
  return <HomeClient />
}
