import React from "react";
import Image from "next/image";

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
      profilePic: "/review3.jpg",
      testimony:
        "The team at Sifa Interiors transformed our office space into a modern and functional workspace that we love!",
      date: "Nov 10, 2024",
    },
    {
      name: "Rachel Wambui",
      title: "Homeowner",
      profilePic: "/review1.jpg",
      testimony:
        "Working with Sifa Interiors was a delight. Their designs are stunning, and the team was incredibly professional.",
      date: "Nov 8, 2024",
    },
    {
      name: "Stephenr Roy",
      title: "Manager, ABC Corp",
      profilePic: "/review2.jpg",
      testimony:
        "Sifa Interiors delivered beyond our expectations! Their attention to detail is unmatched.",
      date: "Nov 5, 2024",
    },
  ];

  return (
    <section className={`bg-forest py-16 ${className}`}>
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-dusty shadow-xl rounded-xl p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
