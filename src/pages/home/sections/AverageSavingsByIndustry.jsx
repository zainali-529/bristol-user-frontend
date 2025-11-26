import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, Building2, ShoppingBag, Factory, Coffee, HeartPulse, Laptop } from 'lucide-react'
import { useState } from 'react'

/**
 * Average Savings By Industry Section
 */
function AverageSavingsByIndustry() {
  const [hoveredBar, setHoveredBar] = useState(null)

  const industries = [
    {
      name: 'Technology',
      savings: 28,
      icon: Laptop,
      color: '#3b82f6',
      avgBill: 5000,
      description: 'High energy consumption, maximum savings potential'
    },
    {
      name: 'Manufacturing',
      savings: 25,
      icon: Factory,
      color: '#8b5cf6',
      avgBill: 8000,
      description: 'Industrial scale operations with significant overhead'
    },
    {
      name: 'Healthcare',
      savings: 22,
      icon: HeartPulse,
      color: '#10b981',
      avgBill: 6000,
      description: '24/7 operations requiring constant energy supply'
    },
    {
      name: 'Retail',
      savings: 20,
      icon: ShoppingBag,
      color: '#f97316',
      avgBill: 3500,
      description: 'Multiple locations with lighting and HVAC needs'
    },
    {
      name: 'Hospitality',
      savings: 18,
      icon: Coffee,
      color: '#ec4899',
      avgBill: 4500,
      description: 'Hotels and restaurants with high utility costs'
    },
  ]

  // Sort by savings percentage (highest first)
  const sortedIndustries = [...industries].sort((a, b) => b.savings - a.savings)

  const calculateSavings = (avgBill, savingsPercent) => {
    return (avgBill * (savingsPercent / 100)).toFixed(0)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const monthlySavings = calculateSavings(data.avgBill, data.savings)
      const annualSavings = monthlySavings * 12
      const Icon = data.icon

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl backdrop-blur-xl shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: `2px solid ${data.color}`,
            minWidth: '250px',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${data.color}20` }}
            >
              <Icon size={20} style={{ color: data.color }} />
            </div>
            <div>
              <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {data.name}
              </h4>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {data.description}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Average Savings:
              </span>
              <span className="text-xl font-black" style={{ color: data.color }}>
                {data.savings}%
              </span>
            </div>

            <div 
              className="h-px w-full"
              style={{ backgroundColor: 'var(--border)' }}
            />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Monthly Savings:
              </span>
              <span className="text-lg font-bold" style={{ color: data.color }}>
                £{Number(monthlySavings).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Annual Savings:
              </span>
              <span className="text-lg font-bold" style={{ color: data.color }}>
                £{Number(annualSavings).toLocaleString()}
              </span>
            </div>

            <div 
              className="mt-3 p-2 rounded-lg text-center"
              style={{ backgroundColor: `${data.color}10` }}
            >
              <p className="text-xs font-semibold" style={{ color: data.color }}>
                Based on avg. monthly bill of £{data.avgBill.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      )
    }
    return null
  }

  return (
    <section
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{
          backgroundColor: 'var(--primary)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="text-sm md:text-base font-medium mb-2 block"
            style={{ color: 'var(--primary)' }}
          >
            Industry Insights
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Average Savings By{' '}
            <span style={{ color: 'var(--primary)' }}>Industry</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            See how much businesses in your industry typically save. Our specialized 
            approach delivers tailored solutions for every sector.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Side - Industry Cards */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {sortedIndustries.slice(0, 3).map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="p-4 rounded-2xl cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: hoveredBar === industry.name ? `${industry.color}10` : 'var(--card)',
                    border: `2px solid ${hoveredBar === industry.name ? industry.color : 'var(--border)'}`,
                  }}
                  onMouseEnter={() => setHoveredBar(industry.name)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${industry.color}20` }}
                    >
                      <Icon size={24} style={{ color: industry.color }} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-lg font-bold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {industry.name}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Save up to {industry.savings}%
                      </p>
                    </div>
                    <div
                      className="text-2xl font-black"
                      style={{ color: industry.color }}
                    >
                      {industry.savings}%
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Side - Bar Chart */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="p-6 md:p-8 rounded-3xl"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Savings Comparison
                </h3>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--primary-10)' }}>
                  <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                    All Industries
                  </span>
                </div>
              </div>

              <div className="h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortedIndustries}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 30]}
                      tickFormatter={(value) => `${value}%`}
                      style={{ fontSize: '0.875rem', fill: 'var(--text-secondary)' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      style={{ fontSize: '0.875rem', fill: 'var(--text-primary)', fontWeight: '600' }}
                      width={120}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar
                      dataKey="savings"
                      radius={[0, 12, 12, 0]}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationBegin={300}
                      onMouseEnter={(data) => setHoveredBar(data.name)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {sortedIndustries.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={hoveredBar === null || hoveredBar === entry.name ? 1 : 0.4}
                          style={{ transition: 'opacity 0.3s ease' }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {sortedIndustries.map((industry) => {
                  const Icon = industry.icon
                  return (
                    <motion.button
                      key={industry.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setHoveredBar(hoveredBar === industry.name ? null : industry.name)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: hoveredBar === industry.name ? `${industry.color}20` : 'var(--background)',
                        border: `1px solid ${hoveredBar === industry.name ? industry.color : 'var(--border)'}`,
                      }}
                    >
                      <Icon size={16} style={{ color: industry.color }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {industry.name}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <Building2 size={32} style={{ color: 'var(--primary)' }} className="mx-auto mb-3" />
            <p className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
              5+
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Industries Served
            </p>
          </div>

          <div
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <TrendingUp size={32} style={{ color: '#10b981' }} className="mx-auto mb-3" />
            <p className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
              23%
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Average Across All
            </p>
          </div>

          <div
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <HeartPulse size={32} style={{ color: '#3b82f6' }} className="mx-auto mb-3" />
            <p className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
              28%
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Highest Savings
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AverageSavingsByIndustry

