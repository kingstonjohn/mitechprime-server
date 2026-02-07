import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js"
import { UserModel } from "../../models/user.js";

export const blockUser = catchAsync(async (request, response) => {

    const { uid } = request.params

    const user = await UserModel.findByIdAndUpdate(uid,
        { $set: { isSuspended: true } },
        { new: true },
    );

    AppResponse(response, 200, null , `Successfully blocked ${user.firstName} ${user.lastName}`);
})