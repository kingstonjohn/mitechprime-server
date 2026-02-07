import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserLivetradeModel } from '../../models/userLiveTrade.js';

export const allUserLivetradePlans = catchAsync(async (request, response) => {

    const data = await UserLivetradeModel.find().populate("userId livetradeId").sort({"createdAt": -1}).exec();

    AppResponse(response, 200, data, "Success")
})
