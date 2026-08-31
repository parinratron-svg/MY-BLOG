'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4">
      {/* กรอบใหญ่ ขอบขาวมน เงานุ่มๆ */}
      <div className="relative w-full max-w-4xl aspect-video rounded-3xl border-8 border-white shadow-2xl overflow-hidden bg-black">
        {/* วิดีโอพื้นหลังในกรอบ */}
        <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/video/signup.mp4" type="video/mp4" />
</video>

        {/* ไล่เฉดมืดด้านล่าง ให้ฟอร์มอ่านง่ายขึ้น */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* ฟอร์มลอยตรงกลาง-ล่างของกรอบ */}
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 w-[88%] max-w-sm">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <h1 className="text-xl font-bold mb-4">สมัครสมาชิก</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />

              <input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />

              <input
                type="password"
                placeholder="รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />

              <input
                type="password"
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />

              {error && (
                <p className="text-red-600 text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 rounded-lg font-medium transition text-sm"
              >
                {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}