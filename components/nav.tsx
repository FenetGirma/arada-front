"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import {
  IoAddOutline,
  IoFlag,
  IoGameController,
  IoPersonCircle,
} from "react-icons/io5";
import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import { getUserFromToken } from "@/lib/utils/getUserFromToken";

export default function Nav() {
  const [userName, setUserName] = useState("User name");

  useEffect(() => {
    const decoded = getUserFromToken();
    if (decoded?.username) {
      setUserName(decoded.username);
    }
  }, []);
  return (
    <header className="w-full py-6 px-8 lg:px-16 flex items-center justify-between relative z-20">
      <div className="flex items-center space-x-12">
        {/* Logo */}
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-baseline">
            <span className="font-serif text-3xl font-bold text-primary -mr-2">
              A
            </span>
            <span className="font-serif text-2xl font-bold text-primary">
              rada
            </span>
          </div>
          <div className="flex items-baseline -mt-2">
            <span className="font-serif text-3xl font-bold text-primary -mr-2">
              C
            </span>
            <span className="font-serif text-2xl font-bold text-primary">
              hallenges
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <Link
            href="/challenges"
            className="flex p-2 space-x-2 items-center rounded-md bg-emerald-50 hover:bg-emerald-100 transition"
          >
            <IoGameController className="w-8 h-8 text-primary" />
            <p className="font-poppins">Challenges</p>
          </Link>

          <Link
            href="/leaderboard"
            className="flex p-2 space-x-2 items-center rounded-md bg-emerald-50 hover:bg-emerald-100 transition"
          >
            <FaTrophy className="w-8 h-8 text-primary" />
            <p className="font-poppins">Leaderboard</p>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Link
              className="rounded-full flex p-4 bg-gray-50"
              href={"/profile"}
            >
              <IoPersonCircle className="w-8 h-8 text-gray-600" />
            </Link>
            <p>{userName}</p>
          </div>

          <div className="rounded-full p-2 border-2 border-green-200 bg-gray-50">
            <Moon />
          </div>

          <Button className="bg-primary text-white hover:bg-primary-dark transition-colors">
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
