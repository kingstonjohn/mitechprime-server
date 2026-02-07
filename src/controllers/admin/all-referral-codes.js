import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { ReferralCodeModel } from '../../models/referralCode.js';

export const allReferralCodes = catchAsync(async (request, response) => {

    const data = await ReferralCodeModel.find().sort({ createdAt: -1 });

    AppResponse(response, 200, data, "Success")
})
