import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { addEmailToQueue } from "../../queues/emailQueue.js";

export const emailBulkSend = catchAsync(async (request, response) => {

    const { emails, subject, message } = request.body

    if (!subject || !message) {
        throw new AppError('All fields required', 400)
    }

    if (emails.length === 0) {
        throw new AppError('Select at least one recipient', 400)
    }

    for (let email of emails) {
        console.log(email)
        addEmailToQueue({
            type: 'message',
            data: {
                to: email,
                title: subject,
                message: `${message.replace(/\n/g, '<br />')}`,
                priority: 'high',
            },
        });
    }

    return AppResponse(response, 200, null, `Email sent to selected recipients`)
})