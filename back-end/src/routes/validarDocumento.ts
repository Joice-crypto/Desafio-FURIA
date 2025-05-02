import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Mistral } from '@mistralai/mistralai';
import formidable from 'formidable';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! });

export async function validarDocumentoRoute(app: FastifyInstance) {
    app.post('/validarDoc', async (request: FastifyRequest, reply: FastifyReply) => {
        const form = formidable({
            maxFileSize: 5 * 1024 * 1024, // 5MB
            keepExtensions: true,
            allowEmptyFiles: false
        });
        console.log("aaaaaaa")

        form.parse(request.raw, async (err, fields, files) => {
            try {
                if (err) {
                    console.error('Erro no formidable:', err);
                    return reply.status(400).send({ error: "Erro ao processar o arquivo" });
                }

                // 1. Extrai os campos
                const nome = Array.isArray(fields.nome) ? fields.nome[0] : fields.nome;
                const file = files.file && (Array.isArray(files.file) ? files.file[0] : files.file);
                console.log(nome)
                console.log(file)
                // 2. Validações
                if (!file || !nome) {
                    return reply.status(400).send({ error: "Arquivo ou nome ausente." });
                }

                // 3. Lê o arquivo
                const buffer = await fs.promises.readFile(file.filepath);

                // 4. Upload para o Mistral
                const uploaded = await client.files.upload({
                    file: {
                        fileName: file.originalFilename || 'documento',
                        content: buffer,
                    },
                    purpose: "ocr",
                });

                // 5. Obtém URL assinada
                const signedUrl = await client.files.getSignedUrl({ fileId: uploaded.id });

                // 6. Análise com Mistral
                const chatResponse = await client.chat.complete({
                    model: "mistral-small-latest",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `O nome "${nome}" aparece no documento? Responda "sim" ou "não".`
                                },
                                {
                                    type: "document_url",
                                    documentUrl: signedUrl.url
                                },
                            ],
                        },
                    ],
                });

                // 7. Remove o arquivo temporário
                await fs.promises.unlink(file.filepath);

                return reply.send(chatResponse);

            } catch (error) {
                console.error('Erro no processamento:', error);
                return reply.status(500).send({ error: "Erro ao processar documento" });
            }
        });
    });
}