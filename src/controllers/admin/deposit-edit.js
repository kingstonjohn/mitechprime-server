import AppError from "../../common/utils/appError.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { DepositModel } from "../../models/deposit.js";
import { AppResponse } from "../../common/utils/appResponse.js";

export const depositEdit = catchAsync(async (request, response) => {

    const { _id, amount, date, name, type } = request.body

    if(!_id || !amount || !date || !name || !type){
        throw new AppError('All fields required', 400)
    }

    await DepositModel.findByIdAndUpdate(_id,
        { $set: { amount, date, type, name } },
        { new: true },
    );

    AppResponse(response, 200, null , "Update successful")
})
