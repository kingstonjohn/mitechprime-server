import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { formatDate } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LiveTradePlanModel } from '../../models/liveTradePlan.js';
import { UserModel } from '../../models/user.js';
import { UserLivetradeModel } from '../../models/userLiveTrade.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const joinLiveTrade = catchAsync(async (request, response) => {

    const { userId, livetradeId, amount } = request.body

    if (!userId || !livetradeId || !amount) {
        throw new AppError('All fields required', 400)
    }

    const user = await UserModel.findById(userId)

    const livetrade = await LiveTradePlanModel.findById(livetradeId);

    if (isNaN(parseInt(amount))) {
        throw new AppError("Enter a valid amount", 400)
    }

    const userAmount = parseInt(amount)

    if (parseInt(user.accountBalance) < userAmount) {
        throw new AppError("Insufficient funds", 400)
    }

    const currentBalance = parseInt(user.accountBalance) - userAmount

    await UserModel.findByIdAndUpdate(userId,
        { $set: { accountBalance: currentBalance } },
        { new: true },
    );

    const livetradeData = await UserLivetradeModel.create({ userId, livetradeId, amount: userAmount });

    const userData = await UserModel.findById(userId)

    addEmailToQueue({
        type: 'trade',
        data: {
            to: userData.email,
            title: `Live trade plan purchase successful 🤟`,
            amount: `$${userAmount}`,
            status: 'Success',
            reference: livetradeData._id,
            plan: "Live trade",
            planStatus: 'Active',
            planName: livetrade.planName,
            priority: 'high',
            username: userData.firstName + " " + userData.lastName,
            date: formatDate(livetradeData.createdAt),
        },
    });

    return AppResponse(response, 201, userData, `You have successfully purchased ${livetrade.planName} plan`)
})
