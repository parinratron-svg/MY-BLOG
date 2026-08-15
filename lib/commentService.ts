import { Prisma } from '@prisma/client';
import * as CommentModel from './comments';

export async function createComment(data: any) {
  if (!data.author || !data.content || !data.postId) throw new Error('ข้อมูลไม่ครบ');
  try {
    return await CommentModel.addComment(data);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new Error('ข้อมูลนี้ถูกใช้แล้ว');
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2003') {
  throw new Error('ไม่พบ post ที่ระบุ');
}
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new Error('ไม่พบ post ที่ระบุ');
    }
    throw err;
  }
}

export async function listComments() {
  return CommentModel.getComments();
}

export async function getComment(id: string) {
  return CommentModel.getCommentById(id);
}

export async function editComment(id: string, updates: object) {
  try {
    return await CommentModel.updateComment(id, updates);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function removeComment(id: string) {
  try {
    return await CommentModel.deleteComment(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}