"use client";
import Image from "next/image";
import { useState } from "react";

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Latest Fashion Trends 2025 for Everyone",
      desc: "Explore the newest fashion trends that define this year’s collections and get styling tips for every occasion.",
      img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Smart Gadgets That Simplify Your Daily Life",
      desc: "Discover a collection of smart devices designed to make your routine easier and more efficient.",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Top 10 Sneakers of This Season",
      desc: "A curated list of sneakers trending this season, combining comfort, design, and performance in one package.",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Luxury Watches That Define Class",
      desc: "From timeless elegance to modern design, here are some watches that make a powerful statement.",
      img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Minimalist Home Decor Inspiration Ideas",
      desc: "Learn how to decorate your home using minimalist designs, soft tones, and modern aesthetics.",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Best Fitness Gear for Your Home Workout",
      desc: "Upgrade your fitness routine with these essential workout accessories and stay fit indoors.",
      img: "https://images.unsplash.com/photo-1571019613914-85f342c55f86?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      title: "Best Tech Gifts for Your Loved Ones",
      desc: "Looking for gift ideas? Check out these smart and affordable gadgets perfect for any occasion.",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      title: "Travel Essentials for Your Next Adventure",
      desc: "Pack like a pro! Here’s a list of travel must-haves for a comfortable and unforgettable journey.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [visible, setVisible] = useState(4);

  const handleShowMore = () => {
    setVisible((prev) => (prev === 4 ? blogs.length : 4));
  };

  return (
    <section className=" py-12 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-500">
          Latest Blog Posts
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {blogs.slice(0, visible).map((blog) => (
            <div
              key={blog.id}
              className="bg-[#111] border border-red-600 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-red-500 mb-2 line-clamp-1">
                  {blog.title.split(" ").slice(0, 5).join(" ")}...
                </h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                  {blog.desc}
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Read Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-lg font-medium transition"
          >
            {visible === 4 ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>
    </section>
  );
}
