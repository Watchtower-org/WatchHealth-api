/*
  Warnings:

  - Added the required column `bidding` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `covid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dengue` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `law` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `news` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bidding" BOOLEAN NOT NULL,
ADD COLUMN     "covid" BOOLEAN NOT NULL,
ADD COLUMN     "dengue" BOOLEAN NOT NULL,
ADD COLUMN     "law" BOOLEAN NOT NULL,
DROP COLUMN "news",
ADD COLUMN     "news" BOOLEAN NOT NULL;
