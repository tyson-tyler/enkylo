"use client";
import React, { useState } from "react";
import { FaHome, FaFire, FaStar, FaList, FaDonate, FaQuestion } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true); // sidebar open/close state for mobile

  const navItems = [
    { id: 1, title: "Banner", icon: <FaHome />, url: "/admin/banner" },
    { id: 2, title: "Trending", icon: <FaFire />, url: "/dashboard/trending" },
    { id: 3, title: "Popular", icon: <FaStar />, url: "/dashboard/popular" },
    { id: 4, title: "My List", icon: <FaList />, url: "/dashboard/list" },
    { id: 5, title: "Donate", icon: <FaDonate />, url: "/dashboard/donate" },
    { id: 6, title: "FAQ", icon: <FaQuestion />, url: "/dashboard/faq" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden flex items-center p-2 bg-gray-800 text-white">
        <button onClick={() => setOpen(!open)} className="px-2 py-1 border rounded">
          {open ? "Close" : "Menu"}
        </button>
        <h1 className="ml-4 font-bold text-lg">Menu</h1>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-50
          ${open ? "w-64" : "w-0"} md:w-64 overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <h1 className="text-xl font-bold">Sidebar</h1>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <a
                  key={item.id}
                  href={item.url}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors
                    ${isActive ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </a>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">© 2025 Enkylo</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
