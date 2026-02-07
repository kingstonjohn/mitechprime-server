import { ENVIRONMENT } from "../../common/config/environment.js"
import AppError from "../../common/utils/appError.js"
import { AppResponse } from "../../common/utils/appResponse.js"
import { hashData } from "../../common/utils/helper.js"
import { catchAsync } from "../../middlewares/catchAsyncError.js"
import { LoginActivityModel } from "../../models/login-activity.js"
import { OtpModel } from "../../models/otp.js"
import { UserModel } from "../../models/user.js"

export const otpVerify = catchAsync(async (request, response) => {

    const { otp, email } = request.body

    if (!otp || !email) {
        throw new AppError("All fields required!")
    }
    
    const otpList = await OtpModel.find({ email });

    const recentOtp = otpList[otpList.length - 1]

    if(recentOtp?.otp !== otp) {
        throw new AppError("OTP verification failed", 400)
    } 

    const user = await UserModel.findOne({ email }).select('+firstName +lastName +gender');

    if(user.isEmailVerified){
        return AppResponse(response, 200, { user }, "Email already verified")
    }

    await UserModel.updateOne({ _id: user._id }, {
        isEmailVerified: true
    });

    const token = await hashData({ id: user._id }, { expiresIn: ENVIRONMENT.JWT_EXPIRES_IN.ACCESS });

    const userIp = request.ip || request.connection.remoteAddress;
    const userAgent = request.headers['user-agent']

    await LoginActivityModel.create({
        email,
        deviceInfo: userAgent,
        ipAddress: userIp,
        activity: 'OTP'
    })
    
    AppResponse(response, 200, { user, token }, "Otp verification success")
})
