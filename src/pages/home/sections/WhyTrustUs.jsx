import { useEffect } from 'react'
import { getLucideIcon } from '@/utils/lucideIcons'
import { useTrustCardsRedux } from '@/hooks/useTrustCardsRedux'

function WhyTrustUs() {
  const { cards, loading } = useTrustCardsRedux()

  // Get card styling based on position (0: left, 1: center, 2: right)
  const getCardClassName = (index) => {
    if (index === 0) {
      return 'relative p-8 md:p-10 flex flex-col items-start md:rounded-l-3xl border-r-0'
    } else if (index === 1) {
      return 'relative p-8 md:p-10 flex flex-col justify-between border-x-0'
    } else {
      return 'relative p-8 md:p-10 flex flex-col items-start md:rounded-r-3xl border-l-0'
    }
  }

  const getCardBackgroundColor = (index) => {
    if (index === 0 || index === 2) {
      return 'var(--primary-5)'
    } else {
      return 'var(--primary-10)'
    }
  }

  const getIconPosition = (index) => {
    // Center card (index 1) has icon at bottom, others at top
    return index === 1 ? 'bottom' : 'top'
  }

  if (loading && (!cards || cards.length === 0)) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Loading...
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Ensure we have cards
  const displayCards = cards && cards.length > 0 ? cards : []

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Why Trust Us For Energy Needs
          </h2>
          <p 
            className="text-base md:text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Orca Business Solutions is a new name, but we're built on real experience. 
            We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
          </p>
        </div>

        {/* Cards Container - Seamless 3 cards */}
        {displayCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
            {displayCards.map((card, index) => {
              const IconComponent = getLucideIcon(card.icon)
              const iconPosition = getIconPosition(index)

              return (
                <div
                  key={card.order || index}
                  className={getCardClassName(index)}
                  style={{
                    backgroundColor: getCardBackgroundColor(index),
                  }}
                >
                  {/* Icon at Top (for left and right cards) */}
                  {iconPosition === 'top' && IconComponent && (
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                      }}
                    >
                      <IconComponent size={32} color="white" strokeWidth={2} />
                    </div>
                  )}

                  {/* Content */}
                  <div className={iconPosition === 'bottom' ? 'mb-12' : ''}>
                    <h3
                      className="text-xl md:text-2xl font-bold mb-4"
                      style={{ color: 'var(--text-primary)' }}
                      dangerouslySetInnerHTML={{ __html: card.title.replace(/\n/g, '<br />') }}
                    />
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Icon at Bottom (for center card) */}
                  {iconPosition === 'bottom' && IconComponent && (
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                      }}
                    >
                      <IconComponent size={32} color="white" strokeWidth={2} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No trust cards available
          </div>
        )}
      </div>
    </section>
  )
}

export default WhyTrustUs
