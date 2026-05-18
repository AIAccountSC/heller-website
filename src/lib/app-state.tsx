'use client'
// @ts-nocheck
import React, { useState, useEffect, useCallback, useContext, useRef, createContext } from 'react'
import { HELLER_DICT } from '@/content/dict'

const ThemeContext = createContext({ theme: 'light', setTheme: (_: string) => {} })
const LangContext  = createContext({ lang: 'de', setLang: (_: string) => {}, t: (k: string) => k as any })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage === 'undefined') return 'light'
    return localStorage.getItem('heller-theme') || 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('heller-theme', theme) } catch (e) {}
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage === 'undefined') return 'de'
    return localStorage.getItem('heller-lang') || 'de'
  })
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    try { localStorage.setItem('heller-lang', lang) } catch (e) {}
  }, [lang])

  const t = useCallback((key: string) => {
    const dict = HELLER_DICT[lang]
    if (!dict) return key
    const parts = key.split('.')
    let v: any = dict
    for (const p of parts) {
      if (v == null) return key
      v = v[p]
    }
    return v == null ? key : v
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export const useLang  = () => useContext(LangContext)

// renderText — converts a translation string into JSX:
//   [[word]]  → <span class="serif">word</span>
//   \n        → <br/>
export function renderText(s: any) {
  if (s == null) return null
  if (typeof s !== 'string') return s
  const out: React.ReactNode[] = []
  const lines = s.split('\n')
  lines.forEach((line: string, lineIdx: number) => {
    const parts = line.split(/(\[\[[^\]]+\]\])/g)
    parts.forEach((p: string, partIdx: number) => {
      if (p.startsWith('[[') && p.endsWith(']]')) {
        out.push(<span key={`${lineIdx}-${partIdx}-s`} className="serif">{p.slice(2, -2)}</span>)
      } else if (p.length > 0) {
        out.push(<React.Fragment key={`${lineIdx}-${partIdx}-t`}>{p}</React.Fragment>)
      }
    })
    if (lineIdx < lines.length - 1) {
      out.push(<br key={`br-${lineIdx}`}/>)
    }
  })
  return out
}

// IconSun / IconMoon for the theme toggle
export function IconSun(p: any) { return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={p.size||16} height={p.size||16}>
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
  </svg>
) }
export function IconMoon(p: any) { return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={p.size||16} height={p.size||16}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
  </svg>
) }

// AnimatedCount — counts a numeric target up from 0 when scrolled into view.
export function AnimatedCount({ target, duration = 1400 }: { target: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)
  const match = /^(\d+(?:[.,]\d+)?)(.*)$/.exec(String(target))
  const num = match ? parseFloat(match[1].replace(',', '.')) : null
  const suffix = match ? match[2] : ''
  const isDecimal = match ? /[.,]/.test(match[1]) : false
  const initial = num == null ? String(target) : (isDecimal ? '0,0' + suffix : '0' + suffix)

  const [val, setVal] = useState(initial)

  useEffect(() => {
    if (num == null) { setVal(String(target)); return }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            const current = (num as number) * eased
            const formatted = isDecimal
              ? current.toFixed(1).replace('.', ',')
              : String(Math.round(current))
            setVal(formatted + suffix)
            if (t < 1) requestAnimationFrame(tick)
            else setVal(String(target))
          }
          requestAnimationFrame(tick)
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration, num, suffix, isDecimal])

  return <span ref={ref}>{val}</span>
}
