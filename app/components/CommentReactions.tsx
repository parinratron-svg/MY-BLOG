'use client';
import { useState } from 'react';

const EMOJIS = ['👍', '❤️'];

export default function CommentReactions({ commentId }: { commentId: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  async function handleReact(emoji: string) {
    const res = await fetch(`/api/comments/${commentId}/reactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji }),
    });
    if (res.ok) {
      setCounts((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    }
  }

  return (
    <div className="flex gap-2 mt-1">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleReact(emoji)}
          className="text-sm border rounded px-2 py-1 hover:bg-gray-100"
        >
          {emoji} {counts[emoji] || 0}
        </button>
      ))}
    </div>
  );
}