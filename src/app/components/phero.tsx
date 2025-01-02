"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { supabase } from "../supabaseClient";

interface News {
  id: string;
  title: string;
  description: string;
  image?: string; 
  publish_date: string;
}

const Hero: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("id, title, description, image, publish_date")
          .order("publish_date", { ascending: false });

        if (error) {
          console.error("Failed to fetch news:", error.message);
          return;
        }

        console.log("Fetched news data:", data);
        setNews(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative w-full h-[70vh] mb-20">
      <Swiper
        modules={[Autoplay, Pagination]} // Correct module usage for Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // Ensure autoplay continues after interaction
        }}
        pagination={{
          clickable: true, // Ensure pagination dots are clickable
        }}
        loop
        className="w-full h-full"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="w-full h-auto bg-gray-800 flex flex-col justify-center items-center text-white relative"
              style={{
                backgroundImage: `url(${item.image || "/default-news-bg.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width:"auto",

              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay */}
              <h1 className="text-2xl lg:text-4xl font-bold relative z-10">{item.title}</h1>
              <p className="text-sm lg:text-lg mt-2 text-center px-4 relative z-10">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
