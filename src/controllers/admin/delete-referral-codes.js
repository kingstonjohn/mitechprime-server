import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { ReferralCodeModel } from "../../models/referralCode.js";

export const referralCodesDelete = catchAsync(async (request, response) => {

    const { id } = request.params

    if(!id){
        throw new AppError('Referral code ID required', 400)
    }

    await ReferralCodeModel.findByIdAndDelete(id);

    AppResponse(response, 200, null , "Referral code deleted")
})