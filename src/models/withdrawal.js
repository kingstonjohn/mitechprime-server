import mongoose from 'mongoose'
import { PAYMENT_STATUS } from '../common/constants/index.js'
const { ObjectId } = mongoose.Schema.Types

const withdrawalSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "user",
            required: [true, 'User ID required'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        walletType: {
            type: String,
            required: [true, 'Wallet type is required']
        },
        walletAddress: {
            type: String,
            required: [true, 'Wallet address is required']
        },
        status: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.Pending,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        date: {
            type: String,
        },
        transactionType: {
            type: String,
            default: "withdraw",
        },
    },
    { timestamps: true }
)

const WithdrawalModel = mongoose.model('withdrawal', withdrawalSchema)

export { WithdrawalModel }
