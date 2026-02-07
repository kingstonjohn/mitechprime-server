import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const kycSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'user',
            required: [true, "User ID required"]
        },
        frontImage: {
            type: String,
            required: [true, "Front image required"]
        },
        backImage: {
            type: String,
            required: [true, "Back image required"]
        },
        identificationType: {
            type: String,
            required: [true, "Type of ID required"]
        },
        identificationNumber: {
            type: String,
            required: [true, "ID number required"]
        },
        address: {
            type: String,
            required: [true, "Crypto address required"]
        },
        city: {
            type: String,
            required: [true, "City required"]
        },
        postalCode: {
            type: String,
            required: [true, "Postal code required"]
        },
        state: {
            type: String,
            required: [true, "State required"]
        },
    },
    { timestamps: true }
)

const KycModel = mongoose.model('kyc', kycSchema)

export { KycModel }
