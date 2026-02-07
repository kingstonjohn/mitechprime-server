import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserInvestmentModel } from '../../models/userInvestmentPlan.js';
import { UserLivetradeModel } from '../../models/userLiveTrade.js';

export const userInfo = catchAsync(async (request, response) => {

    if (!request.user) {
        throw new AppError('Unauthorized!', 401);
    }

    // if (!request.user?.isEmailVerified) {
    //     throw new AppError('Unauthorized!', 401);
    // }

    const userInvestment = await UserInvestmentModel.find({ userId: request?.user?._id})

    const userLivetrade = await UserLivetradeModel.find({ userId: request?.user?._id})

    const tradingStatus = userInvestment.length !== 0 || userLivetrade.length !== 0 ;

    AppResponse(
        response,
        200,
        {
            user: {
                ...request.user._doc,
                tradingStatus
            },
        },
        "Authorised",
    );
})
