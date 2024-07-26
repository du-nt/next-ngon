/*
  Warnings:

  - You are about to drop the column `tilte` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_tilte_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tilte",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
