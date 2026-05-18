'use client'
// @ts-nocheck
import { useEffect } from 'react'

export default function RevealInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el: Element) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )

    const observed = new WeakSet()
    const scan = (root?: Element | Document) => {
      const nodes = (root || document).querySelectorAll('[data-reveal]')
      nodes.forEach((el: Element) => {
        if (!observed.has(el)) {
          observed.add(el)
          io.observe(el)
        }
      })
    }

    scan(document)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n: Node) => {
          if (n.nodeType !== 1) return
          const el = n as Element
          if (el.matches && el.matches('[data-reveal]')) {
            if (!observed.has(el)) { observed.add(el); io.observe(el) }
          }
          if (el.querySelectorAll) scan(el)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
