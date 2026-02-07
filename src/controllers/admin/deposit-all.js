import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositModel } from '../../models/deposit.js';

export const allDeposits = catchAsync(async (request, response) => {

    const data = await DepositModel.find().populate("userId depositMethodId").sort({"createdAt": -1}).exec();

    AppResponse(response, 200, data, "Success")
})
