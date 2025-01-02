"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HeroSection from './components/hero';
import AboutCard from './components/aboutcard';
import Stats from './components/stats';
import WhyUs from './components/why';
import Reviews from './components/review';
import ExploreCollection from './components/bestsellers';

function Page() {
  useEffect(() => {
   
    AOS.init({
      duration: 1000,  
      easing: 'ease-in-out', 
      once: true,  
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 py-8 bg-forest mt-10">
      <HeroSection data-aos="fade-up" className="animate-fade-in" />

      <div className="gap-10 p-8">
        <AboutCard data-aos="fade-up" className="animate-fade-in-delay" />
        <Stats data-aos="fade-up" className="animate-slide-in" />
        <ExploreCollection data-aos="fade-up" className="animate-fade-in-delay" />
        <WhyUs data-aos="fade-up" className="animate-fade-in" />
        <Reviews data-aos="fade-up" className="animate-fade-in-delay" />
      </div>
    </div>
  );
}

export default Page;
