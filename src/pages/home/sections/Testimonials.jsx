import { useEffect, useState, useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import TestimonialCard from './TestimonialCard'
import { useTestimonialsRedux } from '@/hooks/useTestimonialsRedux'

function Testimonials() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const { testimonials: testimonialsData, loading } = useTestimonialsRedux()

  const testimonials = useMemo(() => {
    if (!Array.isArray(testimonialsData)) return []
    return testimonialsData
      .filter(t => t.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((t) => ({
        id: t._id || t.id,
        name: t.name || 'Client',
        position: t.position || t.title || '',
        company: t.company || '',
        testimonial: t.testimonial || t.quote || '',
        rating: typeof t.rating === 'number' ? t.rating : 5,
      }))
  }, [testimonialsData])

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    return () => {
      api.off('select')
    }
  }, [api])

  // Auto-play functionality
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Reset to first slide
      }
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [api])

  return (
    <section 
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Map Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="/images/map-bg.svg"
          alt="World map background"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span 
            className="text-sm md:text-base font-medium mb-2 block"
            style={{ color: 'var(--primary)' }}
          >
            Testimonials
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            What Our Clients Say
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Don't just take our word for it. See what businesses across the UK are saying about their experience with Bristol Utilities.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard
                    name={testimonial.name}
                    position={testimonial.position}
                    company={testimonial.company}
                    testimonial={testimonial.testimonial}
                    rating={testimonial.rating}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious 
              className="left-0 md:-left-12"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--primary-20)',
                color: 'var(--primary)',
              }}
            />
            <CarouselNext 
              className="right-0 md:-right-12"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--primary-20)',
                color: 'var(--primary)',
              }}
            />
          </Carousel>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index + 1 === current ? 'w-8' : ''
                }`}
                style={{
                  backgroundColor: index + 1 === current 
                    ? 'var(--primary)' 
                    : 'var(--primary-20)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

