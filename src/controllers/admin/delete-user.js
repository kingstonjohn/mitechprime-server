import AppError from "../../common/utils/appError.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import { catchAsync } from "../../middlewares/catchAsyncError.js";
import { DepositModel } from "../../models/deposit.js";
import { KycModel } from "../../models/kyc.js";
import { LoginActivityModel } from "../../models/login-activity.js";
import { OtpModel } from "../../models/otp.js";
import { SupportTicketModel } from "../../models/support-ticket.js";
import { UserModel } from "../../models/user.js";
import { UserInvestmentModel } from "../../models/userInvestmentPlan.js";
import { UserLivetradeModel } from "../../models/userLiveTrade.js";
import { UserStockModel } from "../../models/userStock.js";
import { WithdrawalModel } from "../../models/withdrawal.js";

export const deleteUser = catchAsync(async (request, response) => {

    const { uid } = request.params

    const user = await UserModel.findById(uid);

    const deletedUser = await UserModel.findByIdAndDelete(user._id);
    await KycModel.deleteMany({ userId: user._id });
    await LoginActivityModel.deleteMany({ email: user.email});
    await OtpModel.deleteMany({ email: user.email });
    await UserInvestmentModel.deleteMany({ userId: user._id })
    await UserLivetradeModel.deleteMany({ userId: user._id });
    await UserStockModel.deleteMany({ userId: user._id });
    await WithdrawalModel.deleteMany({ userId: user._id });
    await SupportTicketModel.deleteMany({ userId: user._id });
    await DepositModel.deleteMany({ userId: user._id })

    if (!deletedUser) {
        throw new AppError("User not found")
    } 
    
    AppResponse(response, 200, null, "User deleted successfully")
})
