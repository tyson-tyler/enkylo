"use client";

import { account } from "@/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [status, setStatus] =
    (useState < "loading") | "success" | ("error" > "loading");
  const router = useRouter();

  useEffect(() => {
    // Appwrite automatically appends `userId` & `secret` in query params
    const url = new URL(window.location.href);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    if (!userId || !secret) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await account.updateVerification(userId, secret);
        setStatus("success");
        router.push("/dashboard");
      } catch (error) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };
    verify();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      {status === "loading" && (
        <>
          <Loader className="w-10 h-10 text-red-500 animate-spin mb-4" />
          <p className="text-gray-600">Verifying your email...</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <h1 className="text-xl font-semibold">
            Email Verified Successfully 🎉
          </h1>
          <p className="text-gray-600 mt-2">
            You can now log in to your account.
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <p className="text-red-500 font-semibold">Verification Failed ❌</p>
          <p className="text-gray-600 mt-2">
            The link may be expired or invalid.
          </p>
        </>
      )}
    </div>
  );
}
