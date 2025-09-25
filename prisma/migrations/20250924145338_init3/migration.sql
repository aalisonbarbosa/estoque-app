-- DropForeignKey
ALTER TABLE "public"."Movement" DROP CONSTRAINT "Movement_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
