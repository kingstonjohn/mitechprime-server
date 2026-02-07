import { APP_ROLES } from '../../common/constants/index.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserModel } from '../../models/user.js';

export const allUsers = catchAsync(async (request, response) => {

    const users = await UserModel.find({ role: APP_ROLES.Client }).sort({"createdAt": -1}).exec();

    AppResponse(response, 200, users, "Success")
})
