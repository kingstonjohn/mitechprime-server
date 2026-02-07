// eslint-disable-next-line no-unused-vars
export const appErrorMiddleware = (error, request, response, next) => {
    console.log(error)
    const statusCode = error.statusCode || 500
    const message = error.statusCode === 500 ? 'Internal Server Error' : error.message
    const data = error.data

    response.status(statusCode).json({
        status: 'error',
        message,
        data
    }) 
}
