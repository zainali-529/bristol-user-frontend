import { useEffect, useState, useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useSuppliersRedux } from '@/hooks/useSuppliersRedux'

function TrustedPartners() {
  const [api, setApi] = useState(null)
  const { suppliers, loading } = useSuppliersRedux()

  // Sort suppliers by displayOrder and create array of image URLs
  const sortedSuppliers = useMemo(() => {
    if (!suppliers || suppliers.length === 0) return []
    
    return [...suppliers]
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .filter(supplier => supplier.image?.url) // Only include suppliers with images
  }, [suppliers])

  // Auto-play functionality
  useEffect(() => {
    if (!api || sortedSuppliers.length === 0) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Reset to first slide
      }
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [api, sortedSuppliers.length])

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
              {loading && sortedSuppliers.length === 0 ? (
                <CarouselItem className="pl-2 md:pl-4 basis-full">
                  <div className="flex items-center justify-center p-8">
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Loading partners...
                    </div>
                  </div>
                </CarouselItem>
              ) : sortedSuppliers.length > 0 ? (
                sortedSuppliers.map((supplier, index) => (
                  <CarouselItem
                    key={supplier._id || supplier.slug || index}
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                  >
                    <div className="flex items-center justify-center group transition-all duration-300 hover:scale-110 p-4">
                      {supplier.websiteUrl ? (
                        <a
                          href={supplier.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={supplier.image.url}
                            alt={supplier.image.alt || supplier.name || `Supplier ${index + 1}`}
                            className="max-w-full max-h-20 md:max-h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100 cursor-pointer"
                          />
                        </a>
                      ) : (
                        <img
                          src={supplier.image.url}
                          alt={supplier.image.alt || supplier.name || `Supplier ${index + 1}`}
                          className="max-w-full max-h-20 md:max-h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="pl-2 md:pl-4 basis-full">
                  <div className="flex items-center justify-center p-8">
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      No partners available
                    </div>
                  </div>
                </CarouselItem>
              )}
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

