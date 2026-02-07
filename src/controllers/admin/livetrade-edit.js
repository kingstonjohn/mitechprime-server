import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LiveTradePlanModel } from '../../models/liveTradePlan.js';

export const editLiveTradePlan = catchAsync(async (request, response) => {

    const { uid } = request.params

    const { planName, minimumDeposit, maximumDeposit, rio, rioInterval, duration } = request.body

    if(!planName || !minimumDeposit || !maximumDeposit || !rio || !rioInterval || !duration){
        throw new AppError('All fields required', 400)
    }

    await LiveTradePlanModel.findByIdAndUpdate(uid,
        { $set: { planName, minimumDeposit, maximumDeposit, rio, rioInterval, duration } },
        { new: true },
    );

    AppResponse(response, 200, null , "Update successful")
})
