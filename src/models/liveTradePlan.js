import mongoose from 'mongoose'

const liveTradePlanSchema = new mongoose.Schema(
    {
        planName: {
            type: String,
            required: [true, "Name of plan required"]
        },
        minimumDeposit: {
            type: Number,
            required: [true, "Minimum deposit required"]
        },
        maximumDeposit: {
            type: Number,
            required: [true, "Maximum deposit required"]
        },
        minimumReturn: {
            type: Number,
            required: [true, "Minimum return required"]
        },
        maximumReturn: {
            type: Number,
            required: [true, "Maximum return required"]
        },
        rio: {
            type: String,
            required: [true, "RIO required"]
        },
        rioInterval: {
            type: String,
            required: [true, "RIO Interval required"]
        },
        duration: {
            type: String,
            required: [true, "Duration required"]
        },
    },
    { timestamps: true }
)

const LiveTradePlanModel = mongoose.model('live-trade-plan', liveTradePlanSchema)

export { LiveTradePlanModel }
