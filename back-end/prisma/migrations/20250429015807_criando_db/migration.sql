-- CreateEnum
CREATE TYPE "EventoPresencialStatus" AS ENUM ('SIM', 'NAO', 'AINDA_NAO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "documento" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "jogosAcompanhados" TEXT NOT NULL,
    "eventoPresencial" "EventoPresencialStatus" NOT NULL,
    "eventoMarcante" TEXT NOT NULL,
    "experienciaEvento" TEXT NOT NULL,
    "produtoFuria" TEXT,
    "linkPerfilFaceit" TEXT NOT NULL,
    "relatorioIA" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
