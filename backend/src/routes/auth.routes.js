import { 
    registerSchema,
    loginSchema
 } from '../schemas/auth.schema.js'
import {
    registerUser,
    loginUser
 } from '../services/auth.service.js'

export async function authRoutes(fastify) {
    fastify.post('/register', {
        schema: registerSchema
    }, async function registerHandler(request, reply) {
        const user = await registerUser(request.body)

        return reply.code(201).send({
            message: 'User registered successfully',
            user
        })
    })

    fastify.post('/login', {
        schema: loginSchema
    }, async function loginHandler(request) {
        const user = await loginUser(request.body)

        const token = fastify.jwt.sign({
            userId: user.id
        })

        return {
            token,
            user
        }
    })
}
