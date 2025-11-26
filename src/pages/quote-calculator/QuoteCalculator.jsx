import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Zap, 
  TrendingDown, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Download,
  Mail
} from 'lucide-react'
import TopNav from '@/components/TopNav'
import { Button } from '@/components/ui/button'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Form validation schema
const quoteSchema = z.object({
  // Step 1: Business Information
  businessType: z.string().min(1, 'Please select your business type'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  postcode: z.string()
    .min(5, 'Please enter a valid UK postcode')
    .max(8, 'Please enter a valid UK postcode')
    .regex(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, 'Please enter a valid UK postcode'),
  numberOfSites: z.string().min(1, 'Please select number of sites'),
  
  // Step 2: Energy Usage
  electricityUsage: z.string().min(1, 'Please enter electricity usage'),
  gasUsage: z.string().min(1, 'Please enter gas usage'),
  currentElectricityCost: z.string().optional(),
  currentGasCost: z.string().optional(),
  
  // Step 3: Current Supplier
  currentElectricitySupplier: z.string().optional(),
  currentGasSupplier: z.string().optional(),
  contractEndDate: z.string().min(1, 'Please select contract end date'),
  greenEnergyPreference: z.string().min(1, 'Please select your preference'),
  
  // Step 4: Contact Details
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  preferredContactMethod: z.string().min(1, 'Please select preferred contact method'),
  additionalNotes: z.string().optional(),
})

function QuoteCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [quoteResults, setQuoteResults] = useState(null)

  const form = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      businessType: '',
      businessName: '',
      postcode: '',
      numberOfSites: '',
      electricityUsage: '',
      gasUsage: '',
      currentElectricityCost: '',
      currentGasCost: '',
      currentElectricitySupplier: '',
      currentGasSupplier: '',
      contractEndDate: '',
      greenEnergyPreference: '',
      contactName: '',
      email: '',
      phone: '',
      preferredContactMethod: '',
      additionalNotes: '',
    },
  })

  const totalSteps = 4

  // Business types
  const businessTypes = [
    'Small Business (1-10 employees)',
    'Medium Business (11-50 employees)',
    'Large Business (51-250 employees)',
    'Enterprise (250+ employees)',
    'Retail',
    'Manufacturing',
    'Hospitality',
    'Healthcare',
    'Education',
    'Other',
  ]

  // UK Energy Suppliers
  const energySuppliers = [
    'British Gas',
    'EDF Energy',
    'E.ON',
    'Scottish Power',
    'SSE',
    'Octopus Energy',
    'Bulb',
    'OVO Energy',
    'Shell Energy',
    'Utility Warehouse',
    'Other',
  ]

  // Calculate potential savings (mock calculation)
  const calculateSavings = (data) => {
    const electricityUsage = parseFloat(data.electricityUsage) || 0
    const gasUsage = parseFloat(data.gasUsage) || 0
    const currentElectricityCost = parseFloat(data.currentElectricityCost) || electricityUsage * 0.25
    const currentGasCost = parseFloat(data.currentGasCost) || gasUsage * 0.05

    // Mock savings calculation (15-30% potential savings)
    const savingsPercentage = Math.random() * 0.15 + 0.15 // 15-30%
    const electricitySavings = currentElectricityCost * savingsPercentage
    const gasSavings = currentGasCost * savingsPercentage
    const totalSavings = electricitySavings + gasSavings
    const annualSavings = totalSavings * 12

    return {
      currentAnnualCost: (currentElectricityCost + currentGasCost) * 12,
      projectedAnnualCost: (currentElectricityCost + currentGasCost - totalSavings) * 12,
      annualSavings: annualSavings,
      savingsPercentage: (savingsPercentage * 100).toFixed(1),
      electricitySavings: electricitySavings * 12,
      gasSavings: gasSavings * 12,
      carbonReduction: (electricityUsage * 0.2 + gasUsage * 0.18).toFixed(2), // kg CO2
      suppliers: [
        {
          name: 'EDF Energy',
          rating: 4.5,
          annualCost: (currentElectricityCost + currentGasCost - totalSavings * 1.1) * 12,
          savings: annualSavings * 1.1,
          greenEnergy: true,
          contractLength: '12 months',
        },
        {
          name: 'Octopus Energy',
          rating: 4.8,
          annualCost: (currentElectricityCost + currentGasCost - totalSavings) * 12,
          savings: annualSavings,
          greenEnergy: true,
          contractLength: '24 months',
        },
        {
          name: 'British Gas',
          rating: 4.2,
          annualCost: (currentElectricityCost + currentGasCost - totalSavings * 0.9) * 12,
          savings: annualSavings * 0.9,
          greenEnergy: false,
          contractLength: '12 months',
        },
      ],
    }
  }

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep)
    const isValid = await form.trigger(fields)
    
    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ['businessType', 'businessName', 'postcode', 'numberOfSites']
      case 2:
        return ['electricityUsage', 'gasUsage', 'currentElectricityCost', 'currentGasCost']
      case 3:
        return ['contractEndDate', 'greenEnergyPreference']
      case 4:
        return ['contactName', 'email', 'phone', 'preferredContactMethod']
      default:
        return []
    }
  }

  const onSubmit = async (data) => {
    console.log('Quote form submitted:', data)
    const results = calculateSavings(data)
    setQuoteResults(results)
    setShowResults(true)
    
    // Here you would send data to API
    // await apiService.submitQuoteForm(data)
  }

  const resetQuote = () => {
    setShowResults(false)
    setQuoteResults(null)
    setCurrentStep(1)
    form.reset()
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      {/* Hero Section */}
      <section 
        className="py-12 md:py-16 px-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--primary-5)' }}
      >
        {/* Decorative elements */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ 
            backgroundColor: 'var(--primary)',
            transform: 'translate(30%, -30%)',
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)' }}
            >
              <Sparkles size={18} />
              <span className="text-sm font-semibold">Get Your Free Quote</span>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Compare Energy Prices & <span style={{ color: 'var(--primary)' }}>Save Big</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Get personalized energy quotes from top UK suppliers in minutes. 
              We'll help you find the best deal for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step}
                        className="flex items-center flex-1"
                      >
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                            currentStep >= step ? 'scale-110' : ''
                          }`}
                          style={{
                            backgroundColor: currentStep >= step ? 'var(--primary)' : 'var(--primary-20)',
                            color: currentStep >= step ? 'white' : 'var(--text-secondary)',
                          }}
                        >
                          {currentStep > step ? <CheckCircle size={20} /> : step}
                        </div>
                        {step < 4 && (
                          <div 
                            className="flex-1 h-1 mx-2 transition-all duration-300"
                            style={{
                              backgroundColor: currentStep > step ? 'var(--primary)' : 'var(--primary-20)',
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Step {currentStep} of {totalSteps}
                    </p>
                  </div>
                </div>

                {/* Form Card */}
                <motion.div
                  className="rounded-2xl shadow-xl p-8 md:p-10"
                  style={{ backgroundColor: 'var(--card)' }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <AnimatePresence mode="wait">
                        {/* Step 1: Business Information */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-3 mb-6">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--primary-10)' }}
                              >
                                <Building2 size={24} style={{ color: 'var(--primary)' }} />
                              </div>
                              <div>
                                <h3 
                                  className="text-2xl font-bold"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  Business Information
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                  Tell us about your business
                                </p>
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="businessType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Business Type *
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your business type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {businessTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Business Name *
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your business name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="postcode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Postcode *
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="SW1A 1AA" 
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="numberOfSites"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Number of Sites *
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="1">1 Site</SelectItem>
                                        <SelectItem value="2-5">2-5 Sites</SelectItem>
                                        <SelectItem value="6-10">6-10 Sites</SelectItem>
                                        <SelectItem value="11-50">11-50 Sites</SelectItem>
                                        <SelectItem value="50+">50+ Sites</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Energy Usage */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-3 mb-6">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--primary-10)' }}
                              >
                                <Zap size={24} style={{ color: 'var(--primary)' }} />
                              </div>
                              <div>
                                <h3 
                                  className="text-2xl font-bold"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  Energy Usage
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                  Help us understand your energy consumption
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="electricityUsage"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Annual Electricity Usage (kWh) *
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="e.g., 50000" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="currentElectricityCost"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Current Monthly Electricity Cost (£)
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="e.g., 1200" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="gasUsage"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Annual Gas Usage (kWh) *
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="e.g., 30000" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="currentGasCost"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Current Monthly Gas Cost (£)
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="e.g., 800" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div 
                              className="rounded-lg p-4"
                              style={{ backgroundColor: 'var(--primary-5)' }}
                            >
                              <p 
                                className="text-sm"
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                <strong>Tip:</strong> You can find this information on your energy bills. 
                                If you're not sure, we can help you estimate based on your business type.
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Current Supplier */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-3 mb-6">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--primary-10)' }}
                              >
                                <TrendingDown size={24} style={{ color: 'var(--primary)' }} />
                              </div>
                              <div>
                                <h3 
                                  className="text-2xl font-bold"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  Current Supplier Info
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                  Let's see how much you can save
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="currentElectricitySupplier"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Current Electricity Supplier
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select supplier" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {energySuppliers.map((supplier) => (
                                          <SelectItem key={supplier} value={supplier}>
                                            {supplier}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="currentGasSupplier"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Current Gas Supplier
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select supplier" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {energySuppliers.map((supplier) => (
                                          <SelectItem key={supplier} value={supplier}>
                                            {supplier}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="contractEndDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Contract End Date *
                                  </FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="greenEnergyPreference"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Green Energy Preference *
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select preference" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes, I prefer renewable energy</SelectItem>
                                      <SelectItem value="consider">I'll consider it if cost-effective</SelectItem>
                                      <SelectItem value="no">No preference</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {/* Step 4: Contact Details */}
                        {currentStep === 4 && (
                          <motion.div
                            key="step4"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-3 mb-6">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--primary-10)' }}
                              >
                                <CheckCircle size={24} style={{ color: 'var(--primary)' }} />
                              </div>
                              <div>
                                <h3 
                                  className="text-2xl font-bold"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  Contact Details
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                  Almost there! How can we reach you?
                                </p>
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Full Name *
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Email Address *
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="email" 
                                        placeholder="john@company.com" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel style={{ color: 'var(--text-primary)' }}>
                                      Phone Number *
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="tel" 
                                        placeholder="+44 20 1234 5678" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="preferredContactMethod"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Preferred Contact Method *
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select method" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="email">Email</SelectItem>
                                      <SelectItem value="phone">Phone</SelectItem>
                                      <SelectItem value="either">Either</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="additionalNotes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel style={{ color: 'var(--text-primary)' }}>
                                    Additional Notes (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Any specific requirements or questions?"
                                      rows={4}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between pt-6 border-t"
                        style={{ borderColor: 'var(--primary-20)' }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 1}
                          className="gap-2"
                        >
                          <ArrowLeft size={20} />
                          Previous
                        </Button>

                        {currentStep < totalSteps ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            className="gap-2"
                            style={{
                              background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                              color: 'white',
                            }}
                          >
                            Next
                            <ArrowRight size={20} />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            className="gap-2"
                            style={{
                              background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                              color: 'white',
                            }}
                            disabled={form.formState.isSubmitting}
                          >
                            {form.formState.isSubmitting ? 'Calculating...' : 'Get My Quote'}
                            <Sparkles size={20} />
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* Results will be rendered here */}
                <QuoteResults results={quoteResults} onReset={resetQuote} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

// Quote Results Component
function QuoteResults({ results, onReset }) {
  if (!results) return null

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 rounded-2xl"
        style={{ backgroundColor: 'var(--primary-5)' }}
      >
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <CheckCircle size={40} color="white" />
        </div>
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Great News! You Could Save
        </h2>
        <div 
          className="text-5xl md:text-6xl font-black mb-2"
          style={{ color: 'var(--primary)' }}
        >
          £{results.annualSavings.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
        </div>
        <p 
          className="text-xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          per year ({results.savingsPercentage}% savings)
        </p>
      </motion.div>

      {/* Savings Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <p 
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Current Annual Cost
          </p>
          <p 
            className="text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            £{results.currentAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <p 
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Projected Annual Cost
          </p>
          <p 
            className="text-3xl font-bold"
            style={{ color: 'var(--primary)' }}
          >
            £{results.projectedAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl"
          style={{ backgroundColor: 'var(--primary-10)' }}
        >
          <p 
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--primary)' }}
          >
            Carbon Reduction
          </p>
          <p 
            className="text-3xl font-bold"
            style={{ color: 'var(--primary)' }}
          >
            {results.carbonReduction} kg CO₂
          </p>
        </motion.div>
      </div>

      {/* Supplier Recommendations */}
      <div>
        <h3 
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Recommended Suppliers
        </h3>
        
        <div className="space-y-4">
          {results.suppliers.map((supplier, index) => (
            <motion.div
              key={supplier.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-6 rounded-xl border-2 hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: index === 0 ? 'var(--primary)' : 'var(--primary-10)',
              }}
            >
              {index === 0 && (
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-sm font-semibold"
                  style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                >
                  <Sparkles size={16} />
                  Best Deal
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {supplier.name}
                  </h4>
                  <div className="flex items-center gap-4 text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span>⭐ {supplier.rating}/5.0</span>
                    <span>•</span>
                    <span>{supplier.contractLength}</span>
                    {supplier.greenEnergy && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-medium">🌱 Green Energy</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    £{supplier.annualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    per year
                  </p>
                </div>
              </div>
              
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: 'var(--primary-5)' }}
              >
                <p 
                  className="text-sm font-semibold"
                  style={{ color: 'var(--primary)' }}
                >
                  Annual Savings: £{supplier.savings.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button
          className="gap-2"
          style={{
            background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
            color: 'white',
          }}
        >
          <Download size={20} />
          Download Quote
        </Button>
        
        <Button
          variant="outline"
          className="gap-2"
        >
          <Mail size={20} />
          Email Quote
        </Button>
        
        <Button
          variant="outline"
          onClick={onReset}
        >
          Start New Quote
        </Button>
      </div>

      {/* Next Steps */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-8 rounded-xl text-center"
        style={{ backgroundColor: 'var(--primary-10)' }}
      >
        <h3 
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          What Happens Next?
        </h3>
        <p 
          className="text-lg mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          Our energy experts will review your quote and contact you within 24 hours 
          to discuss your options and help you switch to a better deal.
        </p>
        <Button
          size="lg"
          style={{
            background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
            color: 'white',
          }}
        >
          Schedule a Call
        </Button>
      </motion.div>
    </div>
  )
}

export default QuoteCalculator

