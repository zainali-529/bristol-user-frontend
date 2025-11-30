import TopNav from '../../components/TopNav'
import Footer from '../../components/Footer'
import { HeroSection, WhyTrustUs, About, Services, TrustedPartners, HowWeWork, IndustriesWeServe, AverageSavingsByIndustry, Testimonials, ContactUs, QuoteForm, TeamMembers, EnergyPriceTracker, SavingsStatistics, BillCalculator, Faqs, MouseRevealSection } from './sections'

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
      <BillCalculator />
      <EnergyPriceTracker />
      <Testimonials />
      <MouseRevealSection />
      <TeamMembers />
      <Faqs />
      <ContactUs />
      <QuoteForm />
      <Footer />
    </div>
  )
}

export default HomePage

