const catchAsync = (fn) => {
    return (request, response, next) => {
        Promise.resolve(fn(request, response, next)).catch(next)
    }
}

export { catchAsync }
