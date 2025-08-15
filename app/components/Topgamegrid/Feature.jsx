"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, BugOff, Download } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-16 h-16 text-red-500" />,
    title: "No Viruses",
    description:
      "Your downloads are completely safe and protected from harmful viruses.",
  },
  {
    icon: <BugOff className="w-16 h-16 text-red-500" />,
    title: "No Malware",
    description:
      "We scan every file to ensure it’s 100% free from malware or spyware.",
  },
  {
    icon: <Download className="w-16 h-16 text-red-500" />,
    title: "Safe Downloads",
    description:
      "Enjoy secure and reliable downloads with peace of mind every time.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SafeFeatures() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center py-10  px-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 text-gray-900 text-center lg:text-left"
          >
            Your Safety, Our Priority
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-10 max-w-3xl mx-auto lg:mx-0 text-lg text-center lg:text-left"
          >
            We make sure every download is 100% safe, virus-free, and free from
            any harmful software.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="p-5 rounded-xl border border-gray-200 cursor-pointer"
              >
                <div className="flex justify-center lg:justify-start mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800 text-center lg:text-left">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base text-center lg:text-left">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden lg:block relative"
        >
          <Image
            src="/images/81.png"
            alt="Safe Downloads"
            width={500}
            height={500}
            className="rounded-xl "
          />
        </motion.div>
      </div>
    </section>
  );
}
