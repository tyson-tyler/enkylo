"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "./Button";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const leftImagesRef = useRef(null);
  const rightImagesRef = useRef(null);

  useEffect(() => {
    const animateSide = (element, direction) => {
      if (!element) return;
      gsap.fromTo(
        element.children,
        { y: -50 * direction, rotate: -2 * direction, scale: 0.95 },
        {
          y: 50 * direction,
          rotate: 2 * direction,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    };

    animateSide(leftImagesRef.current, 1); // moves down
    animateSide(rightImagesRef.current, -1); // moves up
  }, []);

  const imageBoxClasses =
    "relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500";

  return (
    <section className="flex justify-center items-center bg-hello text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left images */}
        <div
          ref={leftImagesRef}
          className="flex flex-col gap-6 w-full sm:w-1/3 items-center"
        >
          {["/images/1.jpg", "/images/4.jpg"].map((src, i) => (
            <div key={i} className={imageBoxClasses}>
              <Image
                src={src}
                alt={`Game ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Center CTA content */}
        <div className="text-center lg:max-w-xl flex flex-col items-center">
          <p className="text-sm uppercase tracking-wide opacity-80">Enkylo</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mt-2 leading-tight">
            Found Popular Game
          </h1>
          <p className="mt-4 text-base opacity-80 max-w-md">
            Discover trending games loved by millions. Join the adventure and
            start playing now!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button leftIcon={<Play />} title={"Get Now"} />
          </div>
        </div>

        {/* Right images */}
        <div
          ref={rightImagesRef}
          className="flex flex-col gap-6 w-full sm:w-1/3 items-center"
        >
          {["/images/bad.jpg", "/images/3.jpg"].map((src, i) => (
            <div key={i} className={imageBoxClasses}>
              <Image
                src={src}
                alt={`Game ${i + 3}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
