'use client'
// @ts-nocheck
import React, { useRef, useEffect } from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconArrowRight } from '@/components/Icons'

export default function Hero() {
  const { t } = useLang()

  const gridRef = useRef(null)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll('.hg-card')
    const handler = (e: any) => {
      cards.forEach((card: any) => {
        const r = card.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = (e.clientX - cx) / r.width
        const dy = (e.clientY - cy) / r.height
        const tx = Math.max(-1, Math.min(1, dx)) * 4
        const ty = -Math.max(-1, Math.min(1, dy)) * 4
        card.style.setProperty('--tx', tx.toFixed(2))
        card.style.setProperty('--ty', ty.toFixed(2))
      })
    }
    const reset = () => {
      cards.forEach((card: any) => {
        card.style.removeProperty('--tx')
        card.style.removeProperty('--ty')
      })
    }
    grid.addEventListener('mousemove', handler)
    grid.addEventListener('mouseleave', reset)
    return () => {
      grid.removeEventListener('mousemove', handler)
      grid.removeEventListener('mouseleave', reset)
    }
  }, [])

  const samples = [
    { ind: "Handwerk",   name: "Tischlerei Müller", h: "Handwerk aus Berlin", tone: "warm",  bg: "linear-gradient(160deg, #8B6F47 0%, #5C4327 100%)" },
    { ind: "Arztpraxis", name: "Praxis Dr. Sommer",  h: "Zahnmedizin München", tone: "blue",  bg: "linear-gradient(160deg, #C9B89A 0%, #8A7656 100%)" },
    { ind: "Yoga",       name: "Studio Lichtraum",   h: "Atem · Bewegung",     tone: "sage",  bg: "linear-gradient(160deg, #6B7A5A 0%, #3F4A35 100%)" },
    { ind: "Kanzlei",    name: "Kanzlei Weiss",      h: "Wirtschaftsrecht",    tone: "dark",  bg: "linear-gradient(160deg, #4A4538 0%, #2A2620 100%)" },
    { ind: "Gastro",     name: "Café Salbei",        h: "Kuchen & Kaffee",     tone: "cream", bg: "linear-gradient(160deg, #B89571 0%, #8B6B45 100%)" },
    { ind: "Beauty",     name: "Friseur Kontur",     h: "Schnitt & Stil",      tone: "rose",  bg: "linear-gradient(160deg, #A88B6E 0%, #6B5238 100%)" },
  ]

  return (
    <section className="hero hero-v2" id="top">
      <div className="container">
        <div className="hero-head" data-reveal>
          <div className="section-mark">
            <span className="num">01</span>
            <span>{t('hero.mark')}</span>
            <span className="rule"></span>
          </div>

          <h1 className="hero-title">
            {renderText(t('hero.title'))}
          </h1>

          <p className="lead">{t('hero.lead')}</p>

          <div className="hero-ctas">
            <a href="#kontakt" className="btn btn--primary">
              {t('hero.primary')}
              <IconArrowRight size={16}/>
            </a>
            <a href="#beispiele" className="btn btn--ghost">{t('hero.secondary')}</a>
          </div>

          <div className="annotated-stats">
            <span className="sup">¹</span>
            <div>
              <div className="v">{t('hero.stat1v')}</div>
              <div className="l">{t('hero.stat1l')}</div>
            </div>
            <span className="sup">²</span>
            <div>
              <div className="v">{t('hero.stat2v')}</div>
              <div className="l">{t('hero.stat2l')}</div>
            </div>
            <span className="sup">³</span>
            <div>
              <div className="v">{t('hero.stat3v')}</div>
              <div className="l">{t('hero.stat3l')}</div>
            </div>
          </div>
        </div>

        <div className="hero-grid-v2" data-reveal ref={gridRef}>
          {samples.map((s, i) => (
            <article className="hg-card" key={i} data-reveal-delay={(i % 3) + 1}>
              <div className="hg-browser">
                <div className="browser-bar">
                  <span className="d"></span><span className="d"></span><span className="d"></span>
                  <span className="u">{s.name.toLowerCase().replace(/\s+/g,'-')}.de</span>
                </div>
                <div className="hg-content" style={{ background: s.bg }}>
                  <div className="hg-overlay">
                    <div className="hg-lg">
                      <span className="sq"></span>{s.name}
                    </div>
                    <div className="hg-h">{s.h}</div>
                    <span className="hg-btn">Termin →</span>
                  </div>
                </div>
              </div>
              <div className="hg-meta">
                <span className="hg-ind">{s.ind}</span>
                <IconArrowRight size={14}/>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
