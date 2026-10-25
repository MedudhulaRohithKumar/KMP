import { useEffect, useRef } from 'react'

/**
 * Subtle, zero-overhead botanical cursor glow that trails the native cursor
 * without hiding it or blocking any clicks.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on fine desktop pointers
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const el = cursorRef.current
    if (!el) return

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let rafId = 0
    let isVisible = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        el.style.opacity = '1'
      }
    }

    const onMouseLeave = () => {
      isVisible = false
      el.style.opacity = '0'
    }

    const render = () => {
      // Smooth subtle spring interpolation
      currentX += (mouseX - currentX) * 0.35
      currentY += (mouseY - currentY) * 0.35
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="botanical-cursor-aura"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '28px',
        height: '28px',
        marginLeft: '-14px',
        marginTop: '-14px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.25s ease',
        background: 'radial-gradient(circle, rgba(44, 230, 127, 0.25) 0%, rgba(212, 175, 55, 0.12) 60%, transparent 100%)',
        border: '1px solid rgba(44, 230, 127, 0.4)',
        boxShadow: '0 0 12px rgba(44, 230, 127, 0.3)',
      }}
    />
  )
}
