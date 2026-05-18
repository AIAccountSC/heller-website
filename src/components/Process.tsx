'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'

export default function Process() {
  const { t } = useLang()
  const steps = t('process.steps') || []
  return (
    <section className="section" id="ablauf">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">09</span>
            <span>{t('process.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('process.title'))}</h2>
          <p className="lead">{t('process.lead')}</p>
        </div>
        <div className="process-list">
          {steps.map((s: any, i: number) => (
            <div className="process-step" key={i} data-reveal data-reveal-delay={i + 1}>
              <div className="process-num">{String(i + 1).padStart(2,'0')}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
