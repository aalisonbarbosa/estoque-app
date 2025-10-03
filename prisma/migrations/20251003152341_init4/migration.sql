-- DropForeignKey
ALTER TABLE "public"."Movement" DROP CONSTRAINT "Movement_productId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
