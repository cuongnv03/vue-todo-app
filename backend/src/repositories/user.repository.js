import { db } from "../config/database.js"
import { mapUserRow } from "./mappers.js"

export async function findUserByUsername(username) {
    const row = await db('users')
        .where({ username })
        .first()

    return mapUserRow(row)
}

export async function findUserById(id) {
    const row = await db('users')
        .where({ id })
        .first()

    return mapUserRow(row)
}

export async function createUser({ username, passwordHash }) {
    await db('users').insert({
        username,
        password_hash: passwordHash
    })

    const row = await db('users')
        .where({ username })
        .first()

    return mapUserRow(row)
}