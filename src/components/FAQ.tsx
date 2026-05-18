'use client'
// @ts-nocheck
import React, { useState } from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconChevDown } from '@/components/Icons'

export default function FAQ() {
  const { t } = useLang()
  const items = t('faq.items') || []
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="sec-head" data-reveal style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', alignItems: 'center' }}>
          <div className="section-mark center">
            <span className="num">14</span>
            <span>{t('faq.mark')}</span>
          </div>
          <h2>{renderText(t('faq.title'))}</h2>
        </div>
        <div className="faq-list" data-reveal>
          {items.map((item: any, i: number) => (
            <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
              <button
                id={`faq-q-${i}`}
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{item.q}</span>
                <span className="chev"><IconChevDown size={20}/></span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className="faq-a"
                role="region"
                aria-labelledby={`faq-q-${i}`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
