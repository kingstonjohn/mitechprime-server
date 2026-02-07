import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema(
    {
        countryCode: {
            type: String,
            required: [true, 'Country code is required'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        otp: {
            type: String,
            required: [true, 'OTP is required'],
        },
    },
    { timestamps: true }
)

const OtpModel = mongoose.model('otp', otpSchema)

export { OtpModel }
