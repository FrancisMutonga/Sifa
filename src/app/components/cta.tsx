"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTASection: React.FC = () => {
  return (
    <section className="rounded-xl py-12 px-4 w-full overflow-hidden ">
      <div className="max-w-5xl mx-auto text-center space-y-6 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl text-forest font-bold leading-tight"
        >
          Transform Your Space with Sifa Studios
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          Explore our unique designs, eco-friendly solutions, and timeless décor ideas to make your
          home or office truly inspiring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link
            href="/products"
            className="inline-block bg-forest text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition duration-300"
          >
            Browse Décor
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white/70 text-forest border border-forest px-6 py-3 rounded-full font-semibold shadow-md hover:bg-white/80 transition duration-300"
          >
            Let&apos;s Work Together
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
