"use client";
import React, { useState, useEffect } from "react";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { getRandomBanner } from "@/store/getRandomBanner";
import Image from "next/image";

const MainHeader = () => {
  const [muted, setMuted] = useState(true);

  const [videoPrev, setVideoPrev] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleVideo = async () => {
      setLoading(true);
      const videores = await getRandomBanner();
      setVideoPrev(videores);
      console.log(videores);
      setLoading(false);
    };
    handleVideo();
  }, []);

  // Prevent rendering before random index is set
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image
          src={"/loading.gif"}
          width={50}
          height={50}
          className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px]"
          alt="hello"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        src={videoPrev?.videoUrl}
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
          {videoPrev?.title}
        </h1>

        <p className="mt-3 sm:mt-4 text-gray-200 text-sm sm:text-lg lg:text-xl max-w-2xl leading-relaxed drop-shadow-lg">
          {videoPrev?.desc}
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
