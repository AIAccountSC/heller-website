'use client'
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useTheme, useLang, IconSun, IconMoon } from '@/lib/app-state'

function ScaleSiteLogo() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      {/* Mark: three ascending bars */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="0"  y="11" width="4" height="9"  rx="1.5" fill="currentColor" opacity="0.32"/>
        <rect x="8"  y="5"  width="4" height="15" rx="1.5" fill="currentColor" opacity="0.62"/>
        <rect x="16" y="0"  width="4" height="20" rx="1.5" fill="currentColor"/>
      </svg>
      {/* Wordmark */}
      <span style={{
        fontFamily: 'var(--font-sans, system-ui)',
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'inherit',
      }}>
        Scale<span style={{ color: 'var(--accent)' }}>Site</span>
      </span>
    </span>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const flip = (e: any) => { e.preventDefault(); setLang(lang === 'de' ? 'en' : 'de') }

  return (
    <>
      <div className="hdr-top">
        <div className="container inner">
          <span>{t('topStrip.l')}</span>
          <span>{t('topStrip.m')}</span>
          <button
            className="lang-inline"
            onClick={flip}
            aria-label={lang === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', display: 'inline-flex', alignItems: 'center' }}
          >
            <span className={lang === 'de' ? 'active' : ''}>DE</span>
            <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>
      </div>
      <header className={"hdr" + (scrolled ? " scrolled" : "")}>
        <div className="container hdr-inner">
          <a href="#" className="hdr-logo">
            <ScaleSiteLogo />
          </a>
          <nav>
            <a href="#leistungen">{t('nav.leistungen')}</a>
            <a href="#ablauf">{t('nav.ablauf')}</a>
            <a href="#beispiele">{t('nav.beispiele')}</a>
            <a href="#preise">{t('nav.preise')}</a>
            <a href="#faq">{t('nav.faq')}</a>
          </nav>
          <div className="hdr-cta">
            <a href="#" className="hdr-login" style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ink-2)',
              textDecoration: 'none',
              padding: '0 4px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink-1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}
            >
              {t('nav.login')}
            </a>
            <button
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Dunkelmodus aktivieren' : 'Hellmodus aktivieren'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <IconMoon/> : <IconSun/>}
            </button>
            <a href="#kontakt" className="btn btn--primary" style={{ height: 40, padding: '0 18px', fontSize: 14 }}>
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
