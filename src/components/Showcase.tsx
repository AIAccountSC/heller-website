'use client'
// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'
import { useLang, renderText } from '@/lib/app-state'

export default function Showcase() {
  const { t } = useLang()
  const stops = t('showcase.stops') || []
  const sectionRef = useRef(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const stopEls = (root as HTMLElement).querySelectorAll('.stage-stop')
    const io = new IntersectionObserver((entries) => {
      let best: Element | null = null
      let bestRatio = 0
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > bestRatio) {
          best = e.target
          bestRatio = e.intersectionRatio
        }
      })
      if (best) {
        const idx = Number((best as HTMLElement).dataset.stop)
        setStage(idx)
        stopEls.forEach((s) => s.classList.toggle('active', s === best))
      }
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-30% 0px -30% 0px',
    })
    stopEls.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [stops.length])

  const stageLabel = stops[stage]?.label || ""

  return (
    <section className="section showcase showcase-v4" id="beispiele" ref={sectionRef} data-stage={stage}>
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="section-mark">
            <span className="num">08</span>
            <span>{t('showcase.mark')}</span>
            <span className="rule"></span>
          </div>
          <h2>{renderText(t('showcase.title'))}</h2>
          <p className="lead">{t('showcase.lead')}</p>
        </div>

        <div className="stage-track">
          <div className="stage-sticky">
            <div className="stage-rail" aria-hidden="true">
              {stops.map((_: any, i: number) => (
                <span key={i} className={"rail-dot" + (i === stage ? " active" : i < stage ? " done" : "")}></span>
              ))}
            </div>
            <div className="stage-frame">
              <div className="browser-bar">
                <span className="d"></span><span className="d"></span><span className="d"></span>
                <span className="u">tischlerei-mueller.de</span>
              </div>
              <span className="stage-pin">0{stage + 1} · {stageLabel}</span>

              <div className="stage-visual">
                {/* ============ S0 — OLD 1990s SITE ============ */}
                <div className="stage-layer s0">
                  <div className="s0-shell">
                    <div className="s0-toolbar">
                      <span className="s0-tb-btn">◀</span>
                      <span className="s0-tb-btn">▶</span>
                      <span className="s0-tb-btn">↻</span>
                      <span className="s0-tb-url">http://www.tischlerei-mueller.de/index.html</span>
                    </div>
                    <div className="s0-page">
                      <div className="s0-marquee">★ ★ ★ Willkommen bei Tischlerei Müller — Seit 1973 — Jetzt mit eMail Kontakt ★ ★ ★</div>
                      <table className="s0-table" cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td className="s0-side">
                              <div className="s0-side-h">Navigation</div>
                              <ul className="s0-nav">
                                <li>► Home</li>
                                <li>► Über uns</li>
                                <li>► Galerie</li>
                                <li>► Preise</li>
                                <li>► Kontakt</li>
                                <li>► Gästebuch</li>
                              </ul>
                              <div className="s0-counter">
                                Besucher:<br/>
                                <span className="s0-counter-num">000142</span>
                              </div>
                              <div className="s0-flag">🇩🇪 Deutsch</div>
                            </td>
                            <td className="s0-main">
                              <h1 className="s0-h1">Willkommen!!!</h1>
                              <p className="s0-p">Wir sind die Tischlerei Müller aus Berlin und machen Möbel und Reparaturen. Rufen Sie uns an unter <u>030 / 12 34 56 78</u> oder besuchen Sie uns in unserer Werkstatt.</p>
                              <div className="s0-img"></div>
                              <p className="s0-p"><b>Unsere Leistungen:</b></p>
                              <ul className="s0-list">
                                <li>Möbel nach Maß</li>
                                <li>Reparaturen aller Art</li>
                                <li>Innenausbau</li>
                              </ul>
                              <div className="s0-btnrow">
                                <span className="s0-btn">► Hier klicken</span>
                                <span className="s0-btn">► Mehr Infos</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="s0-foot">© 2003 Tischlerei Müller — Best viewed with Internet Explorer 6 at 800×600</div>
                    </div>
                  </div>
                </div>

                {/* ============ S1 — FIGMA-STYLE WIREFRAME ============ */}
                <div className="stage-layer s1">
                  <div className="s1-shell">
                    <div className="s1-grid-overlay" aria-hidden="true">
                      {Array.from({length: 12}).map((_, i) => <span key={i}></span>)}
                    </div>
                    <div className="s1-canvas">
                      <div className="s1-page">
                        <div className="s1-row s1-nav">
                          <div className="s1-block s1-logo"><span className="s1-tag">Logo</span></div>
                          <div className="s1-block-group">
                            <div className="s1-block s1-link"></div>
                            <div className="s1-block s1-link"></div>
                            <div className="s1-block s1-link"></div>
                            <div className="s1-block s1-link"></div>
                          </div>
                          <div className="s1-block s1-cta"><span className="s1-tag">CTA</span></div>
                        </div>

                        <div className="s1-hero">
                          <div className="s1-eyebrow"><span className="s1-tag">Eyebrow · 12px</span></div>
                          <div className="s1-block s1-h1"><span className="s1-tag">H1 · 56px / 1.05</span></div>
                          <div className="s1-block s1-sub"><span className="s1-tag">Lead · 19px</span></div>
                          <div className="s1-block-group s1-ctas">
                            <div className="s1-block s1-btn"><span className="s1-tag">Primary</span></div>
                            <div className="s1-block s1-btn s1-btn-g"><span className="s1-tag">Ghost</span></div>
                          </div>
                        </div>

                        <div className="s1-tiles">
                          <div className="s1-tile"><span className="s1-tag">Card 01</span><span className="s1-mark"></span></div>
                          <div className="s1-tile"><span className="s1-tag">Card 02</span><span className="s1-mark"></span></div>
                          <div className="s1-tile"><span className="s1-tag">Card 03</span><span className="s1-mark"></span></div>
                        </div>
                      </div>

                      <div className="s1-dim s1-dim-top">
                        <span className="s1-dim-line"></span>
                        <span className="s1-dim-label">1280 px</span>
                        <span className="s1-dim-line"></span>
                      </div>
                      <div className="s1-anno s1-anno-1">↘ 8-col grid</div>
                      <div className="s1-anno s1-anno-2">↘ Hero · 720h</div>
                    </div>

                    <aside className="s1-panel">
                      <div className="s1-panel-h">Components</div>
                      <div className="s1-panel-section">
                        <div className="s1-panel-item"><span className="s1-pi-glyph">▭</span>Button / Primary</div>
                        <div className="s1-panel-item"><span className="s1-pi-glyph">▭</span>Button / Ghost</div>
                        <div className="s1-panel-item"><span className="s1-pi-glyph">▤</span>Card / Service</div>
                        <div className="s1-panel-item"><span className="s1-pi-glyph">━</span>Divider</div>
                      </div>
                      <div className="s1-panel-h">Tokens</div>
                      <div className="s1-panel-section">
                        <div className="s1-panel-item"><span className="s1-swatch" style={{background:'#4F46E5'}}></span>--accent</div>
                        <div className="s1-panel-item"><span className="s1-swatch" style={{background:'#FAFBFD'}}></span>--surface-0</div>
                        <div className="s1-panel-item"><span className="s1-swatch" style={{background:'#0B0C10'}}></span>--ink-1</div>
                      </div>
                    </aside>
                  </div>
                </div>

                {/* ============ S2 — DESIGN COMPOSITION ============ */}
                <div className="stage-layer s2">
                  <div className="s2-shell">
                    <header className="s2-nav">
                      <div className="s2-lg"><span className="s2-mark"></span>Tischlerei Müller</div>
                      <nav className="s2-links">
                        <span>Leistungen</span>
                        <span>Projekte</span>
                        <span>Über uns</span>
                        <span>Kontakt</span>
                      </nav>
                      <span className="s2-cta-btn">Termin anfragen →</span>
                    </header>

                    <div className="s2-eyebrow">— Tischlerei aus Berlin · seit 1973</div>
                    <h1 className="s2-h1">Handwerk aus Berlin <em>—</em> seit drei <span className="s2-italic">Generationen.</span></h1>
                    <p className="s2-lead">Maßgefertigte Möbel, Innenausbau und Reparaturen. Persönliche Beratung in unserer Werkstatt in Kreuzberg.</p>
                    <div className="s2-cta-row">
                      <span className="s2-btn s2-btn-p">Termin anfragen</span>
                      <span className="s2-btn s2-btn-g">Projekte ansehen</span>
                    </div>

                    <div className="s2-stats">
                      <div className="s2-stat"><span className="s2-stat-v">50+</span><span className="s2-stat-l">Jahre Handwerk</span></div>
                      <div className="s2-stat-sep"></div>
                      <div className="s2-stat"><span className="s2-stat-v">200+</span><span className="s2-stat-l">Projekte / Jahr</span></div>
                      <div className="s2-stat-sep"></div>
                      <div className="s2-stat"><span className="s2-stat-v">4,9 ★</span><span className="s2-stat-l">Google · 142 Bewertungen</span></div>
                    </div>
                  </div>
                </div>

                {/* ============ S3 — FINAL POLISHED ============ */}
                <div className="stage-layer s3">
                  <div className="s3-shell">
                    <header className="s3-nav">
                      <div className="s3-lg"><span className="s3-mark"></span>Tischlerei Müller</div>
                      <nav className="s3-links">
                        <span className="active">Leistungen</span>
                        <span>Projekte</span>
                        <span>Werkstatt</span>
                        <span>Über uns</span>
                        <span>Kontakt</span>
                      </nav>
                      <div className="s3-nav-end">
                        <span className="s3-nav-lang">DE / EN</span>
                        <span className="s3-cta-btn">Termin anfragen</span>
                      </div>
                    </header>

                    <div className="s3-hero">
                      <div className="s3-hero-left">
                        <div className="s3-eyebrow"><span className="s3-dot"></span>Tischlerei aus Berlin · seit 1973</div>
                        <h1 className="s3-h1">Handwerk aus <span className="s3-italic">Berlin</span>—<br/>seit drei Generationen.</h1>
                        <p className="s3-lead">Maßgefertigte Möbel, Innenausbau und Reparaturen. Von der ersten Skizze bis zur Montage in Ihren Räumen — alles aus einer Hand.</p>
                        <div className="s3-ctas">
                          <span className="s3-btn s3-btn-p">Termin anfragen <span className="s3-arr">→</span></span>
                          <span className="s3-btn s3-btn-g">Werkstatt besichtigen</span>
                        </div>
                        <div className="s3-trust">
                          <span className="s3-trust-i"><span className="s3-stars">★★★★★</span><span><strong>4,9</strong> · 142 Google-Bewertungen</span></span>
                          <span className="s3-trust-sep"></span>
                          <span className="s3-trust-i"><span className="s3-trust-flag">🇩🇪</span>Meisterbetrieb · Berlin</span>
                        </div>
                      </div>
                      <div className="s3-hero-right">
                        <div className="s3-photo">
                          <div className="s3-photo-overlay"></div>
                          <div className="s3-photo-grain"></div>
                          <div className="s3-photo-tl">
                            <span className="s3-photo-tl-l">Aktuelles Projekt · 03 / 12</span>
                          </div>
                          <div className="s3-photo-badge">
                            <span className="s3-photo-badge-l">In Werkstatt · Berlin Mitte</span>
                            <span className="s3-photo-badge-v">Eichen-Esstisch <span className="s3-photo-badge-em">— maßgefertigt für Familie K.</span></span>
                            <div className="s3-photo-meta">
                              <span><strong>180 × 90 cm</strong> · Massive Eiche</span>
                              <span className="s3-photo-meta-sep"></span>
                              <span>Fertigstellung Juni</span>
                            </div>
                          </div>
                        </div>
                        <div className="s3-floating-card">
                          <div className="s3-fc-h"><span className="s3-fc-icon">↗</span>Nächster freier Termin</div>
                          <div className="s3-fc-v">Mi · 22. Mai · 14:00</div>
                          <div className="s3-fc-sub">Werkstatt-Beratung · 45 min</div>
                          <div className="s3-fc-cta">Termin sichern →</div>
                        </div>
                      </div>
                    </div>

                    <div className="s3-services">
                      <div className="s3-svc">
                        <span className="s3-svc-n">01</span>
                        <h3 className="s3-svc-h">Möbel nach Maß</h3>
                        <p className="s3-svc-p">Esstische, Schränke, Küchen — geplant und gebaut in Berlin.</p>
                        <span className="s3-svc-arr">↗</span>
                      </div>
                      <div className="s3-svc">
                        <span className="s3-svc-n">02</span>
                        <h3 className="s3-svc-h">Innenausbau</h3>
                        <p className="s3-svc-p">Einbauschränke, Raumteiler und komplette Wohnkonzepte.</p>
                        <span className="s3-svc-arr">↗</span>
                      </div>
                      <div className="s3-svc">
                        <span className="s3-svc-n">03</span>
                        <h3 className="s3-svc-h">Reparaturen</h3>
                        <p className="s3-svc-p">Restauration für Erbstücke und Antikes — von Hand.</p>
                        <span className="s3-svc-arr">↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stage-stops">
            {stops.map((s: any, i: number) => (
              <div className={"stage-stop" + (i === stage ? " active" : "")} data-stop={i} key={i}>
                <div className="stop-inner">
                  <span className="stop-num">0{i + 1} <span className="stop-num-sep">/</span> 04 <span className="stop-num-dot">·</span> {s.label}</span>
                  <h3>{renderText(s.title)}</h3>
                  <p>{s.body}</p>
                  <div className="stop-meta">
                    {s.points.map((p: string, j: number) => <div className="row" key={j}>{p}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
