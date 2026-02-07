import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserModel } from '../../models/user.js';

export const updateUserDetails = catchAsync(async (request, response) => {

    const { uid } = request.params
    await UserModel.findByIdAndUpdate(uid,
        { $set: request.body },
        { new: true },
    );

    AppResponse(response, 200, null, "Update successful")
})
