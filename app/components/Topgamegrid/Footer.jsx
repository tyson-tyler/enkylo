"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BsHouse, BsHeart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

import { SlFire } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    { id: "home", icon: <BsHouse size={22} />, url: "/dashboard" },
    { id: "profile", icon: <CiSearch size={22} />, url: "/dashboard/search" },
    { id: "message", icon: <SlFire size={22} />, url: "/dashboard/trending" },
    { id: "settings", icon: <BsHeart size={22} />, url: "/dashboard/wishlist" },
    { id: "photos", icon: <VscAccount size={22} />, url: "/dashboard/account" },
  ];

  return (
    <motion.div
      className="fixed md:hidden  bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl 
                 bg-black/20 backdrop-blur-lg rounded-3xl shadow-lg 
                 flex justify-evenly items-center px-4 border border-white/20
                 z-[999]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.url;
        return (
          <Link key={item.id} href={item.url}>
            <motion.div
              className="relative flex flex-col items-center justify-center cursor-pointer"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`flex items-center justify-center w-12 h-12 transition-colors duration-300 
                           ${isActive ? "text-red-500" : "text-white"}`}
              >
                {item.icon}
              </motion.div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default Footer;
