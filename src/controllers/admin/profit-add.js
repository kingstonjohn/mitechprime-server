import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserProfitModel } from "../../models/user-profit.js";
import { UserModel } from "../../models/user.js";

export const profitAdd = catchAsync(async (request, response) => {

    const { amount, date, uid } = request.body

    if(!uid){
        throw new AppError('User ID required', 400)
    }

    if(!amount){
        throw new AppError('Amount required', 400)
    }

    if(isNaN(amount)){
        throw new AppError("Enter a valid amount");
    }

    const data = await UserProfitModel.create({ userId: uid, amount, date });

    await UserModel.findByIdAndUpdate(uid,
        { $inc: { totalProfit: data.amount } },
        { new: true } 
      );

    AppResponse(response, 200, null , "Profit added")
})