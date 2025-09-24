"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import { ArrowRight } from "lucide-react";

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


  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-12 gap-8 bg-brand-sand">
      {/* Carousel */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[index]}
              alt={`Property ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-forest leading-tight mb-4 flex items-center justify-center md:justify-start gap-2">
          Timeless Interiors, Effortless Connections
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
          Elevate yourself With Timeless Elegance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/shop"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest  text-white font-medium hover:bg-brand-leaf transition"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-forest text-forest font-medium hover:bg-nude hover:text-forest transition"
          >
            Connect with Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}


export default HeroSection;
