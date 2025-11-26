import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap, DollarSign, Users, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts'

/**
 * Enhanced stats card with multiple graphs for Hero3
 */
function EnhancedStatsCard() {
  const [activeTab, setActiveTab] = useState(0)

  // Mock data for graphs
  const savingsData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1350 },
    { month: 'Mar', amount: 1180 },
    { month: 'Apr', amount: 1520 },
    { month: 'May', amount: 1680 },
    { month: 'Jun', amount: 1850 },
  ]

  const clientGrowthData = [
    { month: 'Jan', clients: 3200 },
    { month: 'Feb', clients: 3600 },
    { month: 'Mar', clients: 4100 },
    { month: 'Apr', clients: 4400 },
    { month: 'May', clients: 4700 },
    { month: 'Jun', clients: 5000 },
  ]

  const energyPriceData = [
    { time: '6am', price: 0.23 },
    { time: '9am', price: 0.28 },
    { time: '12pm', price: 0.26 },
    { time: '3pm', price: 0.24 },
    { time: '6pm', price: 0.29 },
    { time: '9pm', price: 0.25 },
  ]

  const stats = [
    {
      icon: DollarSign,
      label: 'Avg. Savings',
      value: '£12,500',
      change: '+18%',
      trend: 'up',
      color: '#10b981',
      data: savingsData,
      chartType: 'area',
      dataKey: 'amount',
    },
    {
      icon: Users,
      label: 'Active Clients',
      value: '5,000+',
      change: '+24%',
      trend: 'up',
      color: '#3b82f6',
      data: clientGrowthData,
      chartType: 'line',
      dataKey: 'clients',
    },
    {
      icon: Zap,
      label: 'Energy Prices',
      value: '£0.24/kWh',
      change: '-5%',
      trend: 'down',
      color: '#f97316',
      data: energyPriceData,
      chartType: 'line',
      dataKey: 'price',
    },
  ]

  const currentStat = stats[activeTab]
  const Icon = currentStat.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % stats.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [stats.length])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded-lg shadow-lg"
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
          }}
        >
          <p className="text-xs font-semibold" style={{ color: currentStat.color }}>
            {typeof payload[0].value === 'number' && payload[0].value < 10
              ? `£${payload[0].value.toFixed(2)}`
              : payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="p-6 md:p-8 rounded-3xl backdrop-blur-xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {stats.map((stat, index) => {
            const TabIcon = stat.icon
            return (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 p-3 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: activeTab === index ? `${stat.color}20` : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${activeTab === index ? stat.color : 'transparent'}`,
                }}
              >
                <TabIcon
                  size={20}
                  style={{ color: activeTab === index ? stat.color : 'var(--text-secondary)' }}
                  className="mx-auto"
                />
              </motion.button>
            )
          })}
        </div>

        {/* Stat Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentStat.color}20` }}
              >
                <Icon size={24} style={{ color: currentStat.color }} strokeWidth={2.5} />
              </div>
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {currentStat.label}
                </p>
                <h3
                  className="text-3xl font-black"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {currentStat.value}
                </h3>
              </div>
            </div>

            <div
              className="flex items-center gap-1 px-3 py-1 rounded-lg"
              style={{
                backgroundColor: currentStat.trend === 'up' ? '#10b98120' : '#ef444420',
              }}
            >
              {currentStat.trend === 'up' ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span
                className={`text-sm font-bold ${
                  currentStat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {currentStat.change}
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              {currentStat.chartType === 'area' ? (
                <AreaChart data={currentStat.data}>
                  <defs>
                    <linearGradient id={`gradient-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentStat.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={currentStat.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Area
                    type="monotone"
                    dataKey={currentStat.dataKey}
                    stroke={currentStat.color}
                    strokeWidth={3}
                    fill={`url(#gradient-${activeTab})`}
                    isAnimationActive={true}
                    animationDuration={1000}
                    dot={false}
                  />
                </AreaChart>
              ) : (
                <LineChart data={currentStat.data}>
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Line
                    type="monotone"
                    dataKey={currentStat.dataKey}
                    stroke={currentStat.color}
                    strokeWidth={3}
                    isAnimationActive={true}
                    animationDuration={1000}
                    dot={{
                      fill: currentStat.color,
                      strokeWidth: 2,
                      r: 4,
                      stroke: 'var(--background)',
                    }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Timeline labels */}
          <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
            {currentStat.data.map((item, index) => (
              <span key={index}>{item.month || item.time}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <Award size={20} className="text-green-500 mb-2" />
          <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
            23%
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Avg. Savings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <Users size={20} className="text-blue-500 mb-2" />
          <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
            2K+
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            This Month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-2xl backdrop-blur-xl"
          style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
          }}
        >
          <Zap size={20} className="text-orange-500 mb-2" />
          <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
            2m
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Avg. Quote
          </p>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-2 justify-center"
      >
        {stats.map((stat, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className="relative"
          >
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: activeTab === index ? '32px' : '8px',
                backgroundColor: activeTab === index ? stat.color : `${stat.color}30`,
              }}
            />
          </button>
        ))}
      </motion.div>
    </div>
  )
}

export default EnhancedStatsCard

