'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconArrowRight } from '@/components/Icons'

export default function Portfolio() {
  const { t } = useLang()
  const cards = t('portfolio.cards') || []
  const tones = [
    "linear-gradient(160deg, #8B6F47 0%, #5C4327 100%)",
    "linear-gradient(160deg, #C9B89A 0%, #8A7656 100%)",
    "linear-gradient(160deg, #6B7A5A 0%, #3F4A35 100%)",
    "linear-gradient(160deg, #4A4538 0%, #2A2620 100%)",
    "linear-gradient(160deg, #B89571 0%, #8B6B45 100%)",
    "linear-gradient(160deg, #A88B6E 0%, #6B5238 100%)",
  ]

  const renderCard = (c: any, i: number, suffix: string) => (
    <article className="port-card" key={`${i}-${suffix}`} aria-hidden={suffix === 'dup' ? true : undefined}>
      <div className="port-img" style={{ background: tones[i % tones.length] }}>
        <div className="mock">
          <span className="b title"></span>
          <span className="b"></span>
          <span className="b short"></span>
        </div>
      </div>
      <div className="port-meta">
        <div>
          <h3>{c.name}</h3>
          <span className="tag">{c.tag}</span>
        </div>
        <span className="arrow"><IconArrowRight size={18}/></span>
      </div>
    </article>
  )

  return (
    <section className="section portfolio-section portfolio-v4" id="referenzen">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">11</span>
            <span>{t('portfolio.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('portfolio.title'))}</h2>
          <p className="lead">{t('portfolio.lead')}</p>
        </div>
      </div>
      <div className="port-marquee" data-reveal>
        <div className="port-marquee-track">
          {cards.map((c: any, i: number) => renderCard(c, i, 'a'))}
          {cards.map((c: any, i: number) => renderCard(c, i, 'dup'))}
        </div>
        <div className="port-marquee-fade port-marquee-fade-l"></div>
        <div className="port-marquee-fade port-marquee-fade-r"></div>
      </div>
    </section>
  )
}
