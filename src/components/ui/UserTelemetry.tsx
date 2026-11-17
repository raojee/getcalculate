import { useEffect, useState, useRef } from 'react'
import { Link } from '@tanstack/react-router'

export interface TelemetryData {
  ip: string
  city: string
  region: string
  countryCode: string
  timezone: string
  utcOffset: string
  tempC: number
  humidity: number
  windSpeedKmh: number
  precipitationMm: number
  pressureHpa: number
  weatherCode: number
  conditionLabel: string
  conditionIcon: 'sun' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm'
  aqi: number | null
  aqiLabel: string
  aqiColor: string
}

const STORAGE_UNIT_KEY = 'calcpro-temp-unit'
const CACHE_KEY = 'calcpro-telemetry-v1'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

let cachedData: TelemetryData | null = null
let inflightPromise: Promise<TelemetryData | null> | null = null
const unitListeners = new Set<(u: 'C' | 'F') => void>()

function mapWeatherCode(code: number): { label: string; icon: TelemetryData['conditionIcon'] } {
  if (code === 0) return { label: 'Clear Sky', icon: 'sun' }
  if (code === 1 || code === 2) return { label: 'Partly Cloudy', icon: 'cloud' }
  if (code === 3) return { label: 'Overcast', icon: 'cloud' }
  if (code === 45 || code === 48) return { label: 'Fog / Mist', icon: 'fog' }
  if (code >= 51 && code <= 67) return { label: 'Rain / Drizzle', icon: 'rain' }
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: 'snow' }
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', icon: 'rain' }
  if (code >= 85 && code <= 86) return { label: 'Snow Showers', icon: 'snow' }
  if (code >= 95) return { label: 'Thunderstorm', icon: 'storm' }
  return { label: 'Clear', icon: 'sun' }
}

function mapAqi(aqi: number | null): { label: string; color: string } {
  if (aqi === null || Number.isNaN(aqi)) return { label: 'N/A', color: '#9ca3af' }
  if (aqi <= 50) return { label: 'Good', color: '#22c55e' }
  if (aqi <= 100) return { label: 'Moderate', color: '#eab308' }
  if (aqi <= 150) return { label: 'Sensitive', color: '#f97316' }
  if (aqi <= 200) return { label: 'Unhealthy', color: '#ef4444' }
  return { label: 'Hazardous', color: '#a855f7' }
}

