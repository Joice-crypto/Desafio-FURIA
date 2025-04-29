import Fastify from 'fastify';
import cors from '@fastify/cors'
import { QuizRoutes } from './routes/quiz'
import { ChatBotRoutes } from './routes/chat'
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';


dotenv.config();

const fastify = Fastify({
    logger: false
});

fastify.register(cors, {
    origin: true,
})

fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'default-secret',
});


fastify.register(QuizRoutes)
fastify.register(ChatBotRoutes)


fastify.listen({ port: 3333 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});