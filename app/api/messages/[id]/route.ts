import { getMessageById } from '@/lib/messageService';
import { editMessage } from '@/lib/messageService';
import { removeMessage } from '@/lib/messageService'; // เพิ่มใน service ให้เรียก deleteMessage ของ Model
export async function GET(
 request: Request,
 { params }: { params: { id: string } }
) {
 const message = getMessageById(params.id);
 if (!message) {
 return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
 }
 return Response.json({ message });
}
export async function PATCH(
 request: Request,
 { params }: { params: { id: string } }
) {
 const updates = await request.json();
  try {//  เพิ่ม: เปิด try เพื่อดักจับ Error ที่ editMessage อาจ throw
 const updated = editMessage(params.id, updates);
 if (!updated) {
 return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
 }
 return Response.json({ ok: true, item: updated });
  } catch (error) {//  เพิ่ม: ดักจับ Error จาก editMessage (เช่น "ข้อความห้ามเป็นค่าว่าง")
     const message = error instanceof Error ? error.message : 'เกิดข้อผิดพลาด'; //  เพิ่ม: ดึงข้อความ error อย่างปลอดภัย
    return Response.json({ error: message }, { status: 400 }); //  เพิ่ม: ตอบ status 400 พร้อมข้อความ error
  } //  เพิ่ม: ปิด catch
}
export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {
 const deleted = removeMessage(params.id);
 if (!deleted) {
 return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
 }
 return Response.json({ ok: true }, { status: 200 })
}