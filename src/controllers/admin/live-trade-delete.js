import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LiveTradePlanModel } from '../../models/liveTradePlan.js';

export const deleteLiveTradePlan = catchAsync(async (request, response) => {

    const { uid } = request.params

    await LiveTradePlanModel.findByIdAndDelete(uid);

    AppResponse(response, 200, null, "Successfully deleted")
})
