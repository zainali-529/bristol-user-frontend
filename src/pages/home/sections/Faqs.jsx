import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import apiService from '@/services/api'

// Dummy FAQs data
const dummyFAQs = [
  {
    _id: '1',
    question: 'How can I switch my energy supplier?',
    answer: 'Switching your energy supplier is easy! Simply contact us and we\'ll handle the entire process for you. We\'ll compare rates, manage the paperwork, and ensure a smooth transition with no interruption to your service. The switch typically takes 2-3 weeks to complete.',
    category: 'General',
    displayOrder: 1,
    isActive: true,
  },
  {
    _id: '2',
    question: 'Will I experience any service interruption when switching?',
    answer: 'No, you won\'t experience any interruption to your energy supply. The switch happens seamlessly in the background, and your energy will continue to flow as normal. Your meter readings and billing will be handled by your new supplier from the switch date.',
    category: 'General',
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: '3',
    question: 'How much can I save by switching suppliers?',
    answer: 'Savings vary depending on your current tariff and usage, but our clients typically save between 15-30% on their energy bills. We analyze your current costs and find the most competitive rates available in the market. Contact us for a free, no-obligation quote tailored to your business.',
    category: 'Pricing',
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: '4',
    question: 'What is the contract length for energy supply?',
    answer: 'Contract lengths typically range from 1 to 5 years, depending on your preference and the supplier. We can help you find flexible contracts that suit your business needs. Longer contracts often offer better rates, but we also have options for businesses that prefer shorter commitments.',
    category: 'Contracts',
    displayOrder: 4,
    isActive: true,
  },
  {
    _id: '5',
    question: 'Do you charge any fees for your service?',
    answer: 'Our service is completely free for businesses. We earn a commission from energy suppliers when you switch, so there are no hidden fees or charges for you. You only pay for your energy usage at the competitive rates we secure for you.',
    category: 'Pricing',
    displayOrder: 5,
    isActive: true,
  },
  {
    _id: '6',
    question: 'Can I switch if I\'m currently in a contract?',
    answer: 'If you\'re currently in a fixed-term contract, you may face early termination fees. However, we can review your contract and calculate if switching would still save you money despite these fees. In many cases, the savings outweigh the exit costs. We\'ll provide a clear breakdown before you make any decision.',
    category: 'Contracts',
    displayOrder: 6,
    isActive: true,
  },
  {
    _id: '7',
    question: 'What information do I need to get a quote?',
    answer: 'To provide an accurate quote, we need your recent energy bills, business address, and approximate annual usage. If you have your meter numbers (MPAN for electricity and MPRN for gas), that\'s helpful too. Don\'t worry if you don\'t have everything - we can help you gather the necessary information.',
    category: 'General',
    displayOrder: 7,
    isActive: true,
  },
  {
    _id: '8',
    question: 'How often should I review my energy contract?',
    answer: 'We recommend reviewing your energy contract at least 3-4 months before it expires. This gives you enough time to compare rates and secure the best deal. Energy prices fluctuate, so regular reviews ensure you\'re always getting competitive rates. We can set up reminders for you.',
    category: 'Contracts',
    displayOrder: 8,
    isActive: true,
  },
  {
    _id: '9',
    question: 'What types of businesses do you work with?',
    answer: 'We work with businesses of all sizes across various industries including retail, hospitality, manufacturing, healthcare, education, and more. Whether you\'re a small shop or a large industrial facility, we have the expertise to find the right energy solution for your needs.',
    category: 'General',
    displayOrder: 9,
    isActive: true,
  },
  {
    _id: '10',
    question: 'How do I read my energy meter?',
    answer: 'For digital meters, simply note down the numbers displayed (ignore any numbers after a decimal point). For dial meters, read from left to right, writing down the number the pointer has passed. If the pointer is between two numbers, record the lower number. We can provide detailed guidance specific to your meter type.',
    category: 'Billing',
    displayOrder: 10,
    isActive: true,
  },
]

const dummyCategories = ['All', 'General', 'Pricing', 'Contracts', 'Billing']

function Faqs() {
  const [faqs, setFaqs] = useState(dummyFAQs)
  const [filteredFaqs, setFilteredFaqs] = useState(dummyFAQs)
  const [categories, setCategories] = useState(dummyCategories)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Uncomment these when backend is ready
    // fetchFAQs()
    // fetchCategories()
  }, [])

  useEffect(() => {
    filterFAQs()
  }, [faqs, selectedCategory, searchQuery])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const response = await apiService.getFAQs()
      if (response.data?.success && response.data?.data) {
        setFaqs(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await apiService.getFAQCategories()
      if (response.data?.success && response.data?.data) {
        setCategories(['All', ...response.data.data])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories(['All'])
    }
  }

  const filterFAQs = () => {
    let filtered = [...faqs]

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((faq) => faq.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }

    setFilteredFaqs(filtered)
  }

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (loading) {
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

