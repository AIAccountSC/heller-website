'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'

export default function Audience() {
  const { t } = useLang()
  const tiles = t('audience.tiles') || []
  const branche = t('audience.branche')
  const toneClasses = ['t1','t2','t3','t4','t5']
  return (
    <section className="section" id="zielgruppe">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">05</span>
            <span>{t('audience.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('audience.title'))}</h2>
        </div>
        <div className="audience-grid">
          {tiles.map((tile: any, i: number) => (
            <div className={"aud-tile " + toneClasses[i] + (i === 0 ? " big" : "")} key={i} data-reveal data-reveal-delay={(i % 3) + 1}>
              <span className="badge-tag">{i === 0 ? `${branche} · 01` : String(i + 1).padStart(2,'0')}</span>
              <div className="name">{tile.name}</div>
              <div className="sub">{tile.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
