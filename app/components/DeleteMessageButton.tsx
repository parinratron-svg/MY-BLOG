'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteMessageButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation(); // กันไม่ให้ไป toggle <details> เปิด/ปิด

    const confirmed = confirm('ยืนยันลบข้อความนี้? ลบแล้วกู้คืนไม่ได้');
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? 'ลบไม่สำเร็จ');
        return;
      }
      router.refresh();
    } catch {
      alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="ml-auto inline-flex items-center rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-200 disabled:opacity-50"
    >
      {loading ? 'กำลังลบ...' : 'ลบ'}
    </button>
  );
}