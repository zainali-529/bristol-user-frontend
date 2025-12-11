import { useEffect, useRef, useMemo, useState } from 'react'
import gsap from 'gsap'
import { useTeamMembersRedux } from '@/hooks/useTeamMembersRedux'
import { Linkedin, Mail, Globe, Twitter } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

function MouseRevealSection() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const sectionRef = useRef(null)
  const imageRefs = useRef([])
  const rowRefs = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const imagePos = useRef([])
  const activeImageIndex = useRef(null)
  const { teamMembers: teamMembersData, loading } = useTeamMembersRedux()

  const resolveImageUrl = (img) => {
    if (!img) return '/images/team-1.jpg'
    if (Array.isArray(img)) img = img[0]
    if (typeof window !== 'undefined' && typeof File !== 'undefined' && img instanceof File) {
      return URL.createObjectURL(img)
    }
    if (typeof img === 'object' && img !== null) {
      const candidate = img.url || img.path || img.src
      if (typeof candidate === 'string' && candidate.length > 0) {
        img = candidate
      } else {
        return '/images/team-1.jpg'
      }
    }
    if (typeof img !== 'string') return '/images/team-1.jpg'
    if (/^https?:\/\//i.test(img)) return img
    if (img.startsWith('/images/') || img.startsWith('/logo/') || img.startsWith('/assets/')) return img
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    const assetBase = apiBase.replace(/\/api$/, '')
    return `${assetBase}${img.startsWith('/') ? img : `/${img}`}`
  }

  const clean = (v) => {
    if (!v) return ''
    return String(v).replace(/`/g, '').trim()
  }

  const teamMembers = useMemo(() => {
    if (!Array.isArray(teamMembersData)) return []
    return teamMembersData
      .filter(m => m.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((m) => ({
        name: m.name || `${m.firstName ?? ''} ${m.lastName ?? ''}`.trim() || 'Team Member',
        role: m.position || m.role || '',
        image: resolveImageUrl((m.image && m.image.url) || m.imageUrl || m.photo || m.image),
        imageAlt: clean(m.image?.alt) || m.name || 'Team member',
        description: clean(m.description) || '',
        social: {
          linkedin: clean(m.socialLinks?.linkedin),
          email: clean(m.socialLinks?.email),
          twitter: clean(m.socialLinks?.twitter),
          website: clean(m.socialLinks?.website),
        }
      }))
  }, [teamMembersData])

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
  }, [teamMembers])

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
          {loading && teamMembers.length === 0 ? (
            <div className="py-8" style={{ color: 'var(--text-secondary)' }}>Loading team...</div>
          ) : (
            teamMembers.map((member, index) => (
          <div
              key={index}
              ref={(el) => (rowRefs.current[index] = el)}
              className="group relative cursor-pointer"
              onClick={() => {
                setSelected(member)
                setOpen(true)
              }}
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
                    alt={member.imageAlt}
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <p className="text-white text-2xl font-bold drop-shadow-lg">
                      {member.name}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--primary-60)' }}>
                      {member.role}
                    </p>
                    {member.description && (
                      <p className="text-sm text-white/90 line-clamp-3">
                        {member.description}
                      </p>
                    )}
                    <div className="flex gap-3 pt-2">
                      {member.social?.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--primary-20)' }}>
                          <Linkedin size={16} style={{ color: 'var(--primary)' }} />
                        </a>
                      )}
                      {member.social?.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--primary-20)' }}>
                          <Twitter size={16} style={{ color: 'var(--primary)' }} />
                        </a>
                      )}
                      {member.social?.website && (
                        <a href={member.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--primary-20)' }}>
                          <Globe size={16} style={{ color: 'var(--primary)' }} />
                        </a>
                      )}
                      {member.social?.email && (
                        <a href={`mailto:${member.social.email}`} aria-label="Email" className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--primary-20)' }}>
                          <Mail size={16} style={{ color: 'var(--primary)' }} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
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

        {/* Detail Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--text-primary)' }}>
                {selected?.name}
              </DialogTitle>
              <DialogDescription>
                {selected?.role}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                {selected?.image && (
                  <img
                    src={selected.image}
                    alt={selected?.imageAlt || selected?.name || 'Team member'}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="space-y-4">
                {selected?.description && (
                  <p style={{ color: 'var(--text-secondary)' }}>{selected.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {selected?.social?.linkedin && (
                    <a href={selected.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border" style={{ borderColor: 'var(--border)' }}>
                      <Linkedin size={16} style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>LinkedIn</span>
                    </a>
                  )}
                  {selected?.social?.twitter && (
                    <a href={selected.social.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border" style={{ borderColor: 'var(--border)' }}>
                      <Twitter size={16} style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>Twitter</span>
                    </a>
                  )}
                  {selected?.social?.website && (
                    <a href={selected.social.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border" style={{ borderColor: 'var(--border)' }}>
                      <Globe size={16} style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>Website</span>
                    </a>
                  )}
                  {selected?.social?.email && (
                    <a href={`mailto:${selected.social.email}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border" style={{ borderColor: 'var(--border)' }}>
                      <Mail size={16} style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>Email</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default MouseRevealSection

