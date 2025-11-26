function IndustryCard({ image, title, description, savings }) {
  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {/* Image with rounded top corners */}
      <div className="relative w-full overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-56 object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = `
              <div class="w-full h-48 md:h-56 flex items-center justify-center rounded-t-2xl" style="background: var(--primary-5);">
                <p style="color: var(--text-secondary); font-size: 0.875rem;">Add ${title} image</p>
              </div>
            `
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

