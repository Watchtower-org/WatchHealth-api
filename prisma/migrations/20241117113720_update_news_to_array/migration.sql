/*
  Warnings:

  - You are about to drop the column `estate` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ibgecode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "estate",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "ibgecode" TEXT NOT NULL;
