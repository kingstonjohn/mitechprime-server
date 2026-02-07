import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name of payment method required"]
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
)

const StockModel = mongoose.model('stock', stockSchema)

export { StockModel }
