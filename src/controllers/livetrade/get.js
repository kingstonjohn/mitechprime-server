import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserLivetradeModel } from '../../models/userLiveTrade.js';

export const getLiveTrade = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await UserLivetradeModel.find({ userId: uid }).populate('livetradeId').exec();

    if(!data) {
        AppResponse(response, 201, data, 'You currently do not have any active plan')
    }

    AppResponse(response, 201, data, 'success')
})
