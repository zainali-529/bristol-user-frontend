import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
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
import { Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import axiosInstance from '@/lib/axios'
import { useServicesRedux } from '@/hooks/useServicesRedux'

// Validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  service: z
    .string()
    .min(1, 'Please select a service'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters'),
})

function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('')
  const { services: fetchedServices } = useServicesRedux({ featured: false })

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const response = await axiosInstance.post('/contacts', data)
      
      if (response.data.success) {
        setSubmitStatus('success')
        setSubmitMessage(response.data.message || 'Thank you! We will get back to you soon.')
        form.reset()
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null)
          setSubmitMessage('')
        }, 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(
        error?.message || 
        error?.response?.data?.message || 
        'Failed to send message. Please try again later.'
      )
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
        setSubmitMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fallbackServices = [
    'Energy Procurement',
    'Contract Management',
    'Energy Efficiency',
    'Sustainability Consulting',
    'Multi-site Management',
  ]
  const serviceOptions = (Array.isArray(fetchedServices) && fetchedServices.length > 0)
    ? [...fetchedServices]
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map(s => s.name || s.title || s.slug || '')
        .filter(Boolean)
    : fallbackServices

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+923147372660',
      link: 'tel:+923147372660',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'zain.ali.529001@gmail.com',
      link: 'mailto:zain.ali.529001@gmail.com',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Monday to Friday, 9AM - 6PM (GMT)',
      link: null,
    },
  ]

  return (
    <section 
      id="contact"
      className="py-16 md:py-28 px-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, var(--background) 0%, var(--background) 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ 
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ 
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            Get in Touch
          </motion.span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Let's Start a Conversation
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            We're here to help your business save on energy costs and achieve sustainability goals. 
            Reach out today and discover how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div
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
                      <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                    ) : (
                      <AlertCircle size={20} style={{ color: '#ef4444' }} />
                    )}
                    <p 
                      className="text-sm font-medium"
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel 
                          className="text-sm font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Full Name
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

                  {/* Email and Phone in Grid */}
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
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
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
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+44 123 456 7890"
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

                  {/* Service Field */}
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel 
                          className="text-sm font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Service Interest
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className="h-12 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                              style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--primary-20)',
                                color: 'var(--text-primary)',
                              }}
                            >
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            style={{
                              backgroundColor: 'var(--card)',
                              borderColor: 'var(--border)',
                            }}
                          >
                            {serviceOptions.map((service) => (
                              <SelectItem
                                key={service}
                                value={service}
                                style={{ color: 'var(--text-primary)' }}
                              >
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel 
                          className="text-sm font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Your Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your requirements..."
                            rows={5}
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl border-0"
                    style={{
                      background: isSubmitting 
                        ? 'var(--primary-60)'
                        : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-80) 100%)',
                      color: 'white',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Right Column: Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    if (info.link) {
                      window.open(info.link, '_self')
                    }
                  }}
                >
                  <div
                    className="rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {/* Hover Effect Gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-80) 100%)`,
                      }}
                    />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ 
                          backgroundColor: 'var(--primary-10)',
                          border: '1px solid var(--primary-20)',
                        }}
                      >
                        <IconComponent 
                          size={24}
                          style={{ color: 'var(--primary)' }}
                        />
                      </div>
                      <div className="flex-1">
                        <p 
                          className="text-sm font-semibold mb-1 uppercase tracking-wide"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {info.label}
                        </p>
                        <p 
                          className="text-lg font-semibold group-hover:text-primary transition-colors duration-300"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--primary-10) 0%, var(--primary-5) 100%)',
                border: '1px solid var(--primary-20)',
              }}
            >
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Quick Response Promise
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
