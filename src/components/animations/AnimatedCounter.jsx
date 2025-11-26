import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'

/**
 * Animated counter component with smooth count-up animation
 * Triggers when element comes into view
 */
function AnimatedCounter({ 
  value, 
  duration = 2.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  className = ''
}) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const spring = useSpring(0, { 
    stiffness: 50, 
    damping: 30,
    duration: duration * 1000
  })
  
  const display = useTransform(spring, (current) => {
    // Format number with thousands separator
    const num = current.toFixed(decimals)
    const parts = num.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  })
  
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated, spring, value])

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  return (
    <motion.span 
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}

export default AnimatedCounter

