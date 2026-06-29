import fp from 'fastify-plugin'
import { errorResponse } from '../utils/responses.js'

async function registerAuth(fastify) {
    fastify.decorate('authenticate', async function authenticate(request, reply) {
        try {
            const payload = await request.jwtVerify()

            request.user = {
                id: payload.userId
            }
        } catch {
            return reply.code(401).send({
                ...errorResponse('UNAUTHORIZED', 'Unauthorized')
            })
        }
    })
}

export const authPlugin = fp(registerAuth)
