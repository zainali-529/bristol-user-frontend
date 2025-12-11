import { motion } from 'framer-motion'
import { Phone, Mail, ArrowDownCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function ContactHero() {
  return (
    <section
      className="relative overflow-hidden px-4 pt-20 md:pt-28 pb-16 md:pb-24"
      style={{ backgroundColor: 'var(--primary-5)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-[-20%] right-[-10%] w-[520px] h-[520px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle at 30% 30%, var(--primary) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[520px] h-[520px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle at 70% 70%, var(--primary-dark) 0%, transparent 60%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div>
            <span
              className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary)', border: '1px solid var(--primary-20)' }}
            >
              Contact Bristol Utilities
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Talk to our energy experts
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Get tailored advice, compare prices, and start saving. Our team responds within one business day.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact#contact"
                className="rounded-xl font-semibold px-6 py-4 border-0 transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))', color: 'white' }}
              >
                Start the conversation
              </Link>
              <Link
                to="tel:+923147372660"
                className="rounded-xl font-semibold px-6 py-4 transition-all duration-300"
                style={{ border: '1px solid var(--primary-20)', color: 'var(--primary)' }}
              >
                <span className="inline-flex items-center gap-2"><Phone size={18} /> +92 314 7372660</span>
              </Link>
              <Link
                to="mailto:zain.ali.529001@gmail.com"
                className="rounded-xl font-semibold px-6 py-4 transition-all duration-300"
                style={{ border: '1px solid var(--primary-20)', color: 'var(--primary)' }}
              >
                <span className="inline-flex items-center gap-2"><Mail size={18} /> Email us</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-3xl p-6 md:p-8 lg:p-10"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Average client savings</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>18%</div>
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Response time</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>24h</div>
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>UK businesses helped</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>1,000+</div>
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Energy contracts managed</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>5,000+</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <ArrowDownCircle size={18} style={{ color: 'var(--primary)' }} />
              Scroll to contact form
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactHero

