import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import { CartProvider } from './context/CartContext'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Performance optimization: Code-split below-the-fold sections
const PotencyVisualizer = lazy(() => import('./components/PotencyVisualizer'))
const ProductCollection = lazy(() => import('./components/ProductCollection'))
const ElixirBuilder = lazy(() => import('./components/ElixirBuilder'))
const BioSanctuaryTour = lazy(() => import('./components/BioSanctuaryTour'))
const ProductsCataloguePage = lazy(() => import('./components/ProductsCataloguePage'))

function SectionFallback() {
  return (
    <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="pulse-dot" style={{ width: '12px', height: '12px' }} />
    </div>
  )
}

function MainContent() {
  useLenis()
  const [currentPage, setCurrentPage] = useState<'home' | 'catalogue'>('home')

  // Handle URL hash changes (#catalogue or #home)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#catalogue' || hash === '#products') {
        setCurrentPage('catalogue')
      } else {
        setCurrentPage('home')
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const setPage = (page: 'home' | 'catalogue') => {
    setCurrentPage(page)
    if (page === 'catalogue') {
      window.location.hash = '#catalogue'
    } else {
      window.location.hash = '#home'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="lavish-app">
      <CustomCursor />
      <Navbar currentPage={currentPage} setCurrentPage={setPage} />

      <main id="main-content">
        {currentPage === 'home' ? (
          <>
            <Hero onExploreCatalogue={() => setPage('catalogue')} />
            <Suspense fallback={<SectionFallback />}>
              <PotencyVisualizer />
              <ProductCollection onViewAllCatalogue={() => setPage('catalogue')} />
              <ElixirBuilder />
              <BioSanctuaryTour />
              {/* Testimonials ("Trusted by Purists") removed per user request */}
            </Suspense>
          </>
        ) : (
          <Suspense fallback={<SectionFallback />}>
            <ProductsCataloguePage />
          </Suspense>
        )}
      </main>

      <Footer onNavigateCatalogue={() => setPage('catalogue')} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  )
}
