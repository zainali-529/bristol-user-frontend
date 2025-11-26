import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react'
import AnimatedCounter from '../animations/AnimatedCounter'
import { Link } from 'react-router-dom'

/**
 * Instant savings calculator with real-time results
 */
function InstantSavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(1000)
  const [businessType, setBusinessType] = useState('Medium')

  // Calculate savings
  const calculateSavings = () => {
    const savingsRate = {
      'SME': 0.20,
      'Medium': 0.23,
      'Large': 0.25,
      'Enterprise': 0.28
    }
    
    const rate = savingsRate[businessType] || 0.23
    const annualBill = monthlyBill * 12
    const annualSavings = annualBill * rate
    
    return {
      monthly: annualSavings / 12,
      annual: annualSavings,
      percentage: rate * 100
    }
  }

  const savings = calculateSavings()

  const businessTypes = [
    { value: 'SME', label: 'SME', savings: '20%' },
    { value: 'Medium', label: 'Medium', savings: '23%' },
    { value: 'Large', label: 'Large', savings: '25%' },
    { value: 'Enterprise', label: 'Enterprise', savings: '28%' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative p-8 md:p-10 rounded-3xl backdrop-blur-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-50 blur-2xl -z-10"
        style={{
          background: 'radial-gradient(circle at center, var(--primary)40, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)' }}
        >
          <Sparkles size={16} />
          <span className="text-sm font-semibold">Instant Calculator</span>
        </motion.div>

        <h2 
          className="text-3xl md:text-4xl font-black mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          See Your Savings
        </h2>
        <p 
          className="text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          Calculate how much you could save in seconds
        </p>
      </div>

      {/* Monthly Bill Slider */}
      <div className="mb-8">
        <label 
          className="block text-sm font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Monthly Energy Bill
        </label>
        
        <div className="relative">
          <input
            type="range"
            min="100"
            max="10000"
            step="50"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(monthlyBill / 10000) * 100}%, rgba(255,255,255,0.1) ${(monthlyBill / 10000) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          
          <motion.div
            key={monthlyBill}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 text-center p-4 rounded-xl"
            style={{ backgroundColor: 'var(--primary-10)' }}
          >
            <span 
              className="text-4xl font-black"
              style={{ color: 'var(--primary)' }}
            >
              £{monthlyBill.toLocaleString()}
            </span>
            <span 
              className="text-sm ml-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              per month
            </span>
          </motion.div>
        </div>
      </div>

      {/* Business Type Selector */}
      <div className="mb-8">
        <label 
          className="block text-sm font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Business Type
        </label>
        
        <div className="grid grid-cols-2 gap-3">
          {businessTypes.map((type) => (
            <motion.button
              key={type.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBusinessType(type.value)}
              className="p-4 rounded-xl font-semibold transition-all duration-300"
              style={{
                backgroundColor: businessType === type.value 
                  ? 'var(--primary)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: businessType === type.value 
                  ? 'white' 
                  : 'var(--text-primary)',
                border: `2px solid ${businessType === type.value ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
              }}
            >
              <div className="text-base">{type.label}</div>
              <div className="text-xs opacity-70">Save {type.savings}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Savings Display */}
      <motion.div
        key={`${monthlyBill}-${businessType}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 p-6 rounded-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--primary-80) 100%)',
        }}
      >
        {/* Animated particles in background */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} color="white" />
            <p className="text-white text-sm font-semibold">
              Your Potential Annual Savings
            </p>
          </div>
          
          <div className="text-5xl md:text-6xl font-black text-white mb-2">
            £<AnimatedCounter 
              value={savings.annual} 
              decimals={0}
              duration={1.5}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-16 h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${savings.percentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <span className="text-white text-sm font-semibold">
                {savings.percentage}% savings
              </span>
            </div>
          </div>

          <p className="text-white text-sm mt-4 opacity-90">
            That's £{savings.monthly.toFixed(0)} saved every month!
          </p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <Link to="/quote-calculator">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--primary)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 group relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
          }}
        >
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
          
          <span className="relative z-10">Get My Free Quote</span>
          <ArrowRight 
            size={24} 
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
          />
        </motion.button>
      </Link>

      <p 
        className="text-center text-xs mt-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        No commitment • Takes 2 minutes • Free service
      </p>
    </motion.div>
  )
}

export default InstantSavingsCalculator

