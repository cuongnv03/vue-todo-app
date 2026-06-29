const todoResponseSchema = {
    type: 'object',
    required: ['id', 'userId', 'title', 'isCompleted', 'createdAt', 'updatedAt'],
    additionalProperties: false,
    properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        title: { type: 'string' },
        isCompleted: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
    }
}

const successSchema = {
    type: 'boolean',
    const: true
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
            required: ['success', 'data', 'meta'],
            additionalProperties: false,
            properties: {
                success: successSchema,
                data: {
                    type: 'array',
                    items: todoResponseSchema
                },
                meta: {
                    type: 'object',
                    required: ['count'],
                    additionalProperties: false,
                    properties: {
                        count: { type: 'number' }
                    }
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
            required: ['success', 'data'],
            additionalProperties: false,
            properties: {
                success: successSchema,
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
            required: ['success', 'data'],
            additionalProperties: false,
            properties: {
                success: successSchema,
                data: todoResponseSchema
            }
        }
    }
}

export const deleteTodoSchema = {
    params: todoIdParamsSchema
}
