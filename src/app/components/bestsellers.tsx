"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ExploreCollection: React.FC = () => {
  const categories = [
    {
      name: "Tiles",
      products: [
        { name: "Tile A", image: "/tile1.jpg", link: "/tileA" },
        { name: "Tile B", image: "/tile2.jpg", link: "/tileB" },
        { name: "Tile C", image: "/tile3.jpg", link: "/tileC" },
        { name: "Tile A", image: "/tile1.jpg", link: "/tileA" },
      ],
    },
    {
      name: "Furniture",
      products: [
        { name: "sofa", image: "/sofa.jpg", link: "/chairA" },
        { name: "Table B", image: "/sofa.png", link: "/tableB" },
        { name: "Sofa C", image: "/sofa2.png", link: "/sofaC" },
        { name: "sofa", image: "/sofa.jpg", link: "/chairA" },
      ],
    },
  ];

  return (
    <section className="py-16 bg-foreest">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Explore Our Best Sellers</h2>

        {categories.map((category, index) => (
          <div key={index} className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">{category.name}</h3>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              loop={true}
              autoplay={{ delay: 3000 }}
            >
              {category.products.map((product, productIndex) => (
                <SwiperSlide key={productIndex}>
                  <div className="relative rounded-lg overflow-hidden w-70 h-65 shadow-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-fill"
                    />
                    <div className="absolute  bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex gap-16 items-center">
                      <h3 className="text-white text-lg text-centre font-semibold">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollection;
