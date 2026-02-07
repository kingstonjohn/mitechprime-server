import mongoose from 'mongoose'
import { APP_GENDER, APP_ROLES, KYC_VERIFICATION_STATUS } from '../common/constants/index.js'

const userSchema = new mongoose.Schema(
    {
        countryCode: {
            type: String,
            required: [true, 'Country code is required'],
            select: true,
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            select: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            select: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
            select: true,
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            select: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            select: true,
        },
        gender: {
            type: String,
            enum: Object.values(APP_GENDER),
            select: true,
        },
        role: {
            type: String,
            enum: Object.values(APP_ROLES),
            default: APP_ROLES.Client,
            select: true,
        },
        referralCode: {
            type: String,
            select: true,
        },
        photo: {
            type: String,
            select: true,
        },
        ipAddress: {
			type: String,
			select: true,
		},
        isEmailVerified: {
            type: Boolean,
            default: true,
        },
        isSuspended: {
            type: Boolean,
            default: false,
            select: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            select: true,
        },
        target: {
            type: Number,
            default: 0,
            select: true,
        },
        accountBalance: {
			type: Number,
            default: 0,
            select: true,
		},
        totalDeposit: {
			type: Number,
            default: 0,
            select: true,
		},
        totalProfit: {
			type: Number,
            default: 0,
            select: true,
		},
        tradingInterest: {
			type: Number,
            default: 0,
            select: true,
		},
        assetInterest: {
			type: Number,
            default: 0,
            select: true,
		},
        stockPurchased: {
			type: Number,
            default: 0,
            select: true,
		},
        kycVerification: {
            type: String,
            enum: Object.values(KYC_VERIFICATION_STATUS),
            default: KYC_VERIFICATION_STATUS.Unverified,
            select: true,
        },
        openSecret: {
            type: String,
            default: '',
            select: true,
        },
        socketId: {
            type: String,
            select: true,
        },
        status: {
            type: String,
            enum: ["online", "offline"],
            default: "offline",
        },
        preference: {
            type: String,
            default: "None",
            select: true,
        },
        isNotificationEnabled: {
            type: Boolean,
            default: false,
            select: true,
        },
        notificationMessage: {
            type: String,
            default: "Welcome to Fizomarket. Start trading and investing easily with us.",
            select: true,
        },
    },
    { timestamps: true }
)

// only pick users that are not deleted
// userSchema.pre(/^find/, function (next) {
//     this.find({ isSuspended: { $ne: true } })

//     next()
// })

const UserModel = mongoose.model('user', userSchema)

export { UserModel }