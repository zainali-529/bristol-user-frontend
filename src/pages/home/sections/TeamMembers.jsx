import TeamMemberCard from './TeamMemberCard'

function TeamMembers() {
  // Team member data - will be from API in future
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      image: '/images/team-1.jpg',
      description: 'With over 15 years of experience in energy management, Sarah leads our mission to help businesses reduce costs.',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah@bristolutilities.com',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Head of Operations',
      image: '/images/team-2.jpg',
      description: 'Michael specializes in contract negotiation and multi-site energy management solutions.',
      linkedin: 'https://linkedin.com/in/michaelchen',
      email: 'michael@bristolutilities.com',
    },
    {
      id: 3,
      name: 'Emma Williams',
      position: 'Senior Energy Consultant',
      image: '/images/team-3.jpg',
      description: 'Emma helps businesses optimize their energy consumption and achieve sustainability goals.',
      linkedin: 'https://linkedin.com/in/emmawilliams',
      email: 'emma@bristolutilities.com',
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Business Development Manager',
      image: '/images/team-4.jpg',
      description: 'David builds strategic partnerships and helps businesses find the best energy solutions.',
      linkedin: 'https://linkedin.com/in/davidthompson',
      email: 'david@bristolutilities.com',
    },
  ]

  return (
    <section 
      className="py-16 md:py-24 px-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span 
            className="text-sm md:text-base font-medium mb-2 block"
            style={{ color: 'var(--primary)' }}
          >
            Our Team
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Meet Our Expert Team
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Our dedicated team of energy experts is committed to helping your business achieve better energy outcomes and cost savings.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              position={member.position}
              image={member.image}
              description={member.description}
              linkedin={member.linkedin}
              email={member.email}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamMembers

