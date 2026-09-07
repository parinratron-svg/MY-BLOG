import { NextResponse } from 'next/server';
import { createComment, listComments } from '@/lib/commentService';

export async function GET() {
  try {
    const comments = await listComments();
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const comment = await createComment(data);
    return NextResponse.json(comment, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '';
    if (message === 'ข้อมูลไม่ครบ') {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    if (message === 'ไม่พบ post ที่ระบุ') {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' }, { status: 500 });
  }
}