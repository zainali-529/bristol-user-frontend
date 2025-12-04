import IndustryCard from './IndustryCard'
import { useIndustriesRedux } from '@/hooks/useIndustriesRedux'

function IndustriesWeServe() {
  const { industries, loading } = useIndustriesRedux()

  return (
    <section 
      className="py-16 md:py-24 px-4"
      style={{ backgroundColor: 'var(--primary-5)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Industries We Serve
          </h2>
          <p 
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Orca Business Solutions is a new name, but we're built on real experience. We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading && (!industries || industries.length === 0) ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8" style={{ color: 'var(--text-secondary)' }}>
              Loading industries...
            </div>
          ) : (
            (industries || []).map((industry) => {
              const image = industry.imageUrl || industry.image || '/images/about-1.jpg'
              const title = industry.title || industry.name || 'Industry'
              const description = industry.description || industry.summary || 'Industry description'
              const savingsValue = industry.savingsPercentage || industry.savings || null
              const savings = typeof savingsValue === 'number' ? `${savingsValue}%` : (savingsValue || '—')
              return (
                <IndustryCard
                  key={industry._id || industry.id || title}
                  image={image}
                  title={title}
                  description={description}
                  savings={savings}
                />
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default IndustriesWeServe

