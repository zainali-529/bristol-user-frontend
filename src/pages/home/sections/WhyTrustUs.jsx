import { Clock, DollarSign, ShieldCheck } from 'lucide-react'

function WhyTrustUs() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Why Trust Us For Energy Needs
          </h2>
          <p 
            className="text-base md:text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Orca Business Solutions is a new name, but we're built on real experience. 
            We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
          </p>
        </div>

        {/* Cards Container - Seamless 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Left Card - Rounded Left */}
          <div 
            className="relative p-8 md:p-10 flex flex-col items-start md:rounded-l-3xl border-r-0"
            style={{ 
              backgroundColor: 'var(--primary-5)',
            }}
          >
            {/* Circle Icon */}
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
              }}
            >
              <Clock size={32} color="white" strokeWidth={2} />
            </div>

            {/* Content */}
            <h3 
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              24/7 Rapid Response
            </h3>
            <p 
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              We're on call day and night to tackle gas or electricity faults and minimise downtime. 
              We're on call day and night to tackle gas or electricity faults and minimise downtime.
            </p>
          </div>

          {/* Center Card - No Rounded Corners */}
          <div 
            className="relative p-8 md:p-10 flex flex-col justify-between border-x-0"
            style={{ 
              backgroundColor: 'var(--primary-10)',
            }}
          >
            {/* Content at Top */}
            <div className="mb-12">
              <h3 
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Transparent,<br />Competitive Rates
              </h3>
              <p 
                className="text-sm md:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                We're on call day and night to tackle gas or electricity faults and minimise downtime. 
                We're on call day and night to tackle gas.
              </p>
            </div>

            {/* Circle Icon at Bottom */}
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
              }}
            >
              <DollarSign size={32} color="white" strokeWidth={2} />
            </div>
          </div>

          {/* Right Card - Rounded Right */}
          <div 
            className="relative p-8 md:p-10 flex flex-col items-start md:rounded-r-3xl border-l-0"
            style={{ 
              backgroundColor: 'var(--primary-5)',
            }}
          >
            {/* Circle Icon */}
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
              }}
            >
              <ShieldCheck size={32} color="white" strokeWidth={2} />
            </div>

            {/* Content */}
            <h3 
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Safety and Compliance First
            </h3>
            <p 
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              We're on call day and night to tackle gas or electricity faults and minimise downtime. 
              We're on call day and night to tackle gas or electricity faults and minimise downtime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTrustUs

