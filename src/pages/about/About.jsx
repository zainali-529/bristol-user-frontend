import Footer from '../../components/Footer'
import { WhyTrustUs, Testimonials, Faqs } from '../home/sections'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Target, Leaf, ShieldCheck, Users, Award, Building2, Search, BarChart3, Handshake, FileCheck, Gauge, Eye, Linkedin } from 'lucide-react'

function AboutPage() {
  const aboutImages = [
    '/images/abbout.jpg',
    '/images/about-1.jpg',
    '/images/about-2.jpg',
    '/images/about-3.jpg',
  ]
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'Help UK businesses cut energy costs with transparent brokerage, smart data, and long-term partnerships.'
    },
    {
      icon: Leaf,
      title: 'Vision',
      description: 'Enable sustainable growth with energy strategies that balance savings, compliance, and environmental impact.'
    },
    {
      icon: ShieldCheck,
      title: 'Values',
      description: 'Integrity, transparency, and accountability in every negotiation, contract, and customer interaction.'
    },
  ]

  const stats = [
    { label: 'Average Savings', value: '25–35%' },
    { label: 'Contracts Managed', value: '2,500+' },
    { label: 'Industries Served', value: '20+' },
    { label: 'Satisfaction', value: '98%' },
  ]

  const timeline = [
    { year: '2019', title: 'Foundations', text: 'Laid the groundwork with supplier relationships and compliance-first processes.' },
    { year: '2021', title: 'Growth', text: 'Expanded to multi-site management and contract lifecycle support.' },
    { year: '2023', title: 'Innovation', text: 'Introduced price tracking insights and savings analytics for clients.' },
    { year: '2025', title: 'Scale', text: 'Strengthened data-driven procurement across sectors and regions.' },
  ]

  const approachSteps = [
    { icon: Search, title: 'Discovery', description: 'Understand your business, usage, and constraints to shape a savings strategy.' },
    { icon: BarChart3, title: 'Analysis', description: 'Benchmark tariffs, forecast prices, and model scenarios based on risk tolerance.' },
    { icon: Handshake, title: 'Procurement', description: 'Run competitive sourcing with transparent supplier engagement and clear outcomes.' },
    { icon: FileCheck, title: 'Negotiation', description: 'Secure terms that optimize cost while aligning with compliance and sustainability.' },
    { icon: Gauge, title: 'Implementation', description: 'Coordinate transitions, onboarding, and metering updates to avoid disruption.' },
    { icon: Eye, title: 'Monitoring', description: 'Track pricing, renewals, and anomalies; iterate to capture additional savings.' },
  ]

  const leaders = [
    { image: aboutImages[0], name: 'Sarah Mitchell', role: 'Chief Executive Officer', linkedin: '#' },
    { image: aboutImages[1], name: 'James Carter', role: 'Head of Procurement', linkedin: '#' },
    { image: aboutImages[2], name: 'Priya Singh', role: 'Director of Sustainability', linkedin: '#' },
    { image: aboutImages[3], name: 'Daniel Evans', role: 'Client Success Lead', linkedin: '#' },
  ]

  const caseStudies = [
    { image: aboutImages[0], title: 'Manufacturing, North West', result: '31% cost reduction', summary: 'Consolidated multi-site contracts, optimized timings, and leveraged market dips.' },
    { image: aboutImages[1], title: 'Retail Chain, Nationwide', result: '24% cost reduction', summary: 'Staggered renewals, demand smoothing, and targeted supplier negotiations.' },
    { image: aboutImages[2], title: 'Healthcare, Midlands', result: '29% cost reduction', summary: 'Compliance-first renegotiation with flexible terms and sustainability credits.' },
  ]

  const accreditations = [
    aboutImages[0],
    aboutImages[1],
    aboutImages[2],
    aboutImages[3],
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* <TopNav /> */}

      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutImages[0]})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-12 md:pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
                We Broker Energy Deals That Power Growth
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                Transparent, data-driven energy brokerage for businesses that want savings without compromise.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-xl font-semibold px-6 py-6 border-0" style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))', color: 'white' }}>
                  <Link to="/quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl font-semibold px-6 py-6" style={{ borderColor: 'var(--primary-20)', color: 'var(--primary)' }}>
                  <Link to="/#contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Approach</h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              A structured, transparent method that balances savings, risk, and operational continuity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {approachSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 md:p-8 rounded-2xl transition-transform duration-300 hover:scale-[1.02]" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
                    <Icon size={26} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--primary-5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Leadership</h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Experienced leaders committed to transparency, client success, and measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {leaders.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl overflow-hidden shadow-xl relative">
                <img src={m.image} alt={m.name} className="w-full h-auto object-cover" style={{ aspectRatio: '4/5' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold" style={{ color: 'white' }}>{m.name}</div>
                      <div className="text-sm" style={{ color: 'white', opacity: 0.85 }}>{m.role}</div>
                    </div>
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center" style={{ color: 'var(--primary)' }}>
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {accreditations.map((src, i) => (
              <motion.img key={src} src={src} alt="Accreditation" className="h-10 w-auto opacity-80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 0.8, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Case Studies</h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Real-world results achieved through disciplined sourcing and smart contract strategies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl overflow-hidden relative group">
                <img src={c.image} alt={c.title} className="w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: 'white', opacity: 0.85 }}>{c.title}</div>
                  <div className="text-2xl font-extrabold mb-2" style={{ color: 'white' }}>{c.result}</div>
                  <div className="text-sm" style={{ color: 'white', opacity: 0.85 }}>{c.summary}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--primary-5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={aboutImages[2]} alt="Sustainability" className="w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
            </div>
            <div className="space-y-6">
              <span className="text-sm md:text-base font-medium" style={{ color: 'var(--primary)' }}>Sustainability & CSR</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>Commitments That Scale With Your Goals</h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We align procurement strategies with environmental targets and compliance frameworks, enabling measurable progress and reporting.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Carbon-aware sourcing", "Efficiency-first advisory", "Compliance alignment", "Transparent reporting"].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-10)' }}>
                      <Leaf size={20} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-sm md:text-base font-medium" style={{ color: 'var(--primary)' }}>Who We Are</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>Built on Experience, Driven by Outcomes</h2>
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We help businesses take control of their energy costs with expert procurement, smart contract management, and ongoing support that scales.
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  From single-site firms to complex multi-site operations, we negotiate better rates and build strategies that align with compliance and sustainability goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild className="group relative overflow-hidden rounded-lg font-semibold text-base px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0" style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))', color: 'white' }}>
                  <Link to="/services">View Services</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-lg font-semibold text-base px-6 py-6 transition-all duration-300 hover:scale-105 border-2" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', backgroundColor: 'transparent' }}>
                  <Link to="/quote">Get Quote</Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={aboutImages[1]} alt="About Bristol Utilities" className="w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--primary-5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Mission, Vision, Values</h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Grounded in transparency and focused on outcomes that matter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))' }}>
                    <Icon size={32} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 md:p-8 rounded-2xl text-center" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: 'var(--primary)' }}>{s.value}</div>
                <div className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'var(--primary-5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Journey</h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Milestones that shaped our approach and strengthened our results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-10)', border: '1px solid var(--primary-20)' }}>
                    <Building2 size={24} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.year}</div>
                </div>
                <div className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t.title}</div>
                <div className="text-base" style={{ color: 'var(--text-secondary)' }}>{t.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'linear-gradient(135deg, var(--primary-10) 0%, var(--primary-5) 100%)', border: '1px solid var(--primary-20)' }}>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Ready to optimize your energy?</h2>
              <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>Get a tailored recommendation for your business from our experts.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild className="rounded-xl font-semibold px-6 py-6 border-0" style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))', color: 'white' }}>
                <Link to="/quote">Get a Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl font-semibold px-6 py-6" style={{ borderColor: 'var(--primary-20)', color: 'var(--primary)' }}>
                <Link to="/#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <WhyTrustUs />
      <Testimonials />
      <Faqs />
      <Footer />
    </div>
  )
}

export default AboutPage
