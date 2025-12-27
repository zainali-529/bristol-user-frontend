import { motion } from 'framer-motion'
import NewsCard from '@/components/cards/NewsCard'
import { useNewsRedux } from '@/hooks/useNewsRedux'
import { Link } from 'react-router-dom'

function NewsSection() {
  // Fetch latest published news (removed featured=true to show all latest news)
  const { news, loading } = useNewsRedux({ limit: 3, isActive: true, status: 'published' })

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-sm md:text-base font-medium mb-2 block" style={{ color: 'var(--primary)' }}>
            Latest News
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Insights & Updates
          </h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Stay informed with the latest from Bristol Utilities.
          </p>
        </motion.div>

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
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                  delay={idx * 100}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            No news available
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            to="/news"
            className="inline-block rounded-full font-semibold px-6 py-3"
            style={{
              background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
              color: 'white',
            }}
          >
            View All News
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsSection

