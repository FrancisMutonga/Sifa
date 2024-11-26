"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutCard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-dusty p-4 rounded-lg shadow-lg">
      {/* Image */}
      <div className="md:w-1/2 w-full">
        <Image
          src="/aboutcard.jpg" 
          alt="About Us"
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="md:w-1/2 w-full md:pl-6 mt-6 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold  w-18 text-white mb-4">
        Modern Style Timeless Charm
        </h2>
        <p className="text-white mb-6">
        Renowned for quality and attention to detail.
         Our legacy is built on combining time-honored craftsmanship with modern design principles,
          offering our clients the perfect blend of tradition and innovation..
        </p>
        <Link
          href="/about"
          className="inline-block bg-forest text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default AboutCard;
