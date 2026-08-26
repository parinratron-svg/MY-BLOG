import { withErrorHandling } from '@/lib/withErrorHandling';
import { createMessage, listMessages } from '@/lib/messageService';

export const GET = withErrorHandling(async (request: Request) => {
  const messages = await listMessages();
  return Response.json({ messages });
});

export const POST = withErrorHandling(async (request: Request) => {
  const raw = await request.json();
  const created = await createMessage(raw);
  return Response.json({ ok: true, item: created }, { status: 201 });
});