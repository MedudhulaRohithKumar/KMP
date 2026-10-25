import { useState, useMemo } from 'react'
import { Sparkles, Plus, Check, ShoppingBag, RotateCcw } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface Variety {
  id: string
  name: string
  color: string
  boosts: [number, number, number, number]
}

const ELIXIR_VARIETIES: Variety[] = [
  { id: 'sunflower', name: 'Sunflower', color: '#D4AF37', boosts: [30, 10, 25, 15] },
  { id: 'broccoli', name: 'Broccoli', color: '#2CE67F', boosts: [35, 30, 10, 25] },
  { id: 'radish', name: 'Radish', color: '#D9385A', boosts: [15, 35, 15, 20] },
  { id: 'pea', name: 'Pea Shoots', color: '#7FD8A4', boosts: [10, 20, 35, 20] },
  { id: 'wheatgrass', name: 'Wheatgrass', color: '#22C55E', boosts: [25, 20, 30, 25] },
]

const BIO_METERS = [
  { key: 'skin', label: 'Skin & Cellular Glow', nutrients: 'Sulforaphane · Vit E · Antioxidants' },
  { key: 'immunity', label: 'Immunity Shield', nutrients: 'Vit C · Polyphenols · Zinc' },
  { key: 'energy', label: 'Clean Energy & Focus', nutrients: 'Iron · Active Chlorophyll · B-Vitamins' },
  { key: 'gut', label: 'Gut & Detox Harmony', nutrients: 'Live Enzymes · Prebiotic Fiber' },
] as const

