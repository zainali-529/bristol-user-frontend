import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ServiceCard from './ServiceCard'
import { useServicesRedux } from '@/hooks/useServicesRedux'

function Services() {
  const { services, loading } = useServicesRedux({ featured: false })

  // Limit to 8 services for home page
  const displayServices = services.slice(0, 8)

  return (
    <section 
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--primary-5)' }}
    >
      {/* Decorative Background Elements */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ 
          backgroundColor: 'var(--primary)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ 
          backgroundColor: 'var(--primary)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6">
          <div className="flex-1">
            <span 
              className="text-sm md:text-base font-medium mb-2 block"
              style={{ color: 'var(--primary)' }}
            >
              Our Services
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Services Tailored to You
            </h2>
            <p 
              className="text-base md:text-lg max-w-2xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Orca Business Solutions is a new name, but we're built on real experience. 
              We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
            </p>
          </div>

          {/* View All Button */}
          <Button
            asChild
            className="flex-shrink-0 group rounded-lg font-semibold px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border-0"
            style={{
              background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
              color: 'white',
            }}
          >
            <Link to="/services" className="flex items-center gap-2">
              View All Services
              <ArrowRight 
                size={20} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </Link>
          </Button>
        </div>

        {/* Services Grid */}
        {loading && displayServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Loading services...
            </div>
          </div>
        ) : displayServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayServices.map((service, index) => (
              <div
                key={service._id || service.slug}
                className="service-card-animate"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ServiceCard
                  icon={service.cardIcon}
                  title={service.title}
                  description={service.cardDescription}
                  link={`/services/${service.slug}`}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              No services available
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Services

