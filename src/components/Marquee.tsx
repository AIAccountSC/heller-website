'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'

export default function Marquee() {
  const { t } = useLang()
  const items = t('marquee') || []
  const all = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {all.map((item: any, i: number) => (
          <React.Fragment key={i}>
            <span>{typeof item === 'string' ? renderText(item) : item}</span>
            <span className="sep" key={"s"+i}>/</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
