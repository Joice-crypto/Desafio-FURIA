import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import fastifyStatic from '@fastify/static';
import { resolve } from 'path';

import { ChatBotRoutes } from './routes/chat';
import { authRoute } from './routes/auth';
import { QuizRoutes } from './routes/quiz';
import { uploadRoutes } from './routes/upload';


dotenv.config();

const fastify = Fastify({
    logger: false
});

fastify.register(cors, {
    origin: true,
})

fastify.register(fastifyMultipart)

fastify.register(jwt, {
    secret: process.env.JWT_SECRET as string
})

fastify.register(fastifyStatic, {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads',
})

fastify.register(authRoute)
fastify.register(QuizRoutes)
fastify.register(ChatBotRoutes)
fastify.register(uploadRoutes)


fastify.listen({ port: 3333 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});