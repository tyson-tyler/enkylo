"use client";

import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image
          src={"/loading.gif"}
          width={500}
          height={500}
          alt="hello"
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[160px] lg:h-[160px]"
        />
      </div>
    );
  return null; // 👈 no need to render "page" here because you always redirect
};

export default Page;
