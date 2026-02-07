import { APP_ROLES } from '../../common/constants/index.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'

export const adminInfo = catchAsync(async (request, response) => {

    if(!request?.user) {
        throw new AppError('Unauthorized!', 401);
    }

    if(!request?.user?.isEmailVerified) {
        throw new AppError('Unauthorized!', 401);
    }

    if(request?.user?.role !== APP_ROLES.Admin){
        throw new AppError('Unauthorized!', 401);
    }

    AppResponse(response, 200, { user: request.user }, "Authorised")

})
