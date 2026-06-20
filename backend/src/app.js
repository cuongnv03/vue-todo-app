import Fastify from 'fastify'
import cors from '@fastify/cors'
import { AppError } from './utils/errors.js'

import { jwtPlugin } from './plugins/jwt.js'
import { authPlugin } from './plugins/auth.js'

import { authRoutes } from './routes/auth.routes.js'
import { todoRoutes } from './routes/todo.routes.js'

export async function buildApp() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true,
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
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

    await fastify.register(todoRoutes, {
        prefix: '/api/todos'
    })

    return fastify
}
