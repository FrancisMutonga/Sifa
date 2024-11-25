import React from "react";

interface Review {
  name: string;
  title: string;
  profilePic: string;
  testimony: string;
  date: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      name: "John Paul",
      title: "CEO, ary ltd",
      profilePic: "/review2.jpg",
      testimony:
        "The team at Sifa Interiors transformed our office space into a modern and functional workspace that we love!",
      date: "Nov 10, 2024",
    },
    {
      name: "Jane Smith",
      title: "Homeowner",
      profilePic: "/review3.jpg",
      testimony:
        "Working with Sifa Interiors was a delight. Their designs are stunning, and the team was incredibly professional.",
      date: "Nov 8, 2024",
    },
    {
      name: "Cleveland Brown",
      title: "Manager, ABC Corp",
      profilePic: "/review1.jpg",
      testimony:
        "Sifa Interiors delivered beyond our expectations! Their attention to detail is unmatched.",
      date: "Nov 5, 2024",
    },
  ];

  return (
    <section className="bg-forest py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 ">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-dusty shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
              {/* Profile Section */}
              <div className="flex items-center mb-4">
                <img
                  src={review.profilePic}
                  alt={`${review.name}'s profile`}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl text-white font-bold">{review.name}</h3>
                  <p className="text-sm text-white ">{review.title}</p>
                </div>
              </div>

              {/* Testimony Section */}
              <p className="text-white italic mb-4">{`"${review.testimony}"`}</p>

              {/* Date Section */}
              <p className="text-sm text-white text-right">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
