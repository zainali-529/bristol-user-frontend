import { useState } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'

function PriceLineChart({ 
  data, 
  dataKey = 'price', 
  color = '#AE613A', 
  showArea = true,
  height = 400,
  yAxisLabel = '£/kWh'
}) {
  const [hoveredData, setHoveredData] = useState(null)

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-4 shadow-xl border"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--primary-20)',
          }}
        >
          <p 
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {data.formattedDate || data.shortDate || data.date}
          </p>
          <p 
            className="text-2xl font-bold"
            style={{ color: 'var(--primary)' }}
          >
            £{payload[0].value.toFixed(4)}
          </p>
          <p 
            className="text-xs mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            per kWh
          </p>
        </motion.div>
      )
    }
    return null
  }

  // Custom dot for line chart
  const CustomDot = (props) => {
    const { cx, cy, payload } = props
    
    if (hoveredData && payload.timestamp === hoveredData.timestamp) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={color}
          stroke="white"
          strokeWidth={2}
        />
      )
    }
    
    return null
  }

  const Chart = showArea ? AreaChart : LineChart

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ height: `${height}px`, width: '100%' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <Chart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          onMouseMove={(e) => {
            if (e && e.activePayload) {
              setHoveredData(e.activePayload[0].payload)
            }
          }}
          onMouseLeave={() => setHoveredData(null)}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--primary-10)" 
            vertical={false}
          />
          
          <XAxis
            dataKey="shortDate"
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--primary-10)' }}
          />
          
          <YAxis
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--primary-10)' }}
            tickFormatter={(value) => `£${value.toFixed(3)}`}
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: 'var(--text-secondary)', fontSize: 12 }
            }}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={false} />
          
          {showArea ? (
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              fill="url(#colorPrice)"
              animationDuration={1500}
              animationEasing="ease-in-out"
              dot={<CustomDot />}
            />
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={<CustomDot />}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default PriceLineChart

