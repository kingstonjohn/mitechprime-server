import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { formatDate } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { InvestmentPlanModel } from '../../models/investmentPlan.js';
import { UserModel } from '../../models/user.js';
import { UserInvestmentModel } from '../../models/userInvestmentPlan.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const joinInvestmentTrade = catchAsync(async (request, response) => {

    const { userId, investmentId } = request.body

    if (!userId || !investmentId) {
        throw new AppError('All fields required', 400)
    }

    const user = await UserModel.findById(userId)

    const investment = await InvestmentPlanModel.findById(investmentId);

    if (parseInt(user.accountBalance) >= parseInt(investment.maximumDeposit)) {

        const currentBalance = parseInt(user.accountBalance) - parseInt(investment.maximumDeposit)

        await UserModel.findByIdAndUpdate(userId,
            { $set: { accountBalance: currentBalance } },
            { new: true },
        );

        const investmentData = await UserInvestmentModel.create({ userId, investmentId, amount: investment.maximumDeposit });

        const userData = await UserModel.findById(userId)

        addEmailToQueue({
            type: 'trade',
            data: {
                to: userData.email,
                title: `Investment trade plan purchase successful 🤟`,
                amount: `$${investmentData.amount}`,
                status: 'Success',
                reference: investmentData._id,
                plan: "Investment trade",
                planStatus: 'Active',
                planName: investment.level,
                priority: 'high',
                username: userData.firstName + " " + userData.lastName,
                date: formatDate(investmentData.createdAt),
            },
        });

        return AppResponse(response, 201, userData, `You successfully purchased ${investment.level} plan and your plan is now active`)
    }

    if(parseInt(user.accountBalance) < parseInt(investment.minimumDeposit)){
        throw new AppError("Insufficient funds.", 400)
    }

    const currentBalance = parseInt(user.accountBalance)

    await UserModel.findByIdAndUpdate(userId,
        { $set: { accountBalance: 0 } },
        { new: true },
    );

    const investmentData = await UserInvestmentModel.create({ 
        userId, 
        investmentId, 
        amount: currentBalance,
    });

    const userData = await UserModel.findById(userId)

    addEmailToQueue({
        type: 'trade',
        data: {
            to: userData.email,
            title: `Investment trade plan purchase successful 🤟`,
            amount: `$${investmentData.amount}`,
            status: 'Success',
            reference: investmentData._id,
            plan: "Investment trade",
            planStatus: 'Active',
            planName: investment.level,
            priority: 'high',
            username: userData.firstName + " " + userData.lastName,
            date: formatDate(investmentData.createdAt),
        },
    });

    AppResponse(response, 201, userData, `You successfully purchased ${investment.level} plan and your plan is now active`)
})
