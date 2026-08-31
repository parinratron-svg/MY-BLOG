import { Prisma } from '@prisma/client';
import * as MessageModel from './messages';
import { messageSchema } from './schemas';
import { ZodError } from 'zod';
import { ForbiddenError, ValidationError } from './errors';
import { findUserById } from './users'; // ← เพิ่ม import นี้

export async function createMessage(raw: unknown, authorId: string | null = null) {
  let data;
  try {
    data = messageSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
    throw err;
  }
  return MessageModel.addMessage({ ...data, authorId });
}
// ค้นหาข้อความตาม name หรือ message content
export async function listMessages(search?: string) {
 const all = await MessageModel.getMessages();
 if (!search) return all;
 return all.filter((m) =>
 m.name.includes(search) ||
m.message.includes(search)
 );
}

export async function listMessagesByAuthor(authorId: string) {
  const all = await listMessages();
  return all.filter((m) => m.authorId === authorId);
}

export async function getMessageById(id: string) {
  return MessageModel.getMessageById(id);
}

// ฟังก์ชันช่วยเช็คสิทธิ์: เจ้าของ หรือ แอดมิน
async function canModify(message: { authorId: string | null }, sessionUserId: string) {
  if (message.authorId === sessionUserId) return true;

  const user = await findUserById(sessionUserId);
  return user?.role === 'admin';
}

export async function editMessage(id: string, updates: object, sessionUserId: string) {
  const message = await getMessageById(id);
  if (!message) return null;

  const allowed = await canModify(message, sessionUserId);
  if (!allowed) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
  }

  try {
    return await MessageModel.updateMessage(id, updates);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function removeMessage(id: string, sessionUserId: string) {
  const message = await getMessageById(id);
  if (!message) return null;

  const allowed = await canModify(message, sessionUserId);
  if (!allowed) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์ลบข้อความนี้');
  }

  try {
    return await MessageModel.deleteMessage(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
<<<<<<< HEAD
}
=======
}



>>>>>>> bd461c0ac9b14c0f4eac48fa64bc983bc6cc8bc9
