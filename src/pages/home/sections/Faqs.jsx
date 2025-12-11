import { useState, useEffect, useMemo } from 'react'
import { ChevronDown, HelpCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFaqsRedux } from '@/hooks/useFaqsRedux'

function Faqs() {
  const { faqs: fetchedFaqs, categories: fetchedCategories, loading } = useFaqsRedux()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)
  const [loadingState, setLoadingState] = useState(false)

  const categories = useMemo(() => (
    Array.isArray(fetchedCategories) ? fetchedCategories : ['All']
  ), [fetchedCategories])

  const filteredFaqs = useMemo(() => {
    let filtered = Array.isArray(fetchedFaqs) ? [...fetchedFaqs] : []
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((faq) => faq.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }
    return filtered
  }, [fetchedFaqs, selectedCategory, searchQuery])

  useEffect(() => {
    setLoadingState(loading)
  }, [loading])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (loadingState) {
    return (
      <section
        className="py-16 md:py-24 px-4"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-48 mx-auto mb-4 rounded animate-pulse" style={{ backgroundColor: 'var(--primary-10)' }} />
            <div className="h-12 w-96 mx-auto mb-4 rounded animate-pulse" style={{ backgroundColor: 'var(--primary-10)' }} />
            <div className="h-6 w-full max-w-2xl mx-auto rounded animate-pulse" style={{ backgroundColor: 'var(--primary-10)' }} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--primary)' }}
        />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--primary)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: 'var(--primary-10)',
              border: '1px solid var(--primary-20)',
            }}
          >
            <HelpCircle className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
              Frequently Asked Questions
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Got Questions?{' '}
            <span
              className="relative inline-block"
              style={{ color: 'var(--primary)' }}
            >
              We've Got Answers
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M0 4C50 1 150 1 200 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.3"
                />
              </svg>
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Find answers to common questions about our energy services, billing, and more
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-10">
          <div
            className="p-6 rounded-2xl shadow-lg"
            style={{
              backgroundColor: 'var(--card)',
              border: '2px solid var(--border)',
            }}
          >
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <Input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base rounded-xl"
                  style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="rounded-full px-5 py-2 transition-all"
                  style={
                    selectedCategory === category
                      ? {
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          borderColor: 'var(--primary)',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: 'var(--text-primary)',
                          borderColor: 'var(--border)',
                        }
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq._id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--card)',
                  border: `2px solid ${openIndex === index ? 'var(--primary)' : 'var(--border)'}`,
                }}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 transition-colors"
                  style={{
                    backgroundColor: openIndex === index ? 'var(--primary-5)' : 'transparent',
                  }}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        backgroundColor: openIndex === index ? 'var(--primary-10)' : 'var(--primary-5)',
                      }}
                    >
                      <HelpCircle
                        className="w-5 h-5"
                        style={{ color: 'var(--primary)' }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg md:text-xl font-semibold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {faq.question}
                      </h3>
                      {faq.category && faq.category !== 'General' && (
                        <span
                          className="text-xs px-2 py-1 rounded-full inline-block"
                          style={{
                            backgroundColor: 'var(--primary-10)',
                            color: 'var(--primary)',
                          }}
                        >
                          {faq.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`transform transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown
                      className="w-6 h-6"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div
                    className="p-6 pt-0 pl-20"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <div
                      className="text-base leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div
            className="text-center py-16 rounded-2xl"
            style={{
              backgroundColor: 'var(--card)',
              border: '2px solid var(--border)',
            }}
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary-10)' }}
            >
              <Search className="w-10 h-10" style={{ color: 'var(--primary)' }} />
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              No FAQs Found
            </h3>
            <p
              className="text-base max-w-md mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        )}

      </div>
    </section>
  )
}

export default Faqs
