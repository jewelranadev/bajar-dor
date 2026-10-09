"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, UserRound, LogIn, UserPlus, LogOut } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

//   user
  const user = {
    name: "Rezwan",
    image: "/profile.png",
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
            <p className="text-xs text-gray-500 lg:block"> 
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
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />

            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              {user.name}
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

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  লগ আউট
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;