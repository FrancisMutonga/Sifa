import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Review {
  name: string;
  title: string;
  profilePic: string;
  testimony: string;
  date: string;
}

interface ReviewsProps {
  className?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ className }) => {
  const reviews: Review[] = [
    {
      name: "Peter Waweru",
      title: "CEO, ary ltd",
      profilePic: "/review1.jpg",
      testimony:
        "The team at Sifa Interiors transformed our office space into a modern and functional workspace that we love!",
      date: "Nov 10, 2024",
    },
    {
      name: "Rachel Wambui",
      title: "Homeowner",
      profilePic: "/review3.jpg",
      testimony:
        "Working with Sifa Interiors was a delight. Their designs are stunning, and the team was incredibly professional.",
      date: "Nov 8, 2024",
    },
    {
      name: "Stephen Roy",
      title: "Manager, ABC Corp",
      profilePic: "/review2.jpg",
      testimony:
        "Sifa Interiors delivered beyond our expectations! Their attention to detail is unmatched.",
      date: "Nov 5, 2024",
    },
  ];

  return (
    <section className={`bg-forest  ${className}`}>
      <div className="container mx-auto p-4 w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
        <Swiper
          spaceBetween={60}  
          slidesPerView={1} 
          autoplay={{
            delay: 3000,  
            disableOnInteraction: false,  
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,  
            },
            1024: {
              slidesPerView: 3,  
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-dusty shadow-xl rounded-xl p-6 flex flex-col justify-between transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Image
                    src={review.profilePic}
                    alt={`${review.name}'s profile`}
                    width={64}
                    height={64}
                    className="rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl text-white font-bold">{review.name}</h3>
                    <p className="text-sm text-white">{review.title}</p>
                  </div>
                </div>

                <p className="text-white italic mb-4">{`"${review.testimony}"`}</p>

                <p className="text-sm text-white text-right">{review.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
