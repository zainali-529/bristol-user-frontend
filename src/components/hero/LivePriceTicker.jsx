import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap, Flame } from 'lucide-react'

/**
 * Live price ticker with auto-scroll
 */
function LivePriceTicker() {
  const priceData = [
    { type: 'Electricity', price: '£0.234', change: -2.5, trend: 'down', icon: Zap, color: '#3b82f6' },
    { type: 'Gas', price: '£0.067', change: 1.2, trend: 'up', icon: Flame, color: '#f97316' },
    { type: 'Best Time', status: 'Good', icon: TrendingUp, color: '#10b981' },
    { type: 'Electricity', price: '£0.234', change: -2.5, trend: 'down', icon: Zap, color: '#3b82f6' },
    { type: 'Gas', price: '£0.067', change: 1.2, trend: 'up', icon: Flame, color: '#f97316' },
    { type: 'Best Time', status: 'Good', icon: TrendingUp, color: '#10b981' },
  ]

  return (
    <div className="relative overflow-hidden py-4 backdrop-blur-sm"
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -50 * priceData.length],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {priceData.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-2 rounded-lg backdrop-blur-sm flex-shrink-0"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                minWidth: '200px',
              }}
            >
              <Icon size={20} style={{ color: item.color }} />
              
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.type}
                </span>
                
                {item.price && (
                  <>
                    <span 
                      className="text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {item.price}
                    </span>
                    
                    <span 
                      className="text-xs flex items-center gap-1"
                      style={{ 
                        color: item.trend === 'down' ? '#10b981' : '#ef4444' 
                      }}
                    >
                      {item.trend === 'down' ? (
                        <TrendingDown size={12} />
                      ) : (
                        <TrendingUp size={12} />
                      )}
                      {Math.abs(item.change)}%
                    </span>
                  </>
                )}
                
                {item.status && (
                  <span 
                    className="text-sm font-bold"
                    style={{ color: item.color }}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default LivePriceTicker

