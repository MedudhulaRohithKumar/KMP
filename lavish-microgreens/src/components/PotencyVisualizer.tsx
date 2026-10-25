import { useState } from 'react'
import { Microscope, ChevronRight, CheckCircle2 } from 'lucide-react'

interface Hotspot {
  id: string
  title: string
  part: string
  x: number // percentage
  y: number // percentage
  description: string
  clinicalNote: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'cotyledon',
    title: 'Embryonic Cotyledon Leaves',
    part: 'The Vital Core',
    x: 48,
    y: 26,
    description:
      'The initial photosynthetic leaves contain all the concentrated reserves the seed stored to create a whole mature plant. Harvesting at day 7–14 traps peak bio-flavonoids before energy converts into tough cellulose fibers.',
    clinicalNote: 'USDA-verified: 4 to 40 times higher concentrations of sulforaphane, carotenoids, and vitamin K.',
  },
  {
    id: 'stem',
    title: 'Turgid Hypocotyl Stem',
    part: 'Cellular Hydration Conduit',
    x: 52,
    y: 56,
    description:
      'Transports pure UV-C sterilized water and micronutrients upward. Crisp, tender, and succulent with zero stringiness or bitter woody lignin found in grown vegetables.',
    clinicalNote: 'Rich in bioavailable potassium, chlorophyll, and organic cellular electrolytes.',
  },
  {
    id: 'seed-base',
    title: 'Clean Laser Cut Line',
    part: 'Zero-Substrate Boundary',
    x: 50,
    y: 84,
    description:
      'Our precision harvest cuts precisely 4mm above the sterile organic hemp fiber mat. Roots and growth medium remain untouched in the facility, ensuring zero particulate residue ever touches the punnet.',
    clinicalNote: 'True zero-touch purity with laboratory microbial count < 10 CFU/g.',
  },
]

export default function PotencyVisualizer() {
  const [multiplier, setMultiplier] = useState(40)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0])

  // Calculated values based on the slider
  const vegetableLbs = ((multiplier / 40) * 2.5).toFixed(1)
  const sulforaphane = multiplier
  const vitC = Math.round(multiplier * 0.95)
  const vitE = Math.round(multiplier * 1.3)
  const chlorophyll = Math.round(multiplier * 0.8)

  return (
    <section id="revelation" className="revelation-section" aria-label="Microgreens Potency Revelation">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered">
          <span className="eyebrow">The 40× Nutrient Revelation</span>
          <h2 className="section-title">
            One ounce of microgreens. <br />
            The living power of <em>forty ounces of vegetables</em>.
          </h2>
          <p className="lead section-lead-centered">
            Why consume pounds of indigestible fiber when you can nourish your cells with the purest embryonic stage of plant life? Slide below to examine the density disparity.
          </p>
        </div>

        {/* Interactive Scrubbing Slider Bar */}
        <div className="glass slider-control-card">
          <div className="slider-header">
            <span className="slider-label mono">
              <Microscope size={16} color="var(--chlorophyll-glow)" />
              Slide to compare nutrient density multiplier:
            </span>
            <div className="slider-current-multiplier">
              <span className="multiplier-number mono">{multiplier}×</span>
              <span className="multiplier-text">Nutrient Density</span>
            </div>
          </div>

          <div className="slider-input-wrapper">
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              className="density-slider interactive-lens"
              aria-label="Nutrient density multiplier"
            />
            <div className="slider-ticks mono">
              <span>1× (Standard Veg)</span>
              <span>10×</span>
              <span>20× (Superfood)</span>
              <span>30×</span>
              <span className="gold-tick">40× Peak Cotyledon</span>
            </div>
          </div>

          {/* Dynamic Comparison Grid */}
          <div className="comparison-stats-grid">
            <div className="comp-stat-pill">
              <span className="comp-stat-label mono">Sulforaphane</span>
              <span className="comp-stat-val mono" style={{ color: 'var(--chlorophyll-glow)' }}>
                +{sulforaphane * 100}%
              </span>
              <span className="comp-stat-sub">Cellular detox enzyme</span>
            </div>

            <div className="comp-stat-pill">
              <span className="comp-stat-label mono">Vitamin C</span>
              <span className="comp-stat-val mono">+{vitC * 38}%</span>
              <span className="comp-stat-sub">Collagen synthesis</span>
            </div>

            <div className="comp-stat-pill">
              <span className="comp-stat-label mono">Vitamin E</span>
              <span className="comp-stat-val mono" style={{ color: 'var(--champagne-gold)' }}>
                +{vitE * 52}%
              </span>
              <span className="comp-stat-sub">Lipid antioxidant</span>
            </div>

            <div className="comp-stat-pill">
              <span className="comp-stat-label mono">Raw Chlorophyll</span>
              <span className="comp-stat-val mono">+{chlorophyll * 45}%</span>
              <span className="comp-stat-sub">Blood oxygenation</span>
            </div>
          </div>
        </div>

        {/* Interactive Plant Anatomy Visualizer + Hotspots */}
        <div className="revelation-dual-stage">
          {/* Left: Plant Hotspot Explorer */}
          <div className="glass anatomy-stage-card">
            <div className="anatomy-card-header">
              <span className="mono badge-clean">Interactive Plant Anatomy</span>
              <span className="mono anatomy-hint">Click glowing pulse points</span>
            </div>

            <div className="anatomy-viewport">
              {/* Central Microgreen Macro Artwork */}
              <div className="anatomy-sprout-art">
                <img
                  src="/images/pea-tendrils.webp"
                  alt="Microgreen sprout macro view"
                  className="anatomy-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="anatomy-glow-halo" />

                {/* Hotspot Pins */}
                {HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    className={`hotspot-btn ${activeHotspot.id === spot.id ? 'hotspot-btn--active' : ''} interactive-lens`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    aria-label={`View details for ${spot.title}`}
                  >
                    <span className="hotspot-pulse" />
                    <span className="hotspot-dot" />
                    <span className="hotspot-tag mono">{spot.part}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Active Hotspot Clinical Detail Card */}
          <div className="glass anatomy-detail-panel">
            <div className="detail-panel-top">
              <span className="eyebrow">{activeHotspot.part}</span>
              <h3 className="detail-title">{activeHotspot.title}</h3>
            </div>

            <p className="detail-desc">{activeHotspot.description}</p>

            <div className="clinical-card">
              <div className="clinical-header">
                <CheckCircle2 size={16} color="var(--chlorophyll-glow)" />
                <span className="mono clinical-tag">Bio-Chemical Verification</span>
              </div>
              <p className="clinical-text mono">{activeHotspot.clinicalNote}</p>
            </div>

            {/* Scale Comparison Visualization */}
            <div className="scale-equivalence-card">
              <div className="scale-left">
                <div className="scale-orb">
                  <span className="mono scale-oz">1 oz</span>
                  <span className="scale-label">Lavish Sprout</span>
                </div>
              </div>
              <div className="scale-equal mono">=</div>
              <div className="scale-right">
                <div className="scale-basket">
                  <span className="mono scale-oz">{vegetableLbs} lbs</span>
                  <span className="scale-label">Mature Greens & Broccoli</span>
                </div>
              </div>
            </div>

            <div className="detail-action-footer">
              <span className="mono harvest-day-pill">Harvest Window: Day 7–14</span>
              <button
                onClick={() => {
                  const nextIdx = (HOTSPOTS.findIndex((h) => h.id === activeHotspot.id) + 1) % HOTSPOTS.length
                  setActiveHotspot(HOTSPOTS[nextIdx])
                }}
                className="btn-next-hotspot"
              >
                <span>Next Hotspot</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
