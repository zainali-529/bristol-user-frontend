import Footer from '../../components/Footer'
import { QuoteForm, WhyTrustUs, Testimonials, Faqs, ContactUs } from '../home/sections'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, ShieldCheck, Leaf, Calendar, TrendingDown, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'

function QuotePage() {
  const features = [
    { icon: Zap, title: 'Fast, Tailored Quotes', description: 'Get personalised energy deals based on your usage and contract goals.' },
    { icon: TrendingDown, title: 'Better Rates', description: 'We benchmark suppliers to secure competitive pricing for your business.' },
    { icon: ShieldCheck, title: 'Transparent Brokerage', description: 'Clear terms, no hidden fees, and outcomes aligned to your needs.' },
    { icon: Leaf, title: 'Green Options', description: 'Choose renewable energy and track your sustainability outcomes.' },
    { icon: Calendar, title: 'Flexible Contracts', description: 'Align contract lengths and start dates with your operational timeline.' },
    { icon: Handshake, title: 'End-to-End Support', description: 'From quoting to onboarding, we manage the process seamlessly.' },
  ]

  return (
    <div className="min-h-screen bg-background">

      <section
        className="py-16 md:py-24 px-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--primary-5)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: 'var(--primary)', transform: 'translate(30%, -30%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)' }}
            >
              <Zap size={18} />
              <span className="text-sm font-semibold">Business Energy Quotes</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Get Your Best Energy Deal
            </h1>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Answer a few questions and we will prepare a tailored quote across trusted UK suppliers.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <Button asChild className="rounded-xl font-semibold px-6 py-6 border-0" style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))', color: 'white' }}>
                <Link to="#quote-form" className="flex items-center gap-2">Start Quote <ArrowRight size={18} /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl font-semibold px-6 py-6" style={{ borderColor: 'var(--primary-20)', color: 'var(--primary)' }}>
                <Link to="/#contact">Talk to an Expert</Link>
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--primary-10)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <f.icon size={22} style={{ color: 'var(--primary)' }} />
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div id="quote-form">
        <QuoteForm />
      </div>

      <WhyTrustUs />
      <Testimonials />
      <Faqs />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default QuotePage

