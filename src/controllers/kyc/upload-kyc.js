import { KYC_VERIFICATION_STATUS } from '../../common/constants/index.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { KycModel } from '../../models/kyc.js';
import { UserModel } from '../../models/user.js';

export const uploadKyc = catchAsync(async (request, response) => {

    const { userId, identificationType, identificationNumber, address, city, postalCode, state, frontImage, backImage } = request.body

    if(!userId || !identificationType || !identificationNumber || !address || !city || !postalCode || !state || !frontImage || !backImage){
        throw new AppError('All fields required', 400)
    }

    await KycModel.create({ userId, identificationType, identificationNumber, address, city, postalCode, state, frontImage, backImage });

    await UserModel.findByIdAndUpdate(userId,
        { $set: { kycVerification: KYC_VERIFICATION_STATUS.Verifying } },
        { new: true },
    );

    AppResponse(response, 201, null , "KYC uploaded")
})
