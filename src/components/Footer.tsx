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
            <a href="#" className="hdr-logo"><img src="/logo.svg" alt="Heller" height="28"/></a>
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
