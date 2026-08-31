// app/api/signup/route.ts
import { withErrorHandling } from '@/lib/withErrorHandling';
import { registerSchema } from '@/lib/schemas';
import { ZodError } from 'zod';
import { ValidationError } from '@/lib/errors';
import { findUserByEmail, createUser } from '@/lib/users';

export const POST = withErrorHandling(async (request: Request) => {
  const raw = await request.json();

  let data;
  try {
    data = registerSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
    throw err;
  }

  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new ValidationError('อีเมลนี้ถูกใช้งานแล้ว');
  }

  const user = await createUser(data.email, data.password); // hash ด้วย bcrypt อยู่แล้วใน createUser

  const res = Response.json(
    { ok: true, user: { id: user.id, email: user.email } },
    { status: 201 }
  );
  res.headers.set('Set-Cookie', `session=${user.id}; Path=/; HttpOnly; Secure; SameSite=Strict`);
  return res;
});