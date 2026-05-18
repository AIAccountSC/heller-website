'use client'
// @ts-nocheck
import React from 'react'
import { useLang } from '@/lib/app-state'

export default function TrustBar() {
  const { t } = useLang()
  const items = t('trust') || []
  return (
    <section className="trust-bar">
      <div className="container inner" data-reveal>
        {items.map((line: string, i: number) => (
          <React.Fragment key={i}>
            <span className="item">{line}</span>
            {i < items.length - 1 && <span className="sep"></span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
