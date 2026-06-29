import {
    getTodosSchema,
    createTodoSchema,
    updateTodoSchema,
    deleteTodoSchema
 } from '../schemas/todo.schema.js'

import { 
    getTodosByUserId,
    createTodo,
    updateTodo,
    deleteTodo
 } from '../services/todo.service.js'
import { successResponse } from '../utils/responses.js'

export async function todoRoutes(fastify) {
    fastify.addHook('preHandler', fastify.authenticate)

    fastify.get('/', {
        schema: getTodosSchema
    }, async function getTodosHandler(request) {
        const userId = request.user.id

        const todos = await getTodosByUserId(userId)

        return successResponse(todos, {
            meta: {
                count: todos.length
            }
        })
    })

    fastify.post('/', {
        schema: createTodoSchema
    }, async function createTodoHandler(request, reply) {
        const userId = request.user.id
        
        const todo = await createTodo(userId, request.body)

        return reply.code(201).send({
            ...successResponse(todo)
        })
    })

    fastify.put('/:id', {
        schema: updateTodoSchema
    }, async function updateTodoHandler(request) {
        const userId = request.user.id
        const todoId = Number(request.params.id)
        
        const todo = await updateTodo(userId, todoId, request.body)

        return successResponse(todo)
    })

    fastify.delete('/:id', {
        schema: deleteTodoSchema
    }, async function deleteTodoHandler(request, reply) {
        const userId = request.user.id
        const todoId = Number(request.params.id)

        await deleteTodo(userId, todoId)

        return reply.code(204).send()
    })
}
