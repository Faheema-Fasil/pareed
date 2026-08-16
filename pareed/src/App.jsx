import React from 'react'
import Header from './components/Header/Header'
import HeroPage from './components/heropage/HeroPage'
import TrustSection from './components/TrustSection'
import Services from './components/Services'
import AboutSection from './components/AboutSection'
import MissionAndVision from './components/MissionAndVision'
import OurProducts from './components/OurProducts'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Header />
      <HeroPage />
      <TrustSection/>
      <Services/>
      <AboutSection/>
      <MissionAndVision/>
      <OurProducts/>

      {/* Hero section to showcase the design */}
      <main className="container mx-auto px-4 md:px-8 py-24 text-center ">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-8 animate-pulse">
          Premium Seafood Exporters
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Connecting Oceans, <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Delivering Excellence</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
          PAREED FISH TRADING L.L.C is a premier global partner in fresh, chilled, and frozen seafood products. Sourced responsibly and delivered with unmatched quality.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#products" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wider py-3 px-8 rounded-full shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/35 transition-all duration-300">
            EXPLORE PRODUCTS
          </a>
          <a href="#about" className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold text-sm tracking-wider py-3 px-8 rounded-full transition-all duration-300">
            DISCOVER OUR STORY
          </a>
        </div>
      </main>
    </div>
  )
}
