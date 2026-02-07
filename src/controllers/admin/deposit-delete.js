import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { DepositModel } from "../../models/deposit.js";

export const depositDelete = catchAsync(async (request, response) => {

    const { id } = request.params

    if(!id){
        throw new AppError('Deposit ID required', 400)
    }

    await DepositModel.findByIdAndUpdate(id,
        { $set: { isDeleted: true } },
        { new: true, runValidators: false },
    );

    AppResponse(response, 200, null , "Deposit deleted")
})