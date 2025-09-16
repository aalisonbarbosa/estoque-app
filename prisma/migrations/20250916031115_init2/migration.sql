/*
  Warnings:

  - You are about to drop the column `productId` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `productName` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Movement" DROP CONSTRAINT "Movement_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Movement" DROP COLUMN "productId",
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
