import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { StockSettingModel } from '../../models/stock-settings.js';
import { StockModel } from '../../models/stock.js';

export const allStocks = catchAsync(async (request, response) => {

    let { search } = request.query

    let page = parseInt(request.params.page) ?? 1
    // page should be a value like 1, 2, 3, 4
    let limit = 25

    let skip = (page - 1) * 25
    // get previous page offset

    // Constructing search query based on the 'search' parameter
    let searchQuery = {};
    if (search) {
        // Example: searching by stock name (assuming 'name' is the field to search)
        searchQuery = { name: { $regex: new RegExp(search, "i") } };
    }

    const data = await StockModel.find(searchQuery).skip(skip).limit(limit)

    const minimumAmount = await StockSettingModel.find()

    AppResponse(response, 200, { data, currentPage: page, minimumAmount: minimumAmount[0]?.minimumAmount }, "Success")
})
