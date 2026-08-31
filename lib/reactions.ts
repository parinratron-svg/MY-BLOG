import { prisma } from './prisma';
import { NotFoundError } from './errors';

export async function createReaction(commentId: string, emoji: string) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }
  return prisma.reaction.create({ data: { commentId, emoji } });
}

export async function getReactionsByCommentId(commentId: string) {
  return prisma.reaction.findMany({ where: { commentId } });
}