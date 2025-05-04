/*
  Warnings:

  - Changed the type of `gamesFaceit` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Quiz"
  DROP COLUMN "gamesFaceit",
  ADD COLUMN "gamesFaceit" JSON;

