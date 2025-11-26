import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { Phone, Mail, Clock } from 'lucide-react'

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

  const onSubmit = (data) => {
    // Handle form submission here
    console.log('Form submitted:', data)
    // You can add API call here
    // Example: await submitContactForm(data)
    
    // Reset form after successful submission
    form.reset()
  }

  const services = [
    'Energy Procurement',
    'Contract Management',
    'Energy Efficiency',
    'Sustainability Consulting',
    'Multi-site Management',
  ]

  return (
    <section 
      className="py-16 md:py-24 px-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Form */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <span 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{ 
                  backgroundColor: 'var(--primary-10)',
                  color: 'var(--primary)'
                }}
              >
                Contact us
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Get in Touch with Us
              </h2>
              <p 
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Orca Business Solutions is a new name, but we're built on real experience. We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: 'var(--text-primary)' }}>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Full Name"
                          className="w-full"
                          style={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--primary-20)',
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: 'var(--text-primary)' }}>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your Email Address"
                          className="w-full"
                          style={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--primary-20)',
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: 'var(--text-primary)' }}>
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Your Phone Number"
                          className="w-full"
                          style={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--primary-20)',
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Field */}
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: 'var(--text-primary)' }}>
                        Service
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger
                            className="w-full"
                            style={{
                              backgroundColor: 'var(--card)',
                              borderColor: 'var(--primary-20)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          style={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--primary-20)',
                          }}
                        >
                          {services.map((service) => (
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
                      <FormLabel style={{ color: 'var(--text-primary)' }}>
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter here..."
                          rows={5}
                          className="w-full resize-none"
                          style={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--primary-20)',
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
                  className="w-full rounded-lg font-semibold text-base px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0"
                  style={{
                    background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                    color: 'white',
                  }}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Column: Direct Contact Info & Illustration */}
          <div className="space-y-8">
            {/* Direct Contact Info */}
            <div>
              <h3 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Prefer a Direct Approach?
              </h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--primary-10)' }}
                  >
                    <Phone 
                      size={20}
                      style={{ color: 'var(--primary)' }}
                    />
                  </div>
                  <div>
                    <p 
                      className="text-base md:text-lg font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      +923147372660
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--primary-10)' }}
                  >
                    <Mail 
                      size={20}
                      style={{ color: 'var(--primary)' }}
                    />
                  </div>
                  <div>
                    <p 
                      className="text-base md:text-lg font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      zain.ali.529001@gmail.com
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--primary-10)' }}
                  >
                    <Clock 
                      size={20}
                      style={{ color: 'var(--primary)' }}
                    />
                  </div>
                  <div>
                    <p 
                      className="text-base md:text-lg font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Monday to Friday, 9AM - 6PM (GMT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative mt-8">
              <img
                src="/images/contact.svg"
                alt="Contact illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs

