'use client'
// @ts-nocheck
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useLang, renderText } from '@/lib/app-state'

export default function BeforeAfter() {
  const { t } = useLang()
  const stageRef = useRef(null)
  const [clip, setClip] = useState(50)
  const draggingRef = useRef(false)
  const animatedRef = useRef(false)

  const setFromPointer = useCallback((e: any) => {
    const el = stageRef.current
    if (!el) return
    const r = (el as HTMLElement).getBoundingClientRect()
    const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - r.left
    const pct = Math.max(0, Math.min(100, (x / r.width) * 100))
    setClip(pct)
  }, [])

  useEffect(() => {
    const onMove = (e: any) => { if (draggingRef.current) setFromPointer(e) }
    const onUp = () => { draggingRef.current = false; document.body.style.userSelect = '' }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [setFromPointer])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          const timings: [number, number][] = [[18, 700], [82, 1500], [50, 2400]]
          timings.forEach(([pct, t]) => setTimeout(() => setClip(pct), t))
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onDown = (e: any) => {
    draggingRef.current = true
    document.body.style.userSelect = 'none'
    setFromPointer(e)
  }

  return (
    <section className="section ba-section ba-v4" id="vergleich">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">04</span>
            <span>{t('ba.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('ba.title'))}</h2>
          <p className="lead">{t('ba.lead')}</p>
        </div>
        <div className="ba-stage-wrap" data-reveal>
          <div className="ba-stage" ref={stageRef} style={{ '--clip': clip + '%' } as React.CSSProperties} onPointerDown={onDown}>

            {/* ============ BEFORE — 1990s table-layout site ============ */}
            <div className="layer before">
              <div className="ba-old">
                <div className="ba-old-tb">
                  <span className="ba-old-tb-btn">◀ Zurück</span>
                  <span className="ba-old-tb-btn">▶ Vor</span>
                  <span className="ba-old-tb-btn">↻ Aktualisieren</span>
                  <span className="ba-old-tb-btn">⌂ Startseite</span>
                  <span className="ba-old-tb-url">http://www.tischlerei-mueller.de/index.html</span>
                </div>

                <div className="ba-old-page">
                  <div className="ba-old-marquee">
                    ★ ★ ★ HERZLICH WILLKOMMEN bei TISCHLEREI MÜLLER · seit 1973 · NEU: jetzt mit eMail Kontakt! ★ ★ ★
                  </div>

                  <table className="ba-old-frame" cellPadding={0} cellSpacing={0}>
                    <tbody>
                      <tr>
                        <td className="ba-old-side">
                          <div className="ba-old-side-h">★ NAVIGATION ★</div>
                          <ul className="ba-old-nav">
                            <li>► Startseite</li>
                            <li>► Über uns</li>
                            <li>► Galerie</li>
                            <li>► Preise</li>
                            <li>► Kontakt</li>
                            <li>► Gästebuch</li>
                            <li>► Links</li>
                            <li>► Impressum</li>
                          </ul>
                          <div className="ba-old-counter">
                            <div className="ba-old-counter-lbl">Besucher-Zähler</div>
                            <div className="ba-old-counter-num">000142</div>
                          </div>
                          <div className="ba-old-stamp">
                            <div className="ba-old-stamp-l">Mitglied bei:</div>
                            <div className="ba-old-stamp-row">
                              <span className="ba-old-stamp-chip">HWK</span>
                              <span className="ba-old-stamp-chip">IHK</span>
                            </div>
                          </div>
                          <div className="ba-old-flag">🇩🇪 Deutsch · 🇬🇧 English</div>
                        </td>

                        <td className="ba-old-main">
                          <h1 className="ba-old-h1">Willkommen bei der Tischlerei Müller!!!</h1>
                          <p className="ba-old-p">Wir sind die <b>Tischlerei Müller</b> aus Berlin-Kreuzberg und beschäftigen uns seit 1973 mit dem Bau hochwertiger Möbel und Reparaturen. Rufen Sie uns gerne an unter <u>030 / 12 34 56 78</u> oder schreiben Sie uns eine eMail an <u>info@tischlerei-mueller.de</u>.</p>

                          <div className="ba-old-img">
                            <span className="ba-old-img-tag">[IMG]</span>
                            <span className="ba-old-img-cap">— Unsere Werkstatt in Kreuzberg —</span>
                          </div>

                          <p className="ba-old-p"><b>UNSERE LEISTUNGEN:</b></p>
                          <ul className="ba-old-list">
                            <li>Möbel nach Maß (Esstische, Schränke, etc.)</li>
                            <li>Reparaturen aller Art</li>
                            <li>Innenausbau und Renovierung</li>
                            <li>Restauration alter Möbel</li>
                          </ul>

                          <div className="ba-old-spacer"></div>

                          <p className="ba-old-p"><b><span style={{color: '#C0392B'}}>NEU: </span></b>Wir haben jetzt auch eine eigene Galerie mit Bildern unserer Projekte!</p>

                          <div className="ba-old-btnrow">
                            <span className="ba-old-btn">► HIER KLICKEN für die Galerie</span>
                            <span className="ba-old-btn">► HIER KLICKEN für Kontakt</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="ba-old-foot">
                    <span>© 2003 Tischlerei Müller · Last updated: 14.03.2003</span>
                    <span>Best viewed with Internet Explorer 6 at 800×600 · Powered by FrontPage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ AFTER — Modern premium hero ============ */}
            <div className="layer after">
              <div className="ba-new">
                <header className="ba-new-nav">
                  <div className="ba-new-lg"><span className="ba-new-mark">M</span>Tischlerei Müller</div>
                  <nav className="ba-new-links">
                    <span className="active">Leistungen</span>
                    <span>Projekte</span>
                    <span>Werkstatt</span>
                    <span>Über uns</span>
                    <span>Kontakt</span>
                  </nav>
                  <div className="ba-new-nav-end">
                    <span className="ba-new-lang">DE / EN</span>
                    <span className="ba-new-cta">Termin anfragen →</span>
                  </div>
                </header>

                <div className="ba-new-hero">
                  <div className="ba-new-left">
                    <div className="ba-new-eyebrow">
                      <span className="ba-new-dot"></span>
                      Tischlerei aus Berlin · Meisterbetrieb seit 1973
                    </div>
                    <h1 className="ba-new-h1">
                      Handwerk aus <span className="ba-new-italic">Berlin</span>—<br/>
                      seit drei Generationen.
                    </h1>
                    <p className="ba-new-lead">
                      Maßgefertigte Möbel, Innenausbau und Reparaturen. Von der ersten Skizze bis zur Montage in Ihren Räumen — alles aus einer Hand.
                    </p>
                    <div className="ba-new-ctas">
                      <span className="ba-new-btn ba-new-btn-p">Termin anfragen <span className="ba-new-arr">→</span></span>
                      <span className="ba-new-btn ba-new-btn-g">Werkstatt besichtigen</span>
                    </div>
                    <div className="ba-new-trust">
                      <span className="ba-new-trust-i">
                        <span className="ba-new-stars">★★★★★</span>
                        <span><strong>4,9</strong> · 142 Google-Bewertungen</span>
                      </span>
                      <span className="ba-new-trust-sep"></span>
                      <span className="ba-new-trust-i">
                        <span className="ba-new-flag">🇩🇪</span>Meisterbetrieb · Berlin
                      </span>
                      <span className="ba-new-trust-sep"></span>
                      <span className="ba-new-trust-i">
                        <span className="ba-new-since">Seit 1973</span>
                      </span>
                    </div>
                  </div>

                  <div className="ba-new-right">
                    <div className="ba-new-photo">
                      <div className="ba-new-photo-overlay"></div>
                      <div className="ba-new-photo-grain"></div>
                      <span className="ba-new-photo-corner">Aktuelles Projekt · 03 / 12</span>
                      <div className="ba-new-photo-info">
                        <span className="ba-new-photo-l">In Werkstatt · Berlin Mitte</span>
                        <span className="ba-new-photo-v">
                          Eichen-Esstisch
                          <span className="ba-new-photo-em">— maßgefertigt für Familie K.</span>
                        </span>
                        <div className="ba-new-photo-meta">
                          <span><strong>180 × 90 cm</strong> · Massive Eiche</span>
                          <span className="ba-new-photo-sep"></span>
                          <span>Fertigstellung Juni</span>
                        </div>
                      </div>
                    </div>

                    <div className="ba-new-float">
                      <div className="ba-new-float-h">
                        <span className="ba-new-float-icon">↗</span>
                        Nächster freier Termin
                      </div>
                      <div className="ba-new-float-v">Mi · 22. Mai · 14:00</div>
                      <div className="ba-new-float-sub">Werkstatt-Beratung · 45 min</div>
                      <div className="ba-new-float-cta">Termin sichern →</div>
                    </div>
                  </div>
                </div>

                <div className="ba-new-services">
                  <div className="ba-new-svc">
                    <span className="ba-new-svc-n">01</span>
                    <div>
                      <div className="ba-new-svc-h">Möbel nach Maß</div>
                      <div className="ba-new-svc-p">Esstische, Schränke, Küchen — geplant und gebaut in Berlin.</div>
                    </div>
                    <span className="ba-new-svc-arr">↗</span>
                  </div>
                  <div className="ba-new-svc">
                    <span className="ba-new-svc-n">02</span>
                    <div>
                      <div className="ba-new-svc-h">Innenausbau</div>
                      <div className="ba-new-svc-p">Einbauschränke, Raumteiler und komplette Wohnkonzepte.</div>
                    </div>
                    <span className="ba-new-svc-arr">↗</span>
                  </div>
                  <div className="ba-new-svc">
                    <span className="ba-new-svc-n">03</span>
                    <div>
                      <div className="ba-new-svc-h">Reparaturen</div>
                      <div className="ba-new-svc-p">Restauration für Erbstücke und Antikes — von Hand.</div>
                    </div>
                    <span className="ba-new-svc-arr">↗</span>
                  </div>
                </div>
              </div>
            </div>

            <span className="pin before">{t('ba.before')}</span>
            <span className="pin after">{t('ba.after')}</span>
            <div className="ba-handle"><span className="arrows">‹›</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
