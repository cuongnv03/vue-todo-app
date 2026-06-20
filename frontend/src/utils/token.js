const TOKEN_KEY = 'access_token'
const USER_KEY = 'auth_user'

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export function getUser() {
    const rawUser = localStorage.getItem(USER_KEY)

    if (!rawUser) {
        return null
    }

    try {
        return JSON.parse(rawUser)
    } catch {
        return null
    }
}

export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function removeUser() {
    localStorage.removeItem(USER_KEY)
}