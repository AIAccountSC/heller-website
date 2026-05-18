'use client'
// @ts-nocheck
import { useEffect } from 'react'

// Combined reveal.js + polish v4.js — all DOM enhancements in one useEffect.
export default function RevealInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // ── REVEAL ──────────────────────────────────────────────────────────────
    const observed = new WeakSet()
    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); revealIo.unobserve(e.target) }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    const scanReveal = (root?: Element | Document) => {
      ;(root || document).querySelectorAll('[data-reveal]').forEach((el) => {
        if (!observed.has(el)) { observed.add(el); revealIo.observe(el) }
      })
    }
    scanReveal(document)
    const revealMo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n: any) => {
          if (n.nodeType !== 1) return
          if (n.matches?.('[data-reveal]') && !observed.has(n)) { observed.add(n); revealIo.observe(n) }
          if (n.querySelectorAll) scanReveal(n)
        })
      }
    })
    revealMo.observe(document.body, { childList: true, subtree: true })

    // ── POLISH v4 ────────────────────────────────────────────────────────────
    // Wait for dynamic components to paint sections into the DOM
    let tries = 0
    const whenReady = (cb: () => void) => {
      const tick = () => {
        const sections = document.querySelectorAll('main > section')
        if (sections.length > 3) cb()
        else if (tries++ < 300) requestAnimationFrame(tick)
      }
      tick()
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // SCROLL-INDEX — floating right-side section nav
    function buildScrollIndex() {
      if (document.querySelector('.scroll-index')) return
      const sections = Array.from(document.querySelectorAll('main > section[id]'))
      if (sections.length < 3) return
      const idx = document.createElement('div')
      idx.className = 'scroll-index'
      idx.setAttribute('aria-hidden', 'true')
      sections.forEach((sec: any, i) => {
        const label = sec.querySelector('.section-mark span:nth-child(2)')?.textContent || sec.id
        const row = document.createElement('a')
        row.href = `#${sec.id}`
        row.className = 'si-row'
        row.dataset.target = sec.id
        row.innerHTML = `<span class="si-num">${String(i + 1).padStart(2, '0')}</span><span class="si-label">${label || sec.id}</span>`
        row.addEventListener('click', (e) => { e.preventDefault(); sec.scrollIntoView({ behavior: 'smooth', block: 'start' }) })
        idx.appendChild(row)
      })
      document.body.appendChild(idx)
      let raf = 0
      const update = () => {
        raf = 0
        if (window.scrollY > 400) idx.classList.add('shown')
        else idx.classList.remove('shown')
        const mid = window.scrollY + window.innerHeight * 0.4
        let activeIdx = 0
        sections.forEach((sec: any, i) => {
          if (sec.getBoundingClientRect().top + window.scrollY <= mid) activeIdx = i
        })
        idx.querySelectorAll('.si-row').forEach((r: any, i) => r.classList.toggle('active', i === activeIdx))
      }
      update()
      window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update) }, { passive: true })
    }

    // MAGNETIC CTAs
    function bindMagnetic() {
      if (reduced) return
      document.querySelectorAll('.btn--primary, .btn--accent').forEach((btn: any) => {
        if (btn.classList.contains('magnetic')) return
        btn.classList.add('magnetic')
        window.addEventListener('pointermove', (e: any) => {
          const r = btn.getBoundingClientRect()
          const cx = r.left + r.width / 2; const cy = r.top + r.height / 2
          const dx = e.clientX - cx; const dy = e.clientY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const radius = Math.max(r.width, r.height) * 1.4
          if (dist < radius) {
            const k = (1 - dist / radius) * 0.35
            btn.style.transform = `translate(${dx * k}px, ${dy * k}px)`
            btn.classList.add('is-near')
          } else if (btn.classList.contains('is-near')) {
            btn.style.transform = ''; btn.classList.remove('is-near')
          }
        })
        btn.addEventListener('pointerleave', () => { btn.style.transform = ''; btn.classList.remove('is-near') })
      })
    }

    // VELOCITY REVEALS
    function bindVelocityReveal() {
      if (reduced) return
      let lastY = window.scrollY; let lastT = performance.now(); let velocity = 0
      window.addEventListener('scroll', () => {
        const y = window.scrollY; const t = performance.now()
        const dt = Math.max(8, t - lastT)
        velocity = velocity * 0.7 + ((y - lastY) / dt) * 0.3
        lastY = y; lastT = t
        const dist = Math.min(64, Math.max(14, 14 + Math.abs(velocity) * 60))
        document.documentElement.style.setProperty('--rev-dist', `${dist}px`)
      }, { passive: true })
    }

    // BA GAUGES
    function bindBaGauges() {
      const stage = document.querySelector('.ba-stage')
      if (!stage || stage.querySelector('.ba-gauges')) return
      const g = document.createElement('div')
      g.className = 'ba-gauges'
      g.innerHTML = `
        <span class="ba-gauge g1"><span class="dot"></span><span>Lighthouse</span><span class="v">98</span></span>
        <span class="ba-gauge g2"><span class="dot"></span><span>LCP</span><span class="v">1.2s</span></span>
        <span class="ba-gauge g3"><span class="dot"></span><span>A11y AA</span><span class="v">PASS</span></span>`
      stage.appendChild(g)
    }

    // VORHER ANNOTATIONS
    function bindVorher() {
      const frame = document.querySelector('.old-frame')
      if (!frame || frame.querySelector('.vorher-stamp')) return
      const stamp = document.createElement('span'); stamp.className = 'vorher-stamp'; stamp.textContent = 'Vorher'
      frame.appendChild(stamp)
      const ann = document.createElement('div'); ann.className = 'old-annotations'
      ann.innerHTML = `<span class="old-annotation a1">Auto-Loop GIF?</span><span class="old-annotation a2">3 Schriftarten</span><span class="old-annotation a3">"Hier klicken" => nein</span>`
      frame.appendChild(ann)
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { frame.classList.add('is-in'); io.disconnect() } })
      }, { threshold: 0.3 })
      io.observe(frame)
    }

    // AUDIENCE glyphs
    function bindAudience() {
      const glyphs = ['Hw.', 'Pr.', 'St.', 'Ka.', 'Ga.']
      document.querySelectorAll('.aud-tile').forEach((tile: any, i) => {
        if (tile.querySelector('.aud-glyph')) return
        const g = document.createElement('span'); g.className = 'aud-glyph'; g.textContent = glyphs[i] || '·'
        tile.appendChild(g)
        if (!tile.querySelector('.read-on')) {
          const r = document.createElement('span'); r.className = 'read-on'
          r.innerHTML = 'Ansehen <span aria-hidden="true">→</span>'; tile.appendChild(r)
        }
      })
    }

    // FINAL CTA shapes + inner wrapper
    function bindFinalCta() {
      const cta = document.querySelector('.final-cta')
      if (!cta || cta.querySelector('.cta-shapes')) return
      const shapes = document.createElement('div'); shapes.className = 'cta-shapes'
      shapes.innerHTML = `<div class="cta-shape s1"></div><div class="cta-shape s2"></div><div class="cta-shape s3"></div>`
      cta.insertBefore(shapes, cta.firstChild)
      if (cta.querySelector(':scope > .cta-inner')) return
      const inner = document.createElement('div'); inner.className = 'cta-inner'
      Array.from(cta.children).filter((c: any) => c !== shapes).forEach((k: any) => inner.appendChild(k))
      cta.appendChild(inner)
    }

    // SHOWCASE floating labels
    function bindShowcaseFloats() {
      const frame = document.querySelector('.showcase .stage-frame')
      if (!frame || frame.querySelector('.stage-floats')) return
      const floats = document.createElement('div'); floats.className = 'stage-floats'
      floats.innerHTML = `
        <div class="stage-float f1"><span class="dot"></span>Typography refined</div>
        <div class="stage-float f2"><span class="dot"></span>Component system</div>
        <div class="stage-float f3"><span class="dot"></span>Mobile-first grid</div>`
      frame.appendChild(floats)
    }

    // MOBILE HAMBURGER + DRAWER
    function bindMobileNav() {
      const hdrCta = document.querySelector('.hdr-cta')
      if (!hdrCta || hdrCta.querySelector('.hdr-hamburger')) return
      const ham = document.createElement('button')
      ham.className = 'hdr-hamburger'; ham.setAttribute('aria-label', 'Menü öffnen')
      ham.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`
      hdrCta.insertBefore(ham, hdrCta.firstChild)
      const drawer = document.createElement('div')
      drawer.className = 'mobile-drawer'; drawer.setAttribute('aria-hidden', 'true')
      drawer.innerHTML = `
        <div class="mobile-drawer-panel" role="dialog" aria-label="Navigation">
          <div class="mobile-drawer-head">
            <span style="font-family:var(--font-display);font-size:16px;font-weight:600;color:var(--ink-1)">Menü</span>
            <button class="mobile-drawer-close" aria-label="Menü schließen">×</button>
          </div>
          <nav class="mobile-drawer-nav">
            <a href="#leistungen">Leistungen</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#beispiele">Beispiele</a>
            <a href="#preise">Preise</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#kontakt" class="mobile-drawer-cta">Beratungsgespräch anfragen →</a>
          <div class="mobile-drawer-meta">
            <span>SCALESITE · STUDIO</span>
            <div class="mobile-drawer-meta-lang"><span class="active">DE</span><span>EN</span></div>
          </div>
        </div>`
      document.body.appendChild(drawer)
      const open = () => { drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden' }
      const close = () => { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '' }
      ham.addEventListener('click', open)
      drawer.querySelector('.mobile-drawer-close')?.addEventListener('click', close)
      drawer.addEventListener('click', (e: any) => { if (e.target === drawer) close() })
      drawer.querySelectorAll('.mobile-drawer-nav a, .mobile-drawer-cta').forEach((a: any) => a.addEventListener('click', close))
      const langSpans = drawer.querySelectorAll('.mobile-drawer-meta-lang span')
      langSpans.forEach((s: any) => {
        s.addEventListener('click', () => {
          langSpans.forEach((x: any) => x.classList.toggle('active', x === s))
          document.querySelector('.lang-inline')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })
      })
    }

    // BEFORE/AFTER mobile tabs
    function bindBaMobileTabs() {
      const ba = document.querySelector('.ba-v4')
      if (!ba || ba.querySelector('.ba-mobile-tabs')) return
      const wrap = ba.querySelector('.ba-stage-wrap'); if (!wrap) return
      const tabs = document.createElement('div'); tabs.className = 'ba-mobile-tabs'
      tabs.innerHTML = `<button data-side="before">Vorher</button><button data-side="after" class="active">Nachher</button>`
      wrap.insertBefore(tabs, wrap.firstChild)
      ba.setAttribute('data-mobile-side', 'after')
      tabs.addEventListener('click', (e: any) => {
        const btn = e.target.closest('button[data-side]'); if (!btn) return
        tabs.querySelectorAll('button').forEach((b: any) => b.classList.toggle('active', b === btn))
        ba.setAttribute('data-mobile-side', btn.dataset.side)
      })
    }

    // STAGGER REVEALS
    function bindStaggerReveals() {
      const heads = document.querySelectorAll('.sec-head,.hero-head,.cap-head,.pricing-head,.voices-head,.process-head')
      heads.forEach((h: any) => { if (!h.hasAttribute('data-stagger')) h.setAttribute('data-stagger', '') })
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } })
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
      document.querySelectorAll('[data-stagger]').forEach((el: any) => io.observe(el))
    }

    // TESTIMONIAL TYPING
    function bindTestimonialType() {
      const quotes = document.querySelectorAll('.tm-quote'); if (!quotes.length) return
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('tm-typed'); io.unobserve(e.target) } })
      }, { threshold: 0.5 })
      quotes.forEach((q: any) => io.observe(q))
    }

    // MOBILE COMPARE rebuild
    function bindCompareMobile() {
      const section = document.querySelector('.cmp-v4'); if (!section) return
      const board = section.querySelector('.cmp-board'); if (!board) return
      // Guard: reuse existing .cmp-mobile if already injected (React Strict Mode / double-invoke)
      let rebuilt: any = section.querySelector('.cmp-mobile') || null
      const render = () => {
        const isMobile = window.innerWidth <= 760
        if (isMobile) {
          if (!rebuilt) {
            const rows = Array.from(board.querySelectorAll('.cmp-row')).map((r: any) => ({
              label: r.querySelectorAll('.cmp-cell')[0]?.textContent.trim() || '',
              heller: r.querySelectorAll('.cmp-cell')[1]?.querySelector('.cmp-text')?.textContent.trim() || '',
            }))
            const wrap = document.createElement('div'); wrap.className = 'cmp-mobile'
            wrap.innerHTML = `
              <div class="cmp-mobile-note">ScaleSite führt in allen Kriterien · Volltabelle auf Desktop</div>
              <div class="cmp-mobile-card">
                <div class="cmp-mobile-head"><span class="cmp-mobile-mark">S</span>
                  <div><div class="cmp-mobile-name">ScaleSite — Gewinner-Profil</div>
                  <div class="cmp-mobile-sub">Alle Kriterien führend</div></div></div>
                <ul class="cmp-mobile-list">
                  ${rows.map((row, i) => `<li class="cmp-mobile-row" style="--i:${i}">
                    <span class="cmp-mobile-check"><svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="2,6 5,9 10,3"/></svg></span>
                    <span class="cmp-mobile-meta"><span class="cmp-mobile-label">${row.label}</span>
                    <span class="cmp-mobile-value">${row.heller}</span></span></li>`).join('')}
                </ul>
              </div>`
            board.parentElement?.insertBefore(wrap, board); rebuilt = wrap
          }
          ;(board as any).style.display = 'none'; (rebuilt as any).style.display = ''
        } else {
          ;(board as any).style.display = ''; if (rebuilt) (rebuilt as any).style.display = 'none'
        }
      }
      render()
      let raf = 0
      window.addEventListener('resize', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; render() }) }, { passive: true })
    }

    whenReady(() => {
      buildScrollIndex()
      bindVelocityReveal()
      bindMagnetic()
      bindBaGauges()
      bindVorher()
      bindAudience()
      bindFinalCta()
      bindShowcaseFloats()
      bindMobileNav()
      bindBaMobileTabs()
      bindStaggerReveals()
      bindTestimonialType()
      bindCompareMobile()
    })

    return () => { revealIo.disconnect(); revealMo.disconnect() }
  }, [])

  return null
}
