import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'framer-motion'
import NewsCard from '@/components/cards/NewsCard'
import TrustedPartners from '@/pages/home/sections/TrustedPartners'
import Testimonials from '@/pages/home/sections/Testimonials'
import EnergyPriceTracker from '@/pages/home/sections/EnergyPriceTracker'
import Services from '@/pages/home/sections/Services'
import Footer from '@/components/Footer'
import {
  fetchNews,
  fetchNewsCategories,
  fetchNewsTags,
  selectNews,
  selectNewsLoading,
  selectNewsCategories,
  selectNewsTags,
  selectNewsMeta,
} from '@/store/slices/newsSlice'

function NewsPage() {
  const dispatch = useAppDispatch()
  const news = useAppSelector(selectNews)
  const loading = useAppSelector(selectNewsLoading)
  const categories = useAppSelector(selectNewsCategories)
  const tags = useAppSelector(selectNewsTags)
  const meta = useAppSelector(selectNewsMeta)

  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    dispatch(fetchNews({ page: 1, perPage: 12, isActive: true, status: 'published' }))
    dispatch(fetchNewsCategories())
    dispatch(fetchNewsTags())
  }, [])

  const onSelectCategory = (cat) => {
    const next = selectedCategory === cat ? '' : cat
    setSelectedCategory(next)
    dispatch(fetchNews({ page: 1, perPage: 12, category: next || undefined, isActive: true, status: 'published' }))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-sm md:text-base font-medium mb-2 block" style={{ color: 'var(--primary)' }}>
            News & Updates
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Latest from Bristol Utilities
          </h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Insights, announcements, and market updates.
          </p>
        </motion.div>

        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'var(--primary-10)',
                  color: selectedCategory === cat ? 'white' : 'var(--primary)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            Loading news...
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {news.map((item, idx) => (
              <motion.div
                key={item._id || item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <NewsCard
                  image={item.cardImage}
                  title={item.title}
                  description={item.cardDescription}
                  category={item.category}
                  publishDate={item.publishDate}
                  readingTime={item.readingTime}
                  isFeatured={item.isFeatured}
                  isBreaking={item.isBreaking}
                  link={`/news/${item.slug}`}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            No news available
          </div>
        )}

        {/* Additional Home Sections */}
         
      </main>
       <EnergyPriceTracker />
          <Services />
          <TrustedPartners />
          <Testimonials />
      <Footer />
    </div>
  )
}

export default NewsPage

