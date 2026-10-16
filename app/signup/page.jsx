"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const busy = loading || socialLoading !== "";

  const showError = (message) => {
    setError(message);
    toast.error(message);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        showError(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.push("/signin");
    } catch {
      showError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider, label) => {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        showError(result.error.message || `${label} দিয়ে সাইন আপ করা যায়নি।`);
        setSocialLoading("");
      }
    } catch {
      showError(`${label} দিয়ে সাইন আপ করা যায়নি। আবার চেষ্টা করুন।`);
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-8">
      <form
        onSubmit={handleSignup}
        className="card w-full max-w-md bg-base-100 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>

        <p className="mb-6 text-center text-base-content/60">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </p>

        <label htmlFor="name" className="mb-1 font-medium">
          Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="আপনার নাম"
          className="input input-bordered mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />

        <label htmlFor="email" className="mb-1 font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="আপনার ইমেইল"
          className="input input-bordered mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password" className="mb-1 font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          className="input input-bordered mb-6 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        {error && (
          <p
            className="mb-4 rounded-lg bg-error/10 p-3 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={busy}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="divider">অথবা</div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => handleSocialSignup("google", "Google")}
            disabled={busy}
          >
            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Google দিয়ে Sign Up"}
          </button>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => handleSocialSignup("github", "GitHub")}
            disabled={busy}
          >
            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "GitHub দিয়ে Sign Up"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="link link-primary font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
}