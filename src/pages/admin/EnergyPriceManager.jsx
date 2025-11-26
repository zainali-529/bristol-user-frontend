import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Flame,
  TrendingUp,
  TrendingDown,
  Save,
  RefreshCw,
  Users,
  Bell,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import TopNav from '@/components/TopNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import apiService from '@/services/api'

function EnergyPriceManager() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [currentPrices, setCurrentPrices] = useState(null)
  const [subscriptionStats, setSubscriptionStats] = useState(null)

  // Form states
  const [electricityPrice, setElectricityPrice] = useState('')
  const [gasPrice, setGasPrice] = useState('')
  const [marketStatus, setMarketStatus] = useState('stable')
  const [sentiment, setSentiment] = useState('neutral')
  const [recommendation, setRecommendation] = useState('')

  useEffect(() => {
    fetchCurrentData()
  }, [])

  const fetchCurrentData = async () => {
    try {
      const [pricesRes, statsRes] = await Promise.all([
        apiService.getCurrentPrices(),
        apiService.getSubscriptionStats()
      ])

      if (pricesRes.data.success) {
        const data = pricesRes.data.data
        setCurrentPrices(data)
        setElectricityPrice(data.electricity.current.toString())
        setGasPrice(data.gas.current.toString())
        setMarketStatus(data.insights.marketStatus)
        setSentiment(data.insights.sentiment)
        setRecommendation(data.insights.recommendation)
      }

      if (statsRes.data.success) {
        setSubscriptionStats(statsRes.data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      showMessage('Error loading current data', 'error')
    }
  }

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleUpdatePrices = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await apiService.createOrUpdateEnergyPrice({
        electricityPrice: parseFloat(electricityPrice),
        gasPrice: parseFloat(gasPrice),
        insights: {
          marketStatus,
          sentiment,
          recommendation
        }
      })

      if (response.data.success) {
        showMessage('Energy prices updated successfully!', 'success')
        await fetchCurrentData()
      } else {
        showMessage(response.data.message || 'Failed to update prices', 'error')
      }
    } catch (error) {
      console.error('Error updating prices:', error)
      showMessage(error.response?.data?.message || 'Failed to update prices', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateInsights = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await apiService.updateMarketInsights({
        marketStatus,
        sentiment,
        recommendation
      })

      if (response.data.success) {
        showMessage('Market insights updated successfully!', 'success')
        await fetchCurrentData()
      } else {
        showMessage(response.data.message || 'Failed to update insights', 'error')
      }
    } catch (error) {
      console.error('Error updating insights:', error)
      showMessage(error.response?.data?.message || 'Failed to update insights', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Header */}
      <section 
        className="py-8 px-4"
        style={{ backgroundColor: 'var(--primary-5)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Activity size={32} style={{ color: 'var(--primary)' }} />
              <h1 
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Energy Price Manager
              </h1>
            </div>
            <p 
              className="text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Update energy prices and market insights for the public tracker
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message Banner */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-7xl mx-auto px-4 mt-4"
        >
          <div
            className="p-4 rounded-lg flex items-center gap-3"
            style={{
              backgroundColor: message.type === 'success' 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`
            }}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} style={{ color: '#10b981' }} />
            ) : (
              <AlertCircle size={20} style={{ color: '#ef4444' }} />
            )}
            <span style={{ color: message.type === 'success' ? '#10b981' : '#ef4444' }}>
              {message.text}
            </span>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap size={16} style={{ color: '#3b82f6' }} />
                  Current Electricity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  £{currentPrices?.electricity.current.toFixed(4) || '0.0000'}
                </p>
                <p className="text-xs text-muted-foreground">per kWh</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Flame size={16} style={{ color: '#f97316' }} />
                  Current Gas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  £{currentPrices?.gas.current.toFixed(4) || '0.0000'}
                </p>
                <p className="text-xs text-muted-foreground">per kWh</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users size={16} style={{ color: 'var(--primary)' }} />
                  Active Subscribers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {subscriptionStats?.active || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {subscriptionStats?.total || 0} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bell size={16} style={{ color: 'var(--primary)' }} />
                  Recent Signups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {subscriptionStats?.recentSubscriptions || 0}
                </p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="prices">Update Prices</TabsTrigger>
              <TabsTrigger value="insights">Market Insights</TabsTrigger>
            </TabsList>

            {/* Update Prices Tab */}
            <TabsContent value="prices">
              <Card>
                <CardHeader>
                  <CardTitle>Update Energy Prices</CardTitle>
                  <CardDescription>
                    Enter new electricity and gas prices. Changes will be visible immediately on the public tracker.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePrices} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Electricity Price */}
                      <div className="space-y-2">
                        <Label htmlFor="electricityPrice" className="flex items-center gap-2">
                          <Zap size={16} style={{ color: '#3b82f6' }} />
                          Electricity Price (£/kWh)
                        </Label>
                        <Input
                          id="electricityPrice"
                          type="number"
                          step="0.0001"
                          min="0"
                          value={electricityPrice}
                          onChange={(e) => setElectricityPrice(e.target.value)}
                          placeholder="0.2340"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Current: £{currentPrices?.electricity.current.toFixed(4) || '0.0000'}
                        </p>
                      </div>

                      {/* Gas Price */}
                      <div className="space-y-2">
                        <Label htmlFor="gasPrice" className="flex items-center gap-2">
                          <Flame size={16} style={{ color: '#f97316' }} />
                          Gas Price (£/kWh)
                        </Label>
                        <Input
                          id="gasPrice"
                          type="number"
                          step="0.0001"
                          min="0"
                          value={gasPrice}
                          onChange={(e) => setGasPrice(e.target.value)}
                          placeholder="0.0670"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Current: £{currentPrices?.gas.current.toFixed(4) || '0.0000'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="gap-2"
                        style={{
                          background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                          color: 'white'
                        }}
                      >
                        {loading ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Save size={18} />
                        )}
                        Update Prices
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={fetchCurrentData}
                        disabled={loading}
                      >
                        <RefreshCw size={18} />
                        Refresh
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Market Insights Tab */}
            <TabsContent value="insights">
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights & Recommendations</CardTitle>
                  <CardDescription>
                    Update market status, sentiment, and provide recommendations to users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateInsights} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Market Status */}
                      <div className="space-y-2">
                        <Label htmlFor="marketStatus">Market Status</Label>
                        <Select
                          value={marketStatus}
                          onValueChange={setMarketStatus}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select market status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rising">
                              <div className="flex items-center gap-2">
                                <TrendingUp size={16} style={{ color: '#ef4444' }} />
                                Rising
                              </div>
                            </SelectItem>
                            <SelectItem value="falling">
                              <div className="flex items-center gap-2">
                                <TrendingDown size={16} style={{ color: '#10b981' }} />
                                Falling
                              </div>
                            </SelectItem>
                            <SelectItem value="stable">
                              <div className="flex items-center gap-2">
                                <Activity size={16} style={{ color: 'var(--primary)' }} />
                                Stable
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Sentiment */}
                      <div className="space-y-2">
                        <Label htmlFor="sentiment">Market Sentiment</Label>
                        <Select
                          value={sentiment}
                          onValueChange={setSentiment}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select sentiment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="positive">Positive</SelectItem>
                            <SelectItem value="negative">Negative</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="space-y-2">
                      <Label htmlFor="recommendation">Recommendation</Label>
                      <Textarea
                        id="recommendation"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                        placeholder="Enter market recommendation for users..."
                        rows={4}
                        maxLength={500}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        {recommendation.length}/500 characters
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="gap-2"
                        style={{
                          background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                          color: 'white'
                        }}
                      >
                        {loading ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Save size={18} />
                        )}
                        Update Insights
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={fetchCurrentData}
                        disabled={loading}
                      >
                        <RefreshCw size={18} />
                        Refresh
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Current Insights Preview */}
          {currentPrices && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Current Public Display</CardTitle>
                  <CardDescription>
                    This is how users see the current market insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-6 rounded-lg"
                    style={{
                      backgroundColor: 'var(--primary-10)',
                      border: '1px solid var(--primary-20)'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Activity size={24} style={{ color: 'var(--primary)' }} />
                      <div>
                        <h4 
                          className="text-lg font-bold mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Market Status: <span className="capitalize">{currentPrices.insights.marketStatus}</span>
                        </h4>
                        <p style={{ color: 'var(--text-secondary)' }}>
                          {currentPrices.insights.recommendation}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span 
                            className="text-sm font-medium capitalize"
                            style={{
                              color: currentPrices.insights.sentiment === 'positive' ? '#10b981'
                                : currentPrices.insights.sentiment === 'negative' ? '#ef4444'
                                : 'var(--primary)'
                            }}
                          >
                            {currentPrices.insights.sentiment} outlook
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default EnergyPriceManager

