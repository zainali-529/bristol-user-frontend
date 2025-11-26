import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import TestimonialCard from './TestimonialCard'

function Testimonials() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Testimonial data - will be from API in future
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechCorp Industries",
      testimonial: "Bristol Utilities transformed our energy procurement process. We've saved over 30% on our energy costs while maintaining excellent service quality. Their team is professional, responsive, and truly understands our business needs.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Operations Director",
      company: "Green Manufacturing Ltd",
      testimonial: "Working with Bristol Utilities has been a game-changer for our manufacturing operations. They helped us negotiate better rates and provided valuable insights into energy efficiency. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Williams",
      position: "Facilities Manager",
      company: "Retail Solutions Group",
      testimonial: "The team at Bristol Utilities made our multi-site energy management so much easier. Their expertise in contract negotiation and ongoing support has been invaluable. We couldn't be happier with the results.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Thompson",
      position: "CFO",
      company: "Healthcare Partners",
      testimonial: "Bristol Utilities helped us reduce our energy costs significantly while ensuring compliance with all regulations. Their transparent approach and detailed reporting give us complete confidence in our energy strategy.",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      position: "Property Manager",
      company: "Urban Real Estate",
      testimonial: "Managing energy across multiple properties was challenging until we partnered with Bristol Utilities. They've streamlined everything and helped us achieve substantial savings. Excellent service throughout!",
      rating: 5,
    },
  ]

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

