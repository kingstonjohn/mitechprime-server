import { ENVIRONMENT } from '../../common/config/environment.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { standardDateTime } from '../../common/utils/helper.js';
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { DepositModel } from '../../models/deposit.js';
import { DepositMethodModel } from '../../models/depositMethod.js';
import { UserModel } from '../../models/user.js';
import { addEmailToQueue } from '../../queues/emailQueue.js';

export const addDeposit = catchAsync(async (request, response) => {

    const { userId, depositMethodId, amount } = request.body

    if (!userId || !depositMethodId || !amount) {
        throw new AppError('All fields required', 400);
    }

    const depositMethodData = await DepositMethodModel.findById(depositMethodId)

    const data = await DepositModel.create({
        userId,
        depositMethodId,
        amount,
        name: depositMethodData.name,
        type: depositMethodData.type,
        image: depositMethodData.image,
        address: depositMethodData.address,
        value: depositMethodData.value,
    });

    const payload = {
        invoiceId: data._id,
    }

    const user = await UserModel.findById(userId);

    const username = user.firstName + " " + user.lastName

    const timestamp = standardDateTime()

    addEmailToQueue({
        type: 'depositNotification',
        data: {
            to: ENVIRONMENT.EMAIL.OUTGOING_EMAIL,
            title: `${username} deposited $${amount}`,
            content: `A deposit of $${amount} was initiated by ${username}
                            <br />${timestamp}
                            `,
            priority: 'high',
        },
    });

    AppResponse(response, 201, payload, "Invoice created")
})
