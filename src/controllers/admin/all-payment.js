import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositMethodModel } from '../../models/depositMethod.js';

export const allPaymentMethod = catchAsync(async (request, response) => {

    const data = await DepositMethodModel.find();

    AppResponse(response, 200, data, "Success")
})
