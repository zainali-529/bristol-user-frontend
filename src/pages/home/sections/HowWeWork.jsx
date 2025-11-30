import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowUpRight, Phone } from 'lucide-react'
import { useHowWeWorkRedux } from '@/hooks/useHowWeWorkRedux'
import { getLucideIcon } from '@/utils/lucideIcons'

function HowWeWork() {
  const { steps: stepsData, loading } = useHowWeWorkRedux()
  const [openIndex, setOpenIndex] = useState(1) // Start with "Strategy Session" open

  // Map steps data to include icon components using dynamic icon utility
  const steps = useMemo(() => {
    if (!stepsData || stepsData.length === 0) return []
    
    return stepsData.map((step) => {
      // Get icon component dynamically from iconName using the utility
      const IconComponent = getLucideIcon(step.iconName) || Phone; // Default to Phone if icon not found
      
      return {
        ...step,
        icon: IconComponent,
      }
    })
  }, [stepsData])

  const toggleAccordion = (index) => {
    // Always keep at least one accordion open
    // If clicking the same accordion, keep it open (don't close)
    // If clicking a different accordion, switch to it
    if (openIndex !== index) {
      setOpenIndex(index)
    }
    // If clicking the already open one, do nothing (keep it open)
  }

  // Ensure openIndex is always valid (at least one accordion open)
  const validOpenIndex = openIndex !== null && openIndex >= 0 && openIndex < steps.length 
    ? openIndex 
    : (steps.length > 1 ? 1 : 0) // Default to second step or first if only one step
  
  const activeStep = steps.find(step => step.id === validOpenIndex) || steps[0] || null

  // Show loading state or empty state
  if (loading && steps.length === 0) {
    return (
      <section 
        className="py-16 md:py-24 px-4 relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--background)',
          background: 'radial-gradient(ellipse at right, var(--primary-10) 0%, var(--background) 50%)'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  // Don't render if no steps available
  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section 
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ 
        backgroundColor: 'var(--background)',
        background: 'radial-gradient(ellipse at right, var(--primary-10) 0%, var(--background) 50%)'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            How It Work With Us
          </h2>
          
          {/* Contact Us Button */}
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 group"
              style={{
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                color: 'white',
              }}
            >
              <span>Contact Us</span>
            </Link>
            <Link
              to="/contact"
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-45"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
              }}
            >
              <ArrowUpRight size={24} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Accordion Steps */}
          <div className="space-y-4">
              {steps.map((step, index) => {
                const isOpen = validOpenIndex === step.id
                const IconComponent = step.icon
                
                return (
                  <div
                    key={step.id}
                    className="rounded-2xl transition-all duration-700 ease-out cursor-pointer overflow-hidden"
                    style={{
                      backgroundColor: isOpen 
                        ? 'var(--card)' 
                        : 'var(--primary-5)',
                      border: `2px solid ${isOpen ? 'var(--primary)' : 'var(--border)'}`,
                      transform: isOpen ? 'translateX(8px) scale(1.02)' : 'translateX(0) scale(1)',
                      boxShadow: isOpen 
                        ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--primary-20)' 
                        : '0 4px 12px rgba(0, 0, 0, 0.08)',
                    }}
                    onClick={() => toggleAccordion(step.id)}
                    onMouseEnter={(e) => {
                      if (!isOpen) {
                        e.currentTarget.style.transform = 'translateX(4px) scale(1.01)'
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) {
                        e.currentTarget.style.transform = 'translateX(0) scale(1)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
                      }
                    }}
                  >
                  {/* Accordion Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ease-out"
                        style={{
                          backgroundColor: isOpen 
                            ? 'var(--primary)' 
                            : 'var(--primary-10)',
                          transform: isOpen ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        <IconComponent 
                          size={24}
                          style={{ 
                            color: isOpen ? 'white' : 'var(--primary)'
                          }}
                        />
                      </div>
                      <h3
                        className="text-xl md:text-2xl font-bold transition-all duration-500 ease-out"
                        style={{
                          color: isOpen 
                            ? 'var(--text-primary)' 
                            : 'var(--text-secondary)',
                          transform: isOpen ? 'translateX(4px)' : 'translateX(0)',
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <div 
                      className="transition-all duration-500 ease-out" 
                      style={{ 
                        color: isOpen ? 'var(--primary)' : 'var(--text-secondary)',
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)',
                      }}
                    >
                      {isOpen ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} className="opacity-60" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <div
                    className="overflow-hidden transition-all duration-700 ease-out"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                  >
                    <div className="px-6 pb-6">
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {step.description}
                      </p>
                    </div>
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Right: Animated Image */}
          <div className="relative">
            <div 
              className="rounded-3xl overflow-hidden relative"
              style={{
                minHeight: '600px',
                backgroundColor: 'var(--card)',
                border: '2px solid var(--border)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* Background Gradient Overlay */}
              <div 
                className="absolute inset-0 z-0 transition-all duration-1000 ease-out"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--primary-10) 0%, 
                    var(--primary-5) 50%,
                    transparent 100%
                  )`,
                  opacity: 0.6,
                }}
              />

              {/* Image Container with Smooth Transitions */}
              <div className="relative z-10 w-full h-full" style={{ minHeight: '600px' }}>
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="absolute inset-0 transition-all duration-1000 ease-out"
                    style={{
                      opacity: validOpenIndex === step.id ? 1 : 0,
                      transform: validOpenIndex === step.id 
                        ? 'scale(1) translateZ(0)' 
                        : 'scale(1.03) translateZ(0)',
                      zIndex: validOpenIndex === step.id ? 20 : 10,
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      style={{
                        filter: validOpenIndex === step.id
                          ? 'brightness(0.9) contrast(1.1) saturate(1.05)'
                          : 'brightness(0.7) contrast(1.0)',
                        transition: 'filter 1s ease-out',
                      }}
                      onError={(e) => {
                        // Fallback to a placeholder if image fails
                        e.target.src = `https://via.placeholder.com/800x600/${step.id === 0 ? 'AE613A' : step.id === 1 ? '8B4513' : step.id === 2 ? '6B4423' : '4A2C1A'}/ffffff?text=${encodeURIComponent(step.title)}`
                      }}
                    />
                    {/* Overlay for better contrast */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-1000 ease-out"
                      style={{
                        background: `linear-gradient(to bottom, 
                          transparent 0%,
                          rgba(0, 0, 0, 0.1) 50%,
                          rgba(0, 0, 0, 0.3) 100%
                        )`,
                        opacity: validOpenIndex === step.id ? 1 : 0.5,
                      }}
                    />
                  </div>
                ))}

                {/* Overlay with Icon */}
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                  <div 
                    className="transition-all duration-1000 ease-out"
                    style={{
                      opacity: 0.9,
                      transform: validOpenIndex !== null 
                        ? 'scale(1) rotate(0deg)' 
                        : 'scale(0.9) rotate(-3deg)',
                    }}
                  >
                    {validOpenIndex !== null && (
                      <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-3xl"
                        style={{
                          backgroundColor: 'var(--primary-20)',
                          border: '2px solid var(--primary)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        {(() => {
                          const ActiveIcon = steps.find(s => s.id === validOpenIndex)?.icon || FileText
                          return (
                            <ActiveIcon 
                              size={64}
                              style={{ 
                                color: 'var(--primary)',
                                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                              }}
                            />
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
