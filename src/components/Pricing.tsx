'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconCheck } from '@/components/Icons'

export default function Pricing() {
  const { t, lang } = useLang()
  const cards = t('pricing.cards') || []
  return (
    <section className="section pricing-section" id="preise">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">13</span>
            <span>{t('pricing.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('pricing.title'))}</h2>
          <p className="lead">{t('pricing.lead')}</p>
        </div>
        <div className="pricing-grid">
          {cards.map((c: any, i: number) => (
            <div className={"price-card" + (i === 1 ? " featured" : "")} key={i} data-reveal data-reveal-delay={i + 1}>
              <span className="ptag">
                {c.pop && <span className="pop">{c.pop}</span>}
                {c.tag}
              </span>
              <h3>{c.name}</h3>
              <div className="price">{c.price} <small>{i === 2 ? '' : '€'}</small></div>
              <div className="unit">{c.unit}</div>
              <ul>
                {c.features.map((f: string, j: number) => (
                  <li key={j}><IconCheck size={16}/>{f}</li>
                ))}
              </ul>
              <a href="#kontakt" className={i === 1 ? "btn btn--primary" : "btn btn--ghost"} style={i === 1 ? { background: 'var(--accent)' } : {}}>
                {c.cta}
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'var(--muted-2)' }}>
          {t('pricing.footnote')}
        </p>
      </div>
    </section>
  )
}
