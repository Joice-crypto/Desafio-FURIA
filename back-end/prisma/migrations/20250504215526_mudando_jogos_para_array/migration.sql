/*
  Warnings:

  - The `jogosAcompanhados` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "jogosAcompanhados",
ADD COLUMN     "jogosAcompanhados" TEXT[];
