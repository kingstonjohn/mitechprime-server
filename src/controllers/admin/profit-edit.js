import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserProfitModel } from "../../models/user-profit.js";
import { UserModel } from "../../models/user.js";

export const profitEdit = catchAsync(async (request, response) => {

    const { uid } = request.params

    const { _id, amount } = request.body

    if(!_id || !amount){
        throw new AppError('All fields required', 400)
    }

    if(isNaN(amount)){
        throw new AppError("Enter a valid amount");
    }

    if(amount < 1){
        throw new AppError("Amount must be greater than $0")
    }

    await UserProfitModel.findByIdAndUpdate(_id,
        { $set: { amount } },
        { new: true },
    );

    const userProfitData = await UserProfitModel.find({ userId: uid }).exec();

    const totalProfit = userProfitData.reduce((sum, current) => sum + current.amount, 0);

    await UserModel.findByIdAndUpdate(uid,
        { $set: { totalProfit } },
        { new: true },
    );

    AppResponse(response, 200, null , "Profit data updated")
})