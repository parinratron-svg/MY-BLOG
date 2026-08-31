// app/api/messages/[id]/route.ts
import { withErrorHandling } from '@/lib/withErrorHandling';
import { editMessage, getMessageById, removeMessage } from '@/lib/messageService';

type Ctx = { params: Promise<{ id: string }> };

function getSessionUserId(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/session=([^;]+)/);
  return match ? match[1] : null;
}

export const GET = withErrorHandling(async (request: Request, ctx) => {
  const { params } = ctx as Ctx;
  const { id } = await params;
  const message = await getMessageById(id);
  if (!message) {
    return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
  }
  return Response.json({ message });
});

export const PATCH = withErrorHandling(async (request: Request, ctx) => {
  const { params } = ctx as Ctx;
  const { id } = await params;
  const sessionUserId = getSessionUserId(request);
  const updates = await request.json();
  const updated = await editMessage(id, updates, sessionUserId);
  if (!updated) {
    return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
  }
  return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (request: Request, ctx) => {
  const { params } = ctx as Ctx;
  const { id } = await params;
  const sessionUserId = getSessionUserId(request);
  const deleted = await removeMessage(id, sessionUserId);
  if (!deleted) {
    return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
  }
  return Response.json({ ok: true });
});
