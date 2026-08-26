import { NextResponse } from 'next/server';
import { getComment, editComment, removeComment } from '@/lib/commentService';

function getSessionUserId(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/session=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comment = await getComment(id);
    if (!comment) {
      return NextResponse.json({ error: 'ไม่พบ comment นี้' }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getSessionUserId(request);
    const updates = await request.json();
    const comment = await editComment(id, updates, userId);
    if (!comment) {
      return NextResponse.json({ error: 'ไม่พบ comment นี้' }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (err: any) {
    const status = err.status ?? 500; // ForbiddenError=403, NotFoundError=404
    return NextResponse.json({ error: err.message || 'เกิดข้อผิดพลาดในการแก้ไข' }, { status });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getSessionUserId(request);
    const comment = await removeComment(id, userId);
    if (!comment) {
      return NextResponse.json({ error: 'ไม่พบ comment นี้' }, { status: 404 });
    }
    return NextResponse.json({ message: 'ลบสำเร็จ' });
  } catch (err: any) {
    const status = err.status ?? 500;
    return NextResponse.json({ error: err.message || 'เกิดข้อผิดพลาดในการลบ' }, { status });
  }
}