import jwt from "jsonwebtoken";
import AppError from "../../common/utils/appError.js";
import { ENVIRONMENT } from "../../common/config/environment.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";
import { APP_ROLES } from "../../common/constants/index.js";

export const protectAdmin = catchAsync(async (request, response, next) => {

    //authorization -> Bearer token
    const { authorization } = request.headers

    if (!authorization) {
        throw new AppError('Unauthorized!', 401)
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, ENVIRONMENT.JWT.ACCESS_KEY, (error, payload) => {
        if (error) {
            throw new AppError('Unauthorized!', 401);
        }

        const { id } = payload;

        UserModel.findById(id)
            .then(_user => {
                const user = _user
                if (user?.password) {
                    user.password = undefined
                }
                if (!user?.isEmailVerified) {
                    request.user = null;

                    throw new AppError('Unauthorized!', 401)
                }
                if (user?.role !== APP_ROLES.Admin) {
                    request.user = null;

                    throw new AppError('Unauthorized!', 401)
                } else {
                    request.user = user
                }
                // forward the request to the next middleware or next route
                next();
            })
            .catch(error => {
                console.log("Protect Admin Error:", error);
                request.user = null;
                return response.status(error.statusCode || 500).json({
                    error: error.message || "Internal Server Error"
                });
            })
    })
})