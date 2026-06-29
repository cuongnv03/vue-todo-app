export function isUniqueConstraintError(error) {
    return error?.number === 2601 || error?.number === 2627
}
