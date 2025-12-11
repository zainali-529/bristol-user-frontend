import axiosInstance from '@/lib/axios'

/**
 * API Service - Centralized API calls
 * All API endpoints should be defined here
 */

// Example API endpoints structure
export const apiService = {
  // Services - Public Routes
  getServices: (params) => axiosInstance.get('/services', { params }),
  getServiceBySlug: (slug) => axiosInstance.get(`/services/${slug}`),

  // Industries
  getIndustries: () => axiosInstance.get('/industries'),
  getIndustryById: (id) => axiosInstance.get(`/industries/${id}`),

  // Testimonials
  getTestimonials: () => axiosInstance.get('/testimonials'),
  createTestimonial: (data) => axiosInstance.post('/testimonials', data),

  // Team Members
  getTeamMembers: () => axiosInstance.get('/team-members'),
  getTeamMemberById: (id) => axiosInstance.get(`/team-members/${id}`),

  // Contact Form
  submitContactForm: (data) => axiosInstance.post('/contacts', data),

  // Suppliers - Public Routes
  getSuppliers: (params) => axiosInstance.get('/suppliers', { params }),
  getSupplierBySlug: (slug) => axiosInstance.get(`/suppliers/${slug}`),

  // Quotes
  submitQuoteForm: (data) => axiosInstance.post('/quotes', data),

  // News/Blog
  getNews: (params) => axiosInstance.get('/news', { params }),
  getNewsBySlug: (slug) => axiosInstance.get(`/news/${slug}`),
  getNewsCategories: () => axiosInstance.get('/news/categories'),
  getNewsTags: (limit = 20) => axiosInstance.get('/news/tags', { params: { limit } }),

  // Auth (if needed)
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (data) => axiosInstance.post('/auth/register', data),
  logout: () => axiosInstance.post('/auth/logout'),
  refreshToken: () => axiosInstance.post('/auth/refresh'),

  // Energy Prices - Public Routes
  getCurrentPrices: () => axiosInstance.get('/energy-prices/current'),
  getPriceHistory: (range = '30d') => axiosInstance.get('/energy-prices/history', { params: { range } }),
  getMarketStats: () => axiosInstance.get('/energy-prices/market-stats'),
  getComparisonData: (range = '30d') => axiosInstance.get('/energy-prices/comparison', { params: { range } }),
  subscribeToPriceAlerts: (data) => axiosInstance.post('/energy-prices/subscribe', data),
  unsubscribeFromPriceAlerts: (token) => axiosInstance.post('/energy-prices/unsubscribe', { token }),

  // Energy Prices - Admin Routes
  getAllEnergyPrices: (params) => axiosInstance.get('/energy-prices/admin/all', { params }),
  getEnergyPriceById: (id) => axiosInstance.get(`/energy-prices/admin/${id}`),
  createOrUpdateEnergyPrice: (data) => axiosInstance.post('/energy-prices/admin', data),
  updateMarketInsights: (data) => axiosInstance.put('/energy-prices/admin/insights', data),
  deleteEnergyPrice: (id) => axiosInstance.delete(`/energy-prices/admin/${id}`),
  getAllSubscriptions: (params) => axiosInstance.get('/energy-prices/admin/subscriptions', { params }),
  getSubscriptionStats: () => axiosInstance.get('/energy-prices/admin/subscription-stats'),

  // Hero Variants - Public Routes
  getActiveHero: () => axiosInstance.get('/hero/active'),

  // Hero Variants - Admin Routes
  getHeroVariants: () => axiosInstance.get('/hero/admin/variants'),
  getHeroVariantById: (id) => axiosInstance.get(`/hero/admin/variants/${id}`),
  createHeroVariant: (data) => axiosInstance.post('/hero/admin/variants', data),
  updateHeroVariant: (id, data) => axiosInstance.put(`/hero/admin/variants/${id}`, data),
  setActiveHeroVariant: (variantId) => axiosInstance.post('/hero/admin/set-active', { variantId }),
  resetHeroVariants: () => axiosInstance.post('/hero/admin/reset'),
  deleteHeroVariant: (id) => axiosInstance.delete(`/hero/admin/variants/${id}`),

  // Theme - Public Routes
  getActiveTheme: () => axiosInstance.get('/theme'),

  // Why Trust Us - Public Routes
  getTrustCards: () => axiosInstance.get('/why-trust-us'),

  // How We Work - Public Routes
  getHowWeWorkSteps: () => axiosInstance.get('/how-we-work'),

  // FAQs - Public Routes
  getFAQs: (params) => axiosInstance.get('/faqs', { params }),
  getFAQCategories: () => axiosInstance.get('/faqs/categories'),

  // Theme - Admin Routes
  getAllThemes: (params) => axiosInstance.get('/theme/admin/all', { params }),
  getThemeById: (id) => axiosInstance.get(`/theme/admin/${id}`),
  createOrUpdateTheme: (data) => axiosInstance.post('/theme/admin', data),
  updatePrimaryColor: (data) => axiosInstance.put('/theme/admin/primary-color', data),
  resetTheme: () => axiosInstance.post('/theme/admin/reset'),
  deleteTheme: (id) => axiosInstance.delete(`/theme/admin/${id}`),
}

export default apiService
