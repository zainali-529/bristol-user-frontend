import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LivePriceCard from '@/components/widgets/LivePriceCard'
import { getEnergyPriceData } from '@/services/energyPriceApi'

function EnergyPriceTracker() {
  const [priceData, setPriceData] = useState(null)

  useEffect(() => {
    // Fetch price data
    const fetchData = async () => {
      try {
        const data = await getEnergyPriceData('7d')
        setPriceData(data)
      } catch (error) {
        console.error('Error fetching energy price data:', error)
      }
    }

    fetchData()
  }, [])

  if (!priceData) {
    return null
  }

  const { electricity, gas, insights } = priceData

  // Determine market status styling
  const getMarketStatusStyle = () => {
    switch (insights.sentiment) {
      case 'positive':
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          color: '#10b981',
          icon: TrendingUp,
        }
      case 'negative':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          icon: Activity,
        }
      default:
        return {
          bg: 'var(--primary-10)',
          color: 'var(--primary)',
          icon: Activity,
        }
    }
  }

  const marketStyle = getMarketStatusStyle()
  const MarketIcon = marketStyle.icon

  return (
    <section 
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Decorative Background */}
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span 
            className="text-sm md:text-base font-medium mb-2 block"
            style={{ color: 'var(--primary)' }}
          >
            Live Market Data
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Energy Price Tracker
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Stay informed with real-time energy market data. Track electricity and gas prices 
            to make informed decisions about your energy contracts.
          </p>
        </motion.div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <LivePriceCard
              type="electricity"
              current={electricity.current}
              change={electricity.change}
              trend={electricity.trend}
              history={electricity.history}
              lastUpdate={priceData.generatedAt}
              showChart={true}
              size="default"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LivePriceCard
              type="gas"
              current={gas.current}
              change={gas.change}
              trend={gas.trend}
              history={gas.history}
              lastUpdate={priceData.generatedAt}
              showChart={true}
              size="default"
            />
          </motion.div>
        </div>

        {/* Market Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 md:p-8 rounded-2xl mb-8"
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--primary-10)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div 
                className="p-3 rounded-lg flex-shrink-0"
                style={{ backgroundColor: marketStyle.bg }}
              >
                <MarketIcon size={24} style={{ color: marketStyle.color }} />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Market Status:
                  </h3>
                  <span 
                    className="text-xl font-bold capitalize"
                    style={{ color: marketStyle.color }}
                  >
                    {insights.marketStatus}
                  </span>
                </div>
                <p 
                  className="text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {insights.recommendation}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="flex-shrink-0 group rounded-lg font-semibold px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border-0"
              style={{
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                color: 'white',
              }}
            >
              <Link to="/energy-price-tracker" className="flex items-center gap-2">
                View Full Tracker
                <ArrowRight 
                  size={20} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div 
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: 'var(--primary-5)' }}
          >
            <p 
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Avg Electricity
            </p>
            <p 
              className="text-2xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              £{electricity.average.toFixed(4)}
            </p>
          </div>

          <div 
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: 'var(--primary-5)' }}
          >
            <p 
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Avg Gas
            </p>
            <p 
              className="text-2xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              £{gas.average.toFixed(4)}
            </p>
          </div>

          <div 
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: 'var(--primary-5)' }}
          >
            <p 
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              7-Day High
            </p>
            <p 
              className="text-2xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              £{Math.max(electricity.high, gas.high).toFixed(4)}
            </p>
          </div>

          <div 
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: 'var(--primary-5)' }}
          >
            <p 
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              7-Day Low
            </p>
            <p 
              className="text-2xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              £{Math.min(electricity.low, gas.low).toFixed(4)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EnergyPriceTracker

