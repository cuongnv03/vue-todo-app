import { 
    findUserByUsername,
    createUser
 } from "../repositories/user.repository.js"
import { mapPublicUser } from "../repositories/mappers.js"
import { 
    hashPassword,
    verifyPassword
 } from "../utils/password.js"
import { 
    ConflictError,
    UnauthorizedError
 } from "../utils/errors.js"

export async function registerUser({ username, password }) {
    const normalizedUsername = username.trim()
    const existingUser = await findUserByUsername(normalizedUsername)

    if (existingUser) {
        throw new ConflictError('Username already exists')
    }

    const passwordHash = await hashPassword(password)

    const user = await createUser({
        username: normalizedUsername,
        passwordHash
    })

    return mapPublicUser(user)
}

export async function loginUser({ username, password }) {
    const normalizedUsername = username.trim()

    const user = await findUserByUsername(normalizedUsername)

    if (!user) {
        throw new UnauthorizedError('Invalid username or password')
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash)

    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid username or password')
    }

    return mapPublicUser(user)
}