'use client'
// @ts-nocheck
import React from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconX } from '@/components/Icons'

export default function Problem() {
  const { t } = useLang()
  const pains = t('problem.pains') || []
  return (
    <section className="section" id="problem">
      <div className="container">
        <div className="problem-grid">
          <div data-reveal="left">
            <div className="section-mark">
              <span className="num">03</span>
              <span>{t('problem.mark')}</span>
              <span className="rule"></span>
            </div>
            <h2 style={{ marginTop: 0, marginBottom: 18 }}>
              {renderText(t('problem.title'))}
            </h2>
            <p className="lead">{t('problem.lead')}</p>
            <ul className="problem-list">
              {pains.map((p: string, i: number) => (
                <li key={i}>
                  <span className="mark"><IconX/></span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="right">
            <div className="old-frame">
              <div className="browser-bar" style={{height: 26, background: '#D9D0BC'}}>
                <span className="d" style={{background: '#9B8964'}}></span>
                <span className="d" style={{background: '#9B8964'}}></span>
                <span className="d" style={{background: '#9B8964'}}></span>
              </div>
              <div className="old-preview">
                <div className="ol-nav">
                  <span className="ol-logo">{t('problem.oldLogo')}</span>
                  <span className="ol-links"><span>Home</span><span>Über</span><span>Galerie</span><span>Kontakt</span></span>
                </div>
                <div className="ol-h">{t('problem.oldH')}</div>
                <div className="ol-sub">{t('problem.oldSub')}</div>
                <div className="ol-img"></div>
                <span className="ol-btn">{t('problem.oldBtn')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