async function fetchTelemetry(): Promise<TelemetryData | null> {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Date.now() - parsed.ts < CACHE_TTL_MS && parsed.data) {
        cachedData = parsed.data
        return cachedData
      }
    }
  } catch {
    // ignore storage errors
  }

  try {
    // 1. Fetch IP + Geo from ipwho.is (fallback to ipapi.co)
    let ip = ''
    let city = ''
    let region = ''
    let countryCode = ''
    let lat = 0
    let lon = 0
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    let utcOffset = ''

    try {
      const geoRes = await fetch('https://ipwho.is/')
      const geo = await geoRes.json()
      if (geo && geo.success !== false) {
        ip = geo.ip || ''
        city = geo.city || ''
        region = geo.region || ''
        countryCode = geo.country_code || ''
        lat = Number(geo.latitude) || 0
        lon = Number(geo.longitude) || 0
        if (geo.timezone?.id) timezone = geo.timezone.id
        if (geo.timezone?.utc) utcOffset = `UTC${geo.timezone.utc}`
      }
    } catch {
      const geoRes = await fetch('https://ipapi.co/json/')
      const geo = await geoRes.json()
      ip = geo.ip || ''
      city = geo.city || ''
      region = geo.region || ''
      countryCode = geo.country_code || ''
      lat = Number(geo.latitude) || 0
      lon = Number(geo.longitude) || 0
      if (geo.timezone) timezone = geo.timezone
      if (geo.utc_offset) utcOffset = `UTC${geo.utc_offset}`
    }

    // 2. Fetch Weather + Air Quality in parallel from Open-Meteo (no API key required)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,surface_pressure&timezone=auto`
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`

    const [weatherRes, aqiRes] = await Promise.allSettled([
      fetch(weatherUrl).then(r => r.json()),
      fetch(aqiUrl).then(r => r.json()),
    ])

    const currentW = weatherRes.status === 'fulfilled' ? weatherRes.value?.current : null
    const currentAqi = aqiRes.status === 'fulfilled' ? aqiRes.value?.current : null

    const tempC = typeof currentW?.temperature_2m === 'number' ? Math.round(currentW.temperature_2m) : 22
    const humidity = typeof currentW?.relative_humidity_2m === 'number' ? Math.round(currentW.relative_humidity_2m) : 50
    const windSpeedKmh = typeof currentW?.wind_speed_10m === 'number' ? Math.round(currentW.wind_speed_10m) : 8
    const precipitationMm = typeof currentW?.precipitation === 'number' ? Number(currentW.precipitation.toFixed(1)) : 0
    const pressureHpa = typeof currentW?.surface_pressure === 'number' ? Math.round(currentW.surface_pressure) : 1013
    const weatherCode = typeof currentW?.weather_code === 'number' ? currentW.weather_code : 0

    const { label: conditionLabel, icon: conditionIcon } = mapWeatherCode(weatherCode)
    const aqiVal = typeof currentAqi?.us_aqi === 'number' ? Math.round(currentAqi.us_aqi) : null
    const { label: aqiLabel, color: aqiColor } = mapAqi(aqiVal)

    const result: TelemetryData = {
      ip: ip || 'Client Local',
      city: city || 'Local',
      region,
      countryCode,
      timezone,
      utcOffset: utcOffset || 'Local',
      tempC,
      humidity,
      windSpeedKmh,
      precipitationMm,
      pressureHpa,
      weatherCode,
      conditionLabel,
      conditionIcon,
      aqi: aqiVal,
      aqiLabel,
      aqiColor,
    }

    cachedData = result
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: result }))
    } catch {
      // ignore
    }
    return result
  } catch {
    return null
  }
}

export function useTelemetry() {
  const [data, setData] = useState<TelemetryData | null>(cachedData)
  const [unit, setUnitState] = useState<'C' | 'F'>(() => {
    if (typeof window === 'undefined') return 'C'
    return (localStorage.getItem(STORAGE_UNIT_KEY) as 'C' | 'F') || 'C'
  })
  const [timeStr, setTimeStr] = useState<string>('')

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date()
        setTimeStr(
          now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        )
      } catch {
        setTimeStr('')
      }
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const listener = (newUnit: 'C' | 'F') => setUnitState(newUnit)
    unitListeners.add(listener)
    return () => {
      unitListeners.delete(listener)
    }
  }, [])

  useEffect(() => {
    if (cachedData) {
      setData(cachedData)
      return
    }
    // Defer network fetch until idle so LCP / INP / Core Web Vitals remain 100% unaffected
    const load = () => {
      if (!inflightPromise) {
        inflightPromise = fetchTelemetry().finally(() => {
          inflightPromise = null
        })
      }
      inflightPromise.then(res => {
        if (res) setData(res)
      })
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(load, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback?.(id)
    } else {
      const t = setTimeout(load, 600)
      return () => clearTimeout(t)
    }
  }, [])

  const toggleUnit = () => {
    const next: 'C' | 'F' = unit === 'C' ? 'F' : 'C'
    setUnitState(next)
    try {
      localStorage.setItem(STORAGE_UNIT_KEY, next)
    } catch {
      // ignore
    }
    unitListeners.forEach(fn => fn(next))
  }

  const formatTemp = (tempC: number) => {
    if (unit === 'F') {
      return `${Math.round((tempC * 9) / 5 + 32)}°F`
    }
    return `${tempC}°C`
  }

  return { data, unit, toggleUnit, formatTemp, timeStr }
}

function WeatherConditionSvg({ icon }: { icon: TelemetryData['conditionIcon'] }) {
  switch (icon) {
    case 'fog':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
          <path d="M4 14h16" /><path d="M4 18h12" /><path d="M6 10h14" />
        </svg>
      )
    case 'rain':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M16 14v6" /><path d="M8 14v6" /><path d="M12 16v6" />
        </svg>
      )
    case 'cloud':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      )
    case 'snow':
    case 'storm':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    default:
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /><path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" /><path d="M20 12h2" />
        </svg>
      )
  }
}

/**
 * Compact Header Pill + Interactive Popover Card for LandingNav and TopBar
 */
export function HeaderTelemetryPill() {
  const { data, unit, toggleUnit, formatTemp, timeStr } = useTelemetry()
  const [open, setOpen] = useState(false)
  const [ipCopied, setIpCopied] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!timeStr && !data) return null

  const copyIp = () => {
    if (!data?.ip) return
    navigator.clipboard.writeText(data.ip)
    setIpCopied(true)
    setTimeout(() => setIpCopied(false), 2000)
  }

  return (
    <div
      ref={wrapperRef}
      className="relative hidden sm:inline-flex items-center min-h-[34px]"
       data-nosnippet
      aria-label="Live local time and weather telemetry"
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer select-none"
        style={{
          background: 'var(--bg-surface-2)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
        }}
        onClick={() => setOpen(v => !v)}
        title="Click for live weather, air quality, and IP telemetry"
      >
        {/* Live status dot + Local Time */}
        {timeStr && (
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {timeStr}
          </span>
        )}

        {data && (
          <>
            <span className="opacity-30">|</span>
            <span className="hidden xl:inline truncate max-w-[110px]" style={{ color: 'var(--text-secondary)' }}>
              {data.city}{data.countryCode ? `, ${data.countryCode}` : ''}
            </span>
            <span className="hidden xl:inline opacity-30">|</span>
            <span className="flex items-center gap-1 font-bold text-amber">
              <WeatherConditionSvg icon={data.conditionIcon} />
              {formatTemp(data.tempC)}
            </span>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation()
                toggleUnit()
              }}
              className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider transition-colors hover:bg-amber/20"
              style={{
                background: 'rgba(255, 157, 46, 0.12)',
                color: 'var(--amber)',
                border: '1px solid rgba(255, 157, 46, 0.25)',
              }}
              aria-label="Toggle Celsius or Fahrenheit"
            >
              °{unit}
            </button>
          </>
        )}
      </div>

      {/* Detailed Popover */}
      {open && data && (
        <div
          className="absolute right-0 top-full mt-2 w-80 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-xl animate-fade-in"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber">
                {data.city}{data.region ? `, ${data.region}` : ''} {data.countryCode ? `(${data.countryCode})` : ''}
              </p>
              <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {data.timezone} • {data.utcOffset}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleUnit}
              className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
              style={{
                background: 'rgba(255, 157, 46, 0.14)',
                color: 'var(--amber)',
                border: '1px solid rgba(255, 157, 46, 0.3)',
              }}
            >
              Switch to °{unit === 'C' ? 'F' : 'C'}
            </button>
          </div>

          {/* Primary Weather Row */}
          <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
              <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                Weather
              </span>
              <div className="flex items-center gap-1.5 font-bold">
                <WeatherConditionSvg icon={data.conditionIcon} />
                <span>{formatTemp(data.tempC)} • {data.conditionLabel}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
              <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                Air Quality (US AQI)
              </span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.aqiColor }} />
                <span>{data.aqi !== null ? `${data.aqi} (${data.aqiLabel})` : 'N/A'}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
              <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                Humidity &amp; Rain
              </span>
              <span className="font-mono font-semibold">
                💧 {data.humidity}% • 🌧️ {data.precipitationMm} mm
              </span>
            </div>

            <div className="p-2.5 rounded-xl" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
              <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                Wind &amp; Pressure
              </span>
              <span className="font-mono font-semibold">
                💨 {data.windSpeedKmh} km/h • {data.pressureHpa} hPa
              </span>
            </div>
          </div>

          {/* IP Address + Contextual Internal Links (Converter & Solar Sizer) */}
          <div className="flex flex-col gap-2 pt-2.5 border-t text-[11px] font-mono" style={{ borderColor: 'var(--border)' }}>
            <button
              type="button"
              onClick={copyIp}
              className="hover:text-amber transition-colors text-left"
              style={{ color: 'var(--text-secondary)' }}
              title="Click to copy IP address"
            >
              🌐 IP: <strong style={{ color: 'var(--text-primary)' }}>{data.ip}</strong>{' '}
              <span className="text-[9px] text-amber">{ipCopied ? '(Copied!)' : '(Click to copy)'}</span>
            </button>
            <div className="flex items-center justify-between pt-1 font-sans text-[10px] font-bold">
              <Link
                to="/converter"
                onClick={() => setOpen(false)}
                className="text-amber hover:underline"
              >
                °C/°F &amp; Wind Converter →
              </Link>
              <Link
                to="/solvers/solar-panel-calculator"
                onClick={() => setOpen(false)}
                className="text-amber hover:underline"
              >
                Solar Panel Sizer →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Full Monospace Telemetry Bar for LandingFooter
 */
export function FooterTelemetryStrip() {
  const { data, unit, toggleUnit, formatTemp, timeStr } = useTelemetry()
  const [ipCopied, setIpCopied] = useState(false)

  const copyIp = () => {
    if (!data?.ip) return
    navigator.clipboard.writeText(data.ip)
    setIpCopied(true)
    setTimeout(() => setIpCopied(false), 2000)
  }

  return (
    <aside
      data-nosnippet
      aria-label="Client runtime and local environment telemetry"
      className="w-full rounded-2xl px-4 py-3 mb-8 text-[11px] font-mono flex flex-wrap items-center justify-between gap-y-2 gap-x-4 min-h-[46px]"
      style={{
        background: 'var(--bg-surface-2)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Left: Client Engine & Network IP */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          0ms Client Engine
        </span>

        {data?.ip && (
          <>
            <span className="opacity-30">•</span>
            <button
              type="button"
              onClick={copyIp}
              className="hover:text-amber transition-colors"
              title="Click to copy your IP address"
            >
              IP: <strong style={{ color: 'var(--text-primary)' }}>{data.ip}</strong>{' '}
              {ipCopied && <span className="text-amber text-[10px]">(Copied!)</span>}
            </button>
          </>
        )}

        {data?.city && (
          <>
            <span className="opacity-30">•</span>
            <span>
              📍 {data.city}{data.countryCode ? `, ${data.countryCode}` : ''} ({data.utcOffset})
            </span>
          </>
        )}

        {timeStr && (
          <>
            <span className="opacity-30">•</span>
            <span>🕒 {timeStr}</span>
          </>
        )}
      </div>

      {/* Right: Weather, Fog/Clear, AQI, Humidity, Wind, Precip + C/F Toggle */}
      {data && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1 font-bold text-amber">
            <WeatherConditionSvg icon={data.conditionIcon} />
            {formatTemp(data.tempC)} {data.conditionLabel}
          </span>

          <button
            type="button"
            onClick={toggleUnit}
            className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider transition-colors hover:bg-amber/20"
            style={{
              background: 'rgba(255, 157, 46, 0.12)',
              color: 'var(--amber)',
              border: '1px solid rgba(255, 157, 46, 0.25)',
            }}
            title="Switch between Celsius and Fahrenheit"
          >
            °{unit} ⇄ °{unit === 'C' ? 'F' : 'C'}
          </button>

          <span className="opacity-30">•</span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.aqiColor }} />
            AQI: <strong style={{ color: 'var(--text-primary)' }}>{data.aqi !== null ? `${data.aqi} (${data.aqiLabel})` : 'N/A'}</strong>
          </span>

          <span className="opacity-30">•</span>
          <span>💧 Humidity: {data.humidity}%</span>

          <span className="opacity-30">•</span>
          <span>🌧️ Precip: {data.precipitationMm} mm</span>

          <span className="opacity-30">•</span>
          <span>💨 Wind: {data.windSpeedKmh} km/h</span>
        </div>
      )}
    </aside>
  )
}
