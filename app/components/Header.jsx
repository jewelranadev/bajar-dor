"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, UserRound, LogIn, UserPlus, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");

 
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


  const { data: session, isPending } = useSession();
  const user = session?.user
    ? {
        name: session.user.name || "ব্যবহারকারী",
        image: session.user.image || "/profile.png",
      }
    : null;

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    window.location.href = "/signin";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
          />
          {/* date and title */}
          <div>
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
              বাজার দর
            </h1>
            <p className="min-h-[1rem] text-xs text-gray-500 lg:block">
              {date}
            </p>
          </div>
        </Link>

        {/* profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Profile menu"
            className="flex items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-gray-100 sm:px-3"
          >
            {user ? (
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
                unoptimized
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <UserRound size={18} className="text-gray-500" />
              </span>
            )}

            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              {isPending ? "..." : user ? user.name : "অ্যাকাউন্ট"}
            </span>

            <ChevronDown
              size={15}
              className={`text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <>
              {/* outside click */}
              <button
                aria-label="Close menu"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                {user ? (
                  <>
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        আপনার অ্যাকাউন্ট
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <UserRound size={17} />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      লগ আউট
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <LogIn size={17} />
                      সাইন ইন
                    </Link>

                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <UserPlus size={17} />
                      সাইন আপ
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;