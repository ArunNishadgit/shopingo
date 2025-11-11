"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [showTop, setShowTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // refs to measure heights precisely
  const headerRef = useRef(null);
  const topBarRef = useRef(null);
  const lowerBarRef = useRef(null);

  // actual measured height of the top bar (px)
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [lowerBarHeight, setLowerBarHeight] = useState(0);

  // measure heights after layout (runs before paint)
  useLayoutEffect(() => {
    const measure = () => {
      const t = topBarRef.current ? topBarRef.current.getBoundingClientRect().height : 0;
      const l = lowerBarRef.current ? lowerBarRef.current.getBoundingClientRect().height : 0;
      setTopBarHeight(Math.round(t));
      setLowerBarHeight(Math.round(l));
    };

    measure();
    // re-measure on window resize (responsive)
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowTop(false); // hide top header when scrolling down
      } else {
        setShowTop(true); // show again when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // compute transform for the whole header element:
  // when top bar hidden, move header up exactly topBarHeight px so lower nav sits flush to top.
  const headerTransform = showTop ? "translateY(0px)" : `translateY(-${topBarHeight}px)`;

  // Spacer must equal visible header total height (topBar + lowerBar) when top is visible,
  // and equal lowerBar only when top hidden (so page content doesn't jump).
  const spacerHeight = showTop ? topBarHeight + lowerBarHeight : lowerBarHeight;

  return (
    <>
      {/* HEADER */}
      <header
        ref={headerRef}
        style={{
          transform: headerTransform,
          transition: "transform 280ms ease",
          top: 0,
        }}
        className="fixed left-0 w-full shadow-md z-50"
      >
        {/* Top Header */}
        <div
          ref={topBarRef}
          className={`bg-white transition-transform duration-280 ease-in-out overflow-hidden ${
            showTop ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
            {/* Left - Logo */}
            <div className="w-auto flex items-center">
              <a href="/">
                <Image
                  src="/Shopingo.png"
                  alt="logo"
                  width={150}
                  height={50}
                  priority
                />
              </a>
            </div>

            {/* Middle - Search Bar (Desktop Only) */}
            <div className="hidden md:flex w-1/2">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow px-3 py-2 outline-none"
                />
                <button className="bg-red-600 text-white px-4 hover:bg-red-700 transition">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center space-x-5">
              {/* Mobile Search Icon */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setShowSearch(true)}
              >
                <Search size={22} />
              </button>

              <button className="flex items-center space-x-1 hover:text-blue-600 hidden md:flex">
                <MapPin size={20} />
                <span className="hidden lg:inline text-sm">Location</span>
              </button>

              <button className="hover:text-blue-600 relative">
                <Heart size={20} />
              </button>

              <button className="hover:text-blue-600 relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  2
                </span>
              </button>

              <button className="hover:text-blue-600 hidden md:block">
                <User size={20} />
              </button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden"
                onClick={() => setMenuOpen((s) => !s)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Lower Header (Navigation) */}
        {/* hide lower bar in mobile when menuOpen (so it doesn't show behind the menu) */}
        {!menuOpen && (
          <div ref={lowerBarRef} className="bg-red-600 border-t border-red-600">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
              <nav className="hidden md:flex space-x-6 text-white font-medium">
                <a href="#" className="hover:text-black transition">
                  Home
                </a>
                <a href="#" className="hover:text-black transition">
                  Shop
                </a>
                <a href="#" className="hover:text-black transition">
                  Categories
                </a>
                <a href="#" className="hover:text-black transition">
                  Deals
                </a>
                <a href="#" className="hover:text-black transition">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md z-40">
            <nav className="flex flex-col p-4 space-y-3 text-gray-700 font-medium">
              <a href="#" className="hover:text-red-600">
                Home
              </a>
              <a href="#" className="hover:text-red-600">
                Shop
              </a>
              <a href="#" className="hover:text-red-600">
                Categories
              </a>
              <a href="#" className="hover:text-red-600">
                Deals
              </a>
              <a href="#" className="hover:text-red-600">
                Contact
              </a>
            </nav>
          </div>
        )}

        {/* 🔍 Mobile Search Overlay */}
        {showSearch && (
          <div className="fixed inset-0 bg-white z-[60] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow border border-gray-300 rounded-lg px-3 py-2 outline-none"
                autoFocus
              />
              <button
                className="ml-3 text-gray-700 hover:text-red-500"
                onClick={() => setShowSearch(false)}
              >
                <X size={28} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content does not jump. Uses measured heights */}
      <div style={{ height: `${spacerHeight}px` }} />
    </>
  );
}
