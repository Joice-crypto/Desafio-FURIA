/*
  Warnings:

  - Added the required column `countryFaceit` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eloFaceit` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamesFaceit` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nicknameFaceit` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "countryFaceit" TEXT NOT NULL,
ADD COLUMN     "eloFaceit" TEXT NOT NULL,
ADD COLUMN     "gamesFaceit" TEXT NOT NULL,
ADD COLUMN     "nicknameFaceit" TEXT NOT NULL;
