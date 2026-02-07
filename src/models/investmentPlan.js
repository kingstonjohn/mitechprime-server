import mongoose from 'mongoose'

const investmentPlanSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            required: [true, "Level required"]
        },
        minimumDeposit: {
            type: Number,
            required: [true, "Minimum deposit required"]
        },
        maximumDeposit: {
            type: Number,
            required: [true, "Maximum deposit required"]
        },
        rio: {
            type: String,
            required: [true, "Maximum deposit required"]
        },
        tradeCommission: {
            type: String,
            required: [true, "Trade commission required"]
        },
        supportDuration: {
            type: String,
            required: [true, "Support duration required"]
        },
    },
    { timestamps: true }
)

const InvestmentPlanModel = mongoose.model('investment-plan', investmentPlanSchema)

export { InvestmentPlanModel }
