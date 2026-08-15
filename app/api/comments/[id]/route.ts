import { NextResponse } from 'next/server';
import { getComment, editComment, removeComment } from '@/lib/commentService';

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
    const updates = await request.json();
    const comment = await editComment(id, updates);
    if (!comment) {
      return NextResponse.json({ error: 'ไม่พบ comment นี้' }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการแก้ไข' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comment = await removeComment(id);
    if (!comment) {
      return NextResponse.json({ error: 'ไม่พบ comment นี้' }, { status: 404 });
    }
    return NextResponse.json({ message: 'ลบสำเร็จ' });
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการลบ' }, { status: 500 });
  }
}