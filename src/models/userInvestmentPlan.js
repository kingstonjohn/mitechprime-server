import mongoose from 'mongoose'
import { PAYMENT_STATUS } from '../common/constants/index.js'
const { ObjectId } = mongoose.Schema.Types

const userInvestmentSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "user",
            required: [true, 'User ID required'],
        },
        amount: {
            type: Number,
        },
        type: {
            type: String,
            default: "USD",
        },
        status: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.Success,
        },
        investmentId: {
            type: ObjectId,
            ref: "investment-plan",
            required: [true, 'Investment ID required'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

const UserInvestmentModel = mongoose.model('user-investment', userInvestmentSchema)

export { UserInvestmentModel }
