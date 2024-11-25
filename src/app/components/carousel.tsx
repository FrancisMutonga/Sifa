"use client";
import React, { useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + children.length) % children.length
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-4 transition-all duration-500 ease-in-out"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
      >
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {children.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
