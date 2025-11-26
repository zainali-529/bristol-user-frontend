import { Quote } from 'lucide-react'

function TestimonialCard({ name, position, company, testimonial, rating = 5 }) {
  return (
    <div 
      className="rounded-2xl p-8 md:p-10 shadow-xl h-full flex flex-col"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary-10)' }}
        >
          <Quote 
            size={24}
            style={{ color: 'var(--primary)' }}
          />
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5"
            fill={i < rating ? 'var(--primary)' : 'var(--primary-20)'}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p 
        className="text-base md:text-lg leading-relaxed mb-6 flex-grow"
        style={{ color: 'var(--text-secondary)' }}
      >
        "{testimonial}"
      </p>

      {/* Author Info */}
      <div className="border-t pt-6" style={{ borderColor: 'var(--primary-10)' }}>
        <h4 
          className="text-lg font-bold mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </h4>
        <p 
          className="text-sm md:text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          {position} at {company}
        </p>
      </div>
    </div>
  )
}

export default TestimonialCard

