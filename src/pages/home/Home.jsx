import TopNav from '../../components/TopNav'
import { HeroSection, WhyTrustUs, About, Services, TrustedPartners, HowWeWork, IndustriesWeServe, AverageSavingsByIndustry, Testimonials, ContactUs, TeamMembers, EnergyPriceTracker, SavingsStatistics } from './sections'

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <HeroSection />
      <SavingsStatistics />
      <WhyTrustUs />
      <About />
      <Services />
      <TrustedPartners />
      <HowWeWork />
      <IndustriesWeServe />
      <AverageSavingsByIndustry />
      <EnergyPriceTracker />
      <Testimonials />
      <TeamMembers />
      <ContactUs />
    </div>
  )
}

export default HomePage

