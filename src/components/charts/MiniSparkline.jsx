import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

function MiniSparkline({ data, trend, color, height = 60 }) {
  // Determine color based on trend
  const getColor = () => {
    if (color) return color
    
    switch (trend) {
      case 'up':
        return '#10b981' // green
      case 'down':
        return '#ef4444' // red
      default:
        return 'var(--primary)' // primary
    }
  }

  const lineColor = getColor()

  // Prepare data - ensure we have price values
  const chartData = data.map(item => ({
    value: item.price || item.value || 0,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ height: `${height}px`, width: '100%' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default MiniSparkline

