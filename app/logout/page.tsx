"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
      router.refresh();
      window.location.assign("/login");
      return;
    }

    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border-8 border-white shadow-2xl ring-1 ring-black/10">
        <div className="relative flex min-h-[600px] items-center justify-center overflow-hidden px-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          >
            <source src="/video/logout.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 mx-auto w-full max-w-md rounded-2xl border border-white/40 bg-white/90 p-6 shadow-2xl backdrop-blur-md ring-1 ring-black/5">
            <h1 className="mb-3 text-2xl font-bold text-slate-900">
              ออกจากระบบ
            </h1>
            <p className="mb-6 text-sm text-slate-600">
              คุณต้องการล็อกเอ้าหรือไม่? หากยืนยัน ระบบจะลบคุกกี้ session
              แล้วกลับไปยังหน้าเข้าสู่ระบบ
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="rounded bg-slate-200 px-4 py-2 font-semibold text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isSubmitting}
                className="rounded bg-red-600 px-4 py-2 font-semibold text-white"
              >
                {isSubmitting ? "กำลังออกจากระบบ..." : "ล็อกเอ้า"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
