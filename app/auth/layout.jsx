"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectAuthLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard"); // 👈 use replace to prevent back button going to login
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }

  return <>{children}</>; // 👈 no need for extra <div> wrapper
}
