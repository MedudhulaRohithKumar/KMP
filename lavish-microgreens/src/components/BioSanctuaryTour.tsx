import { useState } from 'react'
import {
  ShieldCheck,
  Scan,
  Droplets,
  Sun,
  Scissors,
  Check,
  Sparkles,
  Lock,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'
import KmpBrandLogo from './KmpBrandLogo'

export default function BioSanctuaryTour() {
  const [currentStage, setCurrentStage] = useState(1)
  const [unlockedStages, setUnlockedStages] = useState<number[]>([1])

  // Interactive states for each stage
  const [isScanning, setIsScanning] = useState(false)
  const [seedScanned, setSeedScanned] = useState(false)

  const [mistActive, setMistActive] = useState(false)
  const [lightSpectrum, setLightSpectrum] = useState(50)

  const [laserCutDone, setLaserCutDone] = useState(false)
  const [discountClaimed, setDiscountClaimed] = useState(false)

  // Stage 1 scan handler
  const handleScanSeeds = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setSeedScanned(true)
      unlockNext(2)
    }, 1000)
  }

  // Stage 2 mist toggle
  const handleToggleMist = () => {
    setMistActive(true)
    setTimeout(() => {
      unlockNext(3)
    }, 900)
  }

  // Stage 3 spectrum change
  const handleSpectrumChange = (val: number) => {
    setLightSpectrum(val)
    if (val >= 75 && !unlockedStages.includes(4)) {
      unlockNext(4)
    }
  }

  // Stage 4 clean laser cut
  const handleLaserCut = () => {
    setLaserCutDone(true)
    setTimeout(() => {
      unlockNext(5)
    }, 800)
  }

  // Stage 5 discount claim
  const handleClaimDiscount = () => {
    setDiscountClaimed(true)
  }

  const unlockNext = (next: number) => {
    if (!unlockedStages.includes(next)) {
      setUnlockedStages((prev) => [...prev, next])
    }
  }

  const resetTour = () => {
    setCurrentStage(1)
    setUnlockedStages([1])
    setSeedScanned(false)
    setMistActive(false)
    setLightSpectrum(50)
    setLaserCutDone(false)
    setDiscountClaimed(false)
  }

  return (
    <section id="sanctuary" className="sanctuary-section" aria-label="Bio-Sanctuary Cleanroom Tour">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header-centered">
          <span className="eyebrow eyebrow--light">KMP Cultivation Standards</span>
          <h2 className="section-title text-light">
            Step into the <em>KMP Bio-Sanctuary</em>. <br />
            Cultivate your living harvest.
          </h2>
          <p className="lead section-lead-centered text-light-muted">
            Located in Madha Nagar, BHEL Hyderabad, our facility operates under zero chemical pesticides, pure triple-filtered RO mist, and non-GMO certified seeds.
          </p>
        </div>

        {/* Cleanroom Interactive Console Shell */}
        <div className="glass-dark cleanroom-console">
          {/* Top Bar / HUD */}
          <div className="console-hud-bar">
            <div className="hud-badge-group">
              <div className="hud-status-pill">
                <span className="pulse-dot" />
                <span className="mono">HYDERABAD FACILITY</span>
              </div>
              <div className="hud-score-pill">
                <ShieldCheck size={16} color="var(--chlorophyll-glow)" />
                <span className="mono">100% PURE ORGANIC ENVIRONMENT</span>
              </div>
            </div>

            <div className="hud-stepper">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => unlockedStages.includes(s) && setCurrentStage(s)}
                  disabled={!unlockedStages.includes(s)}
                  className={`stepper-node ${currentStage === s ? 'active' : ''} ${
                    unlockedStages.includes(s) ? 'unlocked' : 'locked'
                  }`}
                  aria-label={`Stage ${s}`}
                >
                  <span className="mono">{s}</span>
                  {unlockedStages.includes(s + 1) && <Check size={10} className="check-icon" />}
                </button>
              ))}
            </div>

            <button onClick={resetTour} className="btn-hud-reset" title="Reset Simulation">
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Stage Viewport */}
          <div className="console-main-stage">
            {/* STAGE 1 */}
            {currentStage === 1 && (
              <div className="stage-content fade-in">
                <div className="stage-info">
                  <span className="mono stage-number">STAGE 01 / 05</span>
                  <h3 className="stage-title">Organic Non-GMO Seed Selection</h3>
                  <p className="stage-text">
                    Every seed is verified for non-GMO origin and zero chemical coatings.
                    Perform a seed purity scan to confirm 100% natural compliance.
                  </p>

                  <div className="stage-action-box">
                    <button
                      onClick={handleScanSeeds}
                      disabled={isScanning || seedScanned}
                      className={`btn-stage-action ${seedScanned ? 'completed' : ''} interactive-lens`}
                    >
                      <Scan size={18} className={isScanning ? 'spin-slow' : ''} />
                      <span>{seedScanned ? 'Purity Confirmed: 100% Natural' : isScanning ? 'Scanning Seed DNA...' : 'Click to Scan Seeds'}</span>
                    </button>
                    {seedScanned && (
                      <div className="badge-unlocked-pill">
                        <Sparkles size={14} color="var(--champagne-gold)" />
                        <span>Unlocked: "Zero Chemicals / 100% Organic"</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="stage-visual">
                  <div className={`seed-scan-chamber ${isScanning ? 'scanning' : ''} ${seedScanned ? 'scanned' : ''}`}>
                    <div className="scan-laser-line" />
                    <div className="seeds-cluster">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="seed-particle" style={{ '--i': i } as React.CSSProperties} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2 */}
            {currentStage === 2 && (
              <div className="stage-content fade-in">
                <div className="stage-info">
                  <span className="mono stage-number">STAGE 02 / 05</span>
                  <h3 className="stage-title">Pure RO Water & Cloud Mist</h3>
                  <p className="stage-text">
                    Municipal tap water is never directly sprayed. We filter water through a triple RO system, providing pristine hydration to tender roots.
                  </p>

                  <div className="stage-action-box">
                    <button
                      onClick={handleToggleMist}
                      className={`btn-stage-action ${mistActive ? 'completed' : ''} interactive-lens`}
                    >
                      <Droplets size={18} />
                      <span>{mistActive ? 'Purified RO Mist Engaged' : 'Activate RO Cloud Mist'}</span>
                    </button>
                    {mistActive && (
                      <div className="badge-unlocked-pill">
                        <Check size={14} color="var(--chlorophyll-glow)" />
                        <span>100% Clean Hydration Active</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="stage-visual">
                  <div className={`mist-chamber ${mistActive ? 'mist-active' : ''}`}>
                    <div className="mist-cloud-overlay" />
                    <div className="water-droplets-grid">
                      {[...Array(16)].map((_, i) => (
                        <span key={i} className="viewport-drop" style={{ '--d': i } as React.CSSProperties} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3 */}
            {currentStage === 3 && (
              <div className="stage-content fade-in">
                <div className="stage-info">
                  <span className="mono stage-number">STAGE 03 / 05</span>
                  <h3 className="stage-title">Photosynthetic Spectrum Control</h3>
                  <p className="stage-text">
                    Filtered sun-spectrum lighting ensures dense chlorophyll development and peak sulforaphane accumulation during the 7 to 14 day growth cycle.
                  </p>

                  <div className="stage-action-box">
                    <div className="spectrum-dial-container">
                      <div className="spectrum-label-row mono">
                        <span>Dawn Spectrum</span>
                        <span className="gold-text">Solar Zenith (Peak Growth)</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={lightSpectrum}
                        onChange={(e) => handleSpectrumChange(Number(e.target.value))}
                        className="spectrum-range-slider interactive-lens"
                      />
                    </div>
                    {lightSpectrum >= 75 && (
                      <div className="badge-unlocked-pill">
                        <Sun size={14} color="var(--champagne-gold)" />
                        <span>Solar Irradiance: Optimal Cotyledon Bloom</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="stage-visual">
                  <div
                    className="growing-tray-visual"
                    style={{
                      background: `radial-gradient(circle at center, rgba(212, 175, 55, ${
                        lightSpectrum / 100
                      }) 0%, rgba(44, 230, 127, 0.2) 60%, transparent 100%)`,
                    }}
                  >
                    <div
                      className="sprout-tray-growth"
                      style={{
                        transform: `scaleY(${0.65 + (lightSpectrum / 100) * 0.35})`,
                        transition: 'transform 0.3s ease-out',
                      }}
                    >
                      <img src="/images/pea-tendrils.webp" alt="Sprouting tray" className="tray-img" loading="lazy" decoding="async" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4 */}
            {currentStage === 4 && (
              <div className="stage-content fade-in">
                <div className="stage-info">
                  <span className="mono stage-number">STAGE 04 / 05</span>
                  <h3 className="stage-title">Zero-Touch Clean Harvest</h3>
                  <p className="stage-text">
                    Greens are cleanly harvested above the root mat with sanitized tools. Roots and growth medium stay behind, ensuring 100% clean leaves in every punnet.
                  </p>

                  <div className="stage-action-box">
                    <button
                      onClick={handleLaserCut}
                      disabled={laserCutDone}
                      className={`btn-stage-action ${laserCutDone ? 'completed' : ''} interactive-lens`}
                    >
                      <Scissors size={18} />
                      <span>{laserCutDone ? 'Clean Harvest Slice Completed' : 'Click to Perform Clean Harvest'}</span>
                    </button>
                    {laserCutDone && (
                      <div className="badge-unlocked-pill">
                        <ShieldCheck size={14} color="var(--chlorophyll-glow)" />
                        <span>0% Soil Residue · 100% Pure Sprout</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="stage-visual">
                  <div className={`laser-cut-stage ${laserCutDone ? 'cut-done' : ''}`}>
                    <div className="laser-beam-horizontal" />
                    <img src="/images/sunflower.webp" alt="Sunflower shoots before cut" className="cut-tray-img" loading="lazy" decoding="async" />
                    <div className="laser-root-mat mono">Substrate Boundary (Zero Soil Dirt)</div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 5 */}
            {currentStage === 5 && (
              <div className="stage-content fade-in">
                <div className="stage-info">
                  <span className="mono stage-number">STAGE 05 / 05 — READY</span>
                  <h3 className="stage-title">Doorstep Dispatch Across Hyderabad</h3>
                  <p className="stage-text">
                    Packed securely in food-grade vented containers to maintain crispness and vital enzymes until they reach your kitchen.
                  </p>

                  <div className="stage-action-box">
                    {!discountClaimed ? (
                      <button onClick={handleClaimDiscount} className="btn-claim-reward interactive-lens">
                        <Sparkles size={18} className="gold-sparkle" />
                        <span>Unlock "KMP Fresh Insider" 10% Welcome Badge</span>
                      </button>
                    ) : (
                      <div className="discount-reward-card">
                        <div className="reward-header">
                          <Check size={18} color="var(--chlorophyll-glow)" />
                          <span className="mono">10% WELCOME OFFER UNLOCKED</span>
                        </div>
                        <div className="reward-code mono">CODE: KMPFRESH10</div>
                        <small>Apply this welcome code for 10% off your first fresh harvest punnet!</small>
                      </div>
                    )}
                  </div>
                </div>

                  <div className="cold-seal-box" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ filter: 'drop-shadow(0 0 24px rgba(44, 230, 127, 0.4))', marginBottom: '1rem' }}>
                      <KmpBrandLogo variant="symbol" height={130} />
                    </div>
                    <div className="temperature-tag mono">HYDERABAD EXPRESS DELIVERY</div>
                  </div>
              </div>
            )}
          </div>

          {/* Console Navigation Bottom Footer */}
          <div className="console-footer-nav">
            <span className="mono stage-indicator-text">
              Procedure: Step {currentStage} of 5
            </span>

            {currentStage < 5 ? (
              <button
                onClick={() => {
                  if (unlockedStages.includes(currentStage + 1)) {
                    setCurrentStage(currentStage + 1)
                  }
                }}
                disabled={!unlockedStages.includes(currentStage + 1)}
                className="btn-next-stage interactive-lens"
              >
                <span>{unlockedStages.includes(currentStage + 1) ? 'Proceed to Next Step' : 'Complete Action to Advance'}</span>
                {unlockedStages.includes(currentStage + 1) ? <ArrowRight size={16} /> : <Lock size={14} />}
              </button>
            ) : (
              <button onClick={() => setCurrentStage(1)} className="btn-review-tour interactive-lens">
                <span>Restart Tour</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
