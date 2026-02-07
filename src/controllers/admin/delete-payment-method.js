import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositMethodModel } from '../../models/depositMethod.js';

export const deletePaymentMethod = catchAsync(async (request, response) => {

    const { uid } = request.params

    await DepositMethodModel.findByIdAndDelete(uid);

    AppResponse(response, 200, null, "Successly deleted")
})
