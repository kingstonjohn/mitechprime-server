import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { generateRandom4Digit } from "../../common/utils/helper.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { OtpModel } from "../../models/otp.js";
import { UserModel } from "../../models/user.js";
import { addEmailToQueue } from "../../queues/emailQueue.js";

export const sendEmailOtp = catchAsync(async (request, response) => {

    const { email } = request.body

    if(!email) {
        throw new AppError("All fields are required");
    }

    const user = await UserModel.findOne({ email });

    if(!user) {
        throw new AppError("Account does not exist");
    }

    const otp = generateRandom4Digit()

    await OtpModel.create({ email, countryCode: user.countryCode, phoneNumber: user.phoneNumber, otp })

    // add email to queue
    addEmailToQueue({
        type: 'passwordRecovery',
        data: {
            to: user.email,
            otp,
            priority: 'high',
            name: user.firstName + "" + user.lastName,
        },
    });

    return AppResponse(
        response,
        201,
        null,
        "Otp sent to your email"
    );  
})