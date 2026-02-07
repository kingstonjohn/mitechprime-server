import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { addEmailToQueue } from "../../queues/emailQueue.js";

export const emailSend = catchAsync(async (request, response) => {

    const { email, subject, message } = request.body


    if (!email || !subject || !message) {
        throw new AppError('All fields required', 400)
    }

    console.log(request.body)
    console.log(message.replace(/\n/g, '<br />'))

    addEmailToQueue({
        type: 'message',
        data: {
            to: email,
            title: subject,
            message: `${message.replace(/\n/g, '<br />') }`,
            priority: 'high',
        },
    });

    return AppResponse(response, 200, null, `Email sent to ${email}`)
})