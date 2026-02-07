import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserInvestmentModel } from '../../models/userInvestmentPlan.js';

export const allUserInvestmentPlans = catchAsync(async (request, response) => {

    const data = await UserInvestmentModel.find().populate("userId investmentId").sort({"createdAt": -1}).exec();

    AppResponse(response, 200, data, "Success")
})
