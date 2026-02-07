import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";

export const preferenceSet = catchAsync(async (request, response) => {

    const { uid, preference } = request.body

    if(!uid){
        throw new AppError('User ID required', 400)
    }

    if(!preference){
        throw new AppError('Preference required', 400)
    }

    await UserModel.findByIdAndUpdate(uid,
        { $set: { preference } },
        { new: true, runValidators: false },
    );

    AppResponse(response, 200, null , "Preference set")
})