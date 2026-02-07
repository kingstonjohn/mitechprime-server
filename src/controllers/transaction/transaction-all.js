import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositModel } from '../../models/deposit.js';
import { UserInvestmentModel } from '../../models/userInvestmentPlan.js';
import { UserLivetradeModel } from '../../models/userLiveTrade.js';
import { UserStockModel } from '../../models/userStock.js';
import { WithdrawalModel } from '../../models/withdrawal.js';

export const allTransactions = catchAsync(async (request, response) => {

    const { uid } = request.params

    const userLivetradeData = await UserLivetradeModel.find({ userId: uid }).populate('livetradeId').exec();

    const userInvestmentData = await UserInvestmentModel.find({ userId: uid }).populate('investmentId').exec();

    const userStockData = await UserStockModel.find({ userId: uid }).populate('stockId').exec();

    const userWithdrawalData = await WithdrawalModel.find({ userId: uid }).populate('userId').exec();

    let userDepositData = await DepositModel.find({ userId: uid }).populate("depositMethodId").exec();

    userDepositData = userDepositData.filter(data => data.isDeleted === false);
    
    const transactionData = [
        ...userLivetradeData,
        ...userInvestmentData,
        ...userStockData,
        ...userDepositData,
        ...userWithdrawalData,
    ];

    // Sorting transactions by timestamps
    transactionData.sort((a, b) => b.createdAt - a.createdAt);

    AppResponse(response, 200, transactionData, 'success')
})
