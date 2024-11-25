import React from "react";

const Stats: React.FC = () => {
  return (
    <section className="bg-forest py-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold text-white">500+</h3>
          <p className="text-lg text-white">Product</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-white">50+</h3>
          <p className="text-lg text-white">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-white">50+</h3>
          <p className="text-lg text-white">Completed Projects</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-white">100%</h3>
          <p className="text-lg text-white">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
