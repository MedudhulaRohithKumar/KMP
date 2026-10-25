import Lenis from 'lenis'
import { useEffect } from 'react'

let lenisInstance: Lenis | null = null

/**
 * Lightweight, high-performance scroll handler.
 * On touch devices / mobile, native scrolling is preserved for zero input lag.
 */
export function useLenis() {
  useEffect(() => {
    // Disable on mobile/touch screens or if reduced motion is requested
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || prefersReducedMotion) {
      lenisInstance = null
      return
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })
    lenisInstance = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

/** Smoothly scroll to a section by id */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -30 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
