import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";

export const updateProfileName = catchAsync(async (request, response) => {

    const { uid, firstName, lastName } = request.body

    if(!uid || !firstName || !lastName){
        throw new AppError('All fields required', 400)
    }

    const user = await UserModel.findByIdAndUpdate(uid,
        { $set: {  firstName, lastName } },
        { new: true },
    );

    AppResponse(response, 200, user , "Profile name updated successfully")
})