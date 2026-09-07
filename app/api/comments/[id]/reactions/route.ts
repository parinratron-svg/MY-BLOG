import { NextResponse } from 'next/server';
import { addReaction, getReactionCounts } from '@/lib/commentService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const counts = await getReactionCounts(id);
    return NextResponse.json(counts);
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { emoji } = await request.json();
    if (!emoji) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
    }
    const { id } = await params;
    const reaction = await addReaction(id, emoji);
    return NextResponse.json(reaction, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Comment not found') {
      return NextResponse.json({ error: 'ไม่พบ comment ที่ระบุ' }, { status: 404 });
    }
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' }, { status: 500 });
  }
}