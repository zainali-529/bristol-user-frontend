import { motion } from 'framer-motion'
import { TrendingUp, Users, Award, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * Animated stats showcase for Hero3
 */
function AnimatedStats() {
  const [activeIndex, setActiveIndex] = useState(0)

  const stats = [
    {
      icon: TrendingUp,
      value: '£12.5M+',
      label: 'Total Savings Generated',
      color: '#10b981',
      description: 'Helped businesses save millions on energy costs'
    },
    {
      icon: Users,
      value: '5,000+',
      label: 'Active Clients',
      color: '#3b82f6',
      description: 'Businesses across the UK trust us'
    },
    {
      icon: Award,
      value: '23%',
      label: 'Average Savings',
      color: '#f97316',
      description: 'On average, clients save nearly a quarter'
    },
    {
      icon: Building2,
      value: '15,000+',
      label: 'Contracts Managed',
      color: 'var(--primary)',
      description: 'Successfully negotiated and managed'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [stats.length])

  const activeStat = stats[activeIndex]
  const Icon = activeStat.icon

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Background circles */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              width: 200 + i * 120,
              height: 200 + i * 120,
              borderColor: `${activeStat.color}20`,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Main stat display */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 text-center"
      >
        {/* Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${activeStat.color}15`,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={48} style={{ color: activeStat.color }} strokeWidth={2} />
        </motion.div>

        {/* Value */}
        <motion.h3
          className="text-6xl md:text-7xl font-black mb-3"
          style={{ color: activeStat.color }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeStat.value}
        </motion.h3>

        {/* Label */}
        <motion.p
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {activeStat.label}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base max-w-md mx-auto"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {activeStat.description}
        </motion.p>
      </motion.div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {stats.map((stat, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="group relative"
          >
            <motion.div
              className="w-3 h-3 rounded-full cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: index === activeIndex ? stat.color : `${stat.color}30`,
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${stat.color}`,
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AnimatedStats

