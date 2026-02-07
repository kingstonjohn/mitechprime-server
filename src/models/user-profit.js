import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userProfitSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "user",
            required: [true, 'User ID required'],
        },
        amount: {
            type: Number,
        },
        date: {
            type: String,
        },
    },
    { timestamps: true }
)

const UserProfitModel = mongoose.model('user-profit', userProfitSchema)

export { UserProfitModel }
