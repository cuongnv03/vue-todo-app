const todoResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        title: { type: 'string' },
        isCompleted: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
    }
}

const todoIdParamsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: {
            type: 'string',
            pattern: '^[0-9]+$'
        }
    }
}

export const getTodosSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: todoResponseSchema
                }
            }
        }
    }
}

export const createTodoSchema = {
    body: {
        type: 'object',
        required: ['title'],
        additionalProperties: false,
        properties: {
            title: {
                type: 'string',
                minLength: 1
            },
            isCompleted: {
                type: 'boolean',
                default: false
            }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                data: todoResponseSchema
            }
        }
    }
}

export const updateTodoSchema = {
    params: todoIdParamsSchema,
    body: {
        type: 'object',
        additionalProperties: false,
        minProperties: 1,
        properties: {
            title: {
                type: 'string',
                minLength: 1
            },
            isCompleted: {
                type: 'boolean'
            }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: todoResponseSchema
            }
        }
    }
}

export const deleteTodoSchema = {
    params: todoIdParamsSchema
}