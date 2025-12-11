import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import TopNav from '../components/TopNav'
import HomePage from '../pages/home'
import ServicesPage from '../pages/services'
import ServiceDetail from '../pages/services/ServiceDetail'
import AboutPage from '../pages/about'
import QuotePage from '../pages/quote'
import NewsPage from '../pages/news'
import NewsDetail from '../pages/news/NewsDetail'
import ColorSchemeDemo from '../pages/ColorSchemeDemo'
import EnergyPriceTrackerPage from '../pages/energy-price-tracker'
import { EnergyPriceManager } from '../pages/admin'
import ContactPage from '../pages/contact'
import PostcodeFinder from '../pages/postcode-finder'

function GlobalLayout() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const { hash } = location
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [loading, location.hash])

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      {!loading && <Outlet />}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--primary-20)' }}
            >
              <Activity size={40} className="animate-spin mx-auto mb-3" style={{ color: 'var(--primary)' }} />
              <div className="text-center font-semibold" style={{ color: 'var(--text-primary)' }}>Loading</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/services/:slug', element: <ServiceDetail /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/quote', element: <QuotePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/energy-price-tracker', element: <EnergyPriceTrackerPage /> },
      { path: '/postcode-finder', element: <PostcodeFinder /> },
      { path: '/news', element: <NewsPage /> },
      { path: '/news/:slug', element: <NewsDetail /> },
      { path: '/color-demo', element: <ColorSchemeDemo /> },
      { path: '/admin/energy-prices', element: <EnergyPriceManager /> },
    ],
  },
])
