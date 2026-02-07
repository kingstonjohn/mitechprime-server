import mongoose from 'mongoose'
import { PAYMENT_STATUS } from '../common/constants/index.js'
const { ObjectId } = mongoose.Schema.Types

const userStockSchema = new mongoose.Schema(
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
        stockId: {
            type: ObjectId,
            ref: "stock",
            required: [true, 'Stock ID required'],
        },
        status: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.Success,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

const UserStockModel = mongoose.model('user-stock', userStockSchema)

export { UserStockModel }
