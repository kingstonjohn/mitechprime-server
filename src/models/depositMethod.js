import mongoose from 'mongoose'

const depositMethodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name of payment method required"]
        },
        type: {
            type: String,
            required: [true, "Type of payment (Short name) required"]
        },
        image: {
            type: String,
        },
        address: {
            type: String,
            required: [true, "Crypto address required"]
        },
        value: {
            type: Number,
            required: [true, "Value is required"]
        },
    },
    { timestamps: true }
)

const DepositMethodModel = mongoose.model('deposit-method', depositMethodSchema)

export { DepositMethodModel }
