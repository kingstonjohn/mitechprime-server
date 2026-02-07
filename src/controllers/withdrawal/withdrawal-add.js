import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserModel } from '../../models/user.js';
import { WithdrawalModel } from '../../models/withdrawal.js';

export const addWithdrawal = catchAsync(async (request, response) => {

    const { userId, amount, walletType, walletAddress } = request.body

    if(!userId || !amount || !walletType || !walletAddress){
        throw new AppError('All fields required', 400)
    }

    const user = await UserModel.findById(userId) 

    const accountBalance = parseInt(user.accountBalance)

    if(accountBalance < parseInt(amount)){
        throw new AppError('You don\'t have enough funds to perform this transaction.', 400)
    }

    await WithdrawalModel.create({ userId, amount, walletType, walletAddress });

    AppResponse(response, 201, null , "Withdraw request initiated")
})
