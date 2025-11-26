import { Linkedin, Mail } from 'lucide-react'

function TeamMemberCard({ name, position, image, description, linkedin, email }) {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {/* Image Container */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = `
              <div class="w-full h-full flex items-center justify-center" style="background: var(--primary-5);">
                <div class="text-center">
                  <div class="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style="background: var(--primary-10);">
                    <span class="text-4xl font-bold" style="color: var(--primary);">${name.charAt(0)}</span>
                  </div>
                </div>
              </div>
            `
          }}
        />
        {/* Gradient Overlay on Hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--primary-100))'
          }}
        />
        
        {/* Social Links - Appear on Hover */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{ color: 'var(--primary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={18} />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{ color: 'var(--primary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 
          className="text-xl md:text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </h3>
        <p 
          className="text-base font-medium mb-3"
          style={{ color: 'var(--primary)' }}
        >
          {position}
        </p>
        {description && (
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default TeamMemberCard

