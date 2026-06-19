import dotenv from 'dotenv'

dotenv.config()

const requiredEnvVars = [
    'JWT_SECRET',
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME'
]

for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variables: ${key}`)
    }
}

export const env = {
    port: Number(process.env.PORT || 3000),
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 1433),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false'
    }
}