import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { LoginActivityModel } from "../../models/login-activity.js";

export const loginActivity = catchAsync(async (request, response) => {

    const { email } = request.params

    const data = await LoginActivityModel.find({ email }).sort({ "createdAt": -1 }).exec();

    AppResponse(response, 200, data, "Success")
})

export const activity = catchAsync(async (request, response) => {

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 25;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalCount = await LoginActivityModel.countDocuments().exec()

    if (endIndex < totalCount) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    results.totalCount = totalCount

    results.results = await LoginActivityModel.find().limit(limit).skip(startIndex).sort({ "createdAt": -1 }).exec();

    AppResponse(response, 200, results, "Success")
})