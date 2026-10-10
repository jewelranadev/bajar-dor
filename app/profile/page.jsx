"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, UserRound } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");
  const [newName, setNewName] = useState("Rezwan Ahmed");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      return;
    }

    setName(newName.trim());
  };

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f0f5f0] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        {/* Profile Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#1f2922]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Information */}
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              <Image
                src="/profile.png"
                alt="Profile"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-[#1f2922]">
                {name}
              </h2>

              <p className="break-all text-sm text-gray-500">
                rezwanahmed@gmail.com
              </p>
            </div>
          </div>

          <Link
            href="/signin"
            className="inline-flex shrink-0 items-center justify-center gap-1 self-start rounded-lg border border-red-400 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-center"
          >
            <ArrowLeft size={15} />
            সাইন আউট
          </Link>
        </div>

        {/* Update Information */}
        <div className="mt-4 rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:p-5">
          <div className="mb-6 flex items-center gap-2">
            <UserRound size={18} className="text-[#1f2922]" />

            <h2 className="font-semibold text-[#1f2922]">
              তথ্য
            </h2>
          </div>

          <form onSubmit={handleUpdate}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-gray-600"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm text-[#1f2922] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}