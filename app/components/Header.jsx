"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const Header = () => {
  const [date, setDate] = useState("");

  const { data: session, isPending } = useSession();

  const user = session?.user
    ? {
        name: session.user.name || "ব্যবহারকারী",
        image: session.user.image || "/profile.png",
      }
    : null;

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/signin";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className="relative z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">

        {/* Left: Logo + Date */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={48}
            height={48}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-green-800 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
              {date || "আজকের বাজারদর"}
            </p>
          </div>
        </Link>

        {/* Right: Authentication */}
        <div className="flex shrink-0 items-center gap-2">
          {isPending ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                aria-label="আমার প্রোফাইল"
                className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 transition hover:bg-green-50 sm:px-3"
              >
                <Image
                  src={user.image}
                  alt={user.name}
                  width={34}
                  height={34}
                  className="h-8 w-8 rounded-full object-cover"
                  unoptimized
                />

                <span className="hidden max-w-28 truncate text-sm font-semibold text-gray-700 sm:block">
                  {user.name}
                </span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <LogOut size={16} />
                লগ আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="flex items-center gap-1.5 rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-800 transition hover:bg-green-50 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <LogIn size={16} />
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-1.5 rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <UserPlus size={16} />
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;