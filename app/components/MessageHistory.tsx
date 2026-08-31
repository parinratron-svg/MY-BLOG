'use client';

import { useEffect, useState } from 'react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function MessageHistory() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function loadMessages() {
    setLoading(true);
    try {
      const res = await fetch('/api/messages/mine');
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch {
      setError('โหลดข้อมูลไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  function startEdit(msg: Message) {
    setEditingId(msg.id);
    setEditText(msg.message);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText('');
  }

  async function saveEdit(id: string) {
    setError(null);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editText }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'แก้ไขไม่สำเร็จ');
        return;
      }

      setEditingId(null);
      await loadMessages();
    } catch {
      setError('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    }
  }

  if (loading) return <p className="text-gray-500">กำลังโหลด...</p>;

  if (messages.length === 0) {
    return <p className="text-gray-500">คุณยังไม่เคยส่งข้อความ</p>;
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {messages.map((msg) => (
        <div key={msg.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500 mb-1">
            {msg.name} · {msg.email} · {new Date(msg.createdAt).toLocaleString('th-TH')}
          </p>

          {editingId === msg.id ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(msg.id)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  บันทึก
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-2">{msg.message}</p>
              <button
                onClick={() => startEdit(msg)}
                className="text-sm text-blue-600 hover:underline"
              >
                แก้ไข
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}