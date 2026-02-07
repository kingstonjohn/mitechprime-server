import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserInvestmentModel } from '../../models/userInvestmentPlan.js';

export const getInvestmentTrade = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await UserInvestmentModel.find({ userId: uid }).populate('investmentId').exec();

    if(!data) {
        AppResponse(response, 201, data, 'You currently do not have any active plan')
    }

    AppResponse(response, 201, data, 'success')
})
