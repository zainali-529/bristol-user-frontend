import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Morphing text component that cycles through multiple phrases
 */
function MorphingText({ phrases = [], interval = 4000, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, interval)

    return () => clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            y: 20,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            filter: 'blur(10px)'
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="relative"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 50%, var(--text-primary) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {phrases[currentIndex]}
          </h1>

          {/* Shine effect overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: 'translateX(-100%)',
            }}
            animate={{
              transform: ['translateX(-100%)', 'translateX(200%)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 -z-10 blur-3xl opacity-30"
        animate={{
          background: [
            'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  )
}

export default MorphingText

