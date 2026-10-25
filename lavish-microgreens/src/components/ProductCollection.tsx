import { useState, useRef } from 'react'
import { Plus, Check, ShieldCheck, Sparkles, Utensils, Award, ArrowRight } from 'lucide-react'
import { KMP_FRESH_PRODUCTS, type MicrogreenProduct } from '../data/catalog'
import { useCart } from '../context/CartContext'

interface ProductCollectionProps {
  onViewAllCatalogue?: () => void
}

function ProductCard({ product }: { product: MicrogreenProduct }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const defaultPrice = product.tiers['100g']

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rx = -(y / (rect.height / 2)) * 6
    const ry = (x / (rect.width / 2)) * 6
    setTilt({ rx, ry })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  const handleAdd = () => {
    addItem({
      id: `${product.id}-100g`,
      name: `${product.name} (100g)`,
      price: defaultPrice,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass product-card interactive-lens"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
    >
      {/* Floating Glassmorphic Hygiene Badges */}
      <div className="product-hygiene-badges">
        <span className="glass hygiene-pill mono">
          <ShieldCheck size={12} color="var(--chlorophyll-glow)" />
          100% Pesticide Free
        </span>
        <span className="glass hygiene-pill mono">
          <Sparkles size={12} color="var(--champagne-gold)" />
          Clipped to Order
        </span>
      </div>

      {/* Product Image Box */}
      <div className="product-image-box">
        <img
          src={product.image}
          alt={product.name}
          className="product-photo"
          loading="lazy"
        />
        <div className="product-glass-lid" />
        <span className="harvest-badge mono">{product.tasteCategory}</span>
      </div>

      {/* Card Info */}
      <div className="product-details">
        <div className="product-title-row">
          <div>
            <h3 className="product-name">{product.name}</h3>
            <span className="product-botanical">
              <em>{product.botanical}</em> · 100g Pack
            </span>
          </div>
          <span className="product-price mono">₹{defaultPrice}</span>
        </div>

        {/* Tasting Notes */}
        <div className="product-tasting-box">
          <span className="mono tasting-label">TASTING PROFILE:</span>
          <span className="tasting-notes">"{product.taste}"</span>
        </div>

        {/* Benefits snippet */}
        <div className="product-pairings-row">
          <Utensils size={12} color="var(--text-muted)" />
          <span className="product-benefits-snippet">{product.benefits}</span>
        </div>

        {/* Available sizes pills */}
        <div className="product-metrics-grid">
          {Object.entries(product.tiers).slice(0, 3).map(([sz, pr]) => (
            <div key={sz} className="metric-chip">
              <span className="metric-lbl mono">{sz}</span>
              <span className="metric-val mono">₹{pr}</span>
            </div>
          ))}
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAdd}
          className={`btn-add-harvest ${added ? 'btn-add-harvest--added' : ''} interactive-lens`}
          aria-label={`Add ${product.name} to harvest bag`}
        >
          {added ? (
            <>
              <Check size={16} />
              <span>Added to Harvest Bag</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Harvest to Bag · ₹{defaultPrice}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function ProductCollection({ onViewAllCatalogue }: ProductCollectionProps) {
  // Show first 4 flagship products on homepage
  const featured = KMP_FRESH_PRODUCTS.slice(0, 4)

  return (
    <section id="collection" className="collection-section" aria-label="Harvest Collection">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header-centered">
          <span className="eyebrow">KMP Living Harvest</span>
          <h2 className="section-title">
            Freshly clipped microgreens, <br />
            <em>grown with love in Hyderabad</em>.
          </h2>
          <p className="lead section-lead-centered">
            Every batch is cultivated with 100% pure RO water, non-GMO seeds, and zero chemical pesticides. Delivered fresh to your doorstep across Hyderabad.
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="products-grid">
          {featured.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* View Full 11-Variety Catalogue Callout */}
        {onViewAllCatalogue && (
          <div className="catalogue-banner-callout glass">
            <div className="banner-callout-text">
              <h3 className="callout-title">Explore All 11 Microgreen Varieties & Mix Powder</h3>
              <p className="callout-desc">
                From Beetroot, Wheatgrass and Methi to our powerful 5-in-1 Mix Microgreens Powder and weekly subscription packs from ₹199.
              </p>
            </div>
            <button
              type="button"
              onClick={onViewAllCatalogue}
              className="btn-open-catalogue interactive-lens"
            >
              <span>View Full Catalogue & Pricing</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Collection Hygiene Guarantee Footer Pill */}
        <div className="glass harvest-guarantee-strip">
          <div className="guarantee-item">
            <Award size={18} color="var(--champagne-gold)" />
            <span>0% Chemical Pesticides or Fertilizers</span>
          </div>
          <div className="guarantee-separator" />
          <div className="guarantee-item">
            <ShieldCheck size={18} color="var(--chlorophyll-glow)" />
            <span>100% RO Purified Water Cultivation</span>
          </div>
          <div className="guarantee-separator" />
          <div className="guarantee-item">
            <Sparkles size={18} color="var(--champagne-gold)" />
            <span>Direct Hyderabad Delivery</span>
          </div>
        </div>
      </div>
    </section>
  )
}
