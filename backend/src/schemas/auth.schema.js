const publicUserSchema = {
    type: 'object',
    required: ['id', 'username'],
    additionalProperties: false,
    properties: { 
        id: { type: 'number' }, 
        username: { type: 'string' } 
    }
}

const successSchema = {
    type: 'boolean',
    const: true
}

export const registerSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        additionalProperties: false,
        properties: {
            username: { type: 'string', minLength: 1 },
            password: { type: 'string', minLength: 6 }
        }
    },
    response: {
        201: {
            type: 'object',
            required: ['success', 'message', 'data'],
            additionalProperties: false,
            properties: { 
                success: successSchema,
                message: { type: 'string' },
                data: {
                    type: 'object',
                    required: ['user'],
                    additionalProperties: false,
                    properties: {
                        user: publicUserSchema
                    }
                }
            }
        }
    }
}

export const loginSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        additionalProperties: false,
        properties: {
            username: { type: 'string', minLength: 1 },
            password: { type: 'string', minLength: 1 },
        }
    },
    response: {
        200: {
            type: 'object',
            required: ['success', 'data'],
            additionalProperties: false,
            properties: { 
                success: successSchema,
                data: {
                    type: 'object',
                    required: ['token', 'user'],
                    additionalProperties: false,
                    properties: {
                        token: { type: 'string' },
                        user: publicUserSchema
                    }
                }
            }
        }
    },
};
