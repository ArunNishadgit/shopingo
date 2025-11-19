"use client";
import { useEffect, useState } from "react";
import {
  Menu,
  MapPin,
  Search,
  Heart,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [showBottom, setShowBottom] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [location, setLocation] = useState("India");
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const [userName, setUserName] = useState("Arun"); // Example user name

  // Scroll logic for bottom header hide/show
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 90) setShowBottom(false);
      else setShowBottom(true);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Header heights
  const topHeaderHeight = 64; // 16*4 = 64px
  const bottomHeaderHeight = 36; // 9*4 = 36px
  const totalHeaderHeight = topHeaderHeight + bottomHeaderHeight;

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50">

        {/* 🔵 TOP HEADER */}
        <div className="w-full bg-[#272727] text-[#ffffff] h-16 flex items-center px-4 justify-between shadow z-50 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Shopingo.png"
              width={120}
              height={40}
              alt="Logo"
              className="md:w-[160px] md:h-[40px]"
            />
          </Link>

          {/* Desktop Location */}
          <div className="hidden md:flex items-center gap-1 cursor-pointer relative">
            <MapPin size={18} />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-[#272727] text-white border-none outline-none text-sm font-bold cursor-pointer"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-4 max-w-[600px]">
            <div className="flex w-full h-10">
              <input
                type="text"
                placeholder="Search Amazon..."
                className="flex-1 h-full px-3 rounded-l-md bg-[#ffffff] text-[#272727] outline-none text-[18px]"
              />
              <button className="h-full w-10 bg-[#ee0000] rounded-r-md flex items-center justify-center">
                <Search size={18} className="text-[#272727]" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <button
              className="md:hidden"
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search size={22} />
            </button>

            {/* Wishlist Icon */}
            <Link href="/wishlist" className="flex flex-col items-center">
              <Heart size={20} />
            </Link>

            {/* User Icon + Name */}
            <div className="hidden md:flex flex-col items-center text-sm">
              <User size={20} />
              <span>{userName}</span>
            </div>

            {/* Cart Icon + Count */}
            <Link href="/cart" className="relative flex flex-col items-center">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button className="md:hidden">
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* 🔵 BOTTOM HEADER */}
        <div
          className={`
            absolute top-16 left-0 w-full 
            bg-[#d30404] text-white h-9 flex items-center px-4
            transition-transform duration-300 
            ${showBottom ? "translate-y-0" : "-translate-y-9"} 
          `}
          style={{ zIndex: 40 }}
        >
          <nav className="flex gap-6 text-sm overflow-x-hidden whitespace-nowrap scrollbar-hide">
            <Link href="#" className="flex items-center gap-1">
              <Menu size={17} /> All
            </Link>
            <Link href="#">Today's Deals</Link>
            <Link href="#">Mobiles</Link>
            <Link href="#">Electronics</Link>
            <Link href="#">Fashion</Link>
            <Link href="#">Home & Kitchen</Link>
            <Link href="#">Customer Service</Link>
          </nav>
        </div>
      </header>

      {/* 🔹 SPACER OUTSIDE HEADER */}
      <div style={{ height: `${totalHeaderHeight}px` }}></div>

      {/* 🔵 MOBILE SEARCH OVERLAY */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <input
              type="text"
              placeholder="Search Amazon..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none"
              autoFocus
            />
            <button
              className="ml-3 text-gray-700 hover:text-red-500"
              onClick={() => setMobileSearchOpen(false)}
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
