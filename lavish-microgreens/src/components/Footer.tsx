import { Calendar, ShieldCheck, PhoneCall, MapPin } from 'lucide-react'
import { scrollToId } from '../hooks/useLenis'
import { KMP_INFO } from '../data/catalog'
import KmpBrandLogo from './KmpBrandLogo'

interface FooterProps {
  onNavigateCatalogue?: () => void
}

export default function Footer({ onNavigateCatalogue }: FooterProps) {
  const HARVEST_DAYS = [
    { day: 'MON', date: 'Hyderabad Dispatch', status: 'Clipped & Delivered', open: true },
    { day: 'WED', date: 'Sunrise Batch', status: 'Germinating Trays', open: true },
    { day: 'FRI', date: 'Weekend Harvest', status: 'Open for Orders', open: true },
    { day: 'SUN', date: 'Subscription Route', status: 'Doorstep Deliveries', open: true },
  ]

  return (
    <footer className="footer-section" aria-label="Page Footer">
      {/* Decorative Botanical SVG Line Art Divider */}
      <div className="botanical-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 24 Q300 48 600 24 T1200 24"
            stroke="var(--champagne-gold)"
            strokeOpacity="0.25"
            strokeWidth="1.2"
          />
          <circle cx="600" cy="24" r="5" fill="var(--champagne-gold)" />
          <path d="M595 18 C590 12 590 6 600 6 C610 6 610 12 605 18 Z" fill="var(--chlorophyll-glow)" />
        </svg>
      </div>

      <div className="container footer-content-grid">
        {/* Top: Weekly Harvest Schedule Calendar */}
        <div className="harvest-calendar-banner glass-dark">
          <div className="calendar-header">
            <div className="cal-title-group">
              <Calendar size={18} color="var(--champagne-gold)" />
              <h3 className="cal-title">KMP Microgreens Harvest & Delivery Schedule</h3>
            </div>
            <span className="mono cal-sub">Zero Waste · All Punnets Clipped Fresh to Order in Hyderabad</span>
          </div>

          <div className="harvest-days-grid">
            {HARVEST_DAYS.map((slot, i) => (
              <div key={i} className={`harvest-slot-card ${slot.open ? 'slot-open' : 'slot-closed'}`}>
                <div className="slot-day mono">{slot.day}</div>
                <div className="slot-date mono">{slot.date}</div>
                <div className="slot-status-pill mono">
                  <span className="slot-dot dot-green" />
                  <span>{slot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Columns: Brand, Navigation, Contact */}
        <div className="footer-columns-row">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo" style={{ marginBottom: '1.25rem' }}>
              <KmpBrandLogo height={52} showTagline={true} theme="dark" />
            </div>
            <p className="footer-brand-bio">
              {KMP_INFO.tagline}. Small leaves, big power! Premium organic living microgreens and dehydrated 5-in-1 superfood powder cultivated sustainably in Hyderabad.
            </p>

            <div className="footer-contact-details mono">
              <div className="footer-contact-item">
                <MapPin size={15} color="var(--chlorophyll-glow)" />
                <span>{KMP_INFO.location}</span>
              </div>
              <div className="footer-contact-item">
                <PhoneCall size={15} color="var(--champagne-gold)" />
                <span>Customer Care: +91 {KMP_INFO.phone}</span>
              </div>
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--chlorophyll-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <a href={KMP_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {KMP_INFO.instagram}
                </a>
              </div>
            </div>

            {/* Official FSSAI Compliance Section in Footer */}
            <div className="footer-certifications">
              <span className="cert-pill mono cert-pill--fssai">
                <ShieldCheck size={14} color="var(--chlorophyll-glow)" /> FSSAI Lic. No: {KMP_INFO.fssai}
              </span>
              <span className="cert-pill mono">100% Non-GMO Seeds</span>
              <span className="cert-pill mono">0% Chemical Pesticides</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title mono">EXPLORE</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateCatalogue) onNavigateCatalogue()
                  }}
                  className="footer-link footer-link--highlight"
                >
                  🌿 Products Catalogue (All 11 Varieties)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateCatalogue) onNavigateCatalogue()
                  }}
                  className="footer-link"
                >
                  Mix Microgreens Powder (100g)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateCatalogue) onNavigateCatalogue()
                  }}
                  className="footer-link"
                >
                  Subscription Plans (from ₹199)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('revelation')} className="footer-link">
                  The 40× Nutrient Revelation
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('sanctuary')} className="footer-link">
                  Bio-Sanctuary Cleanroom
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Inquiries & Food Safety */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title mono">HYDERABAD URBAN FARM</h4>
            <p className="footer-news-desc">
              Grown locally in Hyderabad with RO purified water, HEPA airflow, and zero chemical fertilizers. Clipped fresh to order every sunrise.
            </p>

            <div className="footer-fssai-box glass">
              <ShieldCheck size={24} color="var(--chlorophyll-glow)" />
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff' }}>
                  FSSAI Certified Food Business
                </strong>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--chlorophyll-glow)' }}>
                  Registration Lic. No: {KMP_INFO.fssai}
                </span>
              </div>
            </div>

            <div className="footer-freshness-promise mono" style={{ marginTop: '1.25rem' }}>
              <span>Freshness Promise:</span> Harvested sunrise mornings and delivered chilled across Hyderabad.
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright mono">
            © {new Date().getFullYear()} KMP Micro Greens. FSSAI Central License: {KMP_INFO.fssai}. Eat Clean · Live Green · Stay Healthy.
          </div>
          <div className="footer-legal-links mono">
            <span className="legal-link">Hyderabad, Telangana</span>
            <span className="legal-link">Pesticide Free</span>
            <span className="legal-link">Naturally Grown</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
