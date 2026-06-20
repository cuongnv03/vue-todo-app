export function getFirstValidationMessage(errors, fallback = 'Invalid input') {
    if (!errors || errors.length === 0) {
        return fallback
    }

    const firstError = errors[0]

    if (firstError.message) {
        return firstError.message
    }

    return fallback
}