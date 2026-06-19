import { 
    findTodosByUserId,
    createTodoRecord,
    updateTodoByIdAndUserId,
    deleteTodoByIdAndUserId
 } from "../repositories/todo.repository.js"

import { 
    BadRequestError,
    NotFoundError
 } from "../utils/errors.js"

export async function getTodosByUserId(userId) {
    return findTodosByUserId(userId)
}

export async function createTodo(userId, input) {
    const title = input.title.trim()

    if (!title) {
        throw new BadRequestError('Title is required')
    }

    return createTodoRecord({
        userId,
        title,
        isCompleted: input.isCompleted ?? false
    })
}

export async function updateTodo(userId, todoId, input) {
    const updateData = {}

    if (typeof input.title === 'string') {
        const title = input.title.trim()

        if (!title) {
            throw new BadRequestError('Title is required')
        }

        updateData.title = title
    }

    if (typeof input.isCompleted === 'boolean') {
        updateData.isCompleted = input.isCompleted
    }

    const todo = await updateTodoByIdAndUserId(todoId, userId, updateData)

    if (!todo) {
        throw new NotFoundError('Todo not found')
    }

    return todo
}

export async function deleteTodo(userId, todoId) {
    const deleted = await deleteTodoByIdAndUserId(todoId, userId)

    if (!deleted) {
        throw new NotFoundError('Todo not found')
    }

    return true
}