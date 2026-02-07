import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LiveTradePlanModel } from '../../models/liveTradePlan.js';

export const allLiveTrade = catchAsync(async (request, response) => {

    const data = await LiveTradePlanModel.find();

    AppResponse(response, 200, data, "Success")
})