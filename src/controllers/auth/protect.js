import jwt from "jsonwebtoken";
import AppError from "../../common/utils/appError.js";
import { ENVIRONMENT } from "../../common/config/environment.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";
import UAParser from "ua-parser-js"

export const protect = catchAsync(async (request, response, next) => {

    //authorization -> Bearer token

    const { authorization } = request.headers

    if (!authorization) {
        throw new AppError('Unauthorized!', 401)
    }

    const token = authorization.replace("Bearer ", "")

    if (token == "null") {
        throw new AppError('Unauthorized!', 401)
    }

    jwt.verify(token, ENVIRONMENT.JWT.ACCESS_KEY, (error, payload) => {
        if (error) {
            console.log(error)
            throw new AppError('Unauthorized!', 401);
        }

        const { id } = payload;

        (async () => {
            try {

                const user = await UserModel.findById(id)

                // check if user is blocked
                if (user.isSuspended) {
                    request.user = undefined
                    throw new AppError('Your account is blocked', 401);
                }

                if (!user.isActive) {
                    request.user = undefined
                    throw new AppError('Unauthorized!', 401);
                }

                request.user = user

                // Activity tracker
                const userIp = request.ip || request.connection.remoteAddress;
                const userAgent = request.headers['user-agent']

                let parser = new UAParser(userAgent);

                let parserResults = parser.getResult();
                const deviceInformation = `Browser: ${parserResults.browser.name}, OS: ${parserResults.os.name}`

                // forward the request to the next middleware or next route
                next();
            }
            catch (error) {
                request.user = undefined
                console.log("Protect ", error)
                return next(new AppError('Unauthorized!', 401));
            }
        })()
    })
})