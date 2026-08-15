import { prisma } from './prisma';

export async function addComment(data: { author: string; content: string; postId: string }) {
  return prisma.comment.create({ data });
}

export async function getComments() {
  return prisma.comment.findMany();
}

export async function getCommentById(id: string) {
  return prisma.comment.findUnique({ where: { id } });
}

export async function updateComment(id: string, updates: object) {
  return prisma.comment.update({ where: { id }, data: updates });
}

export async function deleteComment(id: string) {
  return prisma.comment.delete({ where: { id } });
}