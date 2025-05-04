import fastify, { FastifyInstance } from "fastify";
import { string, z } from "zod";
import jwt from 'jsonwebtoken';
import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma";
import { EventoPresencialStatus } from "../generated/prisma";
import { validarNick } from "./validarNick";


dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

export async function QuizRoutes(app: FastifyInstance) {
    app.addHook("preHandler", async (request) => {
        await request.jwtVerify();
    });

    app.get("/quizResult", async (request, reply) => {
        try {
            const userId = request.user?.id;

            // Pega o quiz mais recente do usuário logado
            const quiz = await prisma.quiz.findFirst({
                where: { userId },
                orderBy: { createdAt: "desc" },
            });

            if (!quiz) {
                return reply.status(404).send({ error: "Nenhum quiz encontrado para este usuário." });
            }

            const messages = [
                {
                    role: "system" as const,
                    content: "Você é um assistente que gera relatórios detalhados sobre fãs de eSports com base nas informações coletadas em um quiz.",
                },
                {
                    role: "user" as const,
                    content: `
            Nome: ${quiz.nome}
            CPF: ${quiz.cpf}
            Endereço: ${quiz.endereco}
            Jogos acompanhados: ${quiz.jogosAcompanhados}
            Participou de evento presencial: ${quiz.eventoPresencial}
            Descrição do evento: ${quiz.experienciaEvento}
            Produto FURIA favorito: ${quiz.produtoFuria}
            Perfil Faceit: ${quiz.linkPerfilFaceit}
            Nickname: ${quiz.nicknameFaceit}
            País: ${quiz.countryFaceit}
            ELO no Faceit: ${quiz.eloFaceit}
          `,
                },
            ];

            const chatResponse = await client.chat.complete({
                model: "mistral-large-latest",
                messages,
            });

            const respostaIA = chatResponse.choices?.[0]?.message?.content;

            if (!respostaIA || typeof respostaIA !== "string") {
                throw new Error("IA retornou uma resposta inválida.");
            }

            // Salva o relatório no banco
            await prisma.quiz.update({
                where: { id: quiz.id },
                data: {
                    relatorioIA: respostaIA,
                },
            });

            return reply.send({
                message: "Relatório gerado e salvo com sucesso!",
                data: respostaIA,
            });

        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
            return reply.status(500).send({
                error: "Erro ao gerar ou salvar o relatório com a IA.",
            });
        }
    });


    app.post("/quiz", async (request, reply) => {
        try {

            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                return reply.status(401).send({ error: 'Token não fornecido.' });
            }

            const jwtSecret = process.env.JWT_SECRET;

            if (!jwtSecret) {
                throw new Error("JWT_SECRET não está definido no arquivo .env");
            }

            const decoded: any = jwt.verify(token, jwtSecret);

            const userId = decoded.id;

            const EventoEnum = z.enum(["sim", "ainda nao", "nao"]);
            const bodySchema = z.object({
                nome: z.string(),
                endereco: z.string(),
                cpf: z.string(),
                jogos: z.array(z.string()).min(1, "Selecione pelo menos um jogo."),
                evento: EventoEnum,
                eventoDesc: z.string(),
                produtoFuria: z.string(),
                linkPerfilFaceit: z.string()
            });

            const {
                nome,
                endereco,
                cpf,
                jogos,
                evento,
                eventoDesc,
                produtoFuria,
                linkPerfilFaceit
            } = bodySchema.parse(request.body);

            const eventoMap = {
                "sim": EventoPresencialStatus.SIM,
                "ainda nao": EventoPresencialStatus.AINDA_NAO,
                "nao": EventoPresencialStatus.NAO,
            };

            const eventoPresencial = eventoMap[evento];


            const faceitValidation = await validarNick(linkPerfilFaceit);

            const gamesArray = Array.isArray(faceitValidation.games)
                ? faceitValidation.games
                : Object.values(faceitValidation.games);

            const faceitInfo = {
                nickname: faceitValidation.nickname,
                country: faceitValidation.country,
                games: gamesArray,
                elo: faceitValidation.elo,
            };

            const quizData = {
                nome,
                cpf,
                endereco,
                jogosAcompanhados: jogos,
                eventoPresencial,
                experienciaEvento: eventoDesc,
                produtoFuria,
                linkPerfilFaceit,
                userId,
                nicknameFaceit: faceitInfo.nickname,
                countryFaceit: faceitInfo.country,
                gamesFaceit: faceitInfo.games,
                eloFaceit: faceitInfo.elo.toString(),
            };


            const quiz = await prisma.quiz.create({
                data: quizData,
            });

            return { message: "Resultado do quiz salvo com sucesso!", data: quiz };
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao salvar o quiz.' });
        }
    });


}
