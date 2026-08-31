import { NextResponse } from 'next/server';
import { addReaction, getReactionCounts } from '@/lib/commentService';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const counts = await getReactionCounts(params.id);
    return NextResponse.json(counts);
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { emoji } = await request.json();
    if (!emoji) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
    }
    const reaction = await addReaction(params.id, emoji);
    return NextResponse.json(reaction, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Comment not found') {
      return NextResponse.json({ error: 'ไม่พบ comment ที่ระบุ' }, { status: 404 });
    }
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' }, { status: 500 });
  }
}