'use client'
// @ts-nocheck
import React, { useRef, useEffect } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let rafId = 0
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
      bar.style.width = pct.toFixed(2) + '%'
      rafId = 0
    }
    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="bar" ref={barRef}></div>
    </div>
  )
}
