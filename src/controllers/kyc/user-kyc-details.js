import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { KycModel } from '../../models/kyc.js';

export const getUserKycDetails = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await KycModel.find({ userId: uid});

    AppResponse(response, 200, data , "Success")
})
