import { CustomError } from 'ts-custom-error'

export default class AppError extends CustomError {
    constructor(message, statusCode = 400, data = null) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('5') ? 'Failed' : 'Error'
        this.isOperational = true
        this.data = data

        Error.captureStackTrace(this)
    }
}
