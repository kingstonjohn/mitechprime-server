import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { formatDate } from "../../common/utils/helper.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserStockModel } from "../../models/userStock.js";
import { addEmailToQueue } from "../../queues/emailQueue.js";

export const userStocksStatus = catchAsync(async (request, response) => {

    const { id, isActive } = request.body

    if (!id) {
        throw new AppError("All fields required");
    }

    if (isActive == true) {
        await UserStockModel.findByIdAndUpdate(id,
            { $set: { isActive } },
            { new: true },
        );

        return AppResponse(response, 200, null, "Stock is now active")
    }
    else if (isActive == false) {
        const userStockData = await UserStockModel.findByIdAndUpdate(id,
            { $set: { isActive } },
            { new: true },
        ).populate("stockId userId").exec();

        addEmailToQueue({
            type: 'stock',
            data: {
                to: userStockData.userId.email,
                title: `Stock (Inactive) 😔`,
                amount: `$${userStockData.amount}`,
                status: 'Success',
                reference: userStockData._id,
                type: "Stock",
                stockStatus: 'Ended',
                stockName: userStockData.stockId.name,
                priority: 'high',
                username: userStockData.userId.firstName + " " + userStockData.userId.lastName,
                date: formatDate(userStockData.createdAt),
            },
        });

        return AppResponse(response, 200, null, "Stock is now inactive")
    }
    else {
        throw new AppError("Invalid status");
    }
})