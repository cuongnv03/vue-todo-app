export function mapUserRow(row) {
    if (!row) {
        return null
    }

    return {
        id: row.id,
        username: row.username,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    }
}

export function mapPublicUser(user) {
    if (!user) {
        return null
    }

    return {
        id: user.id,
        username: user.username
    }
}

export function mapTodoRow(row) {
    if (!row) {
        return null
    }

    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        isCompleted: Boolean(row.is_completed),
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString()
    }
}