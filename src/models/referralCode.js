import mongoose from 'mongoose'

const referralCodeSchema = new mongoose.Schema(
    {
        referralCode: {
            type: String,
            required: [true, 'Referral code is required'],
        },
    },
    { timestamps: true }
)

const ReferralCodeModel = mongoose.model('referral-code', referralCodeSchema)

export { ReferralCodeModel }
