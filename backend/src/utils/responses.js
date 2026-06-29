export function successResponse(data = null, options = {}) {
    const response = {
        success: true,
        data
    }

    if (options.message) {
        response.message = options.message
    }

    if (options.meta) {
        response.meta = options.meta
    }

    return response
}

export function errorResponse(code, message, details) {
    const response = {
        success: false,
        error: {
            code,
            message
        }
    }

    if (details) {
        response.error.details = details
    }

    return response
}
