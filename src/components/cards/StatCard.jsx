import { motion } from 'framer-motion'
import AnimatedCounter from '../animations/AnimatedCounter'
import MiniGrowthChart from '../charts/MiniGrowthChart'

/**
 * Stat card component with icon, animated counter, and optional chart
 */
function StatCard({ 
  icon: Icon,
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  trend,
  trendValue,
  chartData,
  color = 'var(--primary)',
  iconBgColor,
  delay = 0,
  showProgress = false,
  progressValue = 0
}) {
  const defaultIconBg = iconBgColor || `${color}15` // 15 = ~9% opacity in hex

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="relative p-6 md:p-8 rounded-2xl overflow-hidden group"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--primary-10)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${color}15, transparent 70%)`,
        }}
      />

      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${color}, transparent 50%)`,
            `radial-gradient(circle at 100% 100%, ${color}, transparent 50%)`,
            `radial-gradient(circle at 0% 0%, ${color}, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: delay + 0.2,
            type: 'spring',
            stiffness: 200
          }}
          className="mb-6"
        >
          <div 
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ 
              backgroundColor: defaultIconBg,
            }}
          >
            <Icon 
              size={28} 
              strokeWidth={2.5}
              style={{ color }}
            />
          </div>
        </motion.div>

        {/* Value */}
        <div className="mb-2">
          <h3 
            className="text-4xl md:text-5xl font-black tracking-tight mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
              duration={2.5}
            />
          </h3>
          
          {/* Trend indicator */}
          {trend && trendValue && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.4 }}
              className="flex items-center gap-1 mt-2"
            >
              <span 
                className="text-sm font-semibold"
                style={{ 
                  color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : 'var(--text-secondary)'
                }}
              >
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
              </span>
              <span 
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                vs last year
              </span>
            </motion.div>
          )}
        </div>

        {/* Label */}
        <p 
          className="text-base md:text-lg font-medium mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </p>

        {/* Progress bar */}
        {showProgress && (
          <div className="mb-4">
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--primary-5)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressValue}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: delay + 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        )}

        {/* Mini chart */}
        {chartData && chartData.length > 0 && (
          <div className="mt-4 -mx-2">
            <MiniGrowthChart 
              data={chartData}
              color={color}
              height={50}
            />
          </div>
        )}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(200%)'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

export default StatCard

