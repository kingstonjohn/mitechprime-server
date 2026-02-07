import mongoose from 'mongoose'
import { PAYMENT_STATUS } from '../common/constants/index.js'
const { ObjectId } = mongoose.Schema.Types

const userLiveTradeSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "user",
            required: [true, 'User ID required'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount required'],
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
        livetradeId: {
            type: ObjectId,
            ref: "live-trade-plan",
            required: [true, 'Livetrade ID required'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

const UserLivetradeModel = mongoose.model('user-livetrade', userLiveTradeSchema)

export { UserLivetradeModel }
