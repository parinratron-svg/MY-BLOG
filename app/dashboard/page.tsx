import { redirect } from 'next/navigation';
import { getMessages } from '@/lib/messages';
import { getSessionUserIdServer } from '@/lib/auth';
import { findUserById } from '@/lib/users';
import Image from 'next/image';
import DeleteMessageButton from '@/components/DeleteMessageButton';
export default async function DashboardPage() {
  const userId = await getSessionUserIdServer();

  if (!userId) {
    redirect('/login');
  }

  const user = await findUserById(userId);

  if (!user || user.role !== 'admin') {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-8">
        <div className="w-full max-w-md rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-rose-200 bg-rose-50 flex items-center justify-center">
            <Image src="/img/add.png" alt="Access denied" width={160} height={160} className="object-cover" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            เฉพาะแอดมินเท่านั้น
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบหากคิดว่าเป็นข้อผิดพลาด
          </p>

          
           <a
  href="/"
  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-slate-700"
>
  กลับหน้าแรก
</a>
        </div>
      </main>
    );
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
                  <strong>เวลาที่ส่ง:</strong> {new Date(message.createdAt).toLocaleString('th-TH')}
                </p>
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
}