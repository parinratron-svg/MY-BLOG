import { Prisma } from '@prisma/client';
import * as MessageModel from './messages';
import { messageSchema } from './schemas';
import { ZodError } from 'zod';
import { ForbiddenError, ValidationError } from './errors';

export async function createMessage(raw: unknown) {
 let data;
 try {
 data = messageSchema.parse(raw);
 } catch (err) {
    if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
    throw err;
 }
 return MessageModel.addMessage(data);
}

export async function listMessages() {
  return MessageModel.getMessages();
}

export async function getMessageById(id: string) {
  return MessageModel.getMessageById(id);
}

export async function editMessage(id: string, updates: object, sessionUserId: string) {
  const message = await getMessageById(id);
  if (!message) return null;

  if (message.authorId !== sessionUserId) {
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

  if (message.authorId !== sessionUserId) {
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
}


