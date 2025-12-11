import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'framer-motion'
import NewsCard from '@/components/cards/NewsCard'
import TrustedPartners from '@/pages/home/sections/TrustedPartners'
import Testimonials from '@/pages/home/sections/Testimonials'
import EnergyPriceTracker from '@/pages/home/sections/EnergyPriceTracker'
import Services from '@/pages/home/sections/Services'
import Footer from '@/components/Footer'
import {
  fetchNewsBySlug,
  selectSelectedArticle,
  selectRelatedNews,
  selectNewsLoading,
} from '@/store/slices/newsSlice'

function ContentRenderer({ sections, content }) {
  if (sections && sections.length > 0) {
    return (
      <div className="space-y-6">
        {sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((sec) => {
          switch (sec.type) {
            case 'heading':
              return (
                <h2 key={sec._id} className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {sec.content}
                </h2>
              )
            case 'paragraph':
              return (
                <p key={sec._id} className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {sec.content}
                </p>
              )
            case 'quote':
              return (
                <blockquote key={sec._id} className="border-l-4 pl-4 italic" style={{ borderColor: 'var(--primary)', color: 'var(--text-secondary)' }}>
                  {sec.content}
                </blockquote>
              )
            case 'list':
              return (
                <ul key={sec._id} className="list-disc pl-6 space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  {sec.content.split('\n').map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )
            case 'image':
              return (
                <img key={sec._id} src={sec.content} alt="" className="w-full rounded-xl" />
              )
            default:
              return null
          }
        })}
      </div>
    )
  }
  if (content) {
    return (
      <div className="space-y-4">
        {content.split('\n').map((para, idx) => (
          <p key={idx} className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            {para}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function NewsDetail() {
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const article = useAppSelector(selectSelectedArticle)
  const related = useAppSelector(selectRelatedNews)
  const loading = useAppSelector(selectNewsLoading)

  useEffect(() => {
    if (slug) {
      dispatch(fetchNewsBySlug(slug))
    }
  }, [slug])

  if (loading && !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center" style={{ color: 'var(--text-secondary)' }}>Loading article...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Article not found</h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>The news article you’re looking for doesn’t exist.</p>
          <Link to="/news" className="inline-block rounded-full font-semibold px-6 py-3" style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))', color: 'white' }}>
            Back to News
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      {article.featuredImage?.url && (
        <div className="relative h-64 md:h-96">
          <img src={article.featuredImage.url} alt={article.featuredImage.alt || article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))' }} />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-5xl font-bold" style={{ color: 'white' }}>{article.title}</h1>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {article.category && (
            <span className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)' }}>{article.category}</span>
          )}
          {Array.isArray(article.tags) && article.tags.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'var(--primary-5)', color: 'var(--text-secondary)' }}>{t}</span>
          ))}
        </div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="prose max-w-none">
          <ContentRenderer sections={article.contentSections} content={article.content} />
        </motion.div>

        {/* Additional Images */}
        {Array.isArray(article.additionalImages) && article.additionalImages.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.additionalImages.map((img) => (
              <figure key={img._id} className="rounded-xl overflow-hidden">
                <img src={img.url} alt={img.alt || ''} className="w-full" />
                {img.caption && (<figcaption className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{img.caption}</figcaption>)}
              </figure>
            ))}
          </div>
        )}

        {/* Related News */}
        {related && related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Related News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <NewsCard
                  key={item._id || item.slug}
                  image={item.cardImage}
                  title={item.title}
                  description={item.cardDescription}
                  category={item.category}
                  publishDate={item.publishDate}
                  link={`/news/${item.slug}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional Home Sections */}

      </main>  <EnergyPriceTracker />
          <Services />

          <TrustedPartners />
          <Testimonials />
      <Footer />
    </div>
  )
}

export default NewsDetail
