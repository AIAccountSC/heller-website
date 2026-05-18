'use client'
// @ts-nocheck
import React, { useRef, useEffect } from 'react'
import { useLang } from '@/lib/app-state'
import { IconCheck } from '@/components/Icons'

export default function Comparison() {
  const { lang } = useLang()
  const ref = useRef(null)

  const rows = lang === 'de' ? [
    { label: "Kosten",          h: { v: "Klarer Festpreis 3.000–5.000 €", s: 100 }, a: { v: "10.000–25.000 € + offen", s: 35 }, f: { v: "Schwankend", s: 55 }, d: { v: "Zeit statt Geld", s: 25 } },
    { label: "Zeit bis Launch", h: { v: "4–6 Wochen", s: 100 },                       a: { v: "8–14 Wochen", s: 50 },           f: { v: "Stark abhängig", s: 40 }, d: { v: "Monate / nie fertig", s: 15 } },
    { label: "Qualität",        h: { v: "Premium, konstant", s: 100 },                a: { v: "Premium, teuer", s: 85 },        f: { v: "Sehr variabel", s: 45 }, d: { v: "Vom Können abhängig", s: 30 } },
    { label: "Strategie",       h: { v: "Inklusive", s: 100 },                        a: { v: "Extra Workshop", s: 60 },        f: { v: "Selten dabei", s: 25 }, d: { v: "Eigenleistung", s: 20 } },
    { label: "Mobile-first",    h: { v: "Standard", s: 100 },                         a: { v: "Standard", s: 90 },              f: { v: "Manchmal", s: 50 }, d: { v: "Selten", s: 25 } },
    { label: "Recht & DSGVO",   h: { v: "Mitgedacht", s: 100 },                       a: { v: "Mitgedacht", s: 90 },            f: { v: "Off topic", s: 25 }, d: { v: "Hohes Risiko", s: 15 } },
    { label: "Pflege",          h: { v: "Optional 300–800 € / Mt.", s: 100 },         a: { v: "Nach Stunden", s: 45 },          f: { v: "Schwer planbar", s: 35 }, d: { v: "Eigenleistung", s: 20 } },
  ] : [
    { label: "Cost",           h: { v: "Clear fixed price €3,000–5,000", s: 100 }, a: { v: "€10,000–25,000+ open", s: 35 }, f: { v: "Variable", s: 55 }, d: { v: "Time, not money", s: 25 } },
    { label: "Time to launch", h: { v: "4–6 weeks", s: 100 },                       a: { v: "8–14 weeks", s: 50 },           f: { v: "Heavily depends", s: 40 }, d: { v: "Months / never done", s: 15 } },
    { label: "Quality",        h: { v: "Premium, consistent", s: 100 },             a: { v: "Premium but expensive", s: 85 }, f: { v: "Highly variable", s: 45 }, d: { v: "Depends on you", s: 30 } },
    { label: "Strategy",       h: { v: "Included", s: 100 },                        a: { v: "Extra workshop", s: 60 },       f: { v: "Rarely included", s: 25 }, d: { v: "Your own work", s: 20 } },
    { label: "Mobile-first",   h: { v: "Standard", s: 100 },                        a: { v: "Standard", s: 90 },             f: { v: "Sometimes", s: 50 }, d: { v: "Rarely", s: 25 } },
    { label: "Legal & GDPR",   h: { v: "Accounted for", s: 100 },                   a: { v: "Accounted for", s: 90 },        f: { v: "Off topic", s: 25 }, d: { v: "High risk", s: 15 } },
    { label: "Maintenance",    h: { v: "Optional €300–800 / mo", s: 100 },          a: { v: "Hourly, expensive", s: 45 },    f: { v: "Hard to plan", s: 35 }, d: { v: "Your own work", s: 20 } },
  ]

  const mark   = lang === 'de' ? "Heller im Vergleich" : "Heller in context"
  const title  = lang === 'de' ? "Agentur, Freelancer oder selbst machen? " : "Agency, freelancer or DIY? "
  const titleAccent = lang === 'de' ? "Heller liegt dazwischen." : "Heller sits between."
  const lead   = lang === 'de'
    ? "Vergleichen Sie sieben Kriterien — bei jedem führt Heller mit klarem Vorsprung."
    : "Compare seven criteria — Heller leads on every one with a clear margin."

  const heads = lang === 'de'
    ? { h: "Heller", a: "Agentur", f: "Freelancer", d: "Selbst gemacht" }
    : { h: "Heller", a: "Agency",  f: "Freelancer", d: "DIY" }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e: any) => {
        if (e.isIntersecting) {
          (el as HTMLElement).classList.add('is-in')
          io.disconnect()
        }
      })
    }, { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section comparison-section cmp-v4" id="vergleich-tabelle">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">07</span>
            <span>{mark}</span>
            <span className="rule"></span>
          </div>
          <h2>{title}<span className="serif">{titleAccent}</span></h2>
          <p className="lead">{lead}</p>
        </div>

        <div className="cmp-board" ref={ref} data-reveal>
          <div className="cmp-head">
            <div className="cmp-head-cell cmp-head-cell--label"></div>
            <div className="cmp-head-cell cmp-head-cell--featured">
              <span className="cmp-head-name">{heads.h}</span>
              <span className="cmp-head-pill">{lang === 'de' ? "Empfohlen" : "Recommended"}</span>
            </div>
            <div className="cmp-head-cell"><span className="cmp-head-name">{heads.a}</span></div>
            <div className="cmp-head-cell"><span className="cmp-head-name">{heads.f}</span></div>
            <div className="cmp-head-cell"><span className="cmp-head-name">{heads.d}</span></div>
          </div>

          {rows.map((r: any, i: number) => (
            <div className="cmp-row" key={i} style={{ '--row-i': i } as React.CSSProperties}>
              <div className="cmp-cell cmp-cell--label">{r.label}</div>

              <div className="cmp-cell cmp-cell--featured">
                <span className="cmp-check"><IconCheck size={12}/></span>
                <span className="cmp-text">{r.h.v}</span>
                <span className="cmp-bar"><span className="cmp-bar-fill" style={{ '--w': r.h.s + '%' } as React.CSSProperties}></span></span>
              </div>

              <div className="cmp-cell">
                <span className="cmp-text">{r.a.v}</span>
                <span className="cmp-bar"><span className="cmp-bar-fill cmp-bar-fill--muted" style={{ '--w': r.a.s + '%' } as React.CSSProperties}></span></span>
              </div>

              <div className="cmp-cell">
                <span className="cmp-text">{r.f.v}</span>
                <span className="cmp-bar"><span className="cmp-bar-fill cmp-bar-fill--muted" style={{ '--w': r.f.s + '%' } as React.CSSProperties}></span></span>
              </div>

              <div className="cmp-cell">
                <span className="cmp-text">{r.d.v}</span>
                <span className="cmp-bar"><span className="cmp-bar-fill cmp-bar-fill--muted" style={{ '--w': r.d.s + '%' } as React.CSSProperties}></span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
