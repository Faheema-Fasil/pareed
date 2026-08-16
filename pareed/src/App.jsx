import React from 'react'
import Header from './components/Header/Header'
import HeroPage from './components/heropage/HeroPage'
import TrustSection from './components/TrustSection'
import Services from './components/Services'
import AboutSection from './components/AboutSection'
import MissionAndVision from './components/MissionAndVision'
import OurProducts from './components/OurProducts'
import WhyChooseUs from './components/WhyChooseUs'
import StorySection from './components/StorySection'
import OurTeam from './components/OurTeam'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink font-sans">
      <Header />
      <HeroPage />
      <TrustSection />
      <Services />
      <AboutSection />
      <MissionAndVision />
      <OurProducts />
      <WhyChooseUs />
      <StorySection />
      <OurTeam />
      <ContactSection />
      <Footer />
    </div>
  )
}
