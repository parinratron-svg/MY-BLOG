import { prisma } from '../lib/prisma';

async function main() {
  // ล้างข้อมูลเก่าก่อน กัน error unique/ซ้ำตอนรัน seed หลายรอบ
  await prisma.comment.deleteMany();
  await prisma.message.deleteMany();

  // ใช้ create ทีละตัว เพื่อเอา id ที่ database generate ให้ มาใช้ต่อ
  const msg1 = await prisma.message.create({
    data: { name: 'Alice', email: 'a@tsu.ac.th', message: 'สวัสดี' },
  });
  const msg2 = await prisma.message.create({
    data: { name: 'Bob', email: 'b@tsu.ac.th', message: 'Hello' },
  });

  // seed comment โดยอ้างอิง postId จาก message ที่สร้างไว้จริง
  await prisma.comment.createMany({
    data: [
      { author: 'Charlie', content: 'ขอบคุณสำหรับข้อมูลครับ', postId: msg1.id },
      { author: 'Dana', content: 'มีประโยชน์มากเลย', postId: msg1.id },
      { author: 'Eve', content: 'เห็นด้วยครับ', postId: msg2.id },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });