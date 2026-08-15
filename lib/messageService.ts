import { Prisma } from '@prisma/client';
import * as MessageModel from './messages';

export async function createMessage(data) { 
  if (!data.name || !data.email || !data.message) throw new Error('ข้อมูลไม่ครบ'); 
  try { 
    return await MessageModel.addMessage(data); 
  } catch (err) { 
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') { 
      throw new Error('อีเมลนี้ถูกใช้แล้ว'); 
    } 
    throw err; 
  } 
} 

export async function listMessages() {
  return MessageModel.getMessages();
}

export async function getMessageById(id: string) {
  return MessageModel.getMessageById(id);
}

export async function editMessage(id: string, updates: object) {
  try {
    return await MessageModel.updateMessage(id, updates);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function removeMessage(id: string) {
  try {
    return await MessageModel.deleteMessage(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

