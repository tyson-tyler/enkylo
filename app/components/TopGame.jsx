import React from "react";
import { Anton } from "next/font/google";
import TopgameGrid from "./Topgamegrid/topgamegrid";
import { cardsData } from "../../card";
import FlipCard from "./Topgamegrid/HoverCard";

// Import the Anton font
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const TopGame = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#dcdcf0] px-5 py-12">
      {/* Small tagline */}
      <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-gray-700 font-semibold mb-4">
        Welcome to Enkylo
      </p>

      {/* Main heading */}
      <h1
        className={`${anton.className} text-black uppercase text-center leading-[0.9]`}
      >
        <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.025em]">
          Explore
        </span>
        <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.025em]">
          AAA Games
        </span>
      </h1>

      {/* Optional underline effect */}
      <div className="w-24 h-1 bg-black mt-6 mb-10 rounded-full" />

      {/* Game grid */}
      <TopgameGrid />
    </div>
  );
};

export default TopGame;
