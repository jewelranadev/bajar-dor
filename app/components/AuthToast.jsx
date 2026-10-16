"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthToast() {
  const params = useSearchParams();
  const reason = params.get("reason");

  useEffect(() => {
    if (reason === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: "protected" });
    }
  }, [reason]);

  return null;
}