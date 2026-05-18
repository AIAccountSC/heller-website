'use client'
// @ts-nocheck
import React from 'react'
import { useLang, AnimatedCount } from '@/lib/app-state'

export default function BigNumbers() {
  const { t, lang } = useLang()

  const stats = lang === 'de' ? [
    { v: "100+",   l: "Premium-Konzepte",    sub: "Quer durch lokale Branchen" },
    { v: "4–6",    l: "Wochen bis Launch",   sub: "Klar getaktet, ohne Wartezeit" },
    { v: "200+ h", l: "Designarbeit / Projekt", sub: "Strategie, Design, Umsetzung" },
    { v: "4,9 ★",  l: "Kundenbewertung",     sub: "Auf Google und Provenexpert" },
  ] : [
    { v: "100+",  l: "Premium concepts",        sub: "Across local sectors" },
    { v: "4–6",   l: "Weeks to launch",         sub: "Clearly scheduled, no waiting" },
    { v: "200+ h", l: "Design work / project",  sub: "Strategy, design, build" },
    { v: "4.9 ★", l: "Customer rating",         sub: "On Google and Provenexpert" },
  ]

  return (
    <section className="section big-numbers">
      <div className="container">
        <div className="big-numbers-grid">
          {stats.map((s: any, i: number) => (
            <div className="bn-cell" key={i} data-reveal data-reveal-delay={i + 1}>
              <div className="bn-v"><AnimatedCount target={s.v}/></div>
              <div className="bn-l">{s.l}</div>
              <div className="bn-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
