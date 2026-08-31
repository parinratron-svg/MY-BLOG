// app/layout.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: { template: '%s | My Blog', default: 'My Blog' },
 description: 'บล็อกส่วนตัว สร้างด้วย Next.js + TypeScript',
};

export default async function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const cookieStore = await cookies();
 const session = cookieStore.get('session');
 const isLoggedIn = Boolean(session);

 return (
 <html lang="th">
 <body className="bg-gray-50 min-h-screen">
 <nav className="bg-gradient-to-r from-blue-950 via-blue-900 to-sky-900 text-white px-2 py-3 shadow-lg sm:px-3">
 <div className="mx-auto flex w-full max-w-none flex-wrap items-center gap-2 px-2">
 <div className="flex shrink-0 items-center gap-3">
 <Link href="/" className="flex items-center gap-3 text-white hover:text-blue-200">
 <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/40 bg-white/10 shadow-md">
 <Image src="/img/pun.png" alt="My Blog Logo" fill className="object-cover" />
 </div>
 <div>
 <p className="text-xl font-bold leading-none">My Blog</p>
 <p className="text-xs text-blue-100/90">Web App Design & Development</p>
 </div>
 </Link>
 </div>

 <div className="flex flex-1 flex-wrap items-center justify-start gap-2 pl-4">
 <Link href="/posts" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20">บทความ</Link>
 <Link href="/courses" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20">รายวิชา</Link>
 <Link href="/users" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20">ผู้ใช้</Link>
 <Link href="/about" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20">เกี่ยวกับ</Link>
 <Link href="/blog-spa" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20">สินค้า</Link>
 <Link href="/contact" className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400">ติดต่อ</Link>
 <Link href="/dashboard" className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-400">Dashboard</Link>
 <Link href="/contact/history" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20">ประวัติข้อความ</Link>
 </div>

<div className="ml-auto flex items-center justify-end gap-2">
 {isLoggedIn ? (
  <>
    
    <Link href="/logout" className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-rose-400">
      <span className="text-base">🚪</span>
      <span>ล็อกเอ้า</span>
    </Link>
  </>
) : (
   <>
     <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-md ring-1 ring-slate-300 transition hover:bg-slate-50">
       <span className="text-base">📝</span>
       <span>สมัครสมาชิก</span>
     </Link>
     <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-900 shadow-md transition hover:bg-emerald-300">
       <span className="text-base">🔐</span>
       <span>ล็อกอิน</span>
     </Link>
   </>
 )}
</div>
 </div>
 </nav>
 <div className="mx-auto max-w-4xl px-4 py-8">
 {children}
 </div>
 <footer className="mt-8 border-t py-6 text-center text-sm text-gray-400">
 <p>© 2026 My Blog — สร้างด้วย Next.js + TypeScript</p>
 <p className="mt-1">0214321 Web App Design & Development</p>
 </footer>
 </body>
 </html>
 );
 }