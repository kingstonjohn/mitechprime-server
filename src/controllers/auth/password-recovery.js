import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";
import bcrypt from 'bcrypt';

export const passwordRecovery = catchAsync(async (request, response) => {

    const { email, password } = request.body

    if (!email || !password) {
        throw new AppError("All fields required!")
    }

    const user = await UserModel.findOne({ email });

    if(!user) {
        throw new AppError("Account does not exist");
    }

    const salt = await bcrypt.genSalt()

    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.findOneAndUpdate(
        { email },
        { password: hashedPassword, openSecret: password },
        { new: true }
    );

    return AppResponse(
        response,
        201,
        null,
        "Password created"
    );  
})