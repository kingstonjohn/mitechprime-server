import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { OtpModel } from "../../models/otp.js";

export const sendEmailOtpVerify = catchAsync(async (request, response) => {

    const { otp, email } = request.body

    if (!otp || !email) {
        throw new AppError("All fields required!")
    }
    
    const otpList = await OtpModel.find({ email });

    const recentOtp = otpList[otpList.length - 1]

    if(recentOtp?.otp !== otp) {
        throw new AppError("OTP verification failed", 400)
    } 
    
    AppResponse(response, 200, null, "Otp verification success")
})