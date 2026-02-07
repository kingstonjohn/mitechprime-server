import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositMethodModel } from '../../models/depositMethod.js';

export const getPaymentMethod = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await DepositMethodModel.findById(uid);

    AppResponse(response, 200, data, "Success")
})
