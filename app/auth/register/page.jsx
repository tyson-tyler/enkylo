"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader, CloudUpload } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserCreate } from "@/store/userCreate";
import { account } from "@/appwrite";
import { LoginWithGoogle } from "@/store/LoginWithGoogle";

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rstate, setRstate] = useState(1);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileshow, setFileShow] = useState("");
  const fileInputRef = useRef(null);

  const handleGoogle = async () => {
    await LoginWithGoogle();
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleShow = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileShow(URL.createObjectURL(selectedFile)); // ✅ use selectedFile, not old state
    }
  };

  const handleSubmit = async () => {
    // ✅ Validations
    if (!username.trim()) {
      toast.error("Username is required!");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address!");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required!");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    setRstate(2);

    // ✅ If all good
  };

  const handlerUpload = async () => {
    if (!file) {
      toast.error("Image Required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dfgsasdfasd");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnia0cr41/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const image = await res.json();
      console.log(image.secure_url);
      setImageUrl(image.secure_url);
      return image.secure_url;
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const handleAll = async () => {
    try {
      setLoading(true);
      const uploadUrl = await handlerUpload();
      if (!uploadUrl) return;
      const user = await UserCreate(email, password, username, uploadUrl);

      if (user?.error === "User already exists") {
        toast.error("User already exists!");
        setRstate(1);
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.success("User Created !");

      const result = await account.createVerification(
        "http://localhost:3000/auth/verify"
      );
      console.log(result);
      setRstate(3);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Left Video */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 h-full"
      >
        <video
          src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755243695/2_acjds4.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>

      {/* Right Form */}
      <div className="relative flex w-full lg:w-1/2 h-full items-center justify-center">
        <video
          src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755243695/2_acjds4.mp4"
          className="absolute inset-0 w-full h-full object-cover lg:hidden"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50 lg:hidden" />

        {/* Form */}

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
              src={"/logo.svg"}
              width={100}
              height={100}
              alt="logo"
              className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] animate-pulse"
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 gap-2 flex flex-col"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-white">
              Welcome to Enkylo
            </h2>
            <span className="text-sm text-center text-gray-400">
              Enjoy the world of free Games 🎮
            </span>
          </motion.div>

          {/* Form Inputs */}
          {rstate == 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              {/* Username */}
              <div className="relative flex items-center">
                <User className="absolute left-3 text-gray-400 w-5 h-5" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="w-full p-4 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Username"
                />
              </div>

              {/* Email */}
              <div className="relative flex items-center">
                <Mail className="absolute left-3 text-gray-400 w-5 h-5" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-4 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Email"
                />
              </div>

              {/* Password */}
              <div className="relative flex items-center">
                <Lock className="absolute left-3 text-gray-400 w-5 h-5" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full p-4 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Password"
                />
              </div>

              {/* Register */}
              <motion.button
                onClick={handleSubmit}
                className="w-full p-4 cursor-pointer flex justify-center items-center rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                {loading ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  "Next"
                )}
              </motion.button>
            </motion.div>
          )}

          {rstate == 2 && (
            <div className="flex flex-col gap-4 justify-center items-center">
              <motion.div
                className="relative w-40 h-40 sm:w-48 sm:h-48  
                 rounded-full border-4 border-red-500 
                 overflow-hidden cursor-pointer flex items-center justify-center mb-4"
                onClick={() => fileInputRef.current.click()} // ✅ trigger hidden file input
              >
                <input
                  ref={fileInputRef}
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleShow}
                  className="hidden"
                />

                {fileshow ? (
                  <Image
                    src={fileshow}
                    width={550}
                    height={500}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CloudUpload className="w-7 h-7 text-gray-500 hover:text-white opacity-80" /> // ✅ centered cloud icon
                )}
              </motion.div>

              {/* Register button */}
              <motion.button
                type="submit"
                className="w-full p-4 cursor-pointer flex justify-center items-center 
                 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                onClick={handleAll}
              >
                {loading ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  "Register"
                )}
              </motion.button>
            </div>
          )}
          {rstate == 3 && (
            <div className="flex flex-col gap-4 justify-center items-center">
              {/* Circle Placeholder */}
              <motion.div>
                <Image
                  src={"/email.gif"}
                  width={400}
                  height={500}
                  alt="hello"
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px]"
                />
              </motion.div>

              {/* Email confirmation text */}
              <h2 className="text-xl font-semibold text-white">
                Check your email
              </h2>
              <p className="text-gray-600 text-center max-w-sm">
                We’ve sent a confirmation link to your email. Please verify to
                continue.
              </p>

              {/* Resend button (enabled after 5s) */}
              {/* <ResendVerification /> */}
            </div>
          )}

          {/* <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer justify-center gap-3 w-full p-4 rounded-lg bg-white text-gray-700 font-medium shadow-md hover:bg-gray-100 transition"
            onSubmit={handleGoogle}
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </motion.button> */}

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-300 mt-4 text-center"
          >
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-red-400">
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
