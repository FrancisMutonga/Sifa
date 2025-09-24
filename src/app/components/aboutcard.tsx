"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface AboutCardProps {
  className?: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }} 
      className={`flex flex-col md:flex-row items-center bg-gradient-to-r from-forest via-dusty to-forest p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition duration-500 ${className}`}
    >
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="md:w-1/2 w-full"
      >
        <Image
          src="/aboutcard.jpg"
          alt="About Us"
          className="rounded-xl object-cover shadow-lg"
          width={500}
          height={500}
        />
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: false, amount: 0.3 }}
        className="md:w-1/2 w-full md:pl-10 mt-6 md:mt-0"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Modern Style, Timeless Charm
        </h2>
        <p className="text-white/90 text-lg leading-relaxed mb-6">
          Renowned for quality and attention to detail, our legacy is built on
          blending time-honored craftsmanship with modern design principles —
          offering clients the perfect harmony of tradition and innovation.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutCard;
