import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { WithdrawalModel } from "../../models/withdrawal.js";

export const withdrawalDelete = catchAsync(async (request, response) => {

    const { id } = request.params

    if(!id){
        throw new AppError('Withdrawal ID required', 400)
    }

    await WithdrawalModel.findByIdAndUpdate(id,
        { $set: { isDeleted: true } },
        { new: true, runValidators: false },
    );

    AppResponse(response, 200, null , "Withdrawal deleted")
})