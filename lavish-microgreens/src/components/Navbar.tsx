import { useEffect, useState } from 'react'
import { Sparkles, ChevronRight, X, CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { scrollToId } from '../hooks/useLenis'
import KmpBrandLogo from './KmpBrandLogo'

interface NavbarProps {
  currentPage: 'home' | 'catalogue'
  setCurrentPage: (page: 'home' | 'catalogue') => void
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const { count, total, items, lastAddedAt, clearCart } = useCart()
  const [sproutPulse, setSproutPulse] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  // Trigger sprout pop animation whenever item is added
  useEffect(() => {
    if (lastAddedAt > 0) {
      setSproutPulse(true)
      const t = setTimeout(() => setSproutPulse(false), 800)
      return () => clearTimeout(t)
    }
  }, [lastAddedAt])

  const navigateTo = (page: 'home' | 'catalogue', sectionId?: string) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    if (page === 'home' && sectionId) {
      setTimeout(() => scrollToId(sectionId), 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCheckout = () => {
    setOrderConfirmed(true)
    setTimeout(() => {
      clearCart()
      setOrderConfirmed(false)
      setCartOpen(false)
    }, 3500)
  }

  return (
    <>
      <header className="navbar-wrapper">
        <nav className="glass navbar-pill navbar-pill--wide" aria-label="Main Navigation">
          {/* Brand Logo with modern KMP Microgreens Vector Logo */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="navbar-brand"
            aria-label="KMP Microgreens Home"
          >
            <KmpBrandLogo height={40} showTagline={false} />
          </button>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`nav-link ${currentPage === 'home' ? 'nav-link--active' : ''}`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => navigateTo('catalogue')}
              className={`nav-link nav-link--highlight ${currentPage === 'catalogue' ? 'nav-link--active' : ''}`}
            >
              <span>Products Catalogue</span>
              <span className="nav-pill-badge">All 11 + Powder</span>
            </button>

            {currentPage === 'home' ? (
              <>
                <button type="button" onClick={() => scrollToId('revelation')} className="nav-link">
                  Why Microgreens
                </button>
                <button type="button" onClick={() => scrollToId('sanctuary')} className="nav-link">
                  Bio-Sanctuary
                </button>
                <button type="button" onClick={() => scrollToId('elixir')} className="nav-link">
                  Elixir Lab
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => scrollToId('fresh-greens')} className="nav-link">
                  Fresh Greens (11)
                </button>
                <button type="button" onClick={() => scrollToId('powder-section')} className="nav-link">
                  Mix Powder
                </button>
                <button type="button" onClick={() => scrollToId('subscriptions-section')} className="nav-link">
                  Subscription Plans
                </button>
                <button type="button" onClick={() => scrollToId('pricelist-section')} className="nav-link">
                  Price Matrix
                </button>
              </>
            )}
          </div>

          {/* Right Action Group */}
          <div className="navbar-actions">
            {/* Harvest Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(!cartOpen)}
              className={`cart-pill ${sproutPulse ? 'cart-pill--bloom' : ''}`}
              aria-label={`Cart contains ${count} items`}
            >
              <div className="sprout-status-indicator">
                <svg
                  className={`cart-sprout-svg ${count > 0 ? 'grown' : ''} ${sproutPulse ? 'pulse' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    transform: `scale(${Math.min(1.35, 0.95 + count * 0.1)})`,
                    transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <path d="M12 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M12 13C8 13 6 9 6 6C9 6 12 8 12 13Z"
                    fill={count > 0 ? 'var(--chlorophyll-glow)' : 'transparent'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 11C16 11 18 7 18 4C15 4 12 6 12 11Z"
                    fill={count > 1 ? 'var(--champagne-gold)' : 'transparent'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="cart-text">Harvest Bag</span>
              <span className="cart-badge mono">{count}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-bar" />
              <span className="menu-bar" />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Backdrop & Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="glass mobile-dropdown" role="dialog" aria-label="Mobile Navigation">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`mobile-nav-link ${currentPage === 'home' ? 'mobile-nav-link--active' : ''}`}
              >
                🏠 Home
              </button>
              <button
                type="button"
                onClick={() => navigateTo('catalogue')}
                className={`mobile-nav-link mobile-nav-link--gold ${currentPage === 'catalogue' ? 'mobile-nav-link--active' : ''}`}
              >
                🌿 Products Catalogue (All 11 + Powder)
              </button>

              <div className="mobile-menu-divider" />

              {currentPage === 'catalogue' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('fresh-greens')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    🌱 Fresh Greens (11 Varieties)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('powder-section')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    ✨ Mix Powder Superfood
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('subscriptions-section')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    📦 Subscription Plans (from ₹199)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('pricelist-section')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    📊 Full Price Matrix Table
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('revelation')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    ⚡ The 40× Nutrient Revelation
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('collection')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    🌱 Living Harvest Collection
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('elixir')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    🧪 Cellular Elixir Lab
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToId('sanctuary')
                    }}
                    className="mobile-nav-link mobile-sublink"
                  >
                    🔬 Bio-Sanctuary Cleanroom Tour
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* Floating Cart Drawer */}
        {cartOpen && (
          <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
            <div className="glass cart-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="cart-drawer-header">
                <div>
                  <h3 className="cart-drawer-title">KMP Harvest Bag</h3>
                  <p className="cart-drawer-subtitle mono">Freshly Clipped Living Microgreens</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="cart-close-btn"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="cart-items-list">
                {items.length === 0 ? (
                  <div className="cart-empty-state">
                    <div className="empty-sprout-art">
                      <Sparkles size={32} color="var(--champagne-gold)" />
                    </div>
                    <p>Your KMP harvest bag is empty.</p>
                    <small>Explore our 11 living varieties or mix powder.</small>
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false)
                        navigateTo('catalogue')
                      }}
                      className="btn-browse-cat mono"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : orderConfirmed ? (
                  <div className="cart-empty-state">
                    <CheckCircle2 size={42} color="var(--chlorophyll-glow)" style={{ marginBottom: '1rem' }} />
                    <h4 style={{ color: 'var(--emerald-canopy)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      Harvest Order Received!
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      Your fresh batch will be clipped at sunrise and delivered in Hyderabad.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-details mono">
                          Qty: {item.qty} × ₹{item.price}
                        </span>
                      </div>
                      <span className="cart-item-price mono">₹{item.price * item.qty}</span>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && !orderConfirmed && (
                <div className="cart-drawer-footer">
                  <div className="cart-subtotal-row">
                    <span>Order Total</span>
                    <span className="mono bold">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="cart-guarantee-pill">
                    <span className="pulse-dot" />
                    <span>Free local delivery in Hyderabad</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="btn-checkout"
                  >
                    <span>Proceed to Order (₹{total.toFixed(0)})</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
