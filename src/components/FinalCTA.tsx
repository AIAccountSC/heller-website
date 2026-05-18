'use client'
// @ts-nocheck
import React, { useRef, useEffect } from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconArrowRight } from '@/components/Icons'

export default function FinalCTA() {
  const { t } = useLang()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: any) => {
      const r = (el as HTMLElement).getBoundingClientRect()
      const mx = ((e.clientX - r.left) / r.width) * 100
      const my = ((e.clientY - r.top)  / r.height) * 100
      ;(el as HTMLElement).style.setProperty('--mx', mx + '%')
      ;(el as HTMLElement).style.setProperty('--my', my + '%')
    }
    (el as HTMLElement).addEventListener('mousemove', handler)
    return () => (el as HTMLElement).removeEventListener('mousemove', handler)
  }, [])

  return (
    <section className="final-cta-section" id="kontakt">
      <div className="container">
        <div className="final-cta" data-reveal ref={ref}>
          <div className="section-mark center" style={{ marginBottom: 16 }}>
            <span className="num" style={{ background: 'var(--accent)' }}>15</span>
            <span style={{ color: 'var(--accent-line)' }}>{t('cta.mark')}</span>
          </div>
          <h2 style={{ marginTop: 0 }}>{renderText(t('cta.title'))}</h2>
          <p>{t('cta.body')}</p>
          <div className="ctas">
            <a href="#" className="btn btn--primary">
              {t('cta.primary')}
              <IconArrowRight size={16}/>
            </a>
            <a href="#beispiele" className="btn btn--ghost">{t('cta.secondary')}</a>
          </div>
          <p className="micro">{t('cta.micro')}</p>
        </div>
      </div>
    </section>
  )
}
