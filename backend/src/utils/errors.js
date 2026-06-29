export class AppError extends Error {
    constructor(message, statusCode = 500, code = 'APP_ERROR') {
        super(message)
        this.statusCode = statusCode
        this.code = code
    }
}

export class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(message, 400, 'BAD_REQUEST')
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED')
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflict') {
        super(message, 409, 'CONFLICT')
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Not found') {
        super(message, 404, 'NOT_FOUND')
    }
}
