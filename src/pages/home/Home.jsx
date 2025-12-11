import Footer from '../../components/Footer'
import { HeroSection, WhyTrustUs, About, Services, TrustedPartners, HowWeWork, IndustriesWeServe, AverageSavingsByIndustry, Testimonials, ContactUs, QuoteForm, EnergyPriceTracker, SavingsStatistics, BillCalculator, Faqs, MouseRevealSection, News } from './sections'

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
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
      <News />
      <Testimonials />
      <MouseRevealSection />
      <Faqs />
      <ContactUs />
      <QuoteForm />
      <Footer />
    </div>
  )
}

export default HomePage
