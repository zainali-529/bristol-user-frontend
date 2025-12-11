function IndustryCard({ image, title, description, savings }) {
  const resolveImageUrl = (img) => {
    if (!img) return '/images/about-1.jpg'
    if (Array.isArray(img)) img = img[0]
    if (typeof window !== 'undefined' && typeof File !== 'undefined' && img instanceof File) {
      return URL.createObjectURL(img)
    }
    if (typeof img === 'object' && img !== null) {
      const candidate = img.url || img.path || img.src
      if (typeof candidate === 'string' && candidate.length > 0) {
        img = candidate
      } else {
        return '/images/about-1.jpg'
      }
    }
    if (typeof img !== 'string') return '/images/about-1.jpg'
    if (/^https?:\/\//i.test(img)) return img
    if (img.startsWith('/images/') || img.startsWith('/logo/') || img.startsWith('/assets/')) return img
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    const assetBase = apiBase.replace(/\/api$/, '')
    return `${assetBase}${img.startsWith('/') ? img : `/${img}`}`
  }

  const finalSrc = resolveImageUrl(image)

  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {/* Image with rounded top corners */}
      <div className="relative w-full overflow-hidden rounded-t-2xl">
        <img
          src={finalSrc}
          alt={title}
          loading="lazy"
          className="w-full h-48 md:h-56 object-cover"
          onError={(e) => {
            // Fallback to a local placeholder image
            const fallback = '/images/about-1.jpg'
            if (e.target.src.endsWith(fallback)) return
            e.target.src = fallback
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 
          className="text-xl md:text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className="text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>

        {/* Savings Indicator */}
        <div 
          className="rounded-lg px-4 py-3 text-center font-bold text-base md:text-lg"
          style={{ 
            backgroundColor: 'var(--primary-5)',
            color: 'var(--primary)'
          }}
        >
          Save upto {savings}
        </div>
      </div>
    </div>
  )
}

export default IndustryCard

