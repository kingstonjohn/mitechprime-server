import { PAYMENT_STATUS } from '../../common/constants/index.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { formatDate } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositModel } from '../../models/deposit.js';
import { UserModel } from '../../models/user.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const depositStatus = catchAsync(async (request, response) => {

    const { id, status } = request.body

    if (!id || !status) {
        throw new AppError("All fields required");
    }

    if (status === PAYMENT_STATUS.Failed) {
        const data = await DepositModel.findByIdAndUpdate(id,
            { $set: { status } },
            { new: true },
        );

        const user = await UserModel.findById(data.userId)

        addEmailToQueue({
            type: 'transaction',
            data: {
                to: user.email,
                title: `Your Deposit transaction failed ❌`,
                amount: `$${data.amount}`,
                status: 'Failed',
                reference: data._id,
                plan: "Deposit",
                priority: 'high',
                username: user.firstName + " " + user.lastName,
                date: formatDate(data.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Payment status updated")
    }
    else if (status === PAYMENT_STATUS.Success) {
        const data = await DepositModel.findByIdAndUpdate(id,
            { $set: { status } },
            { new: true },
        );

        const user = await UserModel.findById(data.userId)

        await UserModel.findByIdAndUpdate(user._id,  
            { $set: { accountBalance: user.accountBalance + data.amount } },
            { new: true },)

        // add email to queue
        addEmailToQueue({
            type: 'transaction',
            data: {
                to: user.email,
                title: `Your Deposit transaction was successful 🤟`,
                amount: `$${data.amount}`,
                status: 'Success',
                reference: data._id,
                plan: "Deposit",
                priority: 'high',
                username: user.firstName + " " + user.lastName,
                date: formatDate(data.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Payment status updated")
    }
    else {
        throw new AppError("Invalid payment status");
    }
})
