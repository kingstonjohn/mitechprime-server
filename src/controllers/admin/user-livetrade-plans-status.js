import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { formatDate } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { UserLivetradeModel } from '../../models/userLiveTrade.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const userLivetradePlansStatus = catchAsync(async (request, response) => {

    const { id, isActive } = request.body

    if (!id) {
        throw new AppError("All fields required");
    }

    if (isActive == true) {
        await UserLivetradeModel.findByIdAndUpdate(id,
            { $set: { isActive } },
            { new: true },
        );

        return AppResponse(response, 200, null, "Livetrade plan status updated")
    }
    else if (isActive == false) {
        const livetradeData = await UserLivetradeModel.findByIdAndUpdate(id,
            { $set: { isActive } },
            { new: true },
        ).populate("livetradeId userId").exec();

        addEmailToQueue({
            type: 'trade',
            data: {
                to: livetradeData.userId.email,
                title: `Live trade plan ended (Inactive) 😔`,
                amount: `$${livetradeData.amount}`,
                status: 'Success',
                reference: livetradeData._id,
                plan: "Live trade",
                planStatus: 'Ended',
                planName: livetradeData.livetradeId.planName,
                priority: 'high',
                username: livetradeData.userId.firstName + " " + livetradeData.userId.lastName,
                date: formatDate(livetradeData.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Livetrade plan status updated")
    }
    else {
        throw new AppError("Invalid status");
    }
})
