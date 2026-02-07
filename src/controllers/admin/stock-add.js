import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../middlewares/catchAsyncError.js'
import { StockModel } from '../../models/stock.js';

export const addStock = catchAsync(async (request, response) => {

    const { name, image } = request.body

    if(!name || !image){
        throw new AppError('All fields required', 400)
    }

    await StockModel.create({ name, image });

    AppResponse(response, 201, null, "Stock created")
})

// Get companies info
// https://autocomplete.clearbit.com/v1/companies/suggest?query=A
// const letters = [
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
// ]

// for (let letter of letters) {
//     const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${letter}`);
//     const body = await res.json();
//     console.log(body)

//     body.forEach(async (data) => {
//         await StockModel.create({ name: data.name, roi: '5%', image: data.logo, minimumAmount: 500 });
//     })
// }