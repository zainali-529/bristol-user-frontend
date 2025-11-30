import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home'
import ServicesPage from '../pages/services'
import ServiceDetail from '../pages/services/ServiceDetail'
import AboutPage from '../pages/about'
import QuotePage from '../pages/quote'
import NewsPage from '../pages/news'
import ColorSchemeDemo from '../pages/ColorSchemeDemo'
import EnergyPriceTrackerPage from '../pages/energy-price-tracker'
import { EnergyPriceManager } from '../pages/admin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/services/:slug',
    element: <ServiceDetail />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/quote',
    element: <QuotePage />,
  },
  {
    path: '/energy-price-tracker',
    element: <EnergyPriceTrackerPage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/color-demo',
    element: <ColorSchemeDemo />,
  },
  {
    path: '/admin/energy-prices',
    element: <EnergyPriceManager />,
  },
])