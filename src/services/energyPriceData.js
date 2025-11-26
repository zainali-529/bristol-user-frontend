import { subDays, subMonths, format } from 'date-fns'

/**
 * Generate realistic UK energy price data
 * Based on typical UK business energy rates
 */

// Base prices (£/kWh)
const BASE_ELECTRICITY_PRICE = 0.234
const BASE_GAS_PRICE = 0.067

// Generate price data with realistic fluctuations
const generatePriceHistory = (basePrice, days, volatility = 0.05) => {
  const data = []
  let currentPrice = basePrice
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i)
    
    // Add realistic market fluctuations
    const randomChange = (Math.random() - 0.5) * volatility * basePrice
    const seasonalFactor = Math.sin((i / 365) * Math.PI * 2) * 0.02 * basePrice
    const trendFactor = (i / days) * 0.01 * basePrice
    
    currentPrice = basePrice + randomChange + seasonalFactor - trendFactor
    
    // Ensure price stays within reasonable bounds
    currentPrice = Math.max(currentPrice, basePrice * 0.8)
    currentPrice = Math.min(currentPrice, basePrice * 1.3)
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      timestamp: date.getTime(),
      price: parseFloat(currentPrice.toFixed(4)),
      formattedDate: format(date, 'MMM dd, yyyy'),
      shortDate: format(date, 'MMM dd'),
    })
  }
  
  return data
}

// Calculate price change and trend
const calculateChange = (history) => {
  if (history.length < 2) return { change: 0, trend: 'stable' }
  
  const current = history[history.length - 1].price
  const previous = history[history.length - 2].price
  const change = ((current - previous) / previous) * 100
  
  let trend = 'stable'
  if (change > 0.5) trend = 'up'
  if (change < -0.5) trend = 'down'
  
  return {
    change: parseFloat(change.toFixed(2)),
    trend,
  }
}

// Generate insights based on current market conditions
const generateInsights = (electricityData, gasData) => {
  const avgElecChange = electricityData.change
  const avgGasChange = gasData.change
  
  let marketStatus = 'stable'
  let recommendation = 'Monitor prices closely'
  let sentiment = 'neutral'
  
  if (avgElecChange > 2 || avgGasChange > 2) {
    marketStatus = 'rising'
    recommendation = 'Consider locking in rates now before further increases'
    sentiment = 'negative'
  } else if (avgElecChange < -2 || avgGasChange < -2) {
    marketStatus = 'falling'
    recommendation = 'Good time to negotiate better rates'
    sentiment = 'positive'
  } else {
    marketStatus = 'stable'
    recommendation = 'Favorable market conditions for switching'
    sentiment = 'neutral'
  }
  
  return {
    marketStatus,
    recommendation,
    sentiment,
    lastUpdate: new Date().toISOString(),
    nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
}

// Calculate average price for a period
const calculateAverage = (history) => {
  const sum = history.reduce((acc, item) => acc + item.price, 0)
  return parseFloat((sum / history.length).toFixed(4))
}

// Calculate high and low for a period
const calculateHighLow = (history) => {
  const prices = history.map(item => item.price)
  return {
    high: Math.max(...prices),
    low: Math.min(...prices),
  }
}

/**
 * Get energy price data for specified time range
 * @param {string} range - Time range: '7d', '30d', '3m', '12m'
 * @returns {object} Price data including electricity, gas, and insights
 */
export const getEnergyPriceData = (range = '30d') => {
  let days
  
  switch (range) {
    case '7d':
      days = 7
      break
    case '30d':
      days = 30
      break
    case '3m':
      days = 90
      break
    case '12m':
      days = 365
      break
    default:
      days = 30
  }
  
  // Generate electricity price history
  const electricityHistory = generatePriceHistory(BASE_ELECTRICITY_PRICE, days, 0.06)
  const electricityChange = calculateChange(electricityHistory)
  const electricityStats = calculateHighLow(electricityHistory)
  
  // Generate gas price history
  const gasHistory = generatePriceHistory(BASE_GAS_PRICE, days, 0.08)
  const gasChange = calculateChange(gasHistory)
  const gasStats = calculateHighLow(gasHistory)
  
  const electricityData = {
    current: electricityHistory[electricityHistory.length - 1].price,
    change: electricityChange.change,
    trend: electricityChange.trend,
    history: electricityHistory,
    average: calculateAverage(electricityHistory),
    high: electricityStats.high,
    low: electricityStats.low,
    unit: '£/kWh',
    type: 'electricity',
  }
  
  const gasData = {
    current: gasHistory[gasHistory.length - 1].price,
    change: gasChange.change,
    trend: gasChange.trend,
    history: gasHistory,
    average: calculateAverage(gasHistory),
    high: gasStats.high,
    low: gasStats.low,
    unit: '£/kWh',
    type: 'gas',
  }
  
  const insights = generateInsights(electricityData, gasData)
  
  return {
    electricity: electricityData,
    gas: gasData,
    insights,
    range,
    generatedAt: new Date().toISOString(),
  }
}

/**
 * Get current live prices (latest data point)
 * @returns {object} Current electricity and gas prices
 */
export const getCurrentPrices = () => {
  const data = getEnergyPriceData('7d')
  
  return {
    electricity: {
      current: data.electricity.current,
      change: data.electricity.change,
      trend: data.electricity.trend,
      unit: data.electricity.unit,
    },
    gas: {
      current: data.gas.current,
      change: data.gas.change,
      trend: data.gas.trend,
      unit: data.gas.unit,
    },
    lastUpdate: new Date().toISOString(),
  }
}

/**
 * Get market statistics
 * @returns {object} Market statistics and insights
 */
export const getMarketStats = () => {
  const data30d = getEnergyPriceData('30d')
  const data12m = getEnergyPriceData('12m')
  
  return {
    current: {
      electricity: data30d.electricity.current,
      gas: data30d.gas.current,
    },
    monthly: {
      electricityChange: data30d.electricity.change,
      gasChange: data30d.gas.change,
    },
    yearly: {
      electricityChange: calculateChange(data12m.electricity.history.slice(-30)).change,
      gasChange: calculateChange(data12m.gas.history.slice(-30)).change,
    },
    insights: data30d.insights,
  }
}

/**
 * Get price comparison data
 * @param {string} range - Time range
 * @returns {array} Combined data for both electricity and gas
 */
export const getComparisonData = (range = '30d') => {
  const data = getEnergyPriceData(range)
  
  // Combine histories for comparison chart
  return data.electricity.history.map((item, index) => ({
    date: item.date,
    formattedDate: item.formattedDate,
    shortDate: item.shortDate,
    timestamp: item.timestamp,
    electricity: item.price,
    gas: data.gas.history[index].price,
  }))
}

export default {
  getEnergyPriceData,
  getCurrentPrices,
  getMarketStats,
  getComparisonData,
}

