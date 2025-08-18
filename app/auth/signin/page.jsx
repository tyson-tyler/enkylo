"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader } from "lucide-react"; // ✅ Icons
import Link from "next/link";
import { LoginUser } from "@/store/LoginUser";
import toast from "react-hot-toast";
import { account } from "@/appwrite";
import { LoginWithGoogle } from "@/store/LoginWithGoogle";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogle = async () => {
    await LoginWithGoogle();
  };
  const handleLogin = async () => {
    setLoading(true);
    const res = await LoginUser(email, password);

    if (!res.success) {
      toast.error(res.message);
    } else {
      try {
        const user = await account.get(); // 👈 fetch user info
        if (!user.emailVerification) {
          toast.error("Please verify your email before logging in.");
          await account.deleteSession("current"); // 👈 logout
        } else {
          toast.success(" Login successful!");
          console.log("Logged in:", res.session);

          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Something went wrong. Try again.");
      }
    }

    setLoading(false);
  };

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
          <motion.div
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative flex items-center"
            >
              <Lock className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className="w-full p-4 cursor-pointer flex justify-center items-center rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              onClick={() => handleLogin()}
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Login"}
            </motion.button>
          </motion.div>

          {/* <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

     
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer justify-center gap-3 w-full p-4 rounded-lg bg-white text-gray-700 font-medium shadow-md hover:bg-gray-100 transition"
            onClick={handleGoogle}
          >
            <Image
              src="/google.svg" 
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </motion.button> */}

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
