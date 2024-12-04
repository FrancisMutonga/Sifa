"use client";

import React, { useState, useEffect } from "react";

const HeroSection: React.FC = () => {
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
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Carousel */}
      <div className="w-full h-full relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Slogan */}
      <div className="absolute bottom-7 w-full text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
        Elevate Your Space with Timeless Elegance
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
