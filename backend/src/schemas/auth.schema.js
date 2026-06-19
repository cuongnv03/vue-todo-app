const publicUserSchema = {
    type: 'object',
    properties: { 
        id: { type: 'number' }, 
        username: { type: 'string' } 
    }
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
            properties: { 
                message: { type: 'string' }, 
                user: publicUserSchema 
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
            properties: { 
                token: { type: 'string' }, 
                user: publicUserSchema 
            }
        }
    },
};