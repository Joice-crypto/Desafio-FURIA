import { FastifyInstance } from "fastify";
import { Mistral } from "@mistralai/mistralai";

import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

export async function ChatBotRoutes(app: FastifyInstance) {
    app.addHook("preHandler", async (request) => {
        await request.jwtVerify();
    });
    app.post("/chat", async (request, reply) => {
        const body = request.body as { message: string };

        if (!body.message) {
            return reply.status(400).send({ error: "Mensagem obrigatória" });
        }

        const messages = [
            {
                role: "system" as const,
                content: `Você é um atendente virtual da FURIA e-sports. Sua missão é responder perguntas dos fãs sobre:
  - Jogadores da lineup de CS2
  - Jogos atuais e passados da FURIA
  - Resultados de partidas
  - Quem comanda a organização (ex: CEO)
  - Produtos oficiais da FURIA
  Sempre que possível, seja empático, tente usar termos de gamers nas suas mensagens e incentive o usuário a conhecer os produtos ou apoiar o time.`,
            },
            {
                role: "user" as const,
                content: ` ${body.message}`,
            },
        ];

        const chatResponse = await client.chat.complete({
            model: "mistral-large-latest",
            messages,
        });

        if (!chatResponse.choices || chatResponse.choices.length === 0) {
            return reply
                .status(500)
                .send({ error: "Nenhuma resposta gerada pela IA." });
        }

        return {
            response: chatResponse.choices[0].message.content,
        };
    });
}
