import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { WithdrawalModel } from '../../models/withdrawal.js';

export const allWithdrawals = catchAsync(async (request, response) => {

    const data = await WithdrawalModel.find().populate("userId").sort({"createdAt": -1}).exec();

    AppResponse(response, 200, data, "Success")
})
