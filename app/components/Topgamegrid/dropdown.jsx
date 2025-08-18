"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { account } from "@/appwrite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/store/getUser";
import { Loader } from "lucide-react";

export default function UserDropdown() {
  const router = useRouter();
  const [user1, setUser1] = useState();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // 👈 Logout Appwrite
      toast.success("Logged out!");
      // redirect to login
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Try again.");
    }
  };
  const { user, loading } = useAuth();
  console.log("res status", user1);
  useEffect(() => {
    if (!user) return;
    if (loading) {
      return <Loader className="w-5 h-5 animate-spin" />;
    }
    const handleProfile = async () => {
      const res = await getUserProfile(user.$id);
      console.log("user adsfadsfads", res);
      setUser1(res);
    };

    handleProfile();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Image
            src={"/av.jpg"}
            alt="Avatar"
            width={35}
            height={35}
            className="rounded-full w-[35px] h-[35px] object-cover cursor-pointer"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
