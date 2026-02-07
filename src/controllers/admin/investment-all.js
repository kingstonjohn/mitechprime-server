import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { InvestmentPlanModel } from '../../models/investmentPlan.js';

export const allInvestmentPlan = catchAsync(async (request, response) => {

    const data = await InvestmentPlanModel.find().sort({"createdAt": -1}).exec();

    AppResponse(response, 200, data, "Success")
})
