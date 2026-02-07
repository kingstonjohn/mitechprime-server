import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserProfitModel } from "../../models/user-profit.js";
import { UserModel } from "../../models/user.js";

export const profitDelete = catchAsync(async (request, response) => {

    const { uid, id } = request.params

    if(!uid){
        throw new AppError('User ID required', 400)
    }

    if(!id){
        throw new AppError('Profit ID required', 400)
    }

    await UserProfitModel.findByIdAndDelete(id);

    const userProfitData = await UserProfitModel.find({ userId: uid }).exec();

    const totalProfit = userProfitData.reduce((sum, current) => sum + current.amount, 0);

    await UserModel.findByIdAndUpdate(uid,
        { $set: { totalProfit } },
        { new: true } 
      );

    AppResponse(response, 200, null , "Profit deleted")
})