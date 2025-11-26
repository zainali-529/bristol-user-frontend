import IndustryCard from './IndustryCard'

function IndustriesWeServe() {
  // Industry data - will be from API in future
  const industries = [
    {
      id: 1,
      image: "/images/about-1.jpg",
      title: "Manufacturing",
      description: "Reduce high-volume energy costs with flexible procurement strategies.",
      savings: "18%",
    },
    {
      id: 2,
      image: "/images/about-2.jpg",
      title: "Retail & Shopping",
      description: "Save on multi-site operations with smart contract management.",
      savings: "20%",
    },
    {
      id: 3,
      image: "/images/about-3.jpg",
      title: "Healthcare",
      description: "Reduce high-volume energy costs with flexible procurement strategies.",
      savings: "22%",
    },
    {
      id: 4,
      image: "/images/about-1.jpg",
      title: "Hospitality",
      description: "Reduce high-volume energy costs with flexible procurement strategies.",
      savings: "15%",
    },
    {
      id: 5,
      image: "/images/about-2.jpg",
      title: "Property Management",
      description: "Reduce high-volume energy costs with flexible procurement strategies.",
      savings: "30%",
    },
    {
      id: 6,
      image: "/images/about-3.jpg",
      title: "Technology & Data",
      description: "Reduce high-volume energy costs with flexible procurement strategies.",
      savings: "28%",
    },
  ]

  return (
    <section 
      className="py-16 md:py-24 px-4"
      style={{ backgroundColor: 'var(--primary-5)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Industries We Serve
          </h2>
          <p 
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Orca Business Solutions is a new name, but we're built on real experience. We work with UK businesses to help reduce costs, stay within rules, and plan for better outcomes.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              image={industry.image}
              title={industry.title}
              description={industry.description}
              savings={industry.savings}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustriesWeServe

