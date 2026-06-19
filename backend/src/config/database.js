import knex from 'knex'
import { env } from './env.js'

export const db = knex({
    client: 'mssql',
    connection: {
        server: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
        options: {
            encrypt: env.db.encrypt,
            trustServerCertificate: env.db.trustServerCertificate
        }
    },
    pool: {
        min: 0,
        max: 10
    }
})