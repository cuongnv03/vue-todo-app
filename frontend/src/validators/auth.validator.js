import Ajv from 'ajv'

const ajv = new Ajv({
    allErrors: true
})

const loginSchema = {
    type: 'object',
    required: ['username', 'password'],
    additionalProperties: false,
    properties: {
        username: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 1 }
    }
}

const registerSchema = {
    type: 'object',
    required: ['username', 'password'],
    additionalProperties: false,
    properties: {
        username: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 6 }
    }
}

const validateLogin = ajv.compile(loginSchema)
const validateRegister = ajv.compile(registerSchema)

export function validateLoginForm(form) {
    const input = {
        username: form.username.trim(),
        password: form.password
    }

    const valid = validateLogin(input)

    return {
        valid,
        errors: validateLogin.errors || [],
        data: input
    }
}

export function validateRegisterForm(form) {
    const input = {
        username: form.username.trim(),
        password: form.password
    }

    const valid = validateRegister(input)

    return {
        valid,
        errors: validateRegister.errors || [],
        data: input
    }
}