import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LiveTradePlanModel } from '../../models/liveTradePlan.js';

export const addLiveTradePlan = catchAsync(async (request, response) => {

    const { planName, minimumDeposit, maximumDeposit, rio, rioInterval, duration, minimumReturn, maximumReturn } = request.body

    if(!planName || !minimumDeposit || !maximumDeposit || !rio || !rioInterval || !duration || !minimumReturn || !maximumReturn){
        throw new AppError('All fields required', 400)
    }

    await LiveTradePlanModel.create({ planName, minimumDeposit, maximumDeposit, rio, rioInterval, duration, minimumReturn, maximumReturn });

    AppResponse(response, 201, null , "Live trade plan created");
})
