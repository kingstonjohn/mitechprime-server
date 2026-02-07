import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { InvestmentPlanModel } from '../../models/investmentPlan.js';

export const getInvestmentPlan = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await InvestmentPlanModel.findById(uid);

    AppResponse(response, 200, data, "Success")
})
