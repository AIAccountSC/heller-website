'use client'
// @ts-nocheck
import React from 'react'
import { useLang, AnimatedCount } from '@/lib/app-state'

export default function Testimonials() {
  const { lang } = useLang()

  const items = lang === 'de' ? [
    {
      quote: "Endlich eine Website, die nicht nach Baukasten aussieht. Wir bekommen seit dem Launch deutlich mehr ernsthafte Anfragen — und unsere Beratungen starten auf einem höheren Niveau.",
      name: "Markus Müller", role: "Inhaber", company: "Tischlerei Müller · Berlin",
      stat: "+62 %", statL: "Anfragen via Website",
      tone: "linear-gradient(160deg, #8B6F47 0%, #5C4327 100%)",
    },
    {
      quote: "Der Auftritt wirkt seriös, ohne kühl zu sein. Patientinnen sagen uns, sie hätten sich gleich gut aufgehoben gefühlt — bevor sie überhaupt in der Praxis waren.",
      name: "Dr. Anna Sommer", role: "Praxisinhaberin", company: "Zahnarztpraxis · München",
      stat: "4,9 ★", statL: "Google-Bewertungen",
      tone: "linear-gradient(160deg, #C9B89A 0%, #8A7656 100%)",
    },
    {
      quote: "Klares Briefing, klare Termine, klares Ergebnis. Es war das erste Web-Projekt in meiner Laufbahn, das tatsächlich pünktlich live ging — und besser aussieht als die Vorschau.",
      name: "Jonas Weiss", role: "Geschäftsführer", company: "Kanzlei Weiss · Frankfurt",
      stat: "5 Wo.", statL: "vom Briefing bis Launch",
      tone: "linear-gradient(160deg, #4A4538 0%, #2A2620 100%)",
    },
  ] : [
    {
      quote: "Finally a website that doesn't look like a template kit. Since launch we get noticeably more serious inquiries — and our first conversations start at a higher level.",
      name: "Markus Müller", role: "Owner", company: "Tischlerei Müller · Berlin",
      stat: "+62%", statL: "inquiries via website",
      tone: "linear-gradient(160deg, #8B6F47 0%, #5C4327 100%)",
    },
    {
      quote: "It feels serious without being cold. Patients tell us they felt at ease before they even came in for the first time.",
      name: "Dr. Anna Sommer", role: "Practice owner", company: "Dental practice · Munich",
      stat: "4.9 ★", statL: "Google reviews",
      tone: "linear-gradient(160deg, #C9B89A 0%, #8A7656 100%)",
    },
    {
      quote: "Clear brief, clear timing, clear result. The first web project in my career that went live on time — and looks better than the preview.",
      name: "Jonas Weiss", role: "Managing director", company: "Kanzlei Weiss · Frankfurt",
      stat: "5 wks", statL: "brief to launch",
      tone: "linear-gradient(160deg, #4A4538 0%, #2A2620 100%)",
    },
  ]

  const mark = lang === 'de' ? "Kundenstimmen" : "Customer voices"
  const title = lang === 'de'
    ? <>Was Inhaber sagen, nachdem die <span className="serif">neue</span> Website live ist.</>
    : <>What owners say after the <span className="serif">new</span> website goes live.</>
  const lead = lang === 'de'
    ? "Drei kurze Stimmen aus unterschiedlichen Branchen — was hat sich verändert, was ist gleich geblieben?"
    : "Three short voices from different sectors — what changed, what stayed the same?"

  return (
    <section className="section testimonials-section" id="stimmen">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">12</span>
            <span>{mark}</span>
            <span className="rule"></span>
          </div>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
        </div>

        <div className="testimonials-grid">
          {items.map((it: any, i: number) => (
            <article className="tm-card" key={i} data-reveal data-reveal-delay={i + 1}>
              <div className="tm-avatar" style={{ background: it.tone }}></div>
              <blockquote className="tm-quote">"{it.quote}"</blockquote>
              <div className="tm-meta">
                <div>
                  <div className="tm-name">{it.name}</div>
                  <div className="tm-role">{it.role} · {it.company}</div>
                </div>
              </div>
              <div className="tm-result">
                <span className="tm-result-v"><AnimatedCount target={it.stat}/></span>
                <span className="tm-result-l">{it.statL}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
