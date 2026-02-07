import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { StockModel } from '../../models/stock.js';

export const deleteStock = catchAsync(async (request, response) => {

    const { uid } = request.params

    await StockModel.findByIdAndDelete(uid);

    AppResponse(response, 200, null, "Successfully deleted")
})
