// app/contact/history/page.tsx
import { redirect } from 'next/navigation';
import { getSessionUserIdServer } from '@/lib/auth';
import MessageHistory from '@/app/components/MessageHistory';

export default async function MessageHistoryPage() {
  const userId = await getSessionUserIdServer();
  if (!userId) {
    redirect('/login');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">ประวัติข้อความของฉัน</h1>
      <MessageHistory />
    </main>
  );
}