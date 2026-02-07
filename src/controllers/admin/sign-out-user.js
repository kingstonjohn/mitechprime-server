import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js"
import { UserModel } from "../../models/user.js";

export const signOutUser = catchAsync(async (request, response) => {

    const { uid } = request.params

    const user = await UserModel.findByIdAndUpdate(uid,
        { $set: { isActive: false } },
        { new: true },
    );

    AppResponse(response, 200, null , `Successfully signed out ${user.firstName} ${user.lastName}`);
})