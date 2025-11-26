import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, FileText, Sparkles } from 'lucide-react'
import StatCard from '@/components/cards/StatCard'

function SavingsStatistics() {
  // Mock data for statistics
  const statistics = {
    totalSavings: 12500000, // £12.5M
    averageSavings: 23, // 23%
    activeClients: 5000, // 5,000+
    contractsManaged: 15000, // 15,000+
  }

  // Mock growth data for mini charts (last 12 months)
  const generateGrowthData = (base, variance = 0.1) => {
    return Array.from({ length: 12 }, (_, i) => {
      const trend = i * 0.05 // Upward trend
      const random = (Math.random() - 0.5) * variance
      return base * (1 + trend + random)
    })
  }

  const savingsGrowth = generateGrowthData(100, 0.15)
  const clientsGrowth = generateGrowthData(100, 0.08)

  // Stat cards configuration
  const stats = [
    {
      icon: DollarSign,
      value: 12.5,
      label: 'Total Savings Delivered',
      prefix: '£',
      suffix: 'M+',
      decimals: 1,
      trend: 'up',
      trendValue: '+18%',
      chartData: savingsGrowth,
      color: 'var(--primary)',
      delay: 0,
    },
    {
      icon: TrendingUp,
      value: 23,
      label: 'Average Savings',
      suffix: '%',
      decimals: 0,
      showProgress: true,
      progressValue: 23,
      trend: 'up',
      trendValue: '+3%',
      color: '#10b981', // green
      delay: 0.1,
    },
    {
      icon: Users,
      value: 5000,
      label: 'Active Business Clients',
      suffix: '+',
      decimals: 0,
      chartData: clientsGrowth,
      trend: 'up',
      trendValue: '+12%',
      color: '#3b82f6', // blue
      delay: 0.2,
    },
    {
      icon: FileText,
      value: 15000,
      label: 'Energy Contracts Managed',
      suffix: '+',
      decimals: 0,
      trend: 'up',
      trendValue: '+25%',
      color: '#f97316', // orange
      delay: 0.3,
    },
  ]

  return (
    <section 
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Decorative Background Elements */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ 
          backgroundColor: 'var(--primary)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ 
          backgroundColor: 'var(--primary)',
          transform: 'translate(30%, 30%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              type: 'spring',
              stiffness: 200
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)' }}
          >
            <Sparkles size={18} />
            <span className="text-sm font-semibold">Our Impact</span>
          </motion.div>

          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Impact <span style={{ color: 'var(--primary)' }}>In Numbers</span>
          </h2>

          <p 
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            We're proud to help UK businesses save millions on their energy costs. 
            Here's the real impact we've made for our clients.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              trend={stat.trend}
              trendValue={stat.trendValue}
              chartData={stat.chartData}
              color={stat.color}
              delay={stat.delay}
              showProgress={stat.showProgress}
              progressValue={stat.progressValue}
            />
          ))}
        </div>

        {/* Bottom CTA or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div 
            className="inline-block px-6 py-4 rounded-2xl"
            style={{ 
              backgroundColor: 'var(--primary-5)',
              border: '1px solid var(--primary-10)'
            }}
          >
            <p 
              className="text-base md:text-lg font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Join <span className="font-bold" style={{ color: 'var(--primary)' }}>5,000+ businesses</span> who trust us with their energy needs
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SavingsStatistics

