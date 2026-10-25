import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Award } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  establishment: string
  accreditation: string
  stars: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'chef-antoine',
    quote:
      'In three-star gastronomy, the difference between good and sublime is water tension and mineral purity. Lavish microgreens do not wilt under warm emulsified sauces; their cotyledons possess a crisp structural snap and peppery brightness that is simply untouchable.',
    author: 'Chef Antoine Laurent',
    title: 'Executive Chef & Owner',
    establishment: "L'Arpège Étoilé (3 Michelin Stars)",
    accreditation: 'Michelin Guide 2025 · Relais & Châteaux',
    stars: 5,
  },
  {
    id: 'dr-elena',
    quote:
      'Most consumers are unaware that mature broccoli degrades its sulforaphane during transit and storage. Lavish harvests at the exact 10-day embryonic peak, preserving live myrosinase enzymes and deliverable phytonutrients that cannot be replicated by synthetic supplements.',
    author: 'Dr. Elena Rostova, Ph.D.',
    title: 'Clinical Cellular Biologist',
    establishment: 'Swiss Institute for Longevity & Epigenetics',
    accreditation: 'Published in Journal of Nutritional Biochemistry',
    stars: 5,
  },
  {
    id: 'marcus-spa',
    quote:
      'Our wellness retreat requires zero-compromise purity. Knowing that every punnet was grown under positive HEPA pressure and clipped with zero human touch gives our ultra-discerning clientele total peace of mind. The sensory difference is remarkable.',
    author: 'Marcus Vance',
    title: 'Wellness Director',
    establishment: 'Aman Sanctuary Residences & Spa',
    accreditation: 'Forbes Travel Guide Five-Star Award',
    stars: 5,
  },
]

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = TESTIMONIALS[activeIdx]

  const next = () => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length)
  const prev = () => setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section id="testimonials" className="testimonials-section" aria-label="Testimonials">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="eyebrow">Trusted by Purists</span>
          <h2 className="section-title">
            From <em>Michelin passes</em> to <br />
            cellular longevity clinics.
          </h2>
          <p className="lead section-lead-centered">
            The world's most demanding palates and medical nutritionists rely on our zero-touch living harvest.
          </p>
        </div>

        {/* Showcase Stage */}
        <div className="testimonials-card-shell glass">
          <div className="testimonials-layout">
            {/* Left: Michelin-Style Plating Photography */}
            <div className="testimonial-image-column">
              <div className="plating-photo-wrapper">
                <img
                  src="/images/chef-plating.jpg"
                  alt="Michelin-star fine dining plating garnished with microgreens and gold leaf"
                  className="plating-image"
                />
                <div className="plating-tag glass mono">
                  <Award size={14} color="var(--champagne-gold)" />
                  <span>Plating: Seared Scallop with Pea Tendrils & Emerald Herb Oil</span>
                </div>
              </div>
            </div>

            {/* Right: Quote Carousel */}
            <div className="testimonial-quote-column">
              <div className="quote-icon-bubble">
                <Quote size={28} color="var(--champagne-gold)" />
              </div>

              {/* Stars */}
              <div className="stars-row">
                {[...Array(current.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--champagne-gold)" color="var(--champagne-gold)" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="testimonial-quote-text display">
                "{current.quote}"
              </blockquote>

              {/* Author & Credibility */}
              <div className="testimonial-author-box">
                <div className="author-name-group">
                  <h4 className="author-name">{current.author}</h4>
                  <span className="author-role mono">{current.title} · {current.establishment}</span>
                </div>
                <div className="author-accreditation mono">{current.accreditation}</div>
              </div>

              {/* Carousel Controls */}
              <div className="testimonial-controls">
                <div className="carousel-indicators">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`indicator-dot ${i === activeIdx ? 'active' : ''}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="carousel-arrows">
                  <button onClick={prev} className="btn-carousel-arrow interactive-lens" aria-label="Previous testimonial">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={next} className="btn-carousel-arrow interactive-lens" aria-label="Next testimonial">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
