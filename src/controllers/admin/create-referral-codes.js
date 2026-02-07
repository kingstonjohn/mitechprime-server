import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { ReferralCodeModel } from "../../models/referralCode.js";

export const referralCodesCreate = catchAsync(async (request, response) => {

    const { referralCode } = request.body

    if(!referralCode){
        throw new AppError('Referral code required', 400)
    }

    await ReferralCodeModel.create({ referralCode });

    AppResponse(response, 200, null , "Referral code created")
})