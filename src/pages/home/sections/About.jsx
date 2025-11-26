import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

function About() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Label */}
            <span 
              className="text-sm md:text-base font-medium"
              style={{ color: 'var(--primary)' }}
            >
              About Us
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span style={{ color: 'var(--text-primary)' }}>We Broker </span>
              <span style={{ color: 'var(--primary)' }}>Energy</span>
              <span style={{ color: 'var(--text-primary)' }}> Deals that Power </span>
              <span style={{ color: 'var(--primary)' }}>Growth</span>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4">
              <p 
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                At Bristol Utilities, we help businesses take control of their energy costs through 
                transparent, data-driven brokerage services. Our goal is simple — to find you the most 
                competitive energy rates while supporting your journey toward sustainability.
              </p>
              
              <p 
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                With deep industry knowledge and strong supplier relationships, we compare, negotiate, 
                and manage your contracts so you can focus on running your business. Whether you're a 
                small enterprise or a large corporation, our team ensures your energy decisions are strategic,
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* More About Us Button - Filled with gradient */}
              <Button
                asChild
                className="group relative overflow-hidden rounded-lg font-semibold text-base px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0"
                style={{
                  background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                  color: 'white',
                }}
              >
                <Link to="/about" className="flex items-center gap-2">
                  More About Us
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* Get Quote Button - Outlined */}
              <Button
                asChild
                variant="outline"
                className="rounded-lg font-semibold text-base px-6 py-6 transition-all duration-300 hover:scale-105 border-2"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  backgroundColor: 'transparent',
                }}
              >
                <Link to="/quote">
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
              <img
                src="/images/abbout.jpg"
                alt="Team meeting discussing energy solutions"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '4/3' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="flex items-center justify-center h-full min-h-[400px]" style="background: var(--primary-5);">
                      <div class="text-center p-8">
                        <p style="color: var(--text-secondary);">Add your team meeting image here</p>
                        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">public/images/about-meeting.jpg</p>
                      </div>
                    </div>
                  `
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

