import mongoose from 'mongoose'

const loginActivitySchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        ipAddress: {
            type: String,
        },
        deviceInfo: {
            type: String,
        },
        activity: {
            type: String,
        }
    },
    { timestamps: true }
)

const LoginActivityModel = mongoose.model('login-activity', loginActivitySchema)

export { LoginActivityModel }
