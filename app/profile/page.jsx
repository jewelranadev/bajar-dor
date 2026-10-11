"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, UserRound } from "lucide-react";
import {
  useSession,
  signOut,
  authClient,
} from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  const [newName, setNewName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setNewName(user.name);
    }
  }, [user?.name]);

 
  const resizeImage = (file, size = 256) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new window.Image(); 
        img.onerror = reject;
        img.onload = () => {
          const min = Math.min(img.width, img.height);
          const sx = (img.width - min) / 2;
          const sy = (img.height - min) / 2;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          canvas
            .getContext("2d")
            .drawImage(img, sx, sy, min, min, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("শুধু ছবি (JPG, PNG ইত্যাদি) আপলোড করুন।");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("ছবির সাইজ ৫ MB এর বেশি হতে পারবে না।");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const image = await resizeImage(file);
      const { error } = await authClient.updateUser({ image });

      if (error) {
        setMessage(error.message || "ছবি আপডেট করা যায়নি।");
        return;
      }
      setMessage("প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে।");
    } catch {
      setMessage("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setUploading(false);
      e.target.value = ""; 
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = newName.trim();

    if (!name || !user) return;

    setUpdating(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        setMessage(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      setMessage("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-[#f0f5f0]">
        <p className="text-sm text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-[#f0f5f0] px-4">
        <h1 className="text-xl font-bold text-[#1f2922]">
          লগইন করা প্রয়োজন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>

        <Link
          href="/signin"
          className="mt-5 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          সাইন ইন
        </Link>
      </main>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/signin";
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
            {/* Profile picture + change button */}
            <div className="relative shrink-0">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <UserRound size={28} className="text-gray-500" />
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                aria-label="প্রোফাইল ছবি পরিবর্তন"
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-700 text-white shadow transition hover:bg-green-800 disabled:opacity-60"
              >
                <Camera size={13} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-[#1f2922]">
                {user.name || "নাম দেওয়া হয়নি"}
              </h2>

              <p className="break-all text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex shrink-0 items-center justify-center gap-1 self-start rounded-lg border border-red-400 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-center"
          >
            <ArrowLeft size={15} />
            সাইন আউট
          </button>
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

            {message && (
              <p className="mt-3 text-sm text-gray-600" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={updating}
              className="mt-3 w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
