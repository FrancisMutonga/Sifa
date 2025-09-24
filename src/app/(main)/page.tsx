"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HeroSection from './../components/hero';
import AboutCard from './../components/aboutcard';
import Stats from './../components/stat';
import WhyUs from './../components/why';
import Reviews from './../components/review';
import ExploreCollection from './../components/bestsellers';
import CTASection from './../components/cta';

function Page() {
  useEffect(() => {
   
    AOS.init({
      duration: 1000,  
      easing: 'ease-in-out', 
      once: true,  
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 py-8 mt-10">
      <HeroSection />

      <div className="gap-10 p-8 space-y-8">
        <AboutCard />
        <Stats/>
        <ExploreCollection />
        <WhyUs />
        <Reviews />
        <CTASection/>
      </div>
    </div>
  );
}

export default Page;
