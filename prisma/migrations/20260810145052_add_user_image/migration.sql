/*
  Warnings:

  - You are about to drop the column `acessTokenExpiresAt` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "acessTokenExpiresAt",
ADD COLUMN     "accessTokenExpiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "image" TEXT;
