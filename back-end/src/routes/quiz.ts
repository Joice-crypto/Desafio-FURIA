import fastify, { FastifyInstance } from 'fastify'
import { string, z } from 'zod'
import fastifyJwt from '@fastify/jwt';

let quizResults: Record<string, any>[] = [];

export async function QuizRoutes(app: FastifyInstance) {
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify()
    })

    app.get('/quizResult', async (request) => {

        return { message: 'Resultados dos quizzes', data: quizResults };
    });


    app.post('/quiz', async (request) => {

        const bodySchema = z.object({
            nome: z.string(),
            endereco: z.string(),
            cpf: z.string(),
            jogos: z.string(),
            evento: z.string(),
            eventoDesc: z.string(),
            data: z.coerce.date().refine((date: any) => !isNaN(date.getTime()), 'Data inválida'),
            documento: z.string(),
        })
        const { nome, cpf, endereco, jogos, evento, eventoDesc, data, documento } = bodySchema.parse(request.body)

        const quizData = {
            nome,
            cpf,
            endereco,
            jogos,
            evento,
            eventoDesc,
            documento,
            data,
        };
        quizResults.push(quizData);
        // console.log(quizData)

        return { message: 'Resultado do quiz salvo com sucesso!', data: quizData };
    });

}