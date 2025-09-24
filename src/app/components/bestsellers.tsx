"use client";
import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { supabase } from "../supabaseClient";
import Image from "next/image";

interface Product {
  name: string;
  image: string;
}

interface Category {
  name: string;
  products: Product[];
}

interface ExploreCollectionProps {
  className?: string;
}

interface ExploreCollectionState {
  categories: Category[];
}

class ExploreCollection extends Component<
  ExploreCollectionProps,
  ExploreCollectionState
> {
  constructor(props: ExploreCollectionProps) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchBestSellers();
  }

  async fetchBestSellers() {
    const { data, error } = await supabase
      .from("categories")
      .select("name, products (name, image)")
      .eq("is_best_seller", true);

    if (error) {
      console.error("Error fetching best sellers:", error);
    } else {
      this.setState({ categories: data || [] });
    }
  }

  render() {
    const { categories } = this.state;
    const { className } = this.props;

    return (
      <section className={`py-16 px-8 ${className}`}>
        <div className="container mx-auto  text-center">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-12">
            Explore Our Best Sellers
          </h2>

          {categories.map((category, index) => (
            <div key={index} className="mb-16">
              <h3 className="text-2xl sm:text-2xl md:text-3xl lg:4xl text-forest font-semibold mb-8">
                {category.name}
              </h3>

              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                loop={true}
                autoplay={{ delay: 3000 }}
              >
                {category.products.map(
                  (product: Product, productIndex: number) => (
                    <SwiperSlide key={productIndex}>
                      <div className="flex flex-row items-center w-full p-6">
                        <div className="relative bg-white/70 rounded-2xl overflow-hidden h-[360px] w-[360px] shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-[300px]"
                            height={240}
                            width={240}
                          />
                          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white text-lg font-semibold text-center">
                              {product.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default ExploreCollection;
