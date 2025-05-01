import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fastifyJwt from '@fastify/jwt';

export async function authRoute(app: FastifyInstance) {
    // Rota de cadastro de usuário
    app.post('/cadastro', async (request, reply) => {
        const body = z.object({
            email: z.string().email(),
            senha: z.string().min(6),
            nome: z.string(),
            documento: z.string().url(),
        });

        const { email, senha, nome, documento } = body.parse(request.body);

        if (documento && !documento.startsWith('http')) {
            return reply.status(400).send({ error: 'Documento não é uma URL válida.' });
        }

        console.log(request.body)

        const usuarioExistente = await prisma.user.findUnique({
            where: { email },
        });

        if (usuarioExistente) {
            return reply.status(400).send({ error: 'Email já registrado' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await prisma.user.create({
            data: {
                email,
                senha: senhaHash,
                nome,
                documento,
            },
        });

        const token = app.jwt.sign(
            { id: usuario.id, email: usuario.email },
            { expiresIn: '30D' }
        );

        return reply.status(201).send({ message: 'Usuário cadastrado com sucesso', token });
    });


    app.post('/login', async (request, reply) => {
        const body = z.object({
            email: z.string().email(),
            senha: z.string().min(6),
        });

        const { email, senha } = body.parse(request.body);

        const usuario = await prisma.user.findUnique({
            where: { email },
        });

        if (!usuario) {
            return reply.status(400).send({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return reply.status(400).send({ error: 'Senha incorreta' });
        }

        const token = app.jwt.sign(
            { id: usuario.id, email: usuario.email },
            { expiresIn: '30D' }
        );

        return reply.status(200).send({ message: 'Login realizado com sucesso', token });
    });
}


