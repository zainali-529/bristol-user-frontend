import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

/**
 * Mini growth chart component for stat cards
 * Shows a small sparkline-style area chart
 */
function MiniGrowthChart({ 
  data, 
  color = '#AE613A',
  height = 50,
  className = ''
}) {
  // Ensure data has the right format
  const chartData = data.map(item => ({
    value: typeof item === 'number' ? item : item.value || 0
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={className}
      style={{ height: `${height}px`, width: '100%' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#gradient-${color})`}
            animationDuration={1500}
            animationEasing="ease-in-out"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default MiniGrowthChart

