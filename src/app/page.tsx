import type { Metadata } from 'next'
import { cache } from 'react'
import { HomeClient } from '@/components/home/HomeClient'
import { HomePageClient } from '@/components/home/HomePageClient'
import { tinaClient } from '@/lib/tina-client'

const fetchTinaHomepage = cache(async () => {
  'use cache'
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (tinaClient.queries as any).homepage({ relativePath: 'home.json' })
  } catch {
    return null
  }
})

export const metadata: Metadata = {
  title: "Ben's Blinds Chicago | Custom Blinds, Shades & Shutters",
  description:
    "Chicago's trusted window treatment specialists. Custom blinds, shades, shutters, and drapery. Free in-home consultations. Hunter Douglas dealer serving all Chicago neighborhoods.",
}

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tinaProps: { query: string; variables: Record<string, unknown>; data: any } | null = null
  const tinaData = await fetchTinaHomepage()
  if (tinaData) {
    tinaProps = { query: tinaData.query, variables: tinaData.variables, data: tinaData.data }
  }

  return tinaProps ? <HomePageClient {...tinaProps} /> : <HomeClient />
}
