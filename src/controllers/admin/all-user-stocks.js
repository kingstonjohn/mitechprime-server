import AppError from "../../common/utils/appError.js"
import { AppResponse } from "../../common/utils/appResponse.js"
import { catchAsync } from "../../middlewares/catchAsyncError.js"
import { UserStockModel } from "../../models/userStock.js"

export const getUserStocks = catchAsync(async (request, response) => {

    const { uid } = request.params

    if (!uid) {
        throw new AppError('User ID required', 400)
    }

    const data = await UserStockModel.find({ userId: uid })

    AppResponse(response, 200, data, "User stocks loaded successfully")
})
