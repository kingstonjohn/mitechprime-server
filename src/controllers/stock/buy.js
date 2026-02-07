import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { StockSettingModel } from '../../models/stock-settings.js';
import { UserModel } from '../../models/user.js';
import { UserStockModel } from '../../models/userStock.js';

export const buyStock = catchAsync(async (request, response) => {

    const { userId, stockId, amount } = request.body

    if (!userId || !stockId || !amount) {
        throw new AppError('All fields required', 400)
    }

    const user = await UserModel.findById(userId)

    if (isNaN(parseInt(amount))) {
        throw new AppError("Enter a valid amount", 400)
    }

    const userAmount = parseInt(amount)

    if (parseInt(user.accountBalance) < userAmount) {
        throw new AppError("Insufficient funds", 400)
    }

    const minimumAmount = await StockSettingModel.find()

    if (userAmount < minimumAmount[0]?.minimumAmount) {
        throw new AppError("Amount is less than the minimum amount")
    }

    if(user.accountBalance < (user.stockPurchased + userAmount)){
        throw new AppError("You've reached your stock purchase limit!")
    }

    await UserStockModel.create({ userId, stockId, amount: userAmount });

    const _stockPurchased = user.stockPurchased + userAmount

    const _userData = await UserModel.findByIdAndUpdate(user._id,
        { $set: { stockPurchased: _stockPurchased } },
        { new: true },
    );

    console.log("_userData", _userData);

    const userData = await UserModel.findById(userId)

    console.log(userData)

    return AppResponse(response, 201, userData, `Purchase successful!`)
})