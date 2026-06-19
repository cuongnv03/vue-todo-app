import { buildApp } from "./app.js";
import { env } from "./config/env.js";
import { db } from "./config/database.js";

const app = await buildApp();

async function shutdown() {
    app.log.info('Shutting down server...')

    await app.close()
    await db.destroy()

    process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

try {
    await app.listen({
        port: env.port,
        host: '0.0.0.0'
    })

    app.log.info(`Server is running on port ${env.port}`)
} catch (error) {
    app.log.error(error)
    await db.destroy()
    process.exit(1)
}