// lib/auth.ts
import { cookies } from 'next/headers';

// ใช้ใน API Route Handler (รับ Request object)
export function getSessionUserIdFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/session=([^;]+)/);
  return match ? match[1] : null;
}

// ใช้ใน Server Component (page.tsx, layout.tsx)
export async function getSessionUserIdServer(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('session')?.value ?? null;
}