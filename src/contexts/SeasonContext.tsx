'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useSeason } from '@/hooks/useSeason'
import { type SeasonKey, type ToneKey } from '@/lib/season'

interface SeasonCtx {
  season: SeasonKey
  setSeason: (s: SeasonKey) => void
  tone: ToneKey
  setTone: (t: ToneKey) => void
}

const Ctx = createContext<SeasonCtx | null>(null)

export function SeasonProvider({ children, initial = 'spring' }: { children: ReactNode; initial?: SeasonKey }) {
  const value = useSeason(initial)
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSeasonContext() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSeasonContext must be used inside SeasonProvider')
  return ctx
}
