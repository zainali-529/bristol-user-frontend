import { Link } from 'react-router-dom'
import { CalendarDays, Clock, Flame } from 'lucide-react'
import { useState } from 'react'

function NewsCard({
  image,
  title,
  description,
  category,
  publishDate,
  readingTime,
  isFeatured = false,
  isBreaking = false,
  link,
  delay = 0,
}) {
  const [isHovered, setIsHovered] = useState(false)

  const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString() : ''

  return (
    <Link
      to={link}
      className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media */}
      <div className="relative">
        <img
          src={image?.url || image}
          alt={image?.alt || title}
          className="w-full h-56 md:h-64 object-cover"
          style={{ display: 'block' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.0) 100%)',
          }}
        />
        {/* Glow ring on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: 'inset 0 0 0 1px var(--primary-40)',
          }}
        />
        {isFeatured && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'var(--primary)', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          >
            Featured
          </div>
        )}
        {isBreaking && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            style={{ backgroundColor: 'var(--primary-100)', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          >
            <Flame size={14} /> Breaking
          </div>
        )}
        {/* Bottom meta bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs" style={{ color: 'white' }}>
            {publishDate && (
              <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {formattedDate}</span>
            )}
            {readingTime !== undefined && (
              <span className="inline-flex items-center gap-1"><Clock size={14} /> {readingTime} min</span>
            )}
          </div>
          {category && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(6px)' }}
            >
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3
          className="text-xl md:text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="transition-colors duration-500">{title}</span>
        </h3>

        <p
          className="text-sm md:text-base mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="transition-colors duration-500">{description}</span>
        </p>

        {/* CTA underline on hover */}
        <div className="h-0.5 w-16 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--primary)' }} />
      </div>
    </Link>
  )
}

export default NewsCard
