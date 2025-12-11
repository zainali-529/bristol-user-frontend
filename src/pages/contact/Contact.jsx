import Footer from '../../components/Footer'
import { ContactUs, TrustedPartners, WhyTrustUs, Testimonials, Faqs } from '../home/sections'
import { ContactHero } from './sections'

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <ContactHero /> */}
      <ContactUs />
      <TrustedPartners />
      <WhyTrustUs />
      <Testimonials />
      <Faqs />
      <Footer />
    </div>
  )
}

export default ContactPage
