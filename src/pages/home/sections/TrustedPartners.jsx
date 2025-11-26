import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

function TrustedPartners() {
  const [api, setApi] = useState(null)

  // Supplier logos - can be from API later
  const suppliers = [
    '/images/supplier-2-BykWEX1I 1.svg',
    '/images/supplier-3-Btnowtmc 1.svg',
    '/images/supplier-4-C2r7Wi7a 1.svg',
    '/images/supplier-5-ClfzecGL 1.svg',
    '/images/supplier-6-R_aNWCx7 1.svg',
    '/images/supplier-7-Cco6x8Cf 1.svg',
    '/images/supplier-3-Btnowtmc 1.svg',
    '/images/supplier-4-C2r7Wi7a 1.svg',
    '/images/supplier-5-ClfzecGL 1.svg',
    '/images/supplier-6-R_aNWCx7 1.svg',
    '/images/supplier-7-Cco6x8Cf 1.svg',
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Reset to first slide
      }
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [api])

  return (
    <section 
      className="py-16 md:py-24"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Trusted Partners
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            We work with leading energy suppliers to bring you the best deals
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
              slidesToScroll: 'auto',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {suppliers.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                >
                  <div className="flex items-center justify-center group transition-all duration-300 hover:scale-110 p-4">
                    <img
                      src={logo}
                      alt={`Supplier ${index + 1}`}
                      className="max-w-full max-h-20 md:max-h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                    />
                  </div>
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
        </div>
      </div>
    </section>
  )
}

export default TrustedPartners

