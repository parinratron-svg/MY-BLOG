'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HeaderAuth() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const hasSessionCookie = () =>
    typeof document !== 'undefined' &&
    document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('session='));

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(hasSessionCookie());

    syncAuthState();
    window.addEventListener('focus', syncAuthState);

    return () => {
      window.removeEventListener('focus', syncAuthState);
    };
  }, [pathname]);
       

        
  return (
      


    <>
      {!isLoggedIn ? (
        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-md ring-1 ring-slate-300 transition hover:bg-slate-50"
          >
            <span className="text-base">📝</span>
            <span>สมัครสมาชิก</span>
          </Link>
          <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-900 shadow-md transition hover:bg-emerald-300"
        >
          <span className="text-base">🔐</span>
          <span>ล็อกอิน</span>
        </Link>
        </div>
      ) : (
        <Link
          href="/logout"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-rose-400"
        >
          <span className="text-base">🚪</span>
          <span>ล็อกเอ้า</span>
        </Link>
      )}
    </>
  );
}
