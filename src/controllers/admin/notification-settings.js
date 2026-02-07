import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { UserModel } from "../../models/user.js";

export const notificationSettings = catchAsync(async (request, response) => {

    const { emails, message } = request.body

    for (let email of emails) {
        const user = await UserModel.findOne({ email })

        await UserModel.findOneAndUpdate({ email }, {
            notificationMessage: message,
            isNotificationEnabled: !user.isNotificationEnabled,
        });
    }

    AppResponse(response, 200, null, "Notification settings updated.")
})

export const notificationTurnOff = catchAsync(async (request, response) => {

    const { email } = request.body

    await UserModel.findOneAndUpdate({ email }, {
        isNotificationEnabled: false,
    });

    AppResponse(response, 200, null, "Notification turned off.")
})