import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserStockModel } from '../../models/userStock.js';

export const getStock = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await UserStockModel.find({ userId: uid, isActive: true }).populate('stockId').sort({"createdAt": -1}).exec();

    console.log(data)

    if(!data) {
        return AppResponse(response, 200, data, 'You currently do not have any available purchase')
    }

    AppResponse(response, 201, data, 'success')
})
