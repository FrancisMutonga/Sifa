import React from 'react'
import HeroSection from './components/hero'
import AboutCard from './components/aboutcard'
import Stats from './components/stats'
import WhyUs from './components/why'
import Reviews from './components/review'
import ExploreCollection from './components/bestsellers'

function page() {
  return (
    <div className="flex flex-col gap-6 py-8 bg-forest">
      <HeroSection/>
      <div className="gap-10 p-8">
      <AboutCard/>
      <Stats/>
      <ExploreCollection/>
      <WhyUs/>
      <Reviews/>
      </div>
     
    </div>
  )
}

export default page