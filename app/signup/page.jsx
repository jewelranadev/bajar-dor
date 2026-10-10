"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      console.log("Signup result:", result);

      if (result.error) {
        console.error("Signup error:", result.error);
        setError(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      console.log("Signup successful:", result.data);

      router.push("/profile");
      router.refresh();
      router.push("/profile");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSignup}
        className="card w-full max-w-md bg-base-100 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>

        <p className="mb-6 text-center text-base-content/60">
          নতুন অ্যাকাউন্ট তৈরি করো
        </p>

        <label className="mb-1 font-medium">Name</label>
        <input
          type="text"
          placeholder="তোমার নাম"
          className="input input-bordered mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="mb-1 font-medium">Email</label>
        <input
          type="email"
          placeholder="তোমার ইমেইল"
          className="input input-bordered mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mb-1 font-medium">Password</label>
        <input
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          className="input input-bordered mb-6 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        {error && <p className="mb-4 text-sm text-error">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
