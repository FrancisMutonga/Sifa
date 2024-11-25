import React from "react";

const WhyUs: React.FC = () => {
  const reasons = [
    {
      title: "Innovative Designs",
      icon: "bx bxs-bulb",
      description:
        "Our designs incorporate modern trends with timeless elegance, adding value to every project.",
    },
    {
      title: "Sustainable Practices",
      icon: "bx bxs-leaf",
      description:
        "Our processes prioritize eco-friendly materials and sustainable practices, reducing our environmental impact.",
    },
    {
      title: "Customer-Centered Service",
      icon: "bx bxs-user",
      description:
        "We offer personalized guidance throughout the project journey, ensuring that your vision becomes a reality.",
    },
    {
      title: "Timely Delivery",
      icon: "bx bxs-time-five",
      description:
        "We pride ourselves on completing projects on time, every time.",
    },
    {
      title: "Experience and Expertise",
      icon: "bx bxs-graduation",
      description:
        "With years of experience, our team brings expertise that you can trust.",
    },
    {
      title: "Versatile Product Range",
      icon: "bx bxs-category",
      description:
        "Our wide product range is curated to offer something for every taste and space.",
    },
  ];

  return (
    <section className="bg-dusty py-10 rounded-xl">
      <div className="container mx-auto px-6 lg:px-12 text-white">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 bg-dusty rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div className="text-5xl text-white mb-6">
                <i className={reason.icon}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
              <p className="text-gray-300">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
