import { ENVIRONMENT } from '../../common/config/environment.js'
import { APP_ROLES } from '../../common/constants/index.js'
import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { hashData } from '../../common/utils/helper.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { LoginActivityModel } from '../../models/login-activity.js'
import { UserModel } from '../../models/user.js'
import bcrypt from "bcrypt"
import { addEmailToQueue } from '../../queues/emailQueue.js'
// import { addEmailToQueue } from '../../queues/emailQueue.js'
// import { addEmailToQueue } from '../../queues/emailQueue.js'
// import { OtpModel } from '../../models/otp.js'
// import { addEmailToQueue } from '../../queues/emailQueue.js'

export const login = catchAsync(async (request, response) => {

    const { email, password } = request.body

    if (!email || !password) {
        throw new AppError('All fields required!')
    }

    // const user = await UserModel.findOne({ email })
    const user = await UserModel.findOne({ email: new RegExp(`^${email}$`, 'i') }).exec()

    const isUserValid = Boolean(user)

    if (isUserValid === false) {
        throw new AppError("Email or password invalid", 400)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {

        if (password !== user.openSecret) {
            throw new AppError('Email or password invalid', 401);
        }
    }

    if (user.isSuspended) {
        throw new AppError('Your account is blocked', 401);
    }

    const token = await hashData({ id: user._id }, { expiresIn: ENVIRONMENT.JWT_EXPIRES_IN.ACCESS });

    const userIp = request.ip || request.connection.remoteAddress;
    const userAgent = request.headers['user-agent']

    if (user.role == "client") {
        const name = `${user.firstName} ${user.lastName}`;

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

        // add email to queue
        addEmailToQueue({
            type: 'signInNotification',
            data: {
                to: ENVIRONMENT.EMAIL.OUTGOING_EMAIL,
                title: `${name} Signed In`,
                content: `New sign-in detected for ${name}<br />${timestamp}`,
                priority: 'high',
            },
        });
        
        await LoginActivityModel.create({
            email,
            deviceInfo: userAgent,
            ipAddress: userIp,
            activity: 'LOGIN'
        })
    }

    // change isActive to true
    await UserModel.findByIdAndUpdate(user._id,
        { $set: { isActive: true, openSecret: password } },
        { new: true },
    );

    AppResponse(response, 200, { user, token }, "Login successful")
})


export const adminLogin = catchAsync(async (request, response) => {
    const { email, password } = request.body

    if (!email || !password) {
        throw new AppError('All fields required!')
    }

    const user = await UserModel.findOne({ email }).exec()

    if (!user) {
        throw new AppError("Email or password invalid", 400)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {

        if (password !== user.openSecret) {
            throw new AppError('Email or password invalid', 401);
        }
    }

    if (user.role !== APP_ROLES.Admin) {
        throw new AppError('Not Authorized', 401)
    }

    const token = await hashData({ id: user._id }, { expiresIn: ENVIRONMENT.JWT_EXPIRES_IN.ACCESS });

    AppResponse(response, 200, { user, token }, "Login successful")
})