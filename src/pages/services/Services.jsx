import { Link } from 'react-router-dom'
import TopNav from '../../components/TopNav'
import ServiceCard from '../home/sections/ServiceCard'
import { useServicesRedux } from '@/hooks/useServicesRedux'
import { motion } from 'framer-motion'

function ServicesPage() {
  const { services, loading } = useServicesRedux({ featured: false })

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span 
            className="text-sm md:text-base font-medium mb-2 block"
            style={{ color: 'var(--primary)' }}
          >
            Our Services
          </span>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Services Tailored to You
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Orca Business Solutions is a new name, but we're built on real experience. 
            We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading && services.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Loading services...
            </div>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id || service.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard
                  icon={service.cardIcon}
                  title={service.title}
                  description={service.cardDescription}
                  link={`/services/${service.slug}`}
                  delay={index * 100}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              No services available
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ServicesPage
