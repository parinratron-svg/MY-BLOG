"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("เข้าสู่ระบบไม่สําเร็จ");
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
            <source src="/video/login.mp4" type="video/mp4" />
          </video>
      <div className="mx-auto max-w-md w-full rounded-2xl border border-white/40 bg-white/90 backdrop-blur-md p-6 shadow-2xl ring-1 ring-black/5">
      <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="อีเมล"
          className="border p-2 w-full rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
          className="border p-2 w-full rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
    </div>
  </div>
</main>
  );
}
