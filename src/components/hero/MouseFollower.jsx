import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Mouse follower with cursor trail effect
 */
function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsVisible(false), 3000)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      clearTimeout(timeoutId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Main cursor glow */}
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        className="absolute w-10 h-10 rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--primary)60, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Trail particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: mousePosition.x - 5,
            y: mousePosition.y - 5,
          }}
          transition={{
            type: 'spring',
            stiffness: 200 - i * 50,
            damping: 20,
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: 'var(--primary)',
            opacity: 0.6 - i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export default MouseFollower

