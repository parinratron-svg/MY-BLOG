import { z } from 'zod';
export const messageSchema = z.object({
 name: z.string().min(2, 'ชื่อสั้นเกินไป').max(100),
 email: z.string().email('อีเมลไม่ถูกต้อง'),
 message: z.string().min(5, 'ข้อความสั้นเกินไป').max(1000),
});

export const registerSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
});