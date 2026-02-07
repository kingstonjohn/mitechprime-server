import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserModel } from '../../models/user.js';

export const getUserDetails = catchAsync(async (request, response) => {

    const { uid } = request.params

    const user = await UserModel.findById(uid);

    AppResponse(response, 200, user, "Authorised")
})
