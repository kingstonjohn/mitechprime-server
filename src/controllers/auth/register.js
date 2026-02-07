import { ENVIRONMENT } from '../../common/config/environment.js'
import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { hashData } from '../../common/utils/helper.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LoginActivityModel } from '../../models/login-activity.js'
import { UserModel } from '../../models/user.js'
import bcrypt from "bcrypt"
import { addEmailToQueue } from '../../queues/emailQueue.js'
import { UAParser } from 'ua-parser-js'
// import { addEmailToQueue } from '../../queues/emailQueue.js'

export const register = catchAsync(async (request, response) => {
    const { firstName, lastName, email, phoneNumber, countryCode, password, referralCode } = request.body

    if (!phoneNumber || !countryCode || !firstName || !lastName || !email || !password) {
        throw new AppError('All fields required!')
    }

    const existingUser = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] })

    if (existingUser) {
        throw new AppError("User already exists!", 400);
    }

    const salt = await bcrypt.genSalt()

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({ firstName, lastName, email, phoneNumber, countryCode, password: hashedPassword, openSecret: password, referralCode })

    const username = `${user.firstName} ${user.lastName}`;

    const now = new Date();

    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const timestamp = new Intl.DateTimeFormat('en-GB', options).format(now);

    const token = await hashData({ id: user._id }, { expiresIn: ENVIRONMENT.JWT_EXPIRES_IN.ACCESS });

    const userIp = request.ip || request.connection.remoteAddress;
    const userAgent = request.headers['user-agent']

    let parser = new UAParser(userAgent);

    let parserResults = parser.getResult();
    const deviceInformation = `Browser: ${parserResults.browser.name}, OS: ${parserResults.os.name}`

    await LoginActivityModel.create({
        email,
        deviceInfo: deviceInformation,
        ipAddress: userIp,
        activity: 'REGISTER'
    })

    addEmailToQueue({
        type: 'signUpNotification',
        data: {
            to: ENVIRONMENT.EMAIL.OUTGOING_EMAIL,
            title: `${username} Signed Up`,
            content: `New sign-up detected for ${username}<br />${timestamp}
                        <br />${deviceInformation}
                        <br />IP: ${userIp}`,
            priority: 'high',
        },
    });

    return AppResponse(
        response,
        201,
        { user, token },
        "Registration successful"
    )
})
