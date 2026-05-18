'use client'
// @ts-nocheck
import React from 'react'
import { useLang } from '@/lib/app-state'

export default function Footer() {
  const { t } = useLang()
  const colA = t('footer.colALinks') || []
  const colB = t('footer.colBLinks') || []
  const colC = t('footer.colCLinks') || []
  const legal = t('footer.legal') || []
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#" className="hdr-logo" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', color:'inherit' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="0"  y="11" width="4" height="9"  rx="1.5" fill="currentColor" opacity="0.32"/>
                <rect x="8"  y="5"  width="4" height="15" rx="1.5" fill="currentColor" opacity="0.62"/>
                <rect x="16" y="0"  width="4" height="20" rx="1.5" fill="currentColor"/>
              </svg>
              <span style={{ fontFamily:'var(--font-sans,system-ui,sans-serif)', fontWeight:600, fontSize:15, letterSpacing:'-0.025em' }}>
                Scale<span style={{ color:'var(--accent)' }}>Site</span>
              </span>
            </a>
            <p className="foot-tag">{t('footer.tag')}</p>
          </div>
          <div className="foot-col">
            <h4>{t('footer.colA')}</h4>
            <ul>{colA.map(([label, href]: [string, string], i: number) => <li key={i}><a href={href}>{label}</a></li>)}</ul>
          </div>
          <div className="foot-col">
            <h4>{t('footer.colB')}</h4>
            <ul>{colB.map(([label, href]: [string, string], i: number) => <li key={i}><a href={href}>{label}</a></li>)}</ul>
          </div>
          <div className="foot-col">
            <h4>{t('footer.colC')}</h4>
            <ul>{colC.map(([label, href]: [string, string], i: number) => <li key={i}><a href={href}>{label}</a></li>)}</ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t('footer.copyright')}</span>
          <div className="legal">
            {legal.map(([label, href]: [string, string], i: number) => <a key={i} href={href}>{label}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
