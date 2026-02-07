import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserProfitModel } from "../../models/user-profit.js";

export const profitSingle = catchAsync(async (request, response) => {

    const { id } = request.params

    if(id){
        throw new AppError('User profit ID required', 400)
    }

    const data = await UserProfitModel.findById(id).exec();

    AppResponse(response, 200, data , "Profit data updated")
})