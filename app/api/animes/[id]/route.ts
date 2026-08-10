import { getAnimeById, editAnime, removeAnime } from '@/lib/animeService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ เปลี่ยน: params เป็น Promise
) {
  const { id } = await params; // ✅ เพิ่ม: await ก่อนดึง id
  const anime = getAnimeById(id);
  if (!anime) {
    return Response.json({ error: 'ไม่พบอนิเมะนี้' }, { status: 404 });
  }
  return Response.json({ anime });
}

export const PATCH = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ เปลี่ยน
) => {
  const { id } = await params; // ✅ เพิ่ม
  const updates = await request.json();
  const updated = editAnime(id, updates);
  if (!updated) {
    return Response.json({ error: 'ไม่พบอนิเมะนี้' }, { status: 404 });
  }
  return Response.json({ ok: true, item: updated });
});

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ เปลี่ยน
) {
  const { id } = await params; // ✅ เพิ่ม
  const deleted = removeAnime(id);
  if (!deleted) {
    return Response.json({ error: 'ไม่พบอนิเมะนี้' }, { status: 404 });
  }
  return Response.json({ ok: true }, { status: 200 });
}