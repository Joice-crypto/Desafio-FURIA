import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Mistral } from '@mistralai/mistralai';
import formidable from 'formidable';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! });

type TextChunk = {
    type: 'text';
    text: string;
};

function isTextChunk(chunk: any): chunk is TextChunk {
    return chunk?.type === 'text' && typeof chunk?.text === 'string';
}


export async function validarDocumentoRoute(app: FastifyInstance) {
    app.post('/validarDoc', async (request, reply) => {
        try {
            const parts = request.parts();

            let nome = '';
            let fileBuffer: Buffer | null = null;
            let fileName = 'documento.pdf';
            console.log("Chegou aqui");

            for await (const part of parts) {
                if (part.type === 'file') {
                    fileBuffer = await part.toBuffer();
                    fileName = part.filename || 'documento.pdf';
                } else if (part.type === 'field' && part.fieldname === 'nome') {
                    nome = part.value as string;
                }
            }

            // console.log(fileName);
            // console.log(nome);

            if (!fileBuffer || !nome) {
                return reply.status(400).send({ error: 'Arquivo ou nome ausente.' });
            }


            const uploaded = await client.files.upload({
                file: {
                    fileName: fileName,
                    content: fileBuffer,
                },
                purpose: 'ocr',
            });
            console.log(uploaded);


            const signedUrl = await client.files.getSignedUrl({ fileId: uploaded.id });


            const chatResponse = await client.chat.complete({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `O nome "${nome}" aparece no documento abaixo? Compare de forma que ignore letras maiúsculas/minúsculas e pequenas variações. Responda apenas com "Valido" se o nome estiver presente de forma semelhante, ou "Invalido" se não estiver.`,
                            },
                            {
                                type: 'document_url',
                                documentUrl: signedUrl.url,
                            },
                        ],
                    },
                ],
            });



            const resposta = chatResponse.choices?.[0]?.message?.content;
            const texto = Array.isArray(resposta)
                ? resposta.find(isTextChunk)?.text
                : typeof resposta === 'string'
                    ? resposta
                    : undefined;
            console.log('Resposta do Mistral:', texto);
            return reply.send({
                resposta: texto || 'Sem resposta',
            });

        } catch (error) {
            console.error("Erro ao validar documento:", error);
            return reply.status(500).send({ error: 'Erro interno ao processar documento.' });
        }
    });
}

