"use client";
import Image from "next/image";
import React from "react";

interface AboutCardProps {
  className?: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ className }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center bg-dusty p-4 rounded-lg shadow-lg ${className}`}>
      <div className="md:w-1/2 w-full">
        <Image
          src="/aboutcard.jpg"
          alt="About Us"
          className="rounded-lg object-cover"
          width={500}
          height={500}
        />
      </div>

      <div className="md:w-1/2 w-full md:pl-6 mt-6 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold w-1/2 text-white mb-4">
          Modern Style Timeless Charm
        </h2>
        <p className="text-white mb-6">
          Renowned for quality and attention to detail. Our legacy is built on combining time-honored craftsmanship with modern design principles, offering our clients the perfect blend of tradition and innovation.
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
