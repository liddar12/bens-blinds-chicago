import { NextResponse } from 'next/server'
import { detectSeasonFromTemp, detectSeasonFromMonth, type SeasonKey } from '@/lib/season'

const CHICAGO_LAT = 41.8781
const CHICAGO_LON = -87.6298

// Typical Chicago temperatures by month for fallback display
const TYPICAL_TEMP_F: Record<number, number> = {
  0: 26, 1: 30, 2: 40, 3: 52, 4: 63, 5: 73,
  6: 82, 7: 80, 8: 72, 9: 60, 10: 47, 11: 32,
}

function dateFallback(): NextResponse {
  const now = new Date()
  const month = now.getMonth()
  const season: SeasonKey = detectSeasonFromMonth(month)
  const tempF = TYPICAL_TEMP_F[month] ?? 55
  return NextResponse.json({
    tempF,
    description: season,
    season,
    fallback: true,
  })
}

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey || apiKey === 'your_key_here') {
    return dateFallback()
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CHICAGO_LAT}&lon=${CHICAGO_LON}&units=imperial&appid=${apiKey}`,
      { next: { revalidate: 3600, tags: ['weather'] } },
    )
    if (!res.ok) throw new Error(`OWM ${res.status}`)

    const data = await res.json()
    const tempF: number = data.main.temp
    const season = detectSeasonFromTemp(tempF)

    return NextResponse.json({
      tempF: Math.round(tempF),
      description: data.weather[0].description as string,
      conditionId: data.weather[0].id as number,
      humidity: data.main.humidity as number,
      windMph: Math.round(data.wind.speed as number),
      season,
    })
  } catch (err) {
    console.error('Weather fetch failed:', err)
    return dateFallback()
  }
}
