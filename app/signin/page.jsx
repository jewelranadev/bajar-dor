"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setError("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSignin}
        className="card w-full max-w-md bg-base-100 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-3xl font-bold">
          Sign In
        </h1>

        <p className="mb-6 text-center text-base-content/60">
          আপনার অ্যাকাউন্টে প্রবেশ করুন
        </p>

        <label className="mb-1 font-medium">Email</label>
        <input
          type="email"
          className="input input-bordered mb-4 w-full"
          placeholder="আপনার ইমেইল"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mb-1 font-medium">Password</label>
        <input
          type="password"
          className="input input-bordered mb-4 w-full"
          placeholder="আপনার পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="mb-4 text-sm text-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="link link-primary">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
}