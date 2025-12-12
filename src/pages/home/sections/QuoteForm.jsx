import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Zap, 
  TrendingDown, 
  CheckCircle2,
  ArrowRight, 
  ArrowLeft,
  Send,
  Loader2,
  AlertCircle,
  FileText,
  Calendar,
  Leaf
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import apiService from '@/services/api'
import { useSuppliersRedux } from '@/hooks/useSuppliersRedux'

// Form validation schema
const quoteSchema = z.object({
  // Step 1: Business Information
  businessType: z.string().min(1, 'Please select your business type'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  postcode: z.string()
    .min(5, 'Please enter a valid UK postcode')
    .max(10, 'Please enter a valid UK postcode')
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

function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('')

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

  const { suppliers } = useSuppliersRedux()
  const supplierOptions = ((Array.isArray(suppliers) ? [...suppliers] : [])
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map(s => s.name || s.title || s.slug || '')
    .filter(Boolean))
  const energySuppliers = supplierOptions.length > 0
    ? [...supplierOptions, 'Other', 'Not Sure']
    : ['Other', 'Not Sure']

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
        return ['electricityUsage', 'gasUsage']
      case 3:
        return ['contractEndDate', 'greenEnergyPreference']
      case 4:
        return ['contactName', 'email', 'phone', 'preferredContactMethod']
      default:
        return []
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const response = await apiService.submitQuoteForm(data)
      
      if (response.data.success) {
        setSubmitStatus('success')
        setSubmitMessage(response.data.message || 'Thank you! Your quote request has been submitted successfully. We will get back to you within 24 hours.')
        form.reset()
        setCurrentStep(1)
        
        // Clear success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus(null)
          setSubmitMessage('')
        }, 8000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(
        error?.message || 
        error?.response?.data?.message || 
        'Failed to submit quote request. Please try again later.'
      )
      
      // Clear error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null)
        setSubmitMessage('')
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepInfo = [
    {
      number: 1,
      title: 'Business Information',
      icon: Building2,
      description: 'Tell us about your business',
    },
    {
      number: 2,
      title: 'Energy Usage',
      icon: Zap,
      description: 'Your current energy consumption',
    },
    {
      number: 3,
      title: 'Current Supplier',
      icon: TrendingDown,
      description: 'Help us find better deals',
    },
    {
      number: 4,
      title: 'Contact Details',
      icon: FileText,
      description: 'How can we reach you?',
    },
  ]

  return (
    <section 
      className="py-16 md:py-28 px-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, var(--background) 0%, var(--background) 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ 
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ 
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: 'var(--primary-10)',
              color: 'var(--primary)',
              border: '1px solid var(--primary-20)',
            }}
          >
            Get Your Free Quote
          </motion.span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Request a Custom Quote
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Fill out the form below and our energy experts will create a personalized quote 
            tailored to your business needs. We'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="w-full max-w-4xl mx-auto px-4">
            {/* Desktop & Tablet View (md and up) */}
            <div className="hidden md:block">
              <div className="flex items-start justify-between max-w-4xl mx-auto">
                {stepInfo.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = currentStep === step.number
                  const isCompleted = currentStep > step.number
                  
                  return (
                    <div key={step.number} className="flex items-center flex-1">
                      {/* Step Content */}
                      <div className="flex flex-col items-center flex-1">
                        {/* Step Circle */}
                        <div 
                          className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative z-10 ${
                            isActive ? 'scale-110' : ''
                          }`}
                          style={{
                            backgroundColor: isCompleted || isActive ? 'var(--primary)' : 'var(--card)',
                            color: isCompleted || isActive ? 'white' : 'var(--text-secondary)',
                            boxShadow: isActive 
                              ? '0 0 0 4px var(--primary-20), 0 4px 12px var(--primary-40)' 
                              : isCompleted 
                                ? '0 2px 8px var(--primary-40)'
                                : '0 2px 8px rgba(0,0,0,0.1)',
                            border: isCompleted || isActive ? 'none' : '2px solid var(--border)',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={22} strokeWidth={2.5} />
                          ) : (
                            <StepIcon size={22} strokeWidth={isActive ? 2.5 : 2} />
                          )}
                        </div>
                        
                        {/* Step Info */}
                        <div className="mt-3 text-center w-full px-2">
                          <p 
                            className="text-sm font-semibold leading-tight mb-1"
                            style={{ 
                              color: isActive ? 'var(--primary)' : isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)',
                            }}
                          >
                            {step.title}
                          </p>
                          <p 
                            className="text-xs leading-tight"
                            style={{ 
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Connecting Bar */}
                      {index < stepInfo.length - 1 && (
                        <div 
                          className="h-0.5 transition-all duration-500 mx-2"
                          style={{
                            flex: '0 0 60px',
                            backgroundColor: isCompleted ? 'var(--primary)' : 'var(--primary-20)',
                            marginTop: '-45px',
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile View (below md) */}
            <div className="md:hidden">
              <div className="relative">
                {/* Vertical Progress Line Background */}
                <div 
                  className="absolute left-6 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--primary-20)',
                  }}
                />
                
                {/* Vertical Progress Line Active */}
                <div 
                  className="absolute left-6 top-0 w-0.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    height: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                  }}
                />

                {/* Steps */}
                <div className="space-y-6">
                  {stepInfo.map((step, index) => {
                    const StepIcon = step.icon
                    const isActive = currentStep === step.number
                    const isCompleted = currentStep > step.number
                    
                    return (
                      <div 
                        key={step.number} 
                        className="flex items-start gap-4 relative"
                      >
                        {/* Step Circle */}
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative z-10 flex-shrink-0 ${
                            isActive ? 'scale-110' : ''
                          }`}
                          style={{
                            backgroundColor: isCompleted || isActive ? 'var(--primary)' : 'var(--card)',
                            color: isCompleted || isActive ? 'white' : 'var(--text-secondary)',
                            boxShadow: isActive 
                              ? '0 0 0 4px var(--primary-20), 0 4px 12px var(--primary-40)' 
                              : isCompleted 
                                ? '0 2px 8px var(--primary-40)'
                                : '0 2px 8px rgba(0,0,0,0.1)',
                            border: isCompleted || isActive ? 'none' : '2px solid var(--border)',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} strokeWidth={2.5} />
                          ) : (
                            <StepIcon size={20} strokeWidth={isActive ? 2.5 : 2} />
                          )}
                        </div>
                        
                        {/* Step Info */}
                        <div className="flex-1 pt-1">
                          <p 
                            className="text-sm font-semibold leading-tight mb-1"
                            style={{ 
                              color: isActive ? 'var(--primary)' : isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)',
                            }}
                          >
                            {step.title}
                          </p>
                          <p 
                            className="text-xs leading-tight"
                            style={{ 
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl p-6 md:p-8 lg:p-10 relative overflow-hidden"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Success/Error Message */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-6 p-4 rounded-xl flex items-center gap-3"
                style={{
                  backgroundColor: submitStatus === 'success' 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${submitStatus === 'success' ? '#10b981' : '#ef4444'}`,
                }}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle2 size={24} style={{ color: '#10b981' }} />
                ) : (
                  <AlertCircle size={24} style={{ color: '#ef4444' }} />
                )}
                <p 
                  className="text-sm font-medium flex-1"
                  style={{ 
                    color: submitStatus === 'success' ? '#10b981' : '#ef4444' 
                  }}
                >
                  {submitMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

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
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
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
                        <p 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Tell us about your business
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Business Type *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="h-12 rounded-xl"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                }}
                              >
                                <SelectValue placeholder="Select your business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              style={{
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)',
                              }}
                            >
                              {businessTypes.map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  style={{ color: 'var(--text-primary)' }}
                                >
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
                          <FormLabel 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Business Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your business name"
                              className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                              style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--primary-20)',
                                color: 'var(--text-primary)',
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="postcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              UK Postcode *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="SW1A 1AA"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
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
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Number of Sites *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger
                                  className="h-12 rounded-xl"
                                  style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--primary-20)',
                                  }}
                                >
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent
                                style={{
                                  backgroundColor: 'var(--card)',
                                  borderColor: 'var(--border)',
                                }}
                              >
                                <SelectItem value="1" style={{ color: 'var(--text-primary)' }}>1 Site</SelectItem>
                                <SelectItem value="2-5" style={{ color: 'var(--text-primary)' }}>2-5 Sites</SelectItem>
                                <SelectItem value="6-10" style={{ color: 'var(--text-primary)' }}>6-10 Sites</SelectItem>
                                <SelectItem value="11-50" style={{ color: 'var(--text-primary)' }}>11-50 Sites</SelectItem>
                                <SelectItem value="50+" style={{ color: 'var(--text-primary)' }}>50+ Sites</SelectItem>
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
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
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
                        <p 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Your current energy consumption
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="electricityUsage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Annual Electricity Usage (kWh) *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 50000"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
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
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Current Monthly Electricity Cost (£)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 1200"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="gasUsage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Annual Gas Usage (kWh) *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 30000"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
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
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Current Monthly Gas Cost (£)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 800"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div 
                      className="rounded-xl p-4"
                      style={{ backgroundColor: 'var(--primary-5)' }}
                    >
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <strong>💡 Tip:</strong> You can find this information on your energy bills. 
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
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
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
                        <p 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Let's see how much you can save
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="currentElectricitySupplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Current Electricity Supplier
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger
                                  className="h-12 rounded-xl"
                                  style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--primary-20)',
                                  }}
                                >
                                  <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent
                                style={{
                                  backgroundColor: 'var(--card)',
                                  borderColor: 'var(--border)',
                                }}
                              >
                                {energySuppliers.map((supplier) => (
                                  <SelectItem
                                    key={supplier}
                                    value={supplier}
                                    style={{ color: 'var(--text-primary)' }}
                                  >
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
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Current Gas Supplier
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger
                                  className="h-12 rounded-xl"
                                  style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--primary-20)',
                                  }}
                                >
                                  <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent
                                style={{
                                  backgroundColor: 'var(--card)',
                                  borderColor: 'var(--border)',
                                }}
                              >
                                {energySuppliers.map((supplier) => (
                                  <SelectItem
                                    key={supplier}
                                    value={supplier}
                                    style={{ color: 'var(--text-primary)' }}
                                  >
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
                          <FormLabel 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Contract End Date *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                              style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--primary-20)',
                                color: 'var(--text-primary)',
                              }}
                              {...field}
                            />
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
                          <FormLabel 
                            className="text-sm font-semibold flex items-center gap-2"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            <Leaf size={16} />
                            Green Energy Preference *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="h-12 rounded-xl"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                }}
                              >
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              style={{
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)',
                              }}
                            >
                              <SelectItem value="yes" style={{ color: 'var(--text-primary)' }}>
                                Yes, I prefer renewable energy
                              </SelectItem>
                              <SelectItem value="consider" style={{ color: 'var(--text-primary)' }}>
                                I'll consider it if cost-effective
                              </SelectItem>
                              <SelectItem value="no" style={{ color: 'var(--text-primary)' }}>
                                No preference
                              </SelectItem>
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
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--primary-10)' }}
                      >
                        <FileText size={24} style={{ color: 'var(--primary)' }} />
                      </div>
                      <div>
                        <h3 
                          className="text-2xl font-bold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Contact Details
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Almost there! How can we reach you?
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                              style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--primary-20)',
                                color: 'var(--text-primary)',
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@company.com"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
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
                            <FormLabel 
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Phone Number *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+44 20 1234 5678"
                                className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                  color: 'var(--text-primary)',
                                }}
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
                          <FormLabel 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Preferred Contact Method *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="h-12 rounded-xl"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  borderColor: 'var(--primary-20)',
                                }}
                              >
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              style={{
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)',
                              }}
                            >
                              <SelectItem value="email" style={{ color: 'var(--text-primary)' }}>Email</SelectItem>
                              <SelectItem value="phone" style={{ color: 'var(--text-primary)' }}>Phone</SelectItem>
                              <SelectItem value="either" style={{ color: 'var(--text-primary)' }}>Either</SelectItem>
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
                          <FormLabel 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Additional Notes (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific requirements or questions?"
                              rows={4}
                              className="rounded-xl resize-none transition-all duration-300 focus:scale-[1.01]"
                              style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--primary-20)',
                                color: 'var(--text-primary)',
                              }}
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
                  disabled={currentStep === 1 || isSubmitting}
                  className="gap-2 h-12 rounded-xl"
                >
                  <ArrowLeft size={20} />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="gap-2 h-12 rounded-xl font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-80) 100%)',
                      color: 'white',
                    }}
                  >
                    Next
                    <ArrowRight size={20} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2 h-12 rounded-xl font-semibold"
                    style={{
                      background: isSubmitting 
                        ? 'var(--primary-60)'
                        : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-80) 100%)',
                      color: 'white',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}

export default QuoteForm

