import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function MouseRevealSection() {
  const sectionRef = useRef(null)
  const imageRefs = useRef([])
  const rowRefs = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const imagePos = useRef([])
  const activeImageIndex = useRef(null)

  // Team members data with images
  const teamMembers = [
    {
      name: 'Richard Gaston',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    },
    {
      name: 'KangHee Kim',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop'
    },
    {
      name: 'Inka and Nicolas',
      role: 'Design Directors',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop'
    },
    {
      name: 'Arch McLeish',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop'
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Initialize position tracking for each image
    imagePos.current = teamMembers.map(() => ({ x: 0, y: 0 }))

    // Set initial state for all images
    imageRefs.current.forEach((img) => {
      if (img) {
        gsap.set(img, {
          opacity: 0,
          scale: 0.8,
          left: 0,
          top: 0,
        })
      }
    })

    const cleanupFunctions = []

    // Add hover listeners to each row
    rowRefs.current.forEach((row, index) => {
      if (!row) return
      
      const image = imageRefs.current[index]
      if (!image) return

      let isHovering = false
      let rafId = null

      // Smooth animation loop using requestAnimationFrame
      const animate = () => {
        if (!isHovering) return

        // Lerp (linear interpolation) for ultra-smooth following
        const lerp = (start, end, factor) => start + (end - start) * factor

        imagePos.current[index].x = lerp(
          imagePos.current[index].x,
          mousePos.current.x,
          0.15 // Smoothing factor (lower = smoother but slower)
        )
        imagePos.current[index].y = lerp(
          imagePos.current[index].y,
          mousePos.current.y,
          0.15
        )

        // Use GSAP's quickSetter for better performance
        gsap.set(image, {
          left: imagePos.current[index].x,
          top: imagePos.current[index].y,
        })

        rafId = requestAnimationFrame(animate)
      }

      const handleMouseEnter = (e) => {
        // Hide any previously active image immediately
        if (activeImageIndex.current !== null && activeImageIndex.current !== index) {
          const prevImage = imageRefs.current[activeImageIndex.current]
          if (prevImage) {
            gsap.killTweensOf(prevImage)
            gsap.set(prevImage, {
              opacity: 0,
              scale: 0.8,
            })
          }
        }

        isHovering = true
        activeImageIndex.current = index
        
        // Initialize position at cursor location (viewport coordinates)
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
        imagePos.current[index].x = mousePos.current.x
        imagePos.current[index].y = mousePos.current.y

        // Set initial position instantly
        gsap.set(image, {
          left: mousePos.current.x,
          top: mousePos.current.y,
        })
        
        // Animate image in with lower opacity for soothing effect
        gsap.to(image, {
          opacity: 0.85,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        })

        // Start animation loop
        animate()
      }

      const handleMouseLeave = () => {
        isHovering = false
        
        // Clear active image index
        if (activeImageIndex.current === index) {
          activeImageIndex.current = null
        }
        
        // Cancel animation loop
        if (rafId) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
        
        // Kill any existing tweens to prevent conflicts
        gsap.killTweensOf(image)
        
        // Animate image out
        gsap.to(image, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in',
        })
      }

      const handleMouseMove = (e) => {
        if (!isHovering) return

        // Update target position (viewport coordinates)
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
      }

      row.addEventListener('mouseenter', handleMouseEnter)
      row.addEventListener('mouseleave', handleMouseLeave)
      row.addEventListener('mousemove', handleMouseMove)

      // Store cleanup function
      cleanupFunctions.push(() => {
        if (rafId) cancelAnimationFrame(rafId)
        row.removeEventListener('mouseenter', handleMouseEnter)
        row.removeEventListener('mouseleave', handleMouseLeave)
        row.removeEventListener('mousemove', handleMouseMove)
      })
    })

    // Cleanup all listeners
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--background)',
      }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Meet Our Team
          </h2>
          <p
            className="text-xl md:text-2xl mt-6 max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Hover over each name to discover the faces behind our success
          </p>
        </div>

        {/* Team Members List */}
        <div className="space-y-0">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (rowRefs.current[index] = el)}
              className="group relative cursor-pointer"
              style={{
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div className="py-8 md:py-12 flex items-center justify-between transition-all duration-500">
                {/* Name */}
                <h3
                  className="text-4xl md:text-6xl lg:text-7xl font-bold transition-all duration-500 group-hover:translate-x-4"
                  style={{
                    color: 'var(--text-primary)',
                  }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <span
                  className="text-lg md:text-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4"
                  style={{
                    color: 'var(--primary)',
                  }}
                >
                  {member.role}
                </span>
              </div>

              {/* Hover Image */}
              <div
                ref={(el) => (imageRefs.current[index] = el)}
                className="pointer-events-none"
                style={{
                  position: 'fixed',
                  width: '380px',
                  height: '480px',
                  willChange: 'transform, opacity',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                }}
              >
                <div
                  className="w-full h-full rounded-3xl overflow-hidden relative"
                  style={{
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
                    border: '2px solid var(--border)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{
                      filter: 'brightness(0.9) contrast(1.05) saturate(1.1)',
                      transform: 'scale(1.05)',
                    }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, 
                        transparent 0%, 
                        rgba(0, 0, 0, 0.2) 50%,
                        rgba(0, 0, 0, 0.6) 100%)`,
                    }}
                  />
                  {/* Name overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-2xl font-bold mb-1 drop-shadow-lg">
                      {member.name}
                    </p>
                    <p
                      className="text-base font-medium drop-shadow-md"
                      style={{ color: 'var(--primary-60)' }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 md:mt-24 text-center">
          <p
            className="text-lg md:text-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Together, we're transforming the energy landscape
          </p>
        </div>
      </div>
    </section>
  )
}

export default MouseRevealSection

