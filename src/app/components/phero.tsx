"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero: React.FC = () => {
  const heroImages = [
    { src: "/hslide.png", alt: "Explore Our Collection" },
    { src: "/tile3.jpg", alt: "Find Your Style" },
    { src: "/sofa2.png", alt: "Quality You Can Trust" },
  ];

  return (
    <div className="relative w-full h-[70vh] mt-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-contain bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-white">
                <h1 className="text-2xl lg:text-4xl font-bold">{image.alt}</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a
          href="#latest-products"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition text-center"
        >
          Latest Products
        </a>
      </div>
    </div>
  );
};

export default Hero;
