'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import { useSeasonContext } from '@/contexts/SeasonContext'
import { HomeClient } from './HomeClient'
import type { SeasonKey } from '@/lib/season'

type SeasonCapitalized = 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Severe' | 'Heatwave'

const SEASON_FIELD_MAP: Record<SeasonKey, SeasonCapitalized> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
  severe: 'Severe',
  heatwave: 'Heatwave',
}

interface Props {
  query: string
  variables: Record<string, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export function HomePageClient({ query, variables, data: initialData }: Props) {
  const { data } = useTina({ query, variables, data: initialData })
  const { season } = useSeasonContext()

  const hp = data.homepage
  const seasonCap = SEASON_FIELD_MAP[season]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroObj = hp?.[`hero${seasonCap}` as keyof typeof hp] as any

  const heroOverride = heroObj ? { headline: heroObj.headline, sub: heroObj.sub, cta: heroObj.cta } : undefined
  const reviewsOverride = hp?.reviews?.length ? hp.reviews : undefined
  const ctaOverride = hp?.ctaHeadline ? { headline: hp.ctaHeadline, body: hp.ctaBody } : undefined

  const tinaFields = {
    heroHeadline: heroObj ? tinaField(heroObj, 'headline') : undefined,
    heroSub: heroObj ? tinaField(heroObj, 'sub') : undefined,
    heroCta: heroObj ? tinaField(heroObj, 'cta') : undefined,
    ctaHeadline: hp?.ctaHeadline !== undefined ? tinaField(hp, 'ctaHeadline') : undefined,
    ctaBody: hp?.ctaBody !== undefined ? tinaField(hp, 'ctaBody') : undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviewFields: hp?.reviews?.map((r: any) => ({
      name: tinaField(r, 'name'),
      hood: tinaField(r, 'hood'),
      text: tinaField(r, 'text'),
    })),
  }

  return (
    <HomeClient
      heroOverride={heroOverride}
      reviewsOverride={reviewsOverride}
      ctaOverride={ctaOverride}
      tinaFields={tinaFields}
    />
  )
}
