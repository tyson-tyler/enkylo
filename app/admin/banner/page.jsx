"use client";
import { Loader, Upload, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreateBanner } from "@/store/CreateBanner";
import toast from "react-hot-toast";
import { generateDescripition } from "@/store/gemini";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [infoUrl, setInfoUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videofile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);

  // ✨ Generate description with Gemini
  const handelGenerateDesc = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title first");
      return;
    }
    setLoadingDesc(true);
    const aiDesc = await generateDescripition(title);
    setDesc(aiDesc);
    setLoadingDesc(false);
  };

  // 📤 Upload video to Cloudinary
  const handlerUpload = async () => {
    if (!videofile) {
      toast.error("Video required!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", videofile);
    formData.append("upload_preset", "dfgsasdfasd");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnia0cr41/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setVideoUrl(data.secure_url);
        return data.secure_url;
      }
      toast.error("Upload failed");
      return null;
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
      return null;
    }
  };

  // 📥 Save Banner
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const uploadedUrl = await handlerUpload();
      if (!uploadedUrl) {
        setLoading(false);
        return;
      }

      const res = await CreateBanner(title, desc, url, infoUrl, uploadedUrl);
      toast.success("Banner created!");
      console.log("✅ Banner Created:", res);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6 bg-white/5 rounded-2xl shadow-xl backdrop-blur-lg">
      <h1 className="text-2xl font-bold text-white">✨ Create Banner</h1>

      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Title"
      />

      {/* Description with AI Button */}
      <div className="flex flex-col gap-3">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Description"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handelGenerateDesc}
          disabled={loadingDesc}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
        >
          {loadingDesc ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Description
            </>
          )}
        </motion.button>
      </div>

      {/* URLs */}
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="text"
        className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Redirect URL"
      />
      <input
        value={infoUrl}
        onChange={(e) => setInfoUrl(e.target.value)}
        type="text"
        className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Info URL"
      />

      {/* Video Upload */}
      <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-500 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition">
        <Upload className="w-8 h-8 text-gray-300 mb-2" />
        <span className="text-gray-300 text-sm">
          {videofile ? videofile.name : "Click to upload video"}
        </span>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />
      </label>

      {/* Video Preview */}
      {videoUrl && (
        <motion.video
          key={videoUrl}
          src={videoUrl}
          controls
          autoPlay
          loop
          className="w-full rounded-xl border border-gray-600 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full p-4 cursor-pointer flex justify-center items-center rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Loader className="w-5 h-5 animate-spin" /> : "🚀 Create"}
      </motion.button>
    </div>
  );
};

export default Page;
