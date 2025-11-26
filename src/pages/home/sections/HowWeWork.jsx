import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowUpRight, Phone, FileText, Code, Rocket } from 'lucide-react'

function HowWeWork() {
  const [openIndex, setOpenIndex] = useState(1) // Start with "Strategy Session" open

  const steps = [
    {
      id: 0,
      title: "Book a Discovery Call",
      description: "Schedule a free consultation to discuss your business needs and energy requirements. We'll understand your current situation, challenges, and goals to provide the best solutions tailored to your business.",
      icon: Phone,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", // Meeting/discussion image
    },
    {
      id: 1,
      title: "Strategy Session",
      description: "We will review the insights from the discovery call and develop a tailored strategy and proposal. We'll create a detailed plan with actionable steps, timelines, and deliverables to meet your project requirements.",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // Strategy/planning image
    },
    {
      id: 2,
      title: "Design and Development",
      description: "Our team brings your strategy to life with custom solutions. We handle all aspects of implementation, ensuring seamless integration with your existing systems and processes.",
      icon: Code,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", // Development/design image
    },
    {
      id: 3,
      title: "Launch and Support",
      description: "We ensure a smooth launch and provide ongoing support to help you maximize the benefits. Our team remains available to assist with any questions, optimizations, or future enhancements you may need.",
      icon: Rocket,
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80", // Launch/success image
    },
  ]

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
    : 1 // Default to Strategy Session
  
  const activeStep = steps.find(step => step.id === validOpenIndex) || steps[1] // Default to Strategy Session

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
                    className="rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
                    style={{
                      backgroundColor: isOpen 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.2)',
                      border: `1px solid ${isOpen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'}`,
                      transform: isOpen ? 'translateX(8px) scale(1.01)' : 'translateX(0) scale(1)',
                      boxShadow: isOpen 
                        ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                        : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}
                    onClick={() => toggleAccordion(step.id)}
                    onMouseEnter={(e) => {
                      if (!isOpen) {
                        e.currentTarget.style.transform = 'translateX(4px) scale(1.005)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) {
                        e.currentTarget.style.transform = 'translateX(0) scale(1)'
                      }
                    }}
                  >
                  {/* Accordion Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isOpen 
                            ? 'var(--primary)' 
                            : 'var(--primary-20)',
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
                        className="text-xl md:text-2xl font-bold transition-colors duration-300"
                        style={{
                          color: isOpen 
                            ? 'var(--text-primary)' 
                            : 'var(--text-secondary)',
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <div 
                      className="transition-transform duration-300" 
                      style={{ color: 'var(--primary)' }}
                    >
                      {isOpen ? (
                        <ChevronUp size={24} className="text-primary" />
                      ) : (
                        <ChevronDown size={24} className="opacity-50" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0,
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
              className="rounded-3xl overflow-hidden relative backdrop-blur-xl"
              style={{
                minHeight: '600px',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Background Gradient Overlay with Glass Effect */}
              <div 
                className="absolute inset-0 z-0 transition-all duration-700 ease-in-out"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--primary-20) 0%, 
                    var(--primary-10) 30%,
                    rgba(0, 0, 0, 0.2) 70%,
                    rgba(0, 0, 0, 0.4) 100%
                  )`,
                }}
              />
              
              {/* Additional Glass Layers */}
              <div 
                className="absolute inset-0 z-0 opacity-50"
                style={{
                  background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                }}
              />

              {/* Image Container with Smooth Transitions */}
              <div className="relative z-10 w-full h-full" style={{ minHeight: '600px' }}>
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      validOpenIndex === step.id 
                        ? 'opacity-100 scale-100 z-20' 
                        : 'opacity-0 scale-105 z-10'
                    }`}
                    style={{
                      transform: validOpenIndex === step.id 
                        ? 'scale(1) translateZ(0)' 
                        : 'scale(1.05) translateZ(0)',
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      style={{
                        filter: validOpenIndex === step.id
                          ? 'brightness(0.6) contrast(1.2) saturate(1.1)'
                          : 'brightness(0.5) contrast(1.0)',
                        transition: 'filter 0.7s ease-in-out',
                      }}
                      onError={(e) => {
                        // Fallback to a placeholder if image fails
                        e.target.src = `https://via.placeholder.com/800x600/${step.id === 0 ? 'AE613A' : step.id === 1 ? '8B4513' : step.id === 2 ? '6B4423' : '4A2C1A'}/ffffff?text=${encodeURIComponent(step.title)}`
                      }}
                    />
                    {/* Overlay for better glass effect */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, 
                          transparent 0%,
                          rgba(0, 0, 0, 0.2) 50%,
                          rgba(0, 0, 0, 0.4) 100%
                        )`,
                      }}
                    />
                  </div>
                ))}

                {/* Overlay with Icon */}
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                  <div 
                    className="transition-all duration-700 ease-in-out"
                    style={{
                      opacity: 0.8,
                      transform: validOpenIndex !== null 
                        ? 'scale(1) rotate(0deg)' 
                        : 'scale(0.8) rotate(-5deg)',
                    }}
                  >
                    {validOpenIndex !== null && (
                      <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-3xl backdrop-blur-md"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {(() => {
                          const ActiveIcon = steps.find(s => s.id === validOpenIndex)?.icon || FileText
                          return (
                            <ActiveIcon 
                              size={64}
                              style={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
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
