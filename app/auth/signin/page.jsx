"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react"; // ✅ Icons
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-row-reverse h-screen">
      {/* Left side with full video (lg and above only) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 h-full"
      >
        <video
          src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755323870/Untitled_Video_-_Made_With_Clipchamp_9_szl4v9.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>

      {/* Right side (form + background video only on sm/md) */}
      <div className="relative flex w-full lg:w-1/2 h-full items-center justify-center">
        {/* Background Video (hidden on lg and above) */}
        <video
          src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755323870/Untitled_Video_-_Made_With_Clipchamp_9_szl4v9.mp4"
          className="absolute inset-0 w-full h-full object-cover lg:hidden"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay (only when video is visible) */}
        <div className="absolute inset-0 bg-black/50 lg:hidden" />

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col z-10 w-full max-w-2xl backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full justify-center items-center flex mb-4"
          >
            <Image
              src="/logo.svg"
              width={150}
              height={150}
              alt="hello"
              className="w-[50px] h-[50px] md:w-[50px] md:h-[50px] lg:w-[100px] lg:h-[100px] "
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 gap-2 flex flex-col"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-white ">
              Back to Enkylo
            </h2>
            <span className="text-sm text-center text-gray-400">
              Enjoy the world of free Games 🎮
            </span>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            {/* Username */}

            {/* Email */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative flex items-center"
            >
              <Mail className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                className="w-full p-4 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Email"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative flex items-center"
            >
              <Lock className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                className="w-full p-4 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
              />
            </motion.div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full p-4 cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
            >
              Register
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Google Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer justify-center gap-3 w-full p-4 rounded-lg bg-white text-gray-700 font-medium shadow-md hover:bg-gray-100 transition"
          >
            <Image
              src="/google.svg" // 👉 Place a Google SVG in your /public folder
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-300 mt-4 text-center"
          >
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-red-400">
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
