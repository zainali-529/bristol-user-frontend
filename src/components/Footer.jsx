import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { apiService } from '@/services/api'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Zap,
  ArrowRight,
  Heart,
  Loader2
} from 'lucide-react'
import Logo from './Logo'
import { Button } from './ui/button'
import { Input } from './ui/input'

function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      await apiService.subscribeNewsletter({ email })
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error(error.response?.data?.message || 'Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'How We Work', href: '#how-we-work' },
    { name: 'Industries', href: '#industries' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQs', href: '#faqs' },
  ]

  const services = [
    { name: 'Energy Comparison', href: '#services' },
    { name: 'Bill Calculator', href: '#calculator' },
    { name: 'Price Tracker', href: '#price-tracker' },
    { name: 'Contract Management', href: '#services' },
    { name: 'Energy Consultation', href: '#contact' },
  ]

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, href: '#', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: '#0A66C2' },
    { name: 'Instagram', icon: Instagram, href: '#', color: '#E4405F' },
  ]

  return (
    <footer 
      className="relative overflow-hidden"
      style={{ 
        backgroundColor: 'var(--primary-5)'
      }}
    >
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ lineHeight: 0 }}>
        <svg 
          className="relative block w-full h-12 md:h-16" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            style={{ fill: 'var(--background)' }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Company Info - Larger Column */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo />
            </div>
            <p 
              className="text-base leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Your trusted partner in finding the best energy deals. We help businesses across the UK save money and switch to better energy suppliers with ease.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href="tel:+441234567890"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--primary-10)' }}
                >
                  <Phone className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </div>
                <span className="group-hover:text-primary transition-colors">
                  +44 (0) 123 456 7890
                </span>
              </a>

              <a 
                href="mailto:info@bristolutilities.com"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--primary-10)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </div>
                <span className="group-hover:text-primary transition-colors">
                  info@bristolutilities.com
                </span>
              </a>

              <div 
                className="flex items-start gap-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--primary-10)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </div>
                <span>
                  123 Energy Street, Bristol<br />
                  BS1 2AB, United Kingdom
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--primary-10)',
                      color: 'var(--primary)'
                    }}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 
              className="text-lg font-semibold mb-6 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Zap className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ArrowRight 
                      className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                      style={{ color: 'var(--primary)' }}
                    />
                    <span className="group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 
              className="text-lg font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="group flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ArrowRight 
                      className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                      style={{ color: 'var(--primary)' }}
                    />
                    <span className="group-hover:text-primary transition-colors">
                      {service.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 
              className="text-lg font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Stay Updated
            </h3>
            <p 
              className="text-base mb-4 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Subscribe to our newsletter for energy-saving tips and exclusive deals.
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 h-12 rounded-xl"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-6 rounded-xl font-semibold whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
              </Button>
            </form>

            {/* Trust Badges */}
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: 'var(--primary-5)' }}
            >
              <p 
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Trusted by 1000+ UK Businesses
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: 'var(--primary)',
                        borderColor: 'var(--card)',
                        color: 'white',
                      }}
                    >
                      {i}K
                    </div>
                  ))}
                </div>
                <span 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Happy Customers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px mb-8"
          style={{ backgroundColor: 'var(--border)' }}
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p 
            className="text-sm text-center md:text-left"
            style={{ color: 'var(--text-secondary)' }}
          >
            © {currentYear} Bristol Utilities. All rights reserved. Made with{' '}
            <Heart 
              className="inline w-4 h-4 mx-1 fill-current" 
              style={{ color: '#ef4444' }}
            />
            in the UK
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {legal.map((link, index) => (
              <div key={link.name} className="flex items-center gap-6">
                <Link
                  to={link.href}
                  className="text-sm transition-colors hover:text-primary"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.name}
                </Link>
                {index < legal.length - 1 && (
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Accent */}
      <div 
        className="h-1"
        style={{ 
          background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%)'
        }}
      />
    </footer>
  )
}

export default Footer

