import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositMethodModel } from '../../models/depositMethod.js';

export const addPaymentMethod = catchAsync(async (request, response) => {

    const { name, image, address, type, value } = request.body

    if(!name || !image || !address || !type || !value){
        throw new AppError('All fields required', 400)
    }

    await DepositMethodModel.create({ name, image, address, type, value });

    AppResponse(response, 200, null , "Payment method created")
})
