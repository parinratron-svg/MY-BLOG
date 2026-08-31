'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('general'); // ← เพิ่มใหม่
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const isValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    message.trim().length >= 5;

  function validate() {
    if (name.trim().length < 2) return 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    if (!email.includes('@')) return 'อีเมลไม่ถูกต้อง';
    if (message.trim().length < 5) return 'ข้อความสั้นเกินไป';
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, tag }), // ← เพิ่ม tag เข้าไปใน body
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTag('general'); // ← reset tag กลับค่าเริ่มต้น
      router.refresh();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อ" className="border p-2 w-full rounded" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="อีเมล" className="border p-2 w-full rounded" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="ข้อความ" className="border p-2 w-full rounded" />

      {/* ← เพิ่มใหม่: dropdown เลือก tag */}
      <select value={tag} onChange={(e) => setTag(e.target.value)} className="border p-2 w-full rounded">
        <option value="general">ทั่วไป</option>
        <option value="question">คำถาม</option>
        <option value="feedback">ข้อเสนอแนะ</option>
        <option value="bug">แจ้งปัญหา</option>
      </select>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {status === 'sending' && <p className="text-blue-600 text-sm">กำลังส่ง...</p>}
      {status === 'success' && <p className="text-green-600 text-sm">ส่งข้อความสำเร็จ</p>}
      {status === 'error' && <p className="text-red-600 text-sm">ส่งไม่สำเร็จ กรุณาลองใหม่</p>}

      <button
        type="submit"
        disabled={!isValid}
        className={isValid ? 'bg-blue-600 text-white px-4 py-2 rounded' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded'}
      >
        ส่งข้อความ
      </button>
    </form>
  );
}