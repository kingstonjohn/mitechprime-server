import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { InvestmentPlanModel } from '../../models/investmentPlan.js';

export const addInvestmentPlan = catchAsync(async (request, response) => {

    const { level, minimumDeposit, maximumDeposit, rio, tradeCommission, supportDuration } = request.body

    if(!level || !minimumDeposit || !maximumDeposit || !rio || !tradeCommission || !supportDuration){
        throw new AppError('All fields required', 400)
    }

    await InvestmentPlanModel.create({ level, minimumDeposit, maximumDeposit, rio, tradeCommission, supportDuration });

    AppResponse(response, 201, null , "Investment plan created")
})
