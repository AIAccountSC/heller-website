'use client'
// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'
import { useLang, renderText } from '@/lib/app-state'
import { IconLightbulb, IconCog, IconClock, IconCheck } from '@/components/Icons'

export default function AIDemo() {
  const { t } = useLang()
  const tasks = t('ai.tasks') || []
  const features = t('ai.features') || []
  const [shown, setShown] = useState(0)
  const sectionRef = useRef(null)
  const startedRef = useRef(false)
  const featureIcons = [<IconLightbulb size={18}/>, <IconCog size={18}/>, <IconClock size={18}/>]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true
          tasks.forEach((_: any, i: number) => setTimeout(() => setShown(i + 1), 350 + i * 600))
          io.disconnect()
        }
      })
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length])

  return (
    <section className="ai-section" id="prozess" ref={sectionRef}>
      <div className="container">
        <div className="ai-band">
          <div className="ai-grid">
            <div data-reveal="left">
              <div className="section-mark">
                <span className="num">10</span>
                <span style={{ color: 'var(--accent-line)' }}>{t('ai.mark')}</span>
                <span className="rule" style={{ background: '#3A3A3A' }}></span>
              </div>
              <h2 style={{ marginTop: 0, marginBottom: 20 }}>{renderText(t('ai.title'))}</h2>
              <p className="lead">{t('ai.lead')}</p>
              <div className="ai-features">
                {features.map((f: any, i: number) => (
                  <div className="ai-feature" key={i}>
                    <div className="ic">{featureIcons[i]}</div>
                    <div>
                      <h4>{f.t}</h4>
                      <p>{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal="right">
              <div className="ai-card">
                <div className="top">
                  <div>
                    <div className="title">{t('ai.cardTitle')}</div>
                    <div className="sub">{t('ai.cardSub')}</div>
                  </div>
                  <span className="status">{t('ai.status')}</span>
                </div>
                {tasks.map((task: any, i: number) => {
                  const isLast = i === tasks.length - 1
                  const state = isLast ? 'pending' : 'done'
                  return (
                    <div key={i} className={`ai-task ${state} ${i < shown ? 'shown' : ''}`}>
                      <div className="indicator">
                        {state === 'done' ? <IconCheck size={12}/> : (
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M12 2a10 10 0 1 0 10 10" />
                          </svg>
                        )}
                      </div>
                      <span className="label">{task.label}</span>
                      <span className="time">{task.time}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
