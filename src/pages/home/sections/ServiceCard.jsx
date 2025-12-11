import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getLucideIcon } from '@/utils/lucideIcons'

function ServiceCard({ icon, title, description, link, delay = 0, variant = 'default' }) {
  // Get icon component from icon name string
  const IconComponent = typeof icon === 'string' ? getLucideIcon(icon) : icon
  const Icon = IconComponent
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group relative p-6 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
      style={{
        backgroundColor: 'var(--card)',
        animationDelay: `${delay}ms`,
        border: variant === 'elevated' ? '1px solid var(--border)' : undefined,
        boxShadow: variant === 'elevated' ? '0 8px 30px rgba(0, 0, 0, 0.08)' : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--primary-80) 50%, var(--primary-60) 100%)',
          zIndex: 0,
        }}
      />

      {/* Shimmer Effect on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'translateX(-100%)',
          animation: isHovered ? 'shimmer 1.5s infinite' : 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon Circle with Enhanced Animation */}
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative"
          style={{
            backgroundColor: 'var(--primary-10)',
            border: variant === 'elevated' ? '1px solid var(--primary-20)' : undefined,
          }}
        >
          {/* Icon Background on Hover */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              backgroundColor: 'white',
              transform: 'scale(1.1)',
            }}
          />
          <Icon 
            size={32} 
            strokeWidth={2.5}
            className="relative z-10 transition-all duration-500 group-hover:scale-110"
            style={{ 
              color: 'var(--primary)',
            }}
          />
        </div>

        {/* Title with Slide Animation */}
        <h3 
          className="text-2xl md:text-3xl font-bold mb-4 transition-all duration-500 group-hover:translate-y-[-4px]"
          style={{
            color: 'var(--text-primary)',
          }}
        >
          <span className="group-hover:text-white transition-colors duration-500">{title}</span>
        </h3>

        {/* Description with Fade Animation */}
        <p 
          className="text-base leading-relaxed mb-6 flex-grow transition-all duration-500 group-hover:translate-y-[-2px]"
          style={{
            color: 'var(--text-secondary)',
          }}
        >
          <span className="group-hover:text-white transition-colors duration-500">{description}</span>
        </p>

        {/* Learn More Link with Enhanced Animation */}
        <Link
          to={link}
          className="inline-flex items-center gap-2 font-semibold transition-all duration-500 group-hover:gap-3 mt-auto"
          style={{
            color: 'var(--primary)',
          }}
        >
          <span className="group-hover:text-white transition-colors duration-500">Learn More</span>
          <ArrowRight 
            size={20} 
            className="transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
            style={{
              color: 'var(--primary)',
            }}
          />
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard

