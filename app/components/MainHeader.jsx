"use client";
import React, { useState, useEffect } from "react";
import { Play, Info, Volume2, VolumeX } from "lucide-react";

const games = [
  {
    video:
      "https://res.cloudinary.com/dnia0cr41/video/upload/v1755132485/Untitled_video_-_Made_with_Clipchamp_n5ohrx.mp4",
    title: "Tekken 7",
    description:
      "An intense 3D fighting game where martial arts legends clash in a global tournament. Master combos, learn each fighter’s story, and rise to the top as the ultimate champion.",
  },
  {
    video:
      "https://res.cloudinary.com/dnia0cr41/video/upload/v1755141701/Y2mate.Now_Street_Fighter_6_-_Meeting_Chun-Li_Scene_1080P_ndigui.mp4",
    title: "Street Fighter",
    description:
      "The iconic arcade brawler returns with new fighters, improved mechanics, and cinematic battles. Unleash powerful special moves and prove your skill in every showdown.",
  },
  {
    video:
      "https://res.cloudinary.com/dnia0cr41/video/upload/v1755140499/Untitled_video_-_Made_with_Clipchamp_1_1_btcytj.mp4",
    title: "Spider-Man 2",
    description:
      "Swing through New York City as Peter Parker and Miles Morales in a thrilling superhero adventure. Battle iconic villains and protect the city in an epic, action-packed story.",
  },
  {
    video:
      "https://res.cloudinary.com/dnia0cr41/video/upload/v1755135187/freecompress-2_gxfxt2.mp4",
    title: "GTA 5",
    description:
      "Experience the sprawling city of Los Santos in an open-world adventure filled with crime, chaos, and opportunity. Switch between three unique protagonists, plan daring heists, and explore a living, breathing world at your own pace.",
  },
];

const MainHeader = () => {
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * games.length);
    setCurrent(randomIndex);
  }, []);

  // Prevent rendering before random index is set
  if (current === null) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        src={games[current].video}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-24 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto lg:mx-0 lg:items-start items-center text-center lg:text-left">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-wider text-white px-4 py-2 rounded-md">
          {games[current].title}
        </h1>

        <p className="mt-3 sm:mt-4 text-gray-200 text-sm sm:text-lg lg:text-xl max-w-2xl leading-relaxed drop-shadow-lg">
          {games[current].description}
        </p>

        <div className="mt-5 sm:mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
          <button className="flex items-center gap-2 bg-white py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-9 text-black font-semibold rounded-md hover:bg-gray-300 transition text-sm sm:text-base lg:text-lg cursor-pointer">
            <Play size={18} className="sm:w-5 sm:h-5" /> Play Now
          </button>
          <button className="flex items-center gap-2 bg-gray-600/80 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-9 rounded-md hover:bg-gray-500 transition text-sm sm:text-base lg:text-lg cursor-pointer">
            <Info size={18} className="sm:w-5 sm:h-5" /> More Info
          </button>
        </div>
      </div>

      {/* Volume Toggle */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/70 transition cursor-pointer"
      >
        {muted ? (
          <VolumeX size={20} className="sm:w-6 sm:h-6" />
        ) : (
          <Volume2 size={20} className="sm:w-6 sm:h-6" />
        )}
      </button>
    </div>
  );
};

export default MainHeader;
