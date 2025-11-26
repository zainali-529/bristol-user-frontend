import apiService from './api'
import { format } from 'date-fns'

/**
 * Energy Price API Service - Integrates real backend API
 */

/**
 * Get energy price data for specified time range
 * @param {string} range - Time range: '7d', '30d', '3m', '12m'
 * @returns {Promise<object>} Price data including electricity, gas, and insights
 */
export const getEnergyPriceData = async (range = '30d') => {
  try {
    const response = await apiService.getPriceHistory(range)
    
    if (response.data.success) {
      const data = response.data.data
      
      // Format history with additional fields for charts
      const formatHistory = (history) => {
        return history.map(item => ({
          date: format(new Date(item.date), 'yyyy-MM-dd'),
          timestamp: new Date(item.date).getTime(),
          price: item.price,
          formattedDate: format(new Date(item.date), 'MMM dd, yyyy'),
          shortDate: format(new Date(item.date), 'MMM dd'),
          change: item.change,
          trend: item.trend
        }))
      }

      return {
        electricity: {
          ...data.electricity,
          history: formatHistory(data.electricity.history)
        },
        gas: {
          ...data.gas,
          history: formatHistory(data.gas.history)
        },
        insights: data.insights,
        range,
        generatedAt: data.generatedAt
      }
    }
    
    throw new Error('Failed to fetch energy price data')
  } catch (error) {
    console.error('Get energy price data error:', error)
    
    // Fallback to mock data in case of error (for development)
    if (import.meta.env.DEV) {
      console.warn('Using fallback mock data due to API error')
      return getMockPriceData(range)
    }
    
    throw error
  }
}

/**
 * Get current live prices (latest data point)
 * @returns {Promise<object>} Current electricity and gas prices
 */
export const getCurrentPrices = async () => {
  try {
    const response = await apiService.getCurrentPrices()
    
    if (response.data.success) {
      return response.data.data
    }
    
    throw new Error('Failed to fetch current prices')
  } catch (error) {
    console.error('Get current prices error:', error)
    throw error
  }
}

/**
 * Get market statistics
 * @returns {Promise<object>} Market statistics and insights
 */
export const getMarketStats = async () => {
  try {
    const response = await apiService.getMarketStats()
    
    if (response.data.success) {
      return response.data.data
    }
    
    throw new Error('Failed to fetch market stats')
  } catch (error) {
    console.error('Get market stats error:', error)
    
    // Fallback for development
    if (import.meta.env.DEV) {
      const mockData = getEnergyPriceData('30d')
      return {
        current: {
          electricity: mockData.electricity?.current || 0.234,
          gas: mockData.gas?.current || 0.067
        },
        monthly: {
          electricityChange: mockData.electricity?.change || 0,
          gasChange: mockData.gas?.change || 0
        },
        insights: mockData.insights || {}
      }
    }
    
    throw error
  }
}

/**
 * Get price comparison data
 * @param {string} range - Time range
 * @returns {Promise<array>} Combined data for both electricity and gas
 */
export const getComparisonData = async (range = '30d') => {
  try {
    const response = await apiService.getComparisonData(range)
    
    if (response.data.success) {
      return response.data.data.map(item => ({
        date: format(new Date(item.date), 'yyyy-MM-dd'),
        formattedDate: format(new Date(item.date), 'MMM dd, yyyy'),
        shortDate: format(new Date(item.date), 'MMM dd'),
        timestamp: new Date(item.date).getTime(),
        electricity: item.electricity,
        gas: item.gas
      }))
    }
    
    throw new Error('Failed to fetch comparison data')
  } catch (error) {
    console.error('Get comparison data error:', error)
    
    // Fallback for development
    if (import.meta.env.DEV) {
      const data = await getEnergyPriceData(range)
      return data.electricity.history.map((item, index) => ({
        date: item.date,
        formattedDate: item.formattedDate,
        shortDate: item.shortDate,
        timestamp: item.timestamp,
        electricity: item.price,
        gas: data.gas.history[index]?.price || 0
      }))
    }
    
    throw error
  }
}

/**
 * Subscribe to price alerts
 * @param {string} email - User email
 * @param {object} preferences - Alert preferences
 * @returns {Promise<object>} Subscription result
 */
export const subscribeToPriceAlerts = async (email, preferences = {}) => {
  try {
    const response = await apiService.subscribeToPriceAlerts({ email, preferences })
    return response.data
  } catch (error) {
    console.error('Subscribe to price alerts error:', error)
    throw error
  }
}

/**
 * Unsubscribe from price alerts
 * @param {string} token - Unsubscribe token
 * @returns {Promise<object>} Unsubscribe result
 */
export const unsubscribeFromPriceAlerts = async (token) => {
  try {
    const response = await apiService.unsubscribeFromPriceAlerts(token)
    return response.data
  } catch (error) {
    console.error('Unsubscribe error:', error)
    throw error
  }
}

// Mock data fallback for development (same structure as backend)
const getMockPriceData = (range) => {
  const BASE_ELECTRICITY_PRICE = 0.234
  const BASE_GAS_PRICE = 0.067
  
  let days
  switch (range) {
    case '7d': days = 7; break
    case '30d': days = 30; break
    case '3m': days = 90; break
    case '12m': days = 365; break
    default: days = 30
  }

  const generateHistory = (basePrice, volatility = 0.05) => {
    const data = []
    let currentPrice = basePrice
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      const randomChange = (Math.random() - 0.5) * volatility * basePrice
      const seasonalFactor = Math.sin((i / 365) * Math.PI * 2) * 0.02 * basePrice
      const trendFactor = (i / days) * 0.01 * basePrice
      
      currentPrice = basePrice + randomChange + seasonalFactor - trendFactor
      currentPrice = Math.max(currentPrice, basePrice * 0.8)
      currentPrice = Math.min(currentPrice, basePrice * 1.3)
      
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        timestamp: date.getTime(),
        price: parseFloat(currentPrice.toFixed(4)),
        formattedDate: format(date, 'MMM dd, yyyy'),
        shortDate: format(date, 'MMM dd'),
        change: 0,
        trend: 'stable'
      })
    }
    
    return data
  }

  const electricityHistory = generateHistory(BASE_ELECTRICITY_PRICE, 0.06)
  const gasHistory = generateHistory(BASE_GAS_PRICE, 0.08)

  const calculateStats = (history) => {
    const prices = history.map(h => h.price)
    return {
      average: prices.reduce((a, b) => a + b, 0) / prices.length,
      high: Math.max(...prices),
      low: Math.min(...prices)
    }
  }

  const elecStats = calculateStats(electricityHistory)
  const gasStats = calculateStats(gasHistory)

  return {
    electricity: {
      current: electricityHistory[electricityHistory.length - 1].price,
      change: 2.3,
      trend: 'up',
      history: electricityHistory,
      ...elecStats,
      unit: '£/kWh',
      type: 'electricity'
    },
    gas: {
      current: gasHistory[gasHistory.length - 1].price,
      change: -1.5,
      trend: 'down',
      history: gasHistory,
      ...gasStats,
      unit: '£/kWh',
      type: 'gas'
    },
    insights: {
      marketStatus: 'stable',
      recommendation: 'Monitor prices closely',
      sentiment: 'neutral'
    },
    range,
    generatedAt: new Date().toISOString()
  }
}

export default {
  getEnergyPriceData,
  getCurrentPrices,
  getMarketStats,
  getComparisonData,
  subscribeToPriceAlerts,
  unsubscribeFromPriceAlerts
}

