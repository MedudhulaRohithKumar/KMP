import { useEffect, useState, lazy, Suspense, useRef } from 'react'
import { Sparkles, ArrowDown, ShieldCheck, Droplets, Wind } from 'lucide-react'
import { scrollToId } from '../hooks/useLenis'

// Code-split Three.js to keep initial main thread unblocked
const HeroScene = lazy(() => import('./three/HeroScene'))

interface HeroProps {
  onExploreCatalogue: () => void
}

export default function Hero({ onExploreCatalogue }: HeroProps) {
  // Real-time harvest dispatch countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 13, minutes: 48, seconds: 22 })
  const [isInView, setIsInView] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 14, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Pause WebGL rendering when scrolled out of view to save battery & CPU
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <section ref={heroRef} id="hero" className="hero-section" aria-label="Hero">
      {/* Background greenhouse photo overlay with ultra-light WebP format (42 KB) */}
      <div
        className="hero-bg-photo"
        style={{ backgroundImage: `url('/images/greenhouse.webp')` }}
      />
      <div className="hero-ambient-vignette" />

      {/* 3D Living Dewdrop Canvas Container - Loaded asynchronously */}
      <div className="hero-canvas-container" aria-hidden="true">
        <Suspense fallback={<div className="hero-canvas-placeholder" />}>
          <HeroScene active={isInView} />
        </Suspense>
      </div>

      {/* Floating Lab Hygiene Sensors */}
      <div className="hero-sensors-overlay">
        <div className="glass sensor-chip sensor-chip--top">
          <Droplets size={14} color="var(--chlorophyll-glow)" />
          <span className="mono">Purified H₂O · RO Treated</span>
        </div>
        <div className="glass sensor-chip sensor-chip--mid">
          <Wind size={14} color="var(--champagne-gold)" />
          <span className="mono">100% Pesticide Free</span>
        </div>
        <div className="glass sensor-chip sensor-chip--bot">
          <ShieldCheck size={14} color="var(--chlorophyll-glow)" />
          <span className="mono">Non-GMO Certified Seeds</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container hero-content-layout">
        <div className="hero-copy-column">
          {/* Live Harvest Status Badge */}
          <div className="glass harvest-countdown-badge">
            <span className="pulse-dot" />
            <span className="badge-text mono">
              Hyderabad Sunrise Harvest Dispatches in{' '}
              <strong className="badge-timer">
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
              </strong>
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading display">
            Nature's <em>small greens</em>, <br />
            big <em>cellular nutrition</em>.
          </h1>

          {/* Description */}
          <p className="hero-description lead">
            <strong>KMP Micro Greens</strong> brings you pesticide-free living cotyledons
            and dehydrated mix microgreens powder. Packed with up to{' '}
            <strong>40× cellular nutrient density</strong>, freshly clipped and delivered right to
            your door in Hyderabad.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-cta-group">
            <button
              type="button"
              onClick={onExploreCatalogue}
              className="btn-liquid-gold interactive-lens"
            >
              <span className="btn-liquid-content">
                <Sparkles size={18} className="gold-sparkle" />
                <span>Explore Products Catalogue (11 Greens + Powder)</span>
              </span>
              <div className="liquid-ripple" />
            </button>

            <button
              type="button"
              onClick={() => scrollToId('revelation')}
              className="glass btn-secondary-cleanroom interactive-lens"
            >
              <span>The 40× Revelation</span>
            </button>
          </div>

          {/* Footnote Micro-Metrics */}
          <div className="hero-footnotes">
            <div className="footnote-item">
              <span className="mono footnote-val">100% Natural</span>
              <span className="footnote-lbl">Chemical Free Growth</span>
            </div>
            <div className="footnote-divider" />
            <div className="footnote-item">
              <span className="mono footnote-val">Hyderabad Farm</span>
              <span className="footnote-lbl">Madha Nagar, BHEL</span>
            </div>
            <div className="footnote-divider" />
            <div className="footnote-item">
              <span className="mono footnote-val">Plans from ₹199</span>
              <span className="footnote-lbl">Weekly Doorstep Packs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => scrollToId('revelation')}
        className="hero-scroll-indicator"
        aria-label="Scroll to 40x Revelation"
      >
        <span className="mono scroll-text">Explore the 40× Revelation</span>
        <ArrowDown size={14} className="bounce-arrow" />
      </button>
    </section>
  )
}
