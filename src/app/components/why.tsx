"use client";
import { motion } from "framer-motion";
import { Palette, Leaf, UserCheck, Clock, GraduationCap, Layers } from "lucide-react";

const features = [
  {
    icon: <Palette className="w-8 h-8 text-bgreen" />,
    title: "Innovative Designs",
    desc: "Our designs blend modern trends with timeless elegance, elevating every project.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-bgreen" />,
    title: "Sustainable Practices",
    desc: "We use eco-friendly materials and sustainable methods to minimize environmental impact.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-bgreen" />,
    title: "Customer-Centered Service",
    desc: "Personalized guidance ensures your vision comes to life exactly as you imagined.",
  },
  {
    icon: <Clock className="w-8 h-8 text-bgreen" />,
    title: "Timely Delivery",
    desc: "We pride ourselves on delivering projects on time, without compromising quality.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-bgreen" />,
    title: "Experience & Expertise",
    desc: "Years of industry experience mean you can rely on our trusted expertise.",
  },
  {
    icon: <Layers className="w-8 h-8 text-bgreen" />,
    title: "Versatile Product Range",
    desc: "A curated collection designed to suit every taste, style, and space.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 px-6 md:px-16  text-white rounded-xl">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4"
        >
          Why Choose Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg mb-12 text-gray-500"
        >
          At Sifa Studios, we create spaces that inspire — blending creativity, sustainability, and reliability.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="bg-white/50 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 text-center border-t-4 border-forest"
            >
              <div className="bg-green-50 p-4 rounded-full inline-block text-forest mb-4 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-forest mb-2">{item.title}</h3>
              <p className="text-gray-600 text-md">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
