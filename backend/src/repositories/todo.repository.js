import { db } from "../config/database.js"
import { mapTodoRow } from "./mappers.js"

export async function findTodosByUserId(userId) {
    const rows = await db('todos')
        .where({ user_id: userId })
        .orderBy('created_at', 'desc')

    return rows.map(mapTodoRow)
}

export async function findTodoByIdAndUserId(todoId, userId) {
    const row = await db('todos')
        .where({
            id: todoId,
            user_id: userId
        })
        .first()

    return mapTodoRow(row)
}

export async function createTodoRecord({ userId, title, isCompleted = false }) {
    const [row] = await db('todos')
        .insert({
            user_id: userId,
            title,
            is_completed: isCompleted
        }, ['id', 'user_id', 'title', 'is_completed', 'created_at', 'updated_at'])

    return mapTodoRow(row)
}

export async function updateTodoByIdAndUserId(todoId, userId, updateData) {
    const dataToUpdate = {
        updated_at: db.fn.now()
    }

    if (typeof updateData.title === 'string') {
        dataToUpdate.title = updateData.title
    }

    if (typeof updateData.isCompleted === 'boolean') {
        dataToUpdate.is_completed = updateData.isCompleted
    }

    const affectedRows = await db('todos')
        .where({
            id: todoId,
            user_id: userId
        })
        .update(dataToUpdate)
    
    if (affectedRows === 0) {
        return null
    }

    return findTodoByIdAndUserId(todoId, userId)
}

export async function deleteTodoByIdAndUserId(todoId, userId) {
    const affectedRows = await db('todos')
        .where({
            id: todoId,
            user_id: userId
        })
        .delete()
    
    return affectedRows > 0
}
