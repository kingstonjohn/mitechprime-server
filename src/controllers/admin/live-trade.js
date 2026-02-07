import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LiveTradePlanModel } from '../../models/liveTradePlan.js';

export const getLiveTradePlan = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await LiveTradePlanModel.findById(uid);

    AppResponse(response, 200, data, "Success")
})
