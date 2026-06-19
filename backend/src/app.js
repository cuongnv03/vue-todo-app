import Fastify from 'fastify'
import { AppError } from './utils/errors.js'

import { jwtPlugin } from './plugins/jwt.js'
import { authPlugin } from './plugins/auth.js'

import { authRoutes } from './routes/auth.routes.js'

export async function buildApp() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(jwtPlugin)
    await fastify.register(authPlugin)

    fastify.setErrorHandler((error, request, reply) => {
        if (error.validation) {
            return reply.code(400).send({
                message: 'Validation error',
                details: error.validation
            })
        }

        if (error instanceof AppError) {
            return reply.code(error.statusCode).send({
                message: error.message
            })
        }

        request.log.error(error)

        return reply.code(500).send({
            message: 'Internal server error'
        })
    })

    fastify.get('/health', async () => {
        return {
            status: 'OK'
        }
    })

    await fastify.register(authRoutes, {
        prefix: '/auth'
    })

    return fastify
}