"use client";

import React, { useState, useEffect } from "react";

// Define HeroSectionProps interface to accept className
interface HeroSectionProps {
  className?: string; 
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const images = [
    "/slide.jpg", 
    "/slide1.jpg", 
    "/slide2.jpg",
    "/slide3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Adjust time (5000ms = 5 seconds) between image swaps

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative w-full min-h-screen mt-2 ${className}`}>
      {/* Carousel */}
      <div className="w-full min-h-screen relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentIndex === index ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              width: "100%",
            }}
          >
            {/* Slogan */}
            <div className="absolute w-full bottom-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                Elevate Your Space with Timeless Elegance
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
