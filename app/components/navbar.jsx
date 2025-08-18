"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { BsHeart } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import UserDropdown from "./Topgamegrid/dropdown";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/store/getUser";
import { Loader } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();
  const [user1, setUser1] = useState(null);

  const navLink = [
    { id: 1, url: "/dashboard", title: "Home" },
    { id: 2, url: "/dashboard/trending", title: "Trending" },
    { id: 3, url: "/dashboard/popular", title: "Popular" },
    { id: 4, url: "/dashboard/list", title: "My List" },
    { id: 5, url: "/dashboard/donate", title: "Donate" },
    { id: 6, url: "/dashboard/faq", title: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleProfile = async () => {
      if (!loading && user) {
        console.log("User ID:", user.$id);

        try {
          const res = await getUserProfile(user.$id);
          console.log(res);
          setUser1(res);
        } catch (error) {
          console.log("User not found or error:", error);
        }
      }
    };
    handleProfile();
  }, [loading, user]);

  return (
    <motion.nav
      initial={false}
      animate={{
        top: scrolled ? 12 : 0,
        width: scrolled ? "95%" : "100%",
        borderRadius: scrolled ? "0.75rem" : "0rem",
        backgroundColor: scrolled ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(6px)" : "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex justify-between items-center px-4 md:px-8 md:h-[60px] lg:h-[60px] mb-4 mt-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image width={40} height={40} alt="logo" src="/logo.svg" />
          <h1 className="text-xl flex md:hidden lg:flex md:text-2xl font-extrabold tracking-wider uppercase text-white drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]">
            <span className="relative inline-block before:content-[''] before:absolute before:w-[130%] before:h-[3px] before:bg-red-600 before:shadow-[0_0_8px_rgba(255,0,0,0.8)] before:rotate-[-20deg] before:top-[50%] before:left-0">
              E
            </span>
            nkylo
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLink.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.id}
                href={item.url}
                className={`font-semibold uppercase py-1 text-xs md:text-sm hidden md:flex hover:text-white transition-colors ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Icons Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <CiSearch className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
          <BsHeart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer" />
          <div className="relative cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405C18.21 15.21 18 14.702 18 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.97 7 11v3c0 .702-.21 1.21-.595 1.595L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full">
              1
            </span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user1?.photoURL || "/av.jpg"}
              width={40}
              height={40}
              className="object-cover"
              alt="Profile"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white"
          >
            {mobileOpen ? (
              <HiX className="w-7 h-7" />
            ) : (
              <HiMenu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-black bg-opacity-90 px-6 py-4 space-y-4">
          {navLink.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setMobileOpen(false)}
                className={`block font-semibold text-lg ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
