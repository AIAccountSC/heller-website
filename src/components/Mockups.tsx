'use client'
// @ts-nocheck
import React from 'react'

export const BrowserChrome = ({ children, url = "heller.de", className = "" }: any) => (
  <div className={"browser-chrome " + className}>
    <div className="browser-bar">
      <span className="dot"></span><span className="dot"></span><span className="dot"></span>
      <span className="url">{url}</span>
    </div>
    {children}
  </div>
)

export const PhoneChrome = ({ children, className = "" }: any) => (
  <div className={"phone-chrome " + className}>
    <div className="phone-screen">{children}</div>
  </div>
)

export const NewSitePreview = ({ scale = 1 }: any) => (
  <div className="preview-new" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
    <div className="pn-nav">
      <div className="pn-logo"><span className="sq"></span>Tischlerei Müller</div>
      <div className="pn-links"><span>Leistungen</span><span>Projekte</span><span>Kontakt</span></div>
    </div>
    <div className="pn-h">Handwerk aus Berlin —<br/>seit drei Generationen.</div>
    <div className="pn-sub">Maßgefertigte Möbel, Innenausbau und Reparaturen. Persönliche Beratung in unserer Werkstatt in Kreuzberg.</div>
    <span className="pn-btn">Termin anfragen</span>
    <div className="pn-grid">
      <div className="pn-tile"><span className="tt">Möbel</span><span className="bar"></span><span className="bar short"></span></div>
      <div className="pn-tile"><span className="tt">Ausbau</span><span className="bar"></span><span className="bar short"></span></div>
      <div className="pn-tile"><span className="tt">Reparatur</span><span className="bar"></span><span className="bar short"></span></div>
    </div>
  </div>
)

export const OldSitePreview = () => (
  <div className="preview-old">
    <div className="ol-nav">
      <div className="ol-logo">Tischlerei Müller</div>
      <div className="ol-links"><span>Home</span><span>Über</span><span>Galerie</span><span>Kontakt</span></div>
    </div>
    <div className="ol-h">Willkommen!!!</div>
    <div className="ol-sub">Wir machen Möbel und Reparaturen. Rufen Sie uns an unter 030 / 12 34 56 78 oder besuchen Sie uns!</div>
    <div className="ol-img"></div>
    <span className="ol-btn">► Hier klicken</span>
  </div>
)
