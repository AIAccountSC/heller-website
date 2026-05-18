'use client'
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useTheme, useLang, IconSun, IconMoon } from '@/lib/app-state'

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
          <span className="lang-inline" onClick={flip} style={{ cursor: 'pointer' }}>
            <span className={lang === 'de' ? 'active' : ''}>DE</span>
            <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </span>
        </div>
      </div>
      <header className={"hdr" + (scrolled ? " scrolled" : "")}>
        <div className="container hdr-inner">
          <a href="#" className="hdr-logo">
            <img src="/logo.svg" alt="Heller" height="28"/>
          </a>
          <nav>
            <a href="#leistungen">{t('nav.leistungen')}</a>
            <a href="#ablauf">{t('nav.ablauf')}</a>
            <a href="#beispiele">{t('nav.beispiele')}</a>
            <a href="#preise">{t('nav.preise')}</a>
            <a href="#faq">{t('nav.faq')}</a>
          </nav>
          <div className="hdr-cta">
            <button
              className="theme-toggle"
              aria-label="Toggle theme"
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
