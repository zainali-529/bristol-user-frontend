import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchServiceBySlug, selectSelectedService, selectServiceLoading, selectServicesError, clearSelectedService } from '@/store/slices/servicesSlice'
import { getLucideIcon } from '@/utils/lucideIcons'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ContactUs, WhyTrustUs, Testimonials, Faqs } from '../home/sections'
import Footer from '../../components/Footer'

function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const service = useAppSelector(selectSelectedService)
  const loading = useAppSelector(selectServiceLoading)
  const error = useAppSelector(selectServicesError)

  useEffect(() => {
    if (slug) {
      dispatch(fetchServiceBySlug(slug))
    }

    return () => {
      dispatch(clearSelectedService())
    }
  }, [slug, dispatch])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Loading service...
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Service Not Found
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            {error || 'The service you are looking for does not exist.'}
          </p>
          <Button onClick={() => navigate('/services')}>
            <ArrowLeft className="mr-2" size={20} />
            Back to Services
          </Button>
        </div>
      </div>
    )
  }

  const ExpertiseIcon = service.expertise?.cards?.[0]?.icon ? getLucideIcon(service.expertise.cards[0].icon) : null

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section with Main Image */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {service.mainImage?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.mainImage.url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
        )}
        
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/services">
                <Button
                  variant="ghost"
                  className="mb-6 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Back to Services
                </Button>
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
                {service.title}
              </h1>
              
              {service.cardDescription && (
                <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                  {service.cardDescription}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Service Section */}
      {service.aboutService && (
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                About This Service
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                style={{ color: 'var(--text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: service.aboutService.replace(/\n/g, '<br />') }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Services Include Section */}
      {(service.servicesInclude?.description || service.servicesInclude?.bulletPoints?.length > 0) && (
        <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--primary-5)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                What's Included
              </h2>
              
              {service.servicesInclude.description && (
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {service.servicesInclude.description}
                </p>
              )}

              {service.servicesInclude.bulletPoints && service.servicesInclude.bulletPoints.length > 0 && (
                <div className="space-y-4">
                  {[...service.servicesInclude.bulletPoints]
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ backgroundColor: 'var(--card)' }}
                      >
                        <CheckCircle2 
                          className="flex-shrink-0 mt-1" 
                          size={24} 
                          style={{ color: 'var(--primary)' }}
                        />
                        <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                          {point.text}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Secondary Images Section */}
      {service.secondaryImages && service.secondaryImages.length > 0 && (
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[...service.secondaryImages]
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src={image.url}
                      alt={image.alt || service.title}
                      className="w-full h-auto object-cover"
                    />
                    {image.caption && (
                      <p className="p-4 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
                        {image.caption}
                      </p>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {(service.expertise?.description || service.expertise?.cards?.length > 0) && (
        <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--primary-5)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                Our Expertise
              </h2>
              
              {service.expertise.description && (
                <p className="text-lg mb-12 text-center max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {service.expertise.description}
                </p>
              )}

              {service.expertise.cards && service.expertise.cards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[...service.expertise.cards]
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((card, index) => {
                      const CardIcon = card.icon ? getLucideIcon(card.icon) : null
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-6 md:p-8 rounded-2xl"
                          style={{ backgroundColor: 'var(--card)' }}
                        >
                          {CardIcon && (
                            <div
                              className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                              }}
                            >
                              <CardIcon size={32} color="white" strokeWidth={2} />
                            </div>
                          )}
                          
                          <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            {card.title}
                          </h3>
                          
                          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {card.description}
                          </p>
                        </motion.div>
                      )
                    })}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Services Benefits Section */}
      {(service.servicesBenefits?.description || service.servicesBenefits?.bulletPoints?.length > 0) && (
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Benefits
              </h2>
              
              {service.servicesBenefits.description && (
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {service.servicesBenefits.description}
                </p>
              )}

              {service.servicesBenefits.bulletPoints && service.servicesBenefits.bulletPoints.length > 0 && (
                <div className="space-y-4">
                  {[...service.servicesBenefits.bulletPoints]
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ backgroundColor: 'var(--primary-5)' }}
                      >
                        <CheckCircle2 
                          className="flex-shrink-0 mt-1" 
                          size={24} 
                          style={{ color: 'var(--primary)' }}
                        />
                        <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                          {point.text}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <ContactUs />

      {/* Additional Sections */}
      <WhyTrustUs />
      <Testimonials />
      <Faqs />

      <Footer />
    </div>
  )
}

export default ServiceDetail

