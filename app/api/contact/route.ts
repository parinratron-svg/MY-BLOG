import { revalidatePath } from 'next/cache';
import { addMessage, getMessages } from '@/lib/messages';

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.name || !data.email || !data.message) {
    return Response.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
  }

  addMessage({
    name: data.name,
    email: data.email,
    message: data.message,
  });

  console.log('messages after add:', getMessages());

  revalidatePath('/dashboard');

  return Response.json({ ok: true });
}