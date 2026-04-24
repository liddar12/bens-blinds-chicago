'use client'

import { useState, useEffect, useCallback } from 'react'
import { type SeasonKey, type ToneKey, detectSeasonFromMonth } from '@/lib/season'

function getStoredSeason(): SeasonKey | null {
  try { return localStorage.getItem('bb_season') as SeasonKey | null } catch { return null }
}
function getStoredTone(): ToneKey {
  try { return (localStorage.getItem('bb_tone') as ToneKey) || 'warm' } catch { return 'warm' }
}

export function useSeason(initial: SeasonKey) {
  const [season, setSeasonState] = useState<SeasonKey>(initial)
  const [tone, setToneState] = useState<ToneKey>('warm')

  useEffect(() => {
    const stored = getStoredSeason()
    if (stored) {
      setSeasonState(stored)
    } else {
      setSeasonState(detectSeasonFromMonth(new Date().getMonth()))
    }
    setToneState(getStoredTone())
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-season', season)
    try { localStorage.setItem('bb_season', season) } catch {}
  }, [season])

  useEffect(() => {
    try { localStorage.setItem('bb_tone', tone) } catch {}
  }, [tone])

  const setSeason = useCallback((s: SeasonKey) => setSeasonState(s), [])
  const setTone   = useCallback((t: ToneKey)   => setToneState(t),   [])

  return { season, setSeason, tone, setTone }
}
