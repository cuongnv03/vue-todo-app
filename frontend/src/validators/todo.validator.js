import Ajv from 'ajv'

const ajv = new Ajv({
    allErrors: true
})

const createTodoSchema = {
    type: 'object',
    required: ['title'],
    additionalProperties: false,
    properties: {
        title: {
            type: 'string',
            minLength: 1
        }
    }
}

const validateCreateTodo = ajv.compile(createTodoSchema)

export function validateTodoForm(form) {
    const input = {
        title: form.title.trim()
    }

    if (!input.title) {
        return {
            valid: false,
            errors: [
                {
                    message: 'Title is required'
                }
            ],
            data: input
        }
    }

    const valid = validateCreateTodo(input)

    return {
        valid,
        errors: validateCreateTodo.errors || [],
        data: input
    }
}