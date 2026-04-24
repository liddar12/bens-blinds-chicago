'use client'

import { useEffect, useState } from 'react'
import { useSeasonContext } from '@/contexts/SeasonContext'
import { SEASONS, type SeasonKey } from '@/lib/season'
import { Icon } from '@/components/ui/Icon'

interface WeatherData {
  tempF: number
  description: string
  season: SeasonKey
}

const SEASON_MESSAGES: Record<SeasonKey, (temp: number) => string> = {
  spring:   (t) => `${t}°F · Spring window treatment inspiration: let the light in`,
  summer:   (t) => `${t}°F · Beat the heat with solar and cellular shades`,
  fall:     (t) => `${t}°F · Prep for winter: insulating cellular shades save energy`,
  winter:   (t) => `${t}°F · Chicago winters demand insulating cellular shades`,
  severe:   (t) => `${t}°F Polar vortex · Our cellular shades can cut heat loss by 40%`,
  heatwave: (t) => `${t}°F Heat emergency · Solar shades block 99% of UV`,
}

export function WeatherBanner() {
  const { setSeason } = useSeasonContext()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => r.ok ? r.json() : null)
      .then((data: WeatherData | null) => {
        if (!data || data.season === undefined) return
        setWeather(data)
        setSeason(data.season)
      })
      .catch(() => null)
  }, [setSeason])

  if (!weather || dismissed) return null

  const info = SEASONS[weather.season]
  const msg = SEASON_MESSAGES[weather.season](weather.tempF)

  return (
    <div
      role="banner"
      aria-label="Chicago weather and product recommendation"
      style={{
        background: 'var(--brand)',
        color: '#fff',
        fontSize: '0.8125rem',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        position: 'relative',
      }}
    >
      <Icon name={info.icon} size={14} aria-hidden="true" />
      <span>{msg}</span>
      <a
        href="/quote"
        style={{
          color: '#fff',
          fontWeight: 600,
          textDecoration: 'underline',
          marginLeft: '0.25rem',
          whiteSpace: 'nowrap',
        }}
      >
        Get a free quote →
      </a>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss weather banner"
        style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          opacity: 0.8,
          padding: '0.25rem',
        }}
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  )
}
