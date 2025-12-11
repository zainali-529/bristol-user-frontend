import { Link } from 'react-router-dom'
import ServiceCard from '../home/sections/ServiceCard'
import { Testimonials, Faqs } from '../home/sections'
import { useServicesRedux } from '@/hooks/useServicesRedux'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Footer from '../../components/Footer'

function ServicesPage() {
  const { services, loading } = useServicesRedux({ featured: false })

  return (
    <div className="min-h-screen bg-background">
      
      
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden">
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
                  variant="elevated"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-24"
        >
          <div 
            className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ 
              background: 'linear-gradient(135deg, var(--primary-10) 0%, var(--primary-5) 100%)',
              border: '1px solid var(--primary-20)',
            }}
          >
            <div className="flex-1">
              <h2 
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Not sure which service fits?
              </h2>
              <p 
                className="text-base md:text-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                Talk to our team and get a tailored recommendation for your business.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                className="rounded-xl font-semibold px-6 py-6 border-0"
                style={{
                  background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                  color: 'white',
                }}
              >
                <Link to="/quote">Get a Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl font-semibold px-6 py-6"
                style={{
                  borderColor: 'var(--primary-20)',
                  color: 'var(--primary)',
                }}
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <Testimonials />
      <Faqs />

      <Footer />
    </div>
  )
}

export default ServicesPage
