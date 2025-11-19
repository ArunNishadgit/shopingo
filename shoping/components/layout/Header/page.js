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
        <div className="w-full bg-[#131921] text-white h-16 flex items-center px-4 justify-between shadow z-50 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/amazon-logo.png" width={90} height={40} alt="Logo" />
          </Link>

          {/* Desktop Location */}
          <div className="hidden md:flex items-center gap-1 cursor-pointer">
            <MapPin size={18} />
            <div className="text-sm leading-tight">
              <p className="text-gray-300">Deliver to</p>
              <p className="font-bold">India</p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-4 max-w-[550px]">
            <div className="flex w-full h-9">
              <input
                type="text"
                placeholder="Search Amazon..."
                className="flex-1 h-full px-3 rounded-l-md bg-white text-black outline-none text-sm"
              />
              <button className="h-full w-10 bg-yellow-400 rounded-r-md flex items-center justify-center">
                <Search size={18} className="text-black" />
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

            <Link href="/wishlist" className="hidden md:flex flex-col items-center">
              <Heart size={20} /> Wishlist
            </Link>

            <Link href="/account" className="hidden md:flex flex-col items-center">
              <User size={20} /> Account
            </Link>

            <Link href="/cart" className="flex flex-col items-center">
              <ShoppingCart size={20} /> Cart
            </Link>

            <button className="md:hidden">
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* 🔵 BOTTOM HEADER */}
        <div
          className={`
            absolute top-16 left-0 w-full 
            bg-[#232f3e] text-white h-9 flex items-center px-4
            transition-transform duration-300 
            ${showBottom ? "translate-y-0" : "-translate-y-9"} 
          `}
          style={{ zIndex: 40 }}
        >
          <nav className="flex gap-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
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
