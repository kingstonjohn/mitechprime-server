import mongoose from 'mongoose'
import { PAYMENT_STATUS } from '../common/constants/index.js'
const { ObjectId } = mongoose.Schema.Types

const depositSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "user",
            required: [true, 'User ID required'],
        },
        depositMethodId: {
            type: ObjectId,
            ref: "deposit-method",
            required: [true, 'Deposit method ID required'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        value: {
            type: Number,
            required: [true, 'Value is required']
        },
        status: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.Pending,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        image: {
            type: String,
        },
        address: {
            type: String,
        },
        date: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        transactionType: {
            type: String,
            default: "deposit",
        },
    },
    { timestamps: true }
)

const DepositModel = mongoose.model('deposit', depositSchema)

export { DepositModel }
