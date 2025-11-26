import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Bell,
  Activity,
  Calendar,
  BarChart3,
  Zap,
  Flame
} from 'lucide-react'
import TopNav from '@/components/TopNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LivePriceCard from '@/components/widgets/LivePriceCard'
import PriceLineChart from '@/components/charts/PriceLineChart'
import PriceComparisonChart from '@/components/charts/PriceComparisonChart'
import { getEnergyPriceData, getComparisonData, getMarketStats, subscribeToPriceAlerts } from '@/services/energyPriceApi'

function EnergyPriceTracker() {
  const [timeRange, setTimeRange] = useState('30d')
  const [chartType, setChartType] = useState('both') // 'electricity' | 'gas' | 'both'
  const [priceData, setPriceData] = useState(null)
  const [comparisonData, setComparisonData] = useState(null)
  const [marketStats, setMarketStats] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Fetch data when time range changes
    const fetchData = async () => {
      try {
        const [data, comparison, stats] = await Promise.all([
          getEnergyPriceData(timeRange),
          getComparisonData(timeRange),
          getMarketStats()
        ])
        
        setPriceData(data)
        setComparisonData(comparison)
        setMarketStats(stats)
      } catch (error) {
        console.error('Error fetching energy price data:', error)
      }
    }

    fetchData()
  }, [timeRange])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    
    try {
      const response = await subscribeToPriceAlerts(email)
      
      if (response.success) {
        alert(response.message || `Price alerts will be sent to: ${email}`)
        setEmail('')
      } else {
        alert(response.message || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      alert(error.message || 'Failed to subscribe. Please try again.')
    }
  }

  if (!priceData || !marketStats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity 
            size={48} 
            className="animate-spin mx-auto mb-4"
            style={{ color: 'var(--primary)' }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>Loading market data...</p>
        </div>
      </div>
    )
  }

  const { electricity, gas, insights } = priceData

  // Time range options
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '3m', label: '3 Months' },
    { value: '12m', label: '12 Months' },
  ]

  // Chart type tabs
  const chartTypes = [
    { value: 'electricity', label: 'Electricity', icon: Zap, color: '#3b82f6' },
    { value: 'gas', label: 'Gas', icon: Flame, color: '#f97316' },
    { value: 'both', label: 'Compare Both', icon: BarChart3, color: 'var(--primary)' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Hero Section */}
      <section 
        className="py-12 md:py-16 px-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--primary-5)' }}
      >
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ 
            backgroundColor: 'var(--primary)',
            transform: 'translate(30%, -30%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)' }}
            >
              <Activity size={18} />
              <span className="text-sm font-semibold">Live Market Data</span>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Energy Price Tracker
            </h1>

            <p 
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Monitor real-time energy prices and market trends. Make informed decisions 
              about your energy contracts with comprehensive market data and insights.
            </p>
          </motion.div>

          {/* Live Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <LivePriceCard
                type="electricity"
                current={electricity.current}
                change={electricity.change}
                trend={electricity.trend}
                history={electricity.history.slice(-7)}
                lastUpdate={priceData.generatedAt}
                showChart={false}
                size="small"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LivePriceCard
                type="gas"
                current={gas.current}
                change={gas.change}
                trend={gas.trend}
                history={gas.history.slice(-7)}
                lastUpdate={priceData.generatedAt}
                showChart={false}
                size="small"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--primary-10)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                {marketStats.monthly.electricityChange > 0 ? (
                  <TrendingUp size={20} style={{ color: '#ef4444' }} />
                ) : (
                  <TrendingDown size={20} style={{ color: '#10b981' }} />
                )}
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Monthly Change
                </span>
              </div>
              <p 
                className="text-3xl font-black mb-1"
                style={{ 
                  color: marketStats.monthly.electricityChange > 0 ? '#ef4444' : '#10b981'
                }}
              >
                {marketStats.monthly.electricityChange > 0 ? '+' : ''}
                {marketStats.monthly.electricityChange.toFixed(1)}%
              </p>
              <p 
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                Average across both
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--primary-10)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={20} style={{ color: 'var(--primary)' }} />
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Market Status
                </span>
              </div>
              <p 
                className="text-2xl font-black mb-1 capitalize"
                style={{ color: 'var(--primary)' }}
              >
                {insights.marketStatus}
              </p>
              <p 
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {insights.sentiment === 'positive' ? '✓' : insights.sentiment === 'negative' ? '⚠' : '○'} {insights.recommendation.split('.')[0]}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Chart Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
              {/* Time Range Selector */}
              <div>
                <label 
                  className="text-sm font-medium mb-3 block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Time Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeRanges.map((range) => (
                    <motion.button
                      key={range.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTimeRange(range.value)}
                      className="px-6 py-2.5 rounded-lg font-medium transition-all"
                      style={{
                        backgroundColor: timeRange === range.value 
                          ? 'var(--primary)' 
                          : 'var(--card)',
                        color: timeRange === range.value 
                          ? 'white' 
                          : 'var(--text-primary)',
                        border: `1px solid ${timeRange === range.value ? 'var(--primary)' : 'var(--primary-20)'}`,
                      }}
                    >
                      {range.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Chart Type Tabs */}
              <div>
                <label 
                  className="text-sm font-medium mb-3 block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  View
                </label>
                <div className="flex flex-wrap gap-2">
                  {chartTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <motion.button
                        key={type.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setChartType(type.value)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all"
                        style={{
                          backgroundColor: chartType === type.value 
                            ? 'var(--primary)' 
                            : 'var(--card)',
                          color: chartType === type.value 
                            ? 'white' 
                            : 'var(--text-primary)',
                          border: `1px solid ${chartType === type.value ? 'var(--primary)' : 'var(--primary-20)'}`,
                        }}
                      >
                        <Icon size={18} />
                        {type.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart Display */}
          <motion.div
            className="rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--primary-10)',
            }}
            layout
          >
            <AnimatePresence mode="wait">
              {chartType === 'both' ? (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 
                    className="text-2xl font-bold mb-6"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Price Comparison
                  </h3>
                  <PriceComparisonChart 
                    data={comparisonData}
                    height={500}
                  />
                </motion.div>
              ) : chartType === 'electricity' ? (
                <motion.div
                  key="electricity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 
                    className="text-2xl font-bold mb-6 flex items-center gap-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <Zap size={24} style={{ color: '#3b82f6' }} />
                    Electricity Price Trend
                  </h3>
                  <PriceLineChart 
                    data={electricity.history}
                    dataKey="price"
                    color="#3b82f6"
                    showArea={true}
                    height={500}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="gas"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 
                    className="text-2xl font-bold mb-6 flex items-center gap-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <Flame size={24} style={{ color: '#f97316' }} />
                    Gas Price Trend
                  </h3>
                  <PriceLineChart 
                    data={gas.history}
                    dataKey="price"
                    color="#f97316"
                    showArea={true}
                    height={500}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            {/* Electricity Stats */}
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--primary-10)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} style={{ color: '#3b82f6' }} />
                <h4 
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Electricity
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Current:</span>
                  <span 
                    className="font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    £{electricity.current.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Average:</span>
                  <span 
                    className="font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    £{electricity.average.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>High:</span>
                  <span 
                    className="font-bold"
                    style={{ color: '#ef4444' }}
                  >
                    £{electricity.high.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Low:</span>
                  <span 
                    className="font-bold"
                    style={{ color: '#10b981' }}
                  >
                    £{electricity.low.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Gas Stats */}
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--primary-10)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame size={20} style={{ color: '#f97316' }} />
                <h4 
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Gas
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Current:</span>
                  <span 
                    className="font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    £{gas.current.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Average:</span>
                  <span 
                    className="font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    £{gas.average.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>High:</span>
                  <span 
                    className="font-bold"
                    style={{ color: '#ef4444' }}
                  >
                    £{gas.high.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Low:</span>
                  <span 
                    className="font-bold"
                    style={{ color: '#10b981' }}
                  >
                    £{gas.low.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Market Insight */}
            <div 
              className="p-6 rounded-xl"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-10), var(--primary-5))',
                border: '1px solid var(--primary-20)' 
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity size={20} style={{ color: 'var(--primary)' }} />
                <h4 
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Market Insight
                </h4>
              </div>
              <p 
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {insights.recommendation}
              </p>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: insights.sentiment === 'positive' ? '#10b981' 
                      : insights.sentiment === 'negative' ? '#ef4444' 
                      : 'var(--primary)'
                  }}
                />
                <span 
                  className="text-xs font-medium capitalize"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {insights.sentiment} outlook
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Alerts Section */}
      <section 
        className="py-16 md:py-24 px-4"
        style={{ backgroundColor: 'var(--primary-5)' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Bell size={32} color="white" />
            </div>

            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Get Price Alerts
            </h2>

            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Never miss a price drop. Get notified when energy prices reach your target levels.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--primary-20)',
                  }}
                />
                <Button
                  type="submit"
                  className="gap-2"
                  style={{
                    background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                    color: 'white',
                  }}
                >
                  <Bell size={18} />
                  Subscribe
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              className="gap-2"
              size="lg"
              style={{
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                color: 'white',
              }}
              onClick={() => alert('Download feature coming soon!')}
            >
              <Download size={20} />
              Download Price Report
            </Button>
            <p 
              className="text-sm mt-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Export current price data and trends as PDF
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default EnergyPriceTracker

