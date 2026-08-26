import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMessages } from '@/lib/messages';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) {
    redirect('/login');
  }

  const messages = await getMessages();
  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          จํานวนข้อความที่ได้รับ: {messages.length}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
          ยังไม่มีข้อความที่ส่งเข้ามา
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <details
              key={message.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
                <span className="inline-flex items-center gap-2 rounded bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                  ดูข้อมูล
                </span>
                <span className="ml-2">{message.name}</span>
                <span className="ml-2 text-slate-500">({message.email})</span>
              </summary>

              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                <p>
                  <strong>ชื่อ:</strong> {message.name}
                </p>
                <p className="mt-2">
                  <strong>อีเมล:</strong> {message.email}
                </p>
                <p className="mt-2">
                  <strong>ข้อความ:</strong> {message.message}
                </p>
                <p className="mt-2">
                  <p className="mt-2">
  <strong>เวลาที่ส่ง:</strong> {new Date(message.createdAt).toLocaleString('th-TH')}
</p>
                </p>
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
}