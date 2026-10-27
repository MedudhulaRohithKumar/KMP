import { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  Check,
  Plus,
  Flame,
  Award,
  Zap,
  Heart,
  Eye,
  Filter,
  MapPin,
} from 'lucide-react'
import {
  KMP_FRESH_PRODUCTS,
  KMP_SUBSCRIPTION_PLANS,
  KMP_POWDER_PRODUCT,
  KMP_INFO,
  type MicrogreenProduct,
  type SubscriptionPlan,
} from '../data/catalog'
import { useCart } from '../context/CartContext'
import KmpBrandLogo from './KmpBrandLogo'

type CategoryFilter = 'all' | 'fresh' | 'powder' | 'subscriptions' | 'pricelist'

export default function ProductsCataloguePage() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [selectedTiers, setSelectedTiers] = useState<{ [id: string]: string }>({
    sunflower: '100g',
    radish: '100g',
    broccoli: '100g',
    'purple-radish': '100g',
    'pea-shoots': '100g',
    'mustard-greens': '100g',
    fenugreek: '100g',
    beetroot: '100g',
    wheatgrass: '100g',
    'mixed-microgreens': '100g',
    'premium-mix': '100g',
  })
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({})

  const handleSelectTier = (productId: string, tier: string) => {
    setSelectedTiers((prev) => ({ ...prev, [productId]: tier }))
  }

  const handleAddFresh = (prod: MicrogreenProduct) => {
    const tier = selectedTiers[prod.id] || '100g'
    const price = prod.tiers[tier] || prod.tiers['100g']
    addItem({
      id: `${prod.id}-${tier}`,
      name: `${prod.name} (${tier})`,
      price,
    })
    setAddedItems((prev) => ({ ...prev, [prod.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [prod.id]: false }))
    }, 1500)
  }

  const handleAddPowder = () => {
    addItem({
      id: KMP_POWDER_PRODUCT.id,
      name: `${KMP_POWDER_PRODUCT.name} (${KMP_POWDER_PRODUCT.weight})`,
      price: KMP_POWDER_PRODUCT.price,
    })
    setAddedItems((prev) => ({ ...prev, powder: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, powder: false }))
    }, 1500)
  }

  const handleAddSubscription = (plan: SubscriptionPlan) => {
    addItem({
      id: `sub-${plan.id}`,
      name: `${plan.name} (${plan.boxes})`,
      price: plan.price,
    })
    setAddedItems((prev) => ({ ...prev, [plan.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [plan.id]: false }))
    }, 1500)
  }

  return (
    <div className="catalogue-page">
      {/* Catalogue Header */}
      <section className="catalogue-hero">
        <div className="container">
          <div className="catalogue-hero-content">
            <span className="eyebrow">Official Product Line & Pricing</span>
            <h1 className="catalogue-title display">
              KMP <em>Microgreens</em> Catalogue
            </h1>
            <p className="catalogue-sub lead">
              Freshly harvested living greens, potent dehydrated mix superfood powder, and weekly subscription deliveries cultivated in Hyderabad.
            </p>

            {/* Credibility & Location Chips */}
            <div className="catalogue-meta-strip">
              <div className="meta-pill mono">
                <ShieldCheck size={14} color="var(--chlorophyll-glow)" />
                <span>100% Pesticide & Chemical Free</span>
              </div>
              <div className="meta-pill mono">
                <Award size={14} color="var(--champagne-gold)" />
                <span>RO Purified Water Cultivation</span>
              </div>
              <div className="meta-pill mono">
                <MapPin size={14} color="var(--chlorophyll-glow)" />
                <span>{KMP_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="catalogue-tabs-bar glass">
            <div className="tabs-list">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              >
                <Filter size={14} /> All Offerings
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('fresh')}
                className={`tab-btn ${activeCategory === 'fresh' ? 'active' : ''}`}
              >
                Fresh Microgreens (11 Varieties)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('powder')}
                className={`tab-btn ${activeCategory === 'powder' ? 'active' : ''}`}
              >
                Mix Powder (100g Superfood)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('subscriptions')}
                className={`tab-btn ${activeCategory === 'subscriptions' ? 'active' : ''}`}
              >
                Subscription Plans (from ₹199)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('pricelist')}
                className={`tab-btn ${activeCategory === 'pricelist' ? 'active' : ''}`}
              >
                Full Price Matrix
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: MIX MICROGREENS POWDER SHOWCASE */}
      {(activeCategory === 'all' || activeCategory === 'powder') && (
        <section id="powder-section" className="cat-section powder-showcase-section">
          <div className="container">
            <div className="powder-card-layout glass">
              {/* Left Column: Product Visual & Poster */}
              <div className="powder-visual-col">
                <div className="powder-img-box" style={{ background: 'linear-gradient(145deg, #07170E 0%, #0F2D1C 50%, #05120A 100%)', borderRadius: '16px', padding: '2.5rem 1.5rem', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.3)', boxShadow: '0 12px 36px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', background: 'radial-gradient(circle, rgba(44, 230, 127, 0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                    <KmpBrandLogo variant="symbol" height={90} />
                  </div>
                  <span className="mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--champagne-gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Luxury Pouch · 100g Net Wt.
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#ffffff', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                    Dehydrated Mix Microgreens Powder
                  </h3>
                  <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--chlorophyll-glow)', marginBottom: '1.25rem' }}>
                    Radish · Broccoli · Sunflower · Fenugreek · Mustard
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', borderRadius: '999px', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.4)', color: 'var(--champagne-gold)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    <Sparkles size={14} />
                    <span>Up to 40× Nutrient Density</span>
                  </div>
                </div>

                {/* 5 Ingredients Badges */}
                <div className="powder-ingredients-row">
                  <span className="mono ing-label">5 Pure Ingredients:</span>
                  <div className="ing-pills-wrap">
                    {KMP_POWDER_PRODUCT.ingredients.map((ing, i) => (
                      <span key={i} className="ing-chip mono">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Benefits, Nutrition Table & Pricing */}
              <div className="powder-details-col">
                <div className="powder-header">
                  <span className="eyebrow">100% Organic Plant-Based</span>
                  <h2 className="powder-title">{KMP_POWDER_PRODUCT.name}</h2>
                  <p className="powder-tagline mono">{KMP_POWDER_PRODUCT.tagline}</p>
                </div>

                <p className="powder-desc">{KMP_POWDER_PRODUCT.description}</p>

                {/* Benefits Grid */}
                <div className="powder-benefits-grid">
                  <div className="benefit-item">
                    <ShieldCheck size={18} color="var(--chlorophyll-glow)" />
                    <div>
                      <strong>Boosts Immunity</strong>
                      <small>Vitamins A, C, E, Iron & Zinc</small>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Heart size={18} color="var(--radish-ruby)" />
                    <div>
                      <strong>Supports Heart Health</strong>
                      <small>Healthy cholesterol & circulation</small>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Zap size={18} color="var(--champagne-gold)" />
                    <div>
                      <strong>Natural Energy Boost</strong>
                      <small>Plant protein & B-vitamins</small>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Eye size={18} color="var(--chlorophyll-glow)" />
                    <div>
                      <strong>Better Eye Health</strong>
                      <small>Lutein, zeaxanthin & beta-carotene</small>
                    </div>
                  </div>
                </div>

                {/* Nutrition Facts Table */}
                <div className="nutrition-facts-box">
                  <div className="nutrition-header">
                    <span className="mono">NUTRITION FACTS (Approx. per 100g)</span>
                    <span className="mono net-wt">Net Wt. 100g</span>
                  </div>
                  <div className="nutrition-metrics-grid mono">
                    {Object.entries(KMP_POWDER_PRODUCT.nutritionFacts).map(([k, v]) => (
                      <div key={k} className="nutri-stat">
                        <span className="nutri-k">{k}:</span>
                        <span className="nutri-v">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase CTA */}
                <div className="powder-purchase-row">
                  <div className="powder-price-box">
                    <span className="powder-price mono">₹{KMP_POWDER_PRODUCT.price}</span>
                    <span className="powder-unit mono">per 100g airtight pouch</span>
                  </div>

                  <div className="powder-cta-buttons">
                    <button
                      type="button"
                      onClick={handleAddPowder}
                      className={`btn-add-powder ${addedItems.powder ? 'added' : ''} interactive-lens`}
                    >
                      {addedItems.powder ? (
                        <>
                          <Check size={16} /> Added to Harvest Bag
                        </>
                      ) : (
                        <>
                          <Plus size={16} /> Add to Harvest Bag · ₹{KMP_POWDER_PRODUCT.price}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: FRESH MICROGREENS (11 VARIETIES) */}
      {(activeCategory === 'all' || activeCategory === 'fresh') && (
        <section id="fresh-greens" className="cat-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="eyebrow">Farm Fresh Harvest</span>
              <h2 className="section-title">
                Fresh Microgreens <em>(11 Varieties)</em>
              </h2>
              <p className="lead section-lead-centered">
                Harvested to order from our Hyderabad facility. Select your preferred packaging size (50g to 1kg) for home dining or culinary service.
              </p>
            </div>

            <div className="kmp-products-grid">
              {KMP_FRESH_PRODUCTS.map((prod) => {
                const activeTier = selectedTiers[prod.id] || '100g'
                const price = prod.tiers[activeTier]
                const isAdded = addedItems[prod.id]

                return (
                  <div key={prod.id} className="glass kmp-prod-card interactive-lens">
                    {/* Badge */}
                    <div className="kmp-card-top-badge">
                      <span className="taste-tag mono">{prod.tasteCategory}</span>
                      {prod.popular && <span className="popular-badge mono">Bestseller</span>}
                    </div>

                    {/* Image */}
                    <div className="kmp-prod-img-box">
                      <img src={prod.image} alt={prod.name} className="kmp-prod-img" loading="lazy" />
                    </div>

                    {/* Title & Info */}
                    <div className="kmp-card-body">
                      <h3 className="kmp-prod-title">{prod.name}</h3>
                      <span className="kmp-prod-botanical">
                        <em>{prod.botanical}</em>
                      </span>

                      <p className="kmp-prod-taste">"{prod.taste}"</p>
                      <p className="kmp-prod-benefits">{prod.benefits}</p>

                      {/* Weight Selector */}
                      <div className="weight-selector-block">
                        <span className="weight-label mono">Select Weight:</span>
                        <div className="weight-buttons-row">
                          {(['50g', '100g', '250g', '500g', '1kg'] as const).map((tier) => (
                            <button
                              type="button"
                              key={tier}
                              onClick={() => handleSelectTier(prod.id, tier)}
                              className={`tier-btn mono ${activeTier === tier ? 'active' : ''}`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="kmp-card-footer">
                        <div className="kmp-price-display">
                          <span className="mono current-price">₹{price}</span>
                          <span className="mono current-tier">/ {activeTier}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddFresh(prod)}
                          className={`btn-add-kmp-full ${isAdded ? 'added' : ''}`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={15} /> Added
                            </>
                          ) : (
                            <>
                              <Plus size={15} /> Add to Bag
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: SUBSCRIPTION PLANS */}
      {(activeCategory === 'all' || activeCategory === 'subscriptions') && (
        <section id="subscriptions-section" className="cat-section subscriptions-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="eyebrow eyebrow--light">Doorstep Wellness Subscription</span>
              <h2 className="section-title text-light">
                Fresh Microgreens <em>Subscription Plans</em>
              </h2>
              <p className="lead section-lead-centered text-light-muted">
                Enjoy continuous weekly harvests delivered cold and fresh to your doorstep in Hyderabad. Save money and never miss your daily cellular nutrition.
              </p>
            </div>

            <div className="subscriptions-grid">
              {KMP_SUBSCRIPTION_PLANS.map((plan) => {
                const isAdded = addedItems[plan.id]
                return (
                  <div
                    key={plan.id}
                    className={`glass-dark sub-plan-card ${plan.popular ? 'sub-plan-card--popular' : ''}`}
                  >
                    {plan.popular && (
                      <div className="popular-ribbon mono">
                        <Flame size={12} /> MOST POPULAR
                      </div>
                    )}

                    <div className="plan-header">
                      <h3 className="plan-name">{plan.name}</h3>
                      <div className="plan-boxes mono">{plan.boxes}</div>
                      <div className="plan-price-row">
                        <span className="plan-currency mono">₹</span>
                        <span className="plan-price mono">{plan.price}</span>
                      </div>
                      <p className="plan-desc">{plan.description}</p>
                    </div>

                    <ul className="plan-features-list">
                      {plan.features.map((feat, i) => (
                        <li key={i}>
                          <Check size={14} color="var(--chlorophyll-glow)" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="plan-cta-block">
                      <button
                        type="button"
                        onClick={() => handleAddSubscription(plan)}
                        className={`btn-sub-subscribe ${isAdded ? 'added' : ''}`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} /> Subscribed to Bag
                          </>
                        ) : (
                          <>
                            <Plus size={16} /> Add {plan.name} (₹{plan.price})
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: COMPLETE PRICE LIST MATRIX */}
      {(activeCategory === 'all' || activeCategory === 'pricelist') && (
        <section id="pricelist-section" className="cat-section price-matrix-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="eyebrow">Transparent Pricing</span>
              <h2 className="section-title">
                Complete <em>Fresh Microgreens</em> Price List
              </h2>
              <p className="lead section-lead-centered">
                All prices in Indian Rupees (₹). Naturally grown, pesticide-free, clipped to order.
              </p>
            </div>

            <div className="table-scroll-hint mono">
              <span>👉 Swipe table horizontally to see all weight tiers & prices</span>
            </div>

            <div className="glass price-table-container">
              <table className="kmp-price-table">
                <thead>
                  <tr>
                    <th>Microgreen Variety</th>
                    <th>50g</th>
                    <th>100g</th>
                    <th>250g</th>
                    <th>500g</th>
                    <th>1kg</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {KMP_FRESH_PRODUCTS.map((prod) => (
                    <tr key={prod.id}>
                      <td className="prod-name-cell">
                        <strong>{prod.name}</strong>
                        <small>{prod.botanical}</small>
                      </td>
                      <td className="mono">₹{prod.tiers['50g']}</td>
                      <td className="mono bold-cell">₹{prod.tiers['100g']}</td>
                      <td className="mono">₹{prod.tiers['250g']}</td>
                      <td className="mono">₹{prod.tiers['500g']}</td>
                      <td className="mono highlight-cell">₹{prod.tiers['1kg']}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleAddFresh(prod)}
                          className="table-add-btn mono"
                        >
                          <Plus size={13} /> Add 100g
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
