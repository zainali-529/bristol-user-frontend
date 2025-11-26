import { motion } from 'framer-motion'
import { Shield, CheckCircle, Award, Star } from 'lucide-react'

/**
 * Trust badges component for Hero3
 */
function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      label: 'Fully Regulated',
      color: '#10b981',
    },
    {
      icon: CheckCircle,
      label: 'No Hidden Fees',
      color: '#3b82f6',
    },
    {
      icon: Award,
      label: 'Award Winning',
      color: '#f97316',
    },
    {
      icon: Star,
      label: '4.9/5 Rating',
      color: '#fbbf24',
    },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Icon size={20} style={{ color: badge.color }} strokeWidth={2.5} />
            <span 
              className="text-sm font-semibold whitespace-nowrap"
              style={{ color: 'var(--text-primary)' }}
            >
              {badge.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TrustBadges

