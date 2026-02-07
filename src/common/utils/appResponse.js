export function AppResponse(response, statusCode = 200, data, message) {
    response.status(statusCode).json({
        status: 'success',
        message: message ?? 'Success',
        data: data ?? null,
    })
}
