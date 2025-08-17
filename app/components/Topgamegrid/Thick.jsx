"use client";

import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const games = [
  { id: 1, img: "/images/1.jpg", title: "BattleField 6" },
  { id: 2, img: "/images/7.jpg", title: "Skyrim" },
  { id: 3, img: "/images/8.avif", title: "The Witcher 3" },
  { id: 4, img: "/images/4.jpg", title: "Delta Force" },
];

export default function GameGrid() {
  return (
    <div className="container mx-auto px-4 mt-12">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Main CTA Button */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="relative px-10 py-4 bg-gradient-to-r  bg-black text-white font-bold text-lg rounded-full shadow-2xl hover:bg-gray-800 cursor-pointer transition-all duration-300 flex items-center gap-3"
        >
          <span>Explore More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

function GameCard({ game }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        } else {
          setIsVisible(false);
          controls.start("hidden");
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full pb-[140%] cursor-pointer"
      animate={controls}
      initial="hidden"
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg ">
        <Image src={game.img} alt={game.title} fill className="object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
      </div>

      {/* Title + Play Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
          >
            <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-lg">
              {game.title}
            </h3>
            <motion.button className="w-[50px] h-[50px] pb-1 flex items-center justify-center cursor-pointer rounded-full bg-red-500 shadow-xl transition-colors hover:bg-red-600">
              <Play className="text-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
