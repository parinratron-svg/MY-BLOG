import { withErrorHandling } from '@/lib/withErrorHandling';
import { createMessage, listMessages } from '@/lib/messageService';
import { getSessionUserIdFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';
  const all = await listMessages();
  const filtered = search
    ? all.filter((m) => m.name.includes(search) || m.message.includes(search))
    : all;
  return Response.json({ messages: filtered });
}

export const POST = withErrorHandling(async (request: Request) => {
  const authorId = getSessionUserIdFromRequest(request);
  const body = await request.json();
  const saved = await createMessage(body, authorId);
  return Response.json({ ok: true, item: saved }, { status: 201 });
});