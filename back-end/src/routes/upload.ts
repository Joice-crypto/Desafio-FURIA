import fastify, { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { Readable } from 'stream';
import { MultipartFile } from '@fastify/multipart'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {

    // const scoped = app.register(async (scope) => {
    //     scope.register(require('@fastify/multipart'));

    //     scope.post('/upload', async (request, reply) => {
    //         const parts = request.files({ limits: { fileSize: 5_242_880 } });
    //         const { value: upload } = await parts.next();
    //         console.log(upload);

    //         if (!upload || !upload.file) {
    //             return reply.status(400).send({ error: 'Arquivo não enviado.' });
    //         }

    //         const mimeTypeRegex = /^application\/pdf$/;
    //         const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

    //         if (!isValidFileFormat) {
    //             return reply.status(400).send({ error: 'Formato de arquivo inválido. Envie apenas PDF.' });
    //         }

    //         const fileId = randomUUID();
    //         const extension = extname(upload.filename);
    //         const fileName = fileId.concat(extension);

    //         const filePath = resolve(__dirname, '../../uploads/', fileName);
    //         const writeStream = createWriteStream(filePath);

    //         await pump(upload.file, writeStream);

    //         const fullUrl = request.protocol.concat('://').concat(request.hostname);
    //         const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    //         console.log(fileUrl);

    //         return reply.send({ fileUrl });
    //     });

    // });
}

