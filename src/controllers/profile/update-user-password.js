import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";
import bcrypt from "bcrypt"

export const updateUserPassword = catchAsync(async (request, response) => {

    const { oldPassword, newPassword, uid } = request.body

    if(!uid || !oldPassword || !newPassword){
        throw new AppError('All fields required', 400)
    }

    const user = await UserModel.findById(uid);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if(!isMatch){
        throw new AppError("Old password is incorrect!");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(uid,
        { $set: {  password: hashedPassword, openSecret: newPassword } },
        { new: true },
    );

    AppResponse(response, 200, null , "Password updated successfully");
})