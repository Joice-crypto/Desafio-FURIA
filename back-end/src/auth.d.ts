import '@fastify/jwt'

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            id: any
            sub: string
            name: string
        }
    }
}