export default function ElixirBuilder() {
  const { addItem } = useCart()
  const [selectedIds, setSelectedIds] = useState<string[]>(['sunflower', 'broccoli'])
  const [boxAdded, setBoxAdded] = useState(false)

  // Toggle microgreen selection in the bowl
  const toggleVariety = (id: string) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(id)
      return exists ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }

  // Calculate the 4 Bio-Meters
  const meterValues = useMemo(() => {
    const scores = [0, 0, 0, 0]
    selectedIds.forEach((id) => {
      const v = ELIXIR_VARIETIES.find((item) => item.id === id)
      if (v) {
        v.boosts.forEach((b, idx) => {
          scores[idx] += b
        })
      }
    })
    return scores.map((s) => Math.min(100, s))
  }, [selectedIds])

  const synergy = Math.round(
    meterValues.reduce((a, b) => a + b, 0) / meterValues.length
  )

  const isSynergyMax = synergy >= 85

  // 1-Click purchase of custom vitality box
  const handleAddToCart = () => {
    const names = selectedIds
      .map((id) => ELIXIR_VARIETIES.find((v) => v.id === id)?.name)
      .filter(Boolean)
      .join(' + ')

    addItem({
      id: `custom-box-${Date.now()}`,
      name: `KMP Custom Vitality Box (${names || 'Curated Blend'})`,
      price: 499,
    })
    setBoxAdded(true)
    setTimeout(() => setBoxAdded(false), 2000)
  }

  return (
    <section id="elixir" className="elixir-section" aria-label="Cellular Elixir Builder">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered">
          <span className="eyebrow">Interactive Bio-Synergy</span>
          <h2 className="section-title">
            The <em>Cellular Elixir</em> Builder. <br />
            Curate your personal vitality synergy.
          </h2>
          <p className="lead section-lead-centered">
            Blend KMP fresh microgreens into your crystal bowl. Watch clinical bio-markers activate in real-time, then claim your fresh-clipped custom blend box.
          </p>
        </div>

        {/* Alchemist Interactive Layout */}
        <div className="elixir-alchemist-grid">
          {/* Left: Varieties Selector */}
          <div className="glass varieties-picker-panel">
            <div className="panel-header-row">
              <span className="mono picker-tag">1. Select Microgreen Varieties</span>
              <button
                onClick={() => setSelectedIds([])}
                className="btn-clear-selection mono"
                title="Clear bowl"
              >
                <RotateCcw size={12} /> Clear
              </button>
            </div>

            <div className="varieties-list">
              {ELIXIR_VARIETIES.map((v) => {
                const isSelected = selectedIds.includes(v.id)
                return (
                  <button
                    key={v.id}
                    onClick={() => toggleVariety(v.id)}
                    className={`variety-pill ${isSelected ? 'variety-pill--selected' : ''} interactive-lens`}
                    style={{ '--variety-color': v.color } as React.CSSProperties}
                  >
                    <div className="variety-check-circle">
                      {isSelected ? <Check size={14} /> : <Plus size={14} />}
                    </div>
                    <div className="variety-text-col">
                      <span className="variety-name">{v.name}</span>
                      <span className="variety-accent mono">
                        {v.id === 'broccoli' && 'Rich in Sulforaphane & Vit C'}
                        {v.id === 'sunflower' && 'Essential Vit E & Plant Protein'}
                        {v.id === 'radish' && 'Digestive Enzymes & Anthocyanin'}
                        {v.id === 'pea' && 'Plant Folate & Iron'}
                        {v.id === 'wheatgrass' && 'Dense Raw Chlorophyll'}
                      </span>
                    </div>
                    <span className="variety-color-dot" style={{ background: v.color }} />
                  </button>
                )
              })}
            </div>

            <div className="variety-picker-tip mono">
              <span>Tip:</span> Combine 3 or more for 100% bio-synergy harmony.
            </div>
          </div>

          {/* Center: The Crystal Bowl Stage */}
          <div className="glass crystal-bowl-stage">
            <div className={`crystal-bowl-container ${isSynergyMax ? 'bowl-golden-aura' : ''}`}>
              <div className="bowl-rim-glow" />
              <div className="bowl-inner-elixir">
                {selectedIds.length === 0 ? (
                  <div className="bowl-empty-msg mono">
                    <span>Bowl is waiting.</span>
                    <small>Tap varieties on the left to add living greens.</small>
                  </div>
                ) : (
                  <div className="bowl-floating-leaves">
                    {selectedIds.map((id, index) => {
                      const v = ELIXIR_VARIETIES.find((item) => item.id === id)
                      return (
                        <div
                          key={id}
                          className="floating-leaf-chip"
                          style={{
                            '--chip-color': v?.color || 'var(--chlorophyll-glow)',
                            '--idx': index,
                          } as React.CSSProperties}
                        >
                          <span className="leaf-sprout-dot" />
                          <span className="leaf-label mono">{v?.name}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="bowl-liquid-wave" />
            </div>

            {/* Synergy Gauge HUD */}
            <div className="synergy-hud-pill">
              <span className="mono synergy-label">BIO-SYNERGY SCORE:</span>
              <span className="mono synergy-score" style={{ color: isSynergyMax ? 'var(--champagne-gold)' : 'var(--chlorophyll-glow)' }}>
                {synergy}%
              </span>
              {isSynergyMax && (
                <span className="synergy-gold-badge">
                  <Sparkles size={12} /> Peak Potency Locked
                </span>
              )}
            </div>
          </div>

          {/* Right: The 4 Bio-Meters & 1-Click Purchase */}
          <div className="glass bio-meters-panel">
            <div className="panel-header-row">
              <span className="mono picker-tag">2. Real-Time Cellular Bio-Meters</span>
            </div>

            <div className="bio-meters-list">
              {BIO_METERS.map((m, idx) => {
                const val = meterValues[idx]
                return (
                  <div key={m.key} className="bio-meter-item">
                    <div className="meter-label-row">
                      <span className="meter-name">{m.label}</span>
                      <span className="meter-percent mono">{val}%</span>
                    </div>
                    <div className="meter-track">
                      <div
                        className="meter-fill"
                        style={{
                          width: `${val}%`,
                          background:
                            val > 80
                              ? 'linear-gradient(90deg, #2CE67F, #D4AF37)'
                              : 'var(--chlorophyll-glow)',
                        }}
                      />
                    </div>
                    <span className="meter-nutrients mono">{m.nutrients}</span>
                  </div>
                )
              })}
            </div>

            {/* Custom Box Checkout Card */}
            <div className="custom-box-cta-card">
              <div className="box-price-row">
                <div>
                  <h4 className="box-title">KMP Custom Vitality Box</h4>
                  <span className="mono box-sub">
                    {selectedIds.length} Varieties · 4 Fresh Punnets (250g total)
                  </span>
                </div>
                <div className="box-price-tag mono">₹499</div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={selectedIds.length === 0}
                className="btn-order-box interactive-lens"
              >
                {boxAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Harvest Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Harvest This Custom Blend (₹499)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
