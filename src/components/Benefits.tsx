'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconShield, IconTrend, IconCompass, IconMonitor, IconLayers, IconScale } from '@/components/Icons'

export default function Benefits() {
  const { t } = useLang()
  const cards = t('benefits.cards') || []
  const icons = [<IconShield/>, <IconTrend/>, <IconCompass/>, <IconMonitor/>, <IconLayers/>, <IconScale/>]
  return (
    <section className="section benefits-section" id="leistungen">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">06</span>
            <span>{t('benefits.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('benefits.title'))}</h2>
          <p className="lead">{t('benefits.lead')}</p>
        </div>
        <div className="benefits-grid">
          {cards.map((b: any, i: number) => (
            <div className="benefit-card" key={i} data-reveal data-reveal-delay={(i % 3) + 1}>
              <div className="benefit-icon">{icons[i]}</div>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
