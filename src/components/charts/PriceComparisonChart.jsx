import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import { Zap, Flame } from 'lucide-react'

function PriceComparisonChart({ data, height = 400 }) {
  const [hiddenLines, setHiddenLines] = useState({})

  // Toggle line visibility
  const handleLegendClick = (dataKey) => {
    setHiddenLines(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }))
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
            className="text-sm font-medium mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {label}
          </p>
          
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {entry.name}:
              </span>
              <span 
                className="text-sm font-bold"
                style={{ color: entry.color }}
              >
                £{entry.value.toFixed(4)}
              </span>
            </div>
          ))}
        </motion.div>
      )
    }
    return null
  }

  // Custom legend
  const CustomLegend = () => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLegendClick('electricity')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{
            backgroundColor: hiddenLines.electricity ? 'var(--primary-5)' : 'var(--primary-10)',
            opacity: hiddenLines.electricity ? 0.5 : 1,
          }}
        >
          <Zap 
            size={18} 
            style={{ color: '#3b82f6' }}
          />
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Electricity
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLegendClick('gas')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{
            backgroundColor: hiddenLines.gas ? 'var(--primary-5)' : 'var(--primary-10)',
            opacity: hiddenLines.gas ? 0.5 : 1,
          }}
        >
          <Flame 
            size={18} 
            style={{ color: '#f97316' }}
          />
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Gas
          </span>
        </motion.button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%' }}
    >
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
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
                value: '£/kWh', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: 'var(--text-secondary)', fontSize: 12 }
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              type="monotone"
              dataKey="electricity"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              animationDuration={1500}
              animationEasing="ease-in-out"
              hide={hiddenLines.electricity}
              name="Electricity"
            />
            
            <Line
              type="monotone"
              dataKey="gas"
              stroke="#f97316"
              strokeWidth={3}
              dot={false}
              animationDuration={1500}
              animationEasing="ease-in-out"
              hide={hiddenLines.gas}
              name="Gas"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <CustomLegend />
    </motion.div>
  )
}

export default PriceComparisonChart

