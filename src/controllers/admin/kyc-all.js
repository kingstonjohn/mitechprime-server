import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { KycModel } from '../../models/kyc.js';

export const allKyc = catchAsync(async (request, response) => {

    let data = await KycModel.find().populate("userId").sort({"createdAt": -1}).exec();

    const filteredData = data.filter((kyc, index, self) => {
        // Check if the index of the current KYC document matches its first occurrence
        return index === self.findIndex(t => (
          t.userId._id === kyc.userId._id
        ));
      });

    AppResponse(response, 200, filteredData, "Success")
})
