import { prisma } from './prisma';
import { NotFoundError, ForbiddenError } from './errors';

export async function addComment(data: {
  author: string;
  content: string;
  postId: string;
  authorId: string; // ผู้ login เท่านั้นถึงคอมเมนต์ได้ -> ห้าม optional
}) {
  return prisma.comment.create({ data });
}

export async function getComments() {
  return prisma.comment.findMany();
}

export async function getCommentById(id: string) {
  return prisma.comment.findUnique({ where: { id } });
}

// ต้องรู้ว่าใครเป็นคนยิง request (userId) มาก่อนถึงจะแก้ได้
export async function updateComment(id: string, userId: string | null, updates: object) {
  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment) {
    throw new NotFoundError('Comment not found');
  }

  if (!userId || comment.authorId !== userId) {
    throw new ForbiddenError('You are not allowed to modify this comment');
  }

  return prisma.comment.update({ where: { id }, data: updates });
}

export async function deleteComment(id: string, userId: string | null) {
  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment) {
    throw new NotFoundError('Comment not found');
  }

  if (!userId || comment.authorId !== userId) {
    throw new ForbiddenError('You are not allowed to delete this comment');
  }

  return prisma.comment.delete({ where: { id } });
}