import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { StockSettingModel } from '../../models/stock-settings.js';
import { StockModel } from '../../models/stock.js';

export const getStock = catchAsync(async (request, response) => {

    const { uid } = request.params

    const data = await StockModel.findById(uid);

    const minimumAmount = await StockSettingModel.find()
    
    const payload = {
        ...data._doc,
        minimumAmount: minimumAmount[0]?.minimumAmount,
    }

    AppResponse(response, 200, payload, "Success")
})
