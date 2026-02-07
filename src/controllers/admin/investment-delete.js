import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { InvestmentPlanModel } from '../../models/investmentPlan.js';

export const deleteInvestmentPlan = catchAsync(async (request, response) => {

    const { uid } = request.params

    await InvestmentPlanModel.findByIdAndDelete(uid);

    AppResponse(response, 200, null, "Successly deleted")
})
