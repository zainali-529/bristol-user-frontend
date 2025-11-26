import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Zap, Flame } from 'lucide-react'
import MiniSparkline from '../charts/MiniSparkline'

function AnimatedCounter({ value, decimals = 4 }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (current) => current.toFixed(decimals))
  const [displayValue, setDisplayValue] = useState('0.0000')

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  return displayValue
}

function LivePriceCard({ 
  type = 'electricity', 
  current, 
  change, 
  trend, 
  history = [],
  lastUpdate,
  showChart = true,
  size = 'default' // 'small' | 'default' | 'large'
}) {
  const isElectricity = type === 'electricity'
  
  // Determine colors and icons
  const getTypeConfig = () => {
    if (isElectricity) {
      return {
        icon: Zap,
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        label: 'Electricity',
      }
    }
    return {
      icon: Flame,
      color: '#f97316',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      label: 'Gas',
    }
  }

  const getTrendConfig = () => {
    switch (trend) {
      case 'up':
        return {
          icon: TrendingUp,
          color: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
        }
      case 'down':
        return {
          icon: TrendingDown,
          color: '#10b981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
        }
      default:
        return {
          icon: Minus,
          color: 'var(--text-secondary)',
          bgColor: 'var(--primary-5)',
        }
    }
  }

  const typeConfig = getTypeConfig()
  const trendConfig = getTrendConfig()
  const TypeIcon = typeConfig.icon
  const TrendIcon = trendConfig.icon

  // Size configurations
  const sizeConfig = {
    small: {
      padding: 'p-4',
      iconSize: 20,
      titleSize: 'text-sm',
      priceSize: 'text-2xl',
      changeSize: 'text-xs',
      chartHeight: 40,
    },
    default: {
      padding: 'p-6',
      iconSize: 24,
      titleSize: 'text-base',
      priceSize: 'text-4xl',
      changeSize: 'text-sm',
      chartHeight: 60,
    },
    large: {
      padding: 'p-8',
      iconSize: 32,
      titleSize: 'text-lg',
      priceSize: 'text-5xl',
      changeSize: 'text-base',
      chartHeight: 80,
    },
  }

  const config = sizeConfig[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className={`${config.padding} rounded-2xl relative overflow-hidden group`}
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--primary-10)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${typeConfig.bgColor}, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: typeConfig.bgColor }}
            >
              <TypeIcon size={config.iconSize} style={{ color: typeConfig.color }} />
            </div>
            <span 
              className={`${config.titleSize} font-semibold`}
              style={{ color: 'var(--text-primary)' }}
            >
              {typeConfig.label}
            </span>
          </div>

          {/* Trend indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ backgroundColor: trendConfig.bgColor }}
          >
            <TrendIcon size={14} style={{ color: trendConfig.color }} />
            <span 
              className={`${config.changeSize} font-semibold`}
              style={{ color: trendConfig.color }}
            >
              {change > 0 ? '+' : ''}{change}%
            </span>
          </motion.div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span 
              className={`${config.priceSize} font-black tracking-tight`}
              style={{ color: 'var(--primary)' }}
            >
              £<AnimatedCounter value={current} decimals={4} />
            </span>
          </div>
          <p 
            className="text-xs mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            per kWh
          </p>
        </div>

        {/* Chart */}
        {showChart && history.length > 0 && (
          <div className="mt-4">
            <MiniSparkline 
              data={history} 
              trend={trend}
              color={typeConfig.color}
              height={config.chartHeight}
            />
          </div>
        )}

        {/* Last update */}
        {lastUpdate && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs mt-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Last updated: {new Date(lastUpdate).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </motion.p>
        )}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: 'translateX(200%)',
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </motion.div>
  )
}

export default LivePriceCard

