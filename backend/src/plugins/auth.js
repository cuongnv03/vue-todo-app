import fp from 'fastify-plugin'

async function registerAuth(fastify) {
    fastify.decorate('authenticate', async function authenticate(request, reply) {
        try {
            const payload = await request.jwtVerify()

            request.user = {
                id: payload.userId
            }
        } catch {
            return reply.code(401).send({
                message: 'Unauthorized'
            })
        }
    })
}

export const authPlugin = fp(registerAuth)
