import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { env } from "../config/env.js";

async function registerJwt(fastify) {
    await fastify.register(fastifyJwt, {
        secret: env.jwtSecret,
        sign: {
            expiresIn: '1d'
        }
    })
}

export const jwtPlugin = fp(registerJwt)
