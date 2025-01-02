import React from "react";

interface StatsProps {
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ className }) => {
  return (
    <section className={`bg-forest py-12 ${className}`}>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
        <div className="transform transition duration-500 hover:scale-105">
          <h3 className="text-4xl font-bold text-white animate__animated animate__fadeInUp">
            500+
          </h3>
          <p className="text-lg text-white animate__animated animate__fadeInUp animate__delay-1s">
            Products
          </p>
        </div>
        <div className="transform transition duration-500 hover:scale-105">
          <h3 className="text-4xl font-bold text-white animate__animated animate__fadeInUp">
            50+
          </h3>
          <p className="text-lg text-white animate__animated animate__fadeInUp animate__delay-1s">
            Happy Clients
          </p>
        </div>
        <div className="transform transition duration-500 hover:scale-105">
          <h3 className="text-4xl font-bold text-white animate__animated animate__fadeInUp">
            50+
          </h3>
          <p className="text-lg text-white animate__animated animate__fadeInUp animate__delay-1s">
            Completed Projects
          </p>
        </div>
        <div className="transform transition duration-500 hover:scale-105">
          <h3 className="text-4xl font-bold text-white animate__animated animate__fadeInUp">
            100%
          </h3>
          <p className="text-lg text-white animate__animated animate__fadeInUp animate__delay-1s">
            Satisfaction Rate
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
