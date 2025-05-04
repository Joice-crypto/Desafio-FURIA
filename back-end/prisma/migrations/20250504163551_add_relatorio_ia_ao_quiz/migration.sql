/*
  Warnings:

  - You are about to drop the column `eventoMarcante` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "eventoMarcante",
ALTER COLUMN "relatorioIA" DROP NOT NULL;
