import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { InvestmentPlanModel } from '../../models/investmentPlan.js';

export const editInvestmentPlan = catchAsync(async (request, response) => {

    const { uid } = request.params

    const { level, minimumDeposit, maximumDeposit, rio, tradeCommission, supportDuration } = request.body

    if(!level || !minimumDeposit || !maximumDeposit || !rio || !tradeCommission || !supportDuration){
        throw new AppError('All fields required', 400)
    }

    await InvestmentPlanModel.findByIdAndUpdate(uid,
        { $set: { level, minimumDeposit, maximumDeposit, rio, tradeCommission, supportDuration } },
        { new: true },
    );

    AppResponse(response, 200, null , "Update successful")
})
