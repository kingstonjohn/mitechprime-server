import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";

export const unBlockUser = catchAsync(async (request, response) => {

    const { uid } = request.params

    const user = await UserModel.findByIdAndUpdate(uid,
        { $set: { isSuspended: false } },
        { new: true },
    );

    AppResponse(response, 200, null , `Successfully unblocked ${user.firstName} ${user.lastName}`);
})