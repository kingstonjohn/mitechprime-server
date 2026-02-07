import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { formatDate } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserInvestmentModel } from '../../models/userInvestmentPlan.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const userInvestmentPlansStatus = catchAsync(async (request, response) => {

    const { id, isActive } = request.body

    if (!id) {
        throw new AppError("All fields required");
    }

    if (isActive == true) {
        await UserInvestmentModel.findByIdAndUpdate(id,
            { $set: { isActive } },
            { new: true },
        );

        return AppResponse(response, 200, null, "Investment plan status updated")
    }
    else if (isActive == false) {
        const investmentData = await UserInvestmentModel.findByIdAndUpdate(id,
            { $set: { isActive } },
            { new: true },
        ).populate("userId investmentId");

        addEmailToQueue({
            type: 'trade',
            data: {
                to: investmentData.userId.email,
                title: `Investment trade plan ended (Inactive) 😔`,
                amount: `$${investmentData.amount}`,
                status: 'Success',
                reference: investmentData._id,
                plan: "Investment trade",
                planStatus: 'Ended',
                planName: investmentData.investmentId.level,
                priority: 'high',
                username: investmentData.userId.firstName + " " + investmentData.userId.lastName,
                date: formatDate(investmentData.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Investment plan status updated")
    }
    else {
        throw new AppError("Invalid status");
    }
})
