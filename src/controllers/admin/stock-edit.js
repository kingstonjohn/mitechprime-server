import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { StockSettingModel } from '../../models/stock-settings.js';
import { StockModel } from '../../models/stock.js';

export const editStock = catchAsync(async (request, response) => {

    const { uid } = request.params

    const { name, image, minimumAmount } = request.body

    if (!name || !image || !minimumAmount) {
        throw new AppError('All fields required', 400)
    }

    if (isNaN(parseInt(minimumAmount))) {
        throw new AppError('Enter a valid minimum amount', 400)
    }

    let minimumAmountData = await StockSettingModel.find();

    if (minimumAmountData.length === 0) {
        await StockSettingModel.create({ minimumAmount })
    } else {
        await StockSettingModel.findByIdAndUpdate(minimumAmountData[0]._id,
            { $set: { minimumAmount } },
            { new: true },
        );
    }

    const _minimumAmount = await StockSettingModel.find()
    const _minAmount = _minimumAmount[0].minimumAmount

    await StockModel.findByIdAndUpdate(uid,
        { $set: { name, image, minimumAmount: _minAmount } },
        { new: true },
    );

    AppResponse(response, 200, null, "Update successful")
})
