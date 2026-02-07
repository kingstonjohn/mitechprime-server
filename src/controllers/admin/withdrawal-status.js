import { PAYMENT_STATUS } from '../../common/constants/index.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { formatDate } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserModel } from '../../models/user.js';
import { WithdrawalModel } from '../../models/withdrawal.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const withdrawalStatus = catchAsync(async (request, response) => {

    const { id, status } = request.body

    if (!id || !status) {
        throw new AppError("All fields required");
    }

    if (status === PAYMENT_STATUS.Failed) {
        const data = await WithdrawalModel.findByIdAndUpdate(id,
            { $set: { status } },
            { new: true },
        );

        const user = await UserModel.findById(data.userId)

        addEmailToQueue({
            type: 'transaction',
            data: {
                to: user.email,
                title: `Your Withdrawal transaction failed ❌`,
                amount: `$${data.amount}`,
                status: 'Failed',
                reference: data._id,
                plan: "Withdrawal",
                priority: 'high',
                username: user.firstName + " " + user.lastName,
                date: formatDate(data.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Send status updated")
    }
    else if (status === PAYMENT_STATUS.Success) {

        const data = await WithdrawalModel.findById(id)

        const user = await UserModel.findById(data.userId)

        if (user.accountBalance < data.amount) {
            addEmailToQueue({
                type: 'transaction',
                data: {
                    to: user.email,
                    title: `Your Withdrawal transaction failed ❌`,
                    amount: `$${data.amount}`,
                    status: 'Failed (insufficient balance)',
                    reference: data._id,
                    plan: "Withdrawal",
                    priority: 'high',
                    username: user.firstName + " " + user.lastName,
                    date: formatDate(data.createdAt),
                },
            });

            return AppResponse(response, 200, null, "Failed - client insufficient balance")
        }

        await WithdrawalModel.findByIdAndUpdate(id,
            { $set: { status } },
            { new: true },
        );

        await UserModel.findByIdAndUpdate(user._id,
            { $set: { accountBalance: user.accountBalance - data.amount } },
            { new: true },)

        // add email to queue
        addEmailToQueue({
            type: 'transaction',
            data: {
                to: user.email,
                title: `Your Withdrawal transaction was successful 🤟`,
                amount: `$${data.amount}`,
                status: 'Success',
                reference: data._id,
                plan: "Withdrawal",
                priority: 'high',
                username: user.firstName + " " + user.lastName,
                date: formatDate(data.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Send status updated")
    }
    else {
        throw new AppError("Invalid payment status");
    }
})
