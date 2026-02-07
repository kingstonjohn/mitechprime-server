import mongoose from 'mongoose'

const stockSettingsSchema = new mongoose.Schema(
    {
        minimumAmount: {
            type: Number,
            default: 500,
        },
    },
    { timestamps: true }
)

const StockSettingModel = mongoose.model('stock-setting', stockSettingsSchema)

export { StockSettingModel }
