// app/api/messages/mine/route.ts
import { withErrorHandling } from '@/lib/withErrorHandling';
import { listMessagesByAuthor } from '@/lib/messageService';
import { getSessionUserIdFromRequest } from '@/lib/auth';

export const GET = withErrorHandling(async (request: Request) => {
  const authorId = getSessionUserIdFromRequest(request);
  if (!authorId) {
    return Response.json({ error: 'กรุณาล็อกอิน' }, { status: 401 });
  }
  const messages = await listMessagesByAuthor(authorId);
  return Response.json({ messages });
});