"use client";

import { Suspense, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthToast from "@/app/components/AuthToast";

export default function SigninPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const busy = loading || socialLoading !== "";

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [session, isPending, router]);

  const showError = (message) => {
    setError(message);
    toast.error(message);
  };

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
        showError(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      showError("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignin = async (provider, label) => {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        showError(result.error.message || `${label} দিয়ে সাইন ইন করা যায়নি।`);
        setSocialLoading("");
      }
    } catch {
      showError(`${label} দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।`);
      setSocialLoading("");
    }
  };

  if (isPending || session) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <Suspense fallback={null}>
        <AuthToast />
      </Suspense>

      <form
        onSubmit={handleSignin}
        className="card w-full max-w-md bg-base-100 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-3xl font-bold">Sign In</h1>

        <p className="mb-6 text-center text-base-content/60">
          আপনার অ্যাকাউন্টে প্রবেশ করুন
        </p>

        <label htmlFor="email" className="mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="input input-bordered mb-4 w-full"
          placeholder="আপনার ইমেইল"
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
          className="input input-bordered mb-4 w-full"
          placeholder="আপনার পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="mb-4 text-sm text-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={busy}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="divider">অথবা</div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => handleSocialSignin("google", "Google")}
            disabled={busy}
          >
            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Google দিয়ে Sign In"}
          </button>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => handleSocialSignin("github", "GitHub")}
            disabled={busy}
          >
            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "GitHub দিয়ে Sign In"}
          </button>
        </div>

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