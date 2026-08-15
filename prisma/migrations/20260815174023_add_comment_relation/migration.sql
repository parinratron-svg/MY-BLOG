-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
