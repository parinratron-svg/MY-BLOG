import { withErrorHandling } from '@/lib/withErrorHandling';
import { createAnime, listAnimes } from '@/lib/animeService';

export async function GET(request: Request) {
  const animes = listAnimes();
  return Response.json({ animes });
}

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const saved = createAnime(body);
  return Response.json({ ok: true, item: saved }, { status: 201 });
});