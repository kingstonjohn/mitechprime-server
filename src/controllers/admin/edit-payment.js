import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositMethodModel } from '../../models/depositMethod.js';

export const editPaymentMethod = catchAsync(async (request, response) => {

    const { uid } = request.params

    const { name, image, address, value } = request.body

    if(!name || !image || !address || !value){
        throw new AppError('All fields required', 400)
    }

    await DepositMethodModel.findByIdAndUpdate(uid,
        { $set: { name, image, address, value } },
        { new: true },
    );

    AppResponse(response, 200, null , "Payment method updated")
})
