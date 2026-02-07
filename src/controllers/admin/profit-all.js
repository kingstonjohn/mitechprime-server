import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserProfitModel } from "../../models/user-profit.js";

export const profitAll = catchAsync(async (request, response) => {

    const { uid } = request.params

    if(!uid){
        throw new AppError('User ID required', 400)
    }

    const userProfitData = await UserProfitModel.find({ userId: uid }).sort({"createdAt": -1}).exec();

    AppResponse(response, 200, userProfitData , "Profit data updated")
})