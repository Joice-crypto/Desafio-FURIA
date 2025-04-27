import { FastifyInstance } from 'fastify';
import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

export async function ChatBotRoutes(app: FastifyInstance) {
    app.post('/chat', async (request, reply) => {
        const body = request.body as { message: string };

        if (!body.message) {
            return reply.status(400).send({ error: 'Mensagem obrigatória' });
        }

        const chatResponse = await client.chat.complete({
            model: "mistral-large-latest",
            messages: [{ role: 'user', content: body.message }],
        });

        if (!chatResponse.choices || chatResponse.choices.length === 0) {
            return reply.status(500).send({ error: 'Nenhuma resposta gerada pela IA.' });
        }

        return {
            response: chatResponse.choices[0].message.content,
        };
    });
}