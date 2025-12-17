import { useMemo } from 'react'
import { TestimonialsColumn } from '@/components/ui/testimonial-columns'
import { useTestimonialsRedux } from '@/hooks/useTestimonialsRedux'

function Testimonials() {
  const { testimonials: testimonialsData, loading } = useTestimonialsRedux()

  const testimonials = useMemo(() => {
    if (!Array.isArray(testimonialsData)) return []
    return testimonialsData
      .filter(t => t.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((t) => ({
        text: t.testimonial || t.quote || '',
        image: t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name || 'User')}&background=random`,
        name: t.name || 'Client',
        role: t.position ? `${t.position}${t.company ? ` at ${t.company}` : ''}` : t.company || '',
      }))
  }, [testimonialsData])

  const firstColumn = testimonials.filter((_, i) => i % 3 === 0)
  const secondColumn = testimonials.filter((_, i) => i % 3 === 1)
  const thirdColumn = testimonials.filter((_, i) => i % 3 === 2)

  if (loading && testimonials.length === 0) {
    return null // or a loading skeleton
  }

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
        <div className="text-center mb-12">
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

        {/* Marquee Columns */}
        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn duration={16} testimonials={firstColumn} />
          <TestimonialsColumn
            className="hidden md:block"
            duration={20}
            testimonials={secondColumn}
          />
          <TestimonialsColumn
            className="hidden lg:block"
            duration={18}
            testimonials={thirdColumn}
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials

