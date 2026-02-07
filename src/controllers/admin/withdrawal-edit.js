import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { WithdrawalModel } from "../../models/withdrawal.js";

export const withdrawalEdit = catchAsync(async (request, response) => {

    const { _id, amount, date, walletType } = request.body

    if(!_id || !amount || !date || !walletType){
        throw new AppError('All fields required', 400)
    }

    await WithdrawalModel.findByIdAndUpdate(_id,
        { $set: { amount, date, walletType } },
        { new: true, runValidators: false },
    );

    AppResponse(response, 200, null , "Update successful")
})
