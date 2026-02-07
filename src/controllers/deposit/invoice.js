import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositModel } from '../../models/deposit.js';

export const getInvoice = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await DepositModel.findById(uid).populate("depositMethodId").exec();

    AppResponse(response, 200, data, "Success")
})
