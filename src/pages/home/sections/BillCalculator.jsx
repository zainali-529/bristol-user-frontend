import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  Calculator, 
  Zap, 
  Flame, 
  Sun, 
  Moon, 
  Sunset,
  CheckCircle2,
  TrendingUp,
  Clock,
  Receipt,
  PoundSterling,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react'

// ===== SCHEMAS (SAME AS BEFORE) =====
const electricityStandardSchema = z
  .object({
    previousReading: z.string().min(1, 'Previous reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
    currentReading: z.string().min(1, 'Current reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
    pricePerUnit: z.string().min(1, 'Price per unit is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
    standingCharge: z.string().min(1, 'Standing charge is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number'),
    billingPeriod: z.string().min(1, 'Billing period is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 365, 'Must be between 1 and 365 days'),
    vatRate: z.enum(['5', '20']),
  })
  .refine((data) => Number(data.currentReading) >= Number(data.previousReading), {
    message: 'Current reading must be greater than or equal to previous reading',
    path: ['currentReading'],
  })

const electricityDaySchema = z.object({
  previousReadingDay: z.string().min(1, 'Previous day reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingDay: z.string().min(1, 'Current day reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  dayRate: z.string().min(1, 'Day rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  previousReadingEvening: z.string().min(1, 'Previous evening reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingEvening: z.string().min(1, 'Current evening reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  eveningRate: z.string().min(1, 'Evening rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  standingCharge: z.string().min(1, 'Standing charge is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number'),
  billingPeriod: z.string().min(1, 'Billing period is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 365, 'Must be between 1 and 365 days'),
  vatRate: z.enum(['5', '20']),
}).refine((data) => Number(data.currentReadingDay) >= Number(data.previousReadingDay), {
  message: 'Current day reading must be greater than or equal to previous day reading',
  path: ['currentReadingDay'],
}).refine((data) => Number(data.currentReadingEvening) >= Number(data.previousReadingEvening), {
  message: 'Current evening reading must be greater than or equal to previous evening reading',
  path: ['currentReadingEvening'],
})

const electricityNightSchema = z.object({
  previousReadingDay: z.string().min(1, 'Previous day reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingDay: z.string().min(1, 'Current day reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  dayRate: z.string().min(1, 'Day rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  previousReadingNight: z.string().min(1, 'Previous night reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingNight: z.string().min(1, 'Current night reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  nightRate: z.string().min(1, 'Night rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  standingCharge: z.string().min(1, 'Standing charge is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number'),
  billingPeriod: z.string().min(1, 'Billing period is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 365, 'Must be between 1 and 365 days'),
  vatRate: z.enum(['5', '20']),
}).refine((data) => Number(data.currentReadingDay) >= Number(data.previousReadingDay), {
  message: 'Current day reading must be greater than or equal to previous day reading',
  path: ['currentReadingDay'],
}).refine((data) => Number(data.currentReadingNight) >= Number(data.previousReadingNight), {
  message: 'Current night reading must be greater than or equal to previous night reading',
  path: ['currentReadingNight'],
})

const electricityDayNightEveSchema = z.object({
  previousReadingDay: z.string().min(1, 'Previous day reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingDay: z.string().min(1, 'Current day reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  dayRate: z.string().min(1, 'Day rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  previousReadingNight: z.string().min(1, 'Previous night reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingNight: z.string().min(1, 'Current night reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  nightRate: z.string().min(1, 'Night rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  previousReadingEvening: z.string().min(1, 'Previous evening reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReadingEvening: z.string().min(1, 'Current evening reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  eveningRate: z.string().min(1, 'Evening rate is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  standingCharge: z.string().min(1, 'Standing charge is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number'),
  billingPeriod: z.string().min(1, 'Billing period is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 365, 'Must be between 1 and 365 days'),
  vatRate: z.enum(['5', '20']),
}).refine((data) => Number(data.currentReadingDay) >= Number(data.previousReadingDay), {
  message: 'Current day reading must be greater than or equal to previous day reading',
  path: ['currentReadingDay'],
}).refine((data) => Number(data.currentReadingNight) >= Number(data.previousReadingNight), {
  message: 'Current night reading must be greater than or equal to previous night reading',
  path: ['currentReadingNight'],
}).refine((data) => Number(data.currentReadingEvening) >= Number(data.previousReadingEvening), {
  message: 'Current evening reading must be greater than or equal to previous evening reading',
  path: ['currentReadingEvening'],
})

const gasSchema = z.object({
  previousReading: z.string().min(1, 'Previous reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  currentReading: z.string().min(1, 'Current reading is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid positive number'),
  pricePerUnit: z.string().min(1, 'Price per unit is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid positive number'),
  standingCharge: z.string().min(1, 'Standing charge is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number'),
  billingPeriod: z.string().min(1, 'Billing period is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 365, 'Must be between 1 and 365 days'),
  vatRate: z.enum(['5', '20']),
}).refine((data) => Number(data.currentReading) >= Number(data.previousReading), {
  message: 'Current reading must be greater than or equal to previous reading',
  path: ['currentReading'],
})

function BillCalculator() {
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [energyType, setEnergyType] = useState('electricity')
  const [electricityMode, setElectricityMode] = useState('standard')
  const [currentStep, setCurrentStep] = useState(1)

  // Initialize all forms
  const electricityStandardForm = useForm({
    resolver: zodResolver(electricityStandardSchema),
    mode: 'onChange',
    defaultValues: { previousReading: '', currentReading: '', pricePerUnit: '', standingCharge: '', billingPeriod: '', vatRate: '5' },
  })

  const electricityDayForm = useForm({
    resolver: zodResolver(electricityDaySchema),
    mode: 'onChange',
    defaultValues: { previousReadingDay: '', currentReadingDay: '', dayRate: '', previousReadingEvening: '', currentReadingEvening: '', eveningRate: '', standingCharge: '', billingPeriod: '', vatRate: '5' },
  })

  const electricityNightForm = useForm({
    resolver: zodResolver(electricityNightSchema),
    mode: 'onChange',
    defaultValues: { previousReadingDay: '', currentReadingDay: '', dayRate: '', previousReadingNight: '', currentReadingNight: '', nightRate: '', standingCharge: '', billingPeriod: '', vatRate: '5' },
  })

  const electricityDayNightEveForm = useForm({
    resolver: zodResolver(electricityDayNightEveSchema),
    mode: 'onChange',
    defaultValues: { previousReadingDay: '', currentReadingDay: '', dayRate: '', previousReadingNight: '', currentReadingNight: '', nightRate: '', previousReadingEvening: '', currentReadingEvening: '', eveningRate: '', standingCharge: '', billingPeriod: '', vatRate: '5' },
  })

  const gasForm = useForm({
    resolver: zodResolver(gasSchema),
    mode: 'onChange',
    defaultValues: { previousReading: '', currentReading: '', pricePerUnit: '', standingCharge: '', billingPeriod: '', vatRate: '5' },
  })

  const getActiveForm = () => {
    if (energyType === 'gas') return gasForm
    if (electricityMode === 'standard') return electricityStandardForm
    if (electricityMode === 'day') return electricityDayForm
    if (electricityMode === 'night') return electricityNightForm
    if (electricityMode === 'daynighteve') return electricityDayNightEveForm
    return electricityStandardForm
  }

  // ===== CALCULATION FUNCTIONS =====
  const calculateElectricityCCL = (unitsUsed) => unitsUsed > 990 ? unitsUsed * (0.775 / 100) : 0
  const calculateGasCCL = (kwhUnits) => kwhUnits > 4350 ? kwhUnits * (0.775 / 100) : 0
  const convertGasUnitsToKWh = (units) => (units * 1.02264 * 39.5) / 3.6

  const onSubmitElectricityStandard = async (data) => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const previous = Number.parseFloat(data.previousReading)
    const current = Number.parseFloat(data.currentReading)
    const pricePerUnit = Number.parseFloat(data.pricePerUnit)
    const standingCharge = Number.parseFloat(data.standingCharge)
    const billingDays = Number.parseInt(data.billingPeriod)
    const vatRate = Number.parseInt(data.vatRate)
    const unitsUsed = current - previous
    const unitCost = (unitsUsed * pricePerUnit) / 100
    const standingChargeTotal = (standingCharge * billingDays) / 100
    const subtotal = unitCost + standingChargeTotal
    const cclTax = calculateElectricityCCL(unitsUsed)
    const vatAmount = (subtotal + cclTax) * (vatRate / 100)
    const totalCost = subtotal + cclTax + vatAmount
    setResults({ unitsUsed, pricePerUnit, unitCost, standingCharge, standingChargeTotal, subtotal, totalCost, billingDays, cclTax, vatAmount, vatRate })
    setIsCalculating(false)
  }

  const onSubmitElectricityDay = async (data) => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const previousDay = Number.parseFloat(data.previousReadingDay)
    const currentDay = Number.parseFloat(data.currentReadingDay)
    const dayRate = Number.parseFloat(data.dayRate)
    const previousEvening = Number.parseFloat(data.previousReadingEvening)
    const currentEvening = Number.parseFloat(data.currentReadingEvening)
    const eveningRate = Number.parseFloat(data.eveningRate)
    const standingCharge = Number.parseFloat(data.standingCharge)
    const billingDays = Number.parseInt(data.billingPeriod)
    const vatRate = Number.parseInt(data.vatRate)
    const dayUnitsUsed = currentDay - previousDay
    const eveningUnitsUsed = currentEvening - previousEvening
    const totalUnitsUsed = dayUnitsUsed + eveningUnitsUsed
    const dayUnitCost = (dayUnitsUsed * dayRate) / 100
    const eveningUnitCost = (eveningUnitsUsed * eveningRate) / 100
    const standingChargeTotal = (standingCharge * billingDays) / 100
    const subtotal = dayUnitCost + eveningUnitCost + standingChargeTotal
    const cclTax = calculateElectricityCCL(totalUnitsUsed)
    const vatAmount = (subtotal + cclTax) * (vatRate / 100)
    const totalCost = subtotal + cclTax + vatAmount
    setResults({ unitsUsed: totalUnitsUsed, dayUnitsUsed, eveningUnitsUsed, dayRate, eveningRate, dayUnitCost, eveningUnitCost, standingCharge, standingChargeTotal, subtotal, totalCost, billingDays, cclTax, vatAmount, vatRate })
    setIsCalculating(false)
  }

  const onSubmitElectricityNight = async (data) => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const previousDay = Number.parseFloat(data.previousReadingDay)
    const currentDay = Number.parseFloat(data.currentReadingDay)
    const dayRate = Number.parseFloat(data.dayRate)
    const previousNight = Number.parseFloat(data.previousReadingNight)
    const currentNight = Number.parseFloat(data.currentReadingNight)
    const nightRate = Number.parseFloat(data.nightRate)
    const standingCharge = Number.parseFloat(data.standingCharge)
    const billingDays = Number.parseInt(data.billingPeriod)
    const vatRate = Number.parseInt(data.vatRate)
    const dayUnitsUsed = currentDay - previousDay
    const nightUnitsUsed = currentNight - previousNight
    const totalUnitsUsed = dayUnitsUsed + nightUnitsUsed
    const dayUnitCost = (dayUnitsUsed * dayRate) / 100
    const nightUnitCost = (nightUnitsUsed * nightRate) / 100
    const standingChargeTotal = (standingCharge * billingDays) / 100
    const subtotal = dayUnitCost + nightUnitCost + standingChargeTotal
    const cclTax = calculateElectricityCCL(totalUnitsUsed)
    const vatAmount = (subtotal + cclTax) * (vatRate / 100)
    const totalCost = subtotal + cclTax + vatAmount
    setResults({ unitsUsed: totalUnitsUsed, dayUnitsUsed, nightUnitsUsed, dayRate, nightRate, dayUnitCost, nightUnitCost, standingCharge, standingChargeTotal, subtotal, totalCost, billingDays, cclTax, vatAmount, vatRate })
    setIsCalculating(false)
  }

  const onSubmitElectricityDayNightEve = async (data) => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const previousDay = Number.parseFloat(data.previousReadingDay)
    const currentDay = Number.parseFloat(data.currentReadingDay)
    const dayRate = Number.parseFloat(data.dayRate)
    const previousNight = Number.parseFloat(data.previousReadingNight)
    const currentNight = Number.parseFloat(data.currentReadingNight)
    const nightRate = Number.parseFloat(data.nightRate)
    const previousEvening = Number.parseFloat(data.previousReadingEvening)
    const currentEvening = Number.parseFloat(data.currentReadingEvening)
    const eveningRate = Number.parseFloat(data.eveningRate)
    const standingCharge = Number.parseFloat(data.standingCharge)
    const billingDays = Number.parseInt(data.billingPeriod)
    const vatRate = Number.parseInt(data.vatRate)
    const dayUnitsUsed = currentDay - previousDay
    const nightUnitsUsed = currentNight - previousNight
    const eveningUnitsUsed = currentEvening - previousEvening
    const totalUnitsUsed = dayUnitsUsed + nightUnitsUsed + eveningUnitsUsed
    const dayUnitCost = (dayUnitsUsed * dayRate) / 100
    const nightUnitCost = (nightUnitsUsed * nightRate) / 100
    const eveningUnitCost = (eveningUnitsUsed * eveningRate) / 100
    const standingChargeTotal = (standingCharge * billingDays) / 100
    const subtotal = dayUnitCost + nightUnitCost + eveningUnitCost + standingChargeTotal
    const cclTax = calculateElectricityCCL(totalUnitsUsed)
    const vatAmount = (subtotal + cclTax) * (vatRate / 100)
    const totalCost = subtotal + cclTax + vatAmount
    setResults({ unitsUsed: totalUnitsUsed, dayUnitsUsed, nightUnitsUsed, eveningUnitsUsed, dayRate, nightRate, eveningRate, dayUnitCost, nightUnitCost, eveningUnitCost, standingCharge, standingChargeTotal, subtotal, totalCost, billingDays, cclTax, vatAmount, vatRate })
    setIsCalculating(false)
  }

  const onSubmitGas = async (data) => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const previous = Number.parseFloat(data.previousReading)
    const current = Number.parseFloat(data.currentReading)
    const pricePerUnit = Number.parseFloat(data.pricePerUnit)
    const standingCharge = Number.parseFloat(data.standingCharge)
    const billingDays = Number.parseInt(data.billingPeriod)
    const vatRate = Number.parseInt(data.vatRate)
    const unitsUsed = current - previous
    const unitsInKWh = convertGasUnitsToKWh(unitsUsed)
    const unitCost = (unitsInKWh * pricePerUnit) / 100
    const standingChargeTotal = (standingCharge * billingDays) / 100
    const subtotal = unitCost + standingChargeTotal
    const cclTax = calculateGasCCL(unitsInKWh)
    const vatAmount = (subtotal + cclTax) * (vatRate / 100)
    const totalCost = subtotal + cclTax + vatAmount
    setResults({ unitsUsed, unitsInKWh, pricePerUnit, unitCost, standingCharge, standingChargeTotal, subtotal, totalCost, billingDays, cclTax, vatAmount, vatRate })
    setIsCalculating(false)
  }

  const onSubmit = (data) => {
    if (energyType === 'gas') return onSubmitGas(data)
    else if (electricityMode === 'standard') return onSubmitElectricityStandard(data)
    else if (electricityMode === 'day') return onSubmitElectricityDay(data)
    else if (electricityMode === 'night') return onSubmitElectricityNight(data)
    else if (electricityMode === 'daynighteve') return onSubmitElectricityDayNightEve(data)
  }

  const resetCalculator = () => {
    setResults(null)
    setCurrentStep(1)
    getActiveForm().reset()
  }

  const handleEnergyTypeChange = (value) => {
    setEnergyType(value)
    setResults(null)
    setCurrentStep(1)
  }

  const handleElectricityModeChange = (value) => {
    setElectricityMode(value)
    setResults(null)
    setCurrentStep(1)
  }

  const energyTypes = [
    { value: 'electricity', label: 'Electricity', icon: Zap, color: '#10b981', description: 'Calculate your electricity bill' },
    { value: 'gas', label: 'Gas', icon: Flame, color: '#f97316', description: 'Calculate your gas bill' },
  ]

  const electricityModes = [
    { value: 'standard', label: 'Standard', icon: Zap, description: 'Single rate tariff' },
    { value: 'day', label: 'Day/Evening', icon: Sun, description: 'Two rate tariff' },
    { value: 'night', label: 'Day/Night', icon: Moon, description: 'Two rate tariff' },
    { value: 'daynighteve', label: 'All Rates', icon: Sunset, description: 'Three rate tariff' },
  ]

  return (
    <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
            <Calculator className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Bill Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Calculate Your Energy Bill
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Get instant estimates for your electricity or gas bills
          </p>
        </div>

        {!results ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Energy Type Selection */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6" style={{ backgroundColor: 'var(--card)', border: '2px solid var(--border)' }}>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  Select Energy Type
                </h3>
                <div className="space-y-3">
                  {energyTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = energyType === type.value
                    return (
                      <button
                        key={type.value}
                        onClick={() => handleEnergyTypeChange(type.value)}
                        className="w-full p-4 rounded-xl text-left transition-all hover:scale-102"
                        style={{
                          backgroundColor: isSelected ? 'var(--primary-10)' : 'var(--background)',
                          border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: isSelected ? 'var(--primary)' : 'var(--primary-10)' }}>
                            <Icon className="w-6 h-6" style={{ color: isSelected ? 'white' : 'var(--primary)' }} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{type.label}</div>
                            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{type.description}</div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Card>

              {energyType === 'electricity' && (
                <Card className="p-6" style={{ backgroundColor: 'var(--card)', border: '2px solid var(--border)' }}>
                  <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Tariff Type</h3>
                  <div className="space-y-2">
                    {electricityModes.map((mode) => {
                      const Icon = mode.icon
                      const isSelected = electricityMode === mode.value
                      return (
                        <button
                          key={mode.value}
                          onClick={() => handleElectricityModeChange(mode.value)}
                          className="w-full p-3 rounded-lg text-left transition-all flex items-center gap-3"
                          style={{
                            backgroundColor: isSelected ? 'var(--primary)' : 'var(--background)',
                            color: isSelected ? 'white' : 'var(--text-primary)',
                          }}
                        >
                          <Icon className="w-4 h-4" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{mode.label}</div>
                            <div className="text-xs opacity-80">{mode.description}</div>
                          </div>
                          {isSelected && <ChevronRight className="w-4 h-4" />}
                        </button>
                      )
                    })}
                  </div>
                </Card>
              )}
            </div>

            {/* Main Form Area */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8" style={{ backgroundColor: 'var(--card)', border: '2px solid var(--border)' }}>
                {energyType === 'electricity' && electricityMode === 'standard' && <FormStandard form={electricityStandardForm} onSubmit={onSubmit} isCalculating={isCalculating} />}
                {energyType === 'electricity' && electricityMode === 'day' && <FormDayEvening form={electricityDayForm} onSubmit={onSubmit} isCalculating={isCalculating} />}
                {energyType === 'electricity' && electricityMode === 'night' && <FormDayNight form={electricityNightForm} onSubmit={onSubmit} isCalculating={isCalculating} />}
                {energyType === 'electricity' && electricityMode === 'daynighteve' && <FormDayNightEvening form={electricityDayNightEveForm} onSubmit={onSubmit} isCalculating={isCalculating} />}
                {energyType === 'gas' && <FormGas form={gasForm} onSubmit={onSubmit} isCalculating={isCalculating} />}
              </Card>
            </div>
          </div>
        ) : (
          <ResultsDisplay results={results} energyType={energyType} onReset={resetCalculator} />
        )}
      </div>
    </section>
  )
}

// Form Components
function FormStandard({ form, onSubmit, isCalculating }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Standard Electricity Tariff</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Enter your meter readings and tariff details</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="previousReading" render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Reading</FormLabel>
              <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="currentReading" render={({ field }) => (
            <FormItem>
              <FormLabel>Current Reading</FormLabel>
              <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="pricePerUnit" render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Unit (pence)</FormLabel>
              <FormControl><Input placeholder="e.g. 14.71" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="standingCharge" render={({ field }) => (
            <FormItem>
              <FormLabel>Standing Charge (pence/day)</FormLabel>
              <FormControl><Input placeholder="e.g. 27.00" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="billingPeriod" render={({ field }) => (
          <FormItem>
            <FormLabel>Billing Period (days)</FormLabel>
            <FormControl><Input placeholder="e.g. 90" className="h-11" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="vatRate" render={({ field }) => (
          <FormItem>
            <FormLabel>VAT Rate</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="vat-5" />
                  <label htmlFor="vat-5" className="cursor-pointer">5% (Domestic)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="vat-20" />
                  <label htmlFor="vat-20" className="cursor-pointer">20% (Business)</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isCalculating} className="w-full h-12 text-base font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          {isCalculating ? (
            <><div className="w-5 h-5 rounded-full border-3 animate-spin mr-2" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />Calculating...</>
          ) : (
            <><Calculator className="w-5 h-5 mr-2" />Calculate Bill<ArrowRight className="w-5 h-5 ml-2" /></>
          )}
        </Button>
      </form>
    </Form>
  )
}

function FormDayEvening({ form, onSubmit, isCalculating }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Day/Evening Tariff</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Enter your day and evening meter readings</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sun className="w-4 h-4" style={{ color: 'var(--primary)' }} />Day Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingDay" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingDay" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="dayRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Day Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 16.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sunset className="w-4 h-4" style={{ color: 'var(--primary)' }} />Evening Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingEvening" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingEvening" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="eveningRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Evening Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 14.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="standingCharge" render={({ field }) => (
            <FormItem>
              <FormLabel>Standing Charge (pence/day)</FormLabel>
              <FormControl><Input placeholder="e.g. 27.00" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="billingPeriod" render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Period (days)</FormLabel>
              <FormControl><Input placeholder="e.g. 90" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="vatRate" render={({ field }) => (
          <FormItem>
            <FormLabel>VAT Rate</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="vat-5" />
                  <label htmlFor="vat-5" className="cursor-pointer">5%</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="vat-20" />
                  <label htmlFor="vat-20" className="cursor-pointer">20%</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isCalculating} className="w-full h-12 text-base font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          {isCalculating ? (
            <><div className="w-5 h-5 rounded-full border-3 animate-spin mr-2" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />Calculating...</>
          ) : (
            <><Calculator className="w-5 h-5 mr-2" />Calculate Bill<ArrowRight className="w-5 h-5 ml-2" /></>
          )}
        </Button>
      </form>
    </Form>
  )
}

function FormDayNight({ form, onSubmit, isCalculating }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Day/Night Tariff</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Enter your day and night meter readings</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sun className="w-4 h-4" style={{ color: 'var(--primary)' }} />Day Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingDay" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingDay" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="dayRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Day Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 16.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Moon className="w-4 h-4" style={{ color: 'var(--primary)' }} />Night Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingNight" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingNight" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="nightRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Night Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 10.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="standingCharge" render={({ field }) => (
            <FormItem>
              <FormLabel>Standing Charge (pence/day)</FormLabel>
              <FormControl><Input placeholder="e.g. 27.00" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="billingPeriod" render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Period (days)</FormLabel>
              <FormControl><Input placeholder="e.g. 90" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="vatRate" render={({ field }) => (
          <FormItem>
            <FormLabel>VAT Rate</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="vat-5" />
                  <label htmlFor="vat-5" className="cursor-pointer">5%</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="vat-20" />
                  <label htmlFor="vat-20" className="cursor-pointer">20%</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isCalculating} className="w-full h-12 text-base font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          {isCalculating ? (
            <><div className="w-5 h-5 rounded-full border-3 animate-spin mr-2" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />Calculating...</>
          ) : (
            <><Calculator className="w-5 h-5 mr-2" />Calculate Bill<ArrowRight className="w-5 h-5 ml-2" /></>
          )}
        </Button>
      </form>
    </Form>
  )
}

function FormDayNightEvening({ form, onSubmit, isCalculating }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>All Rates Tariff</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Enter your day, evening, and night meter readings</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sun className="w-4 h-4" style={{ color: 'var(--primary)' }} />Day Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingDay" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingDay" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="dayRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Day Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 16.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Moon className="w-4 h-4" style={{ color: 'var(--primary)' }} />Night Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingNight" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingNight" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="nightRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Night Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 10.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sunset className="w-4 h-4" style={{ color: 'var(--primary)' }} />Evening Readings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <FormField control={form.control} name="previousReadingEvening" render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="currentReadingEvening" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Reading</FormLabel>
                  <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="eveningRate" render={({ field }) => (
              <FormItem>
                <FormLabel>Evening Rate (pence)</FormLabel>
                <FormControl><Input placeholder="e.g. 14.71" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="standingCharge" render={({ field }) => (
            <FormItem>
              <FormLabel>Standing Charge (pence/day)</FormLabel>
              <FormControl><Input placeholder="e.g. 27.00" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="billingPeriod" render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Period (days)</FormLabel>
              <FormControl><Input placeholder="e.g. 90" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="vatRate" render={({ field }) => (
          <FormItem>
            <FormLabel>VAT Rate</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="vat-5" />
                  <label htmlFor="vat-5" className="cursor-pointer">5%</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="vat-20" />
                  <label htmlFor="vat-20" className="cursor-pointer">20%</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isCalculating} className="w-full h-12 text-base font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          {isCalculating ? (
            <><div className="w-5 h-5 rounded-full border-3 animate-spin mr-2" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />Calculating...</>
          ) : (
            <><Calculator className="w-5 h-5 mr-2" />Calculate Bill<ArrowRight className="w-5 h-5 ml-2" /></>
          )}
        </Button>
      </form>
    </Form>
  )
}

function FormGas({ form, onSubmit, isCalculating }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Gas Tariff</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Enter your gas meter readings and tariff details</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="previousReading" render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Reading</FormLabel>
              <FormControl><Input placeholder="e.g. 012345" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="currentReading" render={({ field }) => (
            <FormItem>
              <FormLabel>Current Reading</FormLabel>
              <FormControl><Input placeholder="e.g. 012769" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="pricePerUnit" render={({ field }) => (
            <FormItem>
              <FormLabel>Price per kWh (pence)</FormLabel>
              <FormControl><Input placeholder="e.g. 3.71" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="standingCharge" render={({ field }) => (
            <FormItem>
              <FormLabel>Standing Charge (pence/day)</FormLabel>
              <FormControl><Input placeholder="e.g. 27.00" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="billingPeriod" render={({ field }) => (
          <FormItem>
            <FormLabel>Billing Period (days)</FormLabel>
            <FormControl><Input placeholder="e.g. 90" className="h-11" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="vatRate" render={({ field }) => (
          <FormItem>
            <FormLabel>VAT Rate</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="vat-5" />
                  <label htmlFor="vat-5" className="cursor-pointer">5% (Domestic)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="vat-20" />
                  <label htmlFor="vat-20" className="cursor-pointer">20% (Business)</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isCalculating} className="w-full h-12 text-base font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          {isCalculating ? (
            <><div className="w-5 h-5 rounded-full border-3 animate-spin mr-2" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />Calculating...</>
          ) : (
            <><Calculator className="w-5 h-5 mr-2" />Calculate Bill<ArrowRight className="w-5 h-5 ml-2" /></>
          )}
        </Button>
      </form>
    </Form>
  )
}

function ResultsDisplay({ results, energyType, onReset }) {
  const subtotal = results.totalCost - (results.vatAmount || 0) - (results.cclTax || 0)
  
  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Results Summary - Large Card */}
      <div className="lg:col-span-2">
        <Card className="p-8 h-full" style={{ backgroundColor: 'var(--primary)', border: 'none' }}>
          <div className="flex flex-col h-full justify-center text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2 opacity-90">Your Estimated Bill</h3>
            <div className="text-5xl md:text-6xl font-bold mb-4">£{results.totalCost.toFixed(2)}</div>
            <p className="text-sm opacity-80 mb-8">For {results.billingDays} days billing period</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 rounded-lg bg-white/10">
                <div className="text-2xl font-bold">{results.unitsUsed.toLocaleString()}</div>
                <div className="text-xs opacity-80">{energyType === 'gas' ? 'Units' : 'kWh'}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/10">
                <div className="text-2xl font-bold">{results.vatRate}%</div>
                <div className="text-xs opacity-80">VAT Rate</div>
              </div>
            </div>

            <Button onClick={onReset} variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCw className="w-4 h-4 mr-2" />Calculate Another
            </Button>
          </div>
        </Card>
      </div>

      {/* Breakdown Details */}
      <div className="lg:col-span-3">
        <Card className="p-8" style={{ backgroundColor: 'var(--card)', border: '2px solid var(--border)' }}>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <BarChart3 className="w-6 h-6" style={{ color: 'var(--primary)' }} />
            Cost Breakdown
          </h3>

          <div className="space-y-4">
            {energyType === 'electricity' && results.dayUnitsUsed && (
              <>
                {results.dayUnitCost && (
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
                    <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <Sun className="w-4 h-4" style={{ color: 'var(--primary)' }} />Day Rate Cost
                    </span>
                    <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{results.dayUnitCost.toFixed(2)}</span>
                  </div>
                )}
                {results.nightUnitCost && (
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
                    <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <Moon className="w-4 h-4" style={{ color: 'var(--primary)' }} />Night Rate Cost
                    </span>
                    <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{results.nightUnitCost.toFixed(2)}</span>
                  </div>
                )}
                {results.eveningUnitCost && (
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
                    <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <Sunset className="w-4 h-4" style={{ color: 'var(--primary)' }} />Evening Rate Cost
                    </span>
                    <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{results.eveningUnitCost.toFixed(2)}</span>
                  </div>
                )}
              </>
            )}

            {energyType === 'gas' && results.unitsInKWh && (
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Units → kWh Conversion</span>
                <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{results.unitsInKWh.toLocaleString()} kWh</span>
              </div>
            )}

            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Energy Cost</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                £{results.unitCost ? results.unitCost.toFixed(2) : (subtotal - results.standingChargeTotal).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Standing Charge</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{results.standingChargeTotal.toFixed(2)}</span>
            </div>

            {results.cclTax > 0 && (
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>CCL Tax</span>
                <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{results.cclTax.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>VAT ({results.vatRate}%)</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>£{results.vatAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-4 rounded-lg mt-4" style={{ backgroundColor: 'var(--primary-10)', border: '2px solid var(--primary)' }}>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Total Bill</span>
              <span className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>£{results.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BillCalculator
