import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Smooth Mouse Follower Component using GSAP (Variant)
 * Creates a custom cursor that follows the mouse smoothly with GSAP animations
 * This is a variant - the original MouseFollower uses framer-motion
 */
function MouseFollowerGSAP() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const cursorDotRef = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    // Don't show on mobile/touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) {
      // Make sure default cursor is visible on touch devices
      document.body.style.cursor = 'auto'
      return
    }

    const cursor = cursorRef.current
    const follower = followerRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !follower || !cursorDot) return

    // Hide default cursor on desktop
    document.body.style.cursor = 'none'
    // Also hide cursor on all elements
    document.documentElement.style.cursor = 'none'

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // GSAP ticker for smooth animation
    const updateFollower = () => {
      // Smoothly animate follower to mouse position
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15

      // Update follower position
      gsap.set(follower, {
        x: followerX - 30,
        y: followerY - 30,
      })

      // Update cursor dot position (faster, smaller)
      gsap.set(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
      })

      requestAnimationFrame(updateFollower)
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Update cursor position instantly
      gsap.set(cursor, {
        x: mouseX - 10,
        y: mouseY - 10,
      })
    }

    // Handle interactive elements
    const handleMouseEnter = (e) => {
      isHovering.current = true
      const target = e.currentTarget || e.target
      
      // Check if it's a link or button
      const isLink = target.tagName === 'A' || target.closest('a')
      const isButton = target.tagName === 'BUTTON' || target.closest('button')
      
      gsap.to(cursor, {
        scale: isLink || isButton ? 1.8 : 1.3,
        opacity: 0.9,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(follower, {
        scale: isLink || isButton ? 2 : 1.5,
        backgroundColor: 'var(--primary-20)',
        borderColor: 'var(--primary-60)',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      isHovering.current = false
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'var(--primary-5)',
        borderColor: 'var(--primary-30)',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    // Find all interactive elements
    const interactiveElements = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      '[role="button"]',
      '[onclick]',
      '.cursor-pointer',
      '[class*="btn"]',
      '[class*="button"]',
    ]

    let observer = null
    
    const addHoverListeners = () => {
      interactiveElements.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          // Skip elements that are disabled or already have listeners
          if (el.disabled || el.getAttribute('aria-disabled') === 'true' || el._mouseFollowerListener) {
            return
          }
          el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
          el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
          el._mouseFollowerListener = true // Mark as having listener
        })
      })
    }

    // Re-add listeners when DOM changes (for dynamic content)
    observer = new MutationObserver(() => {
      addHoverListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Initial setup
    gsap.set(cursor, { opacity: 0 })
    gsap.set(follower, { opacity: 0 })
    gsap.set(cursorDot, { opacity: 0 })

    // Fade in
    gsap.to([cursor, follower, cursorDot], {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    })

    // Start animation loop
    updateFollower()

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    addHoverListeners()

    // Handle mouse leave window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, follower, cursorDot], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, follower, cursorDot], {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    // Cleanup
    return () => {
      document.body.style.cursor = ''
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)

      interactiveElements.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (el._mouseFollowerListener) {
            el.removeEventListener('mouseenter', handleMouseEnter)
            el.removeEventListener('mouseleave', handleMouseLeave)
            delete el._mouseFollowerListener
          }
        })
      })
      
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <>
      {/* Main cursor dot (follows instantly) */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />

      {/* Outer cursor ring (smooth follow) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid var(--primary)',
          willChange: 'transform',
        }}
      />

      {/* Large follower (smooth trail) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '1px solid var(--primary-30)',
          backgroundColor: 'var(--primary-5)',
          willChange: 'transform',
          mixBlendMode: 'normal',
          backdropFilter: 'blur(4px)',
        }}
      />
    </>
  )
}

export default MouseFollowerGSAP

