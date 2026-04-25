import type { Metadata } from 'next'
import { HomeClient } from '@/components/home/HomeClient'
import { HomePageClient } from '@/components/home/HomePageClient'
import { tinaClient } from '@/lib/tina-client'

export const metadata: Metadata = {
  title: "Ben's Blinds Chicago | Custom Blinds, Shades & Shutters",
  description:
    "Chicago's trusted window treatment specialists. Custom blinds, shades, shutters, and drapery. Free in-home consultations. Hunter Douglas dealer serving all Chicago neighborhoods.",
}

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tinaProps: { query: string; variables: Record<string, unknown>; data: any } | null = null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tinaData = await (tinaClient.queries as any).homepage({ relativePath: 'home.json' })
    tinaProps = { query: tinaData.query, variables: tinaData.variables, data: tinaData.data }
  } catch {
    // TinaCMS not available (local dev without tinacms dev running)
  }

  return tinaProps ? <HomePageClient {...tinaProps} /> : <HomeClient />
}
