import { Router } from 'express'
import { adminInfo } from '../controllers/user/adminInfo.js'
import { protectAdmin } from '../controllers/auth/protectAdmin.js'
import { allUsers } from '../controllers/admin/all-users.js'
import { getUserDetails } from '../controllers/admin/user-details.js'
import { updateUserDetails } from '../controllers/admin/update-user-details.js'
import { addPaymentMethod } from '../controllers/admin/add-payment.js'
import { editPaymentMethod } from '../controllers/admin/edit-payment.js'
import { allPaymentMethod } from '../controllers/admin/all-payment.js'
import { getPaymentMethod } from '../controllers/admin/payment.js'
import { deletePaymentMethod } from '../controllers/admin/delete-payment-method.js'
import { getUserKycDetails } from '../controllers/kyc/user-kyc-details.js'
import { addInvestmentPlan } from '../controllers/admin/investment-add.js'
import { editInvestmentPlan } from '../controllers/admin/investment-edit.js'
import { deleteInvestmentPlan } from '../controllers/admin/investment-delete.js'
import { allInvestmentPlan } from '../controllers/admin/investment-all.js'
import { getInvestmentPlan } from '../controllers/admin/investment.js'
import { allLiveTrade } from '../controllers/admin/livetrade-all.js'
import { getLiveTradePlan } from '../controllers/admin/live-trade.js'
import { addLiveTradePlan } from '../controllers/admin/live-trade-add.js'
import { editLiveTradePlan } from '../controllers/admin/livetrade-edit.js'
import { deleteLiveTradePlan } from '../controllers/admin/live-trade-delete.js'
import { addStock } from '../controllers/admin/stock-add.js'
import { editStock } from '../controllers/admin/stock-edit.js'
import { allStocks } from '../controllers/admin/stock-all.js'
import { getStock } from '../controllers/admin/stock.js'
import { deleteStock } from '../controllers/admin/stock-delete.js'
import { allDeposits } from '../controllers/admin/deposit-all.js'
import { depositStatus } from '../controllers/admin/deposit-status.js'
import { allWithdrawals } from '../controllers/admin/withdrawal-all.js'
import { withdrawalStatus } from '../controllers/admin/withdrawal-status.js'
import { allKyc } from '../controllers/admin/kyc-all.js'
import { allUserLivetradePlans } from '../controllers/admin/user-livetrade-plans.js'
import { userLivetradePlansStatus } from '../controllers/admin/user-livetrade-plans-status.js'
import { userInvestmentPlansStatus } from '../controllers/admin/user-investment-plans-status.js'
import { allUserInvestmentPlans } from '../controllers/admin/user-investment-plans.js'
import { deleteUser } from '../controllers/admin/delete-user.js'
import { activity, loginActivity } from '../controllers/admin/login-activity.js'
import { blockUser } from '../controllers/admin/block-user.js'
import { unBlockUser } from '../controllers/admin/unblock-user.js'
import { signOutUser } from '../controllers/admin/sign-out-user.js'
import { getUserStocks } from '../controllers/admin/all-user-stocks.js'
import { userStocksStatus } from '../controllers/admin/user-stocks-status.js'
import { profitAll } from '../controllers/admin/profit-all.js'
import { profitAdd } from '../controllers/admin/profit-add.js'
import { profitEdit } from '../controllers/admin/profit-edit.js'
import { profitSingle } from '../controllers/admin/profit-single.js'
import { profitDelete } from '../controllers/admin/profit-delete.js'
import { depositDelete } from '../controllers/admin/deposit-delete.js'
import { withdrawalDelete } from '../controllers/admin/withdrawal-delete.js'
import { depositEdit } from '../controllers/admin/deposit-edit.js'
import { withdrawalEdit } from '../controllers/admin/withdrawal-edit.js'
import { emailSend } from '../controllers/admin/email-send.js'
import { emailBulkSend } from '../controllers/admin/email-bulk-send.js'
import { notificationSettings } from '../controllers/admin/notification-settings.js'
import { referralCodesCreate } from '../controllers/admin/create-referral-codes.js'
import { referralCodesDelete } from '../controllers/admin/delete-referral-codes.js'
import { allReferralCodes } from '../controllers/admin/all-referral-codes.js'

const router = Router()

router.use(protectAdmin)

router.get('/info', adminInfo)

router.get('/all-users', allUsers)

router.get('/user-details/:uid', getUserDetails)

router.patch('/user-details/update/:uid', updateUserDetails)

router.get('/payment', allPaymentMethod)

router.get('/payment/:uid', getPaymentMethod)

router.delete('/payment/:uid', deletePaymentMethod)

router.post('/payment/add', addPaymentMethod)

router.patch('/payment/edit/:uid', editPaymentMethod)

// kyc
router.get('/kyc/:uid', getUserKycDetails)

router.get('/kyc', allKyc)

// investment plan
router.get('/investment', allInvestmentPlan)

router.get('/investment/:uid', getInvestmentPlan)

router.delete('/investment/:uid', deleteInvestmentPlan)

router.post('/investment/add', addInvestmentPlan)

router.patch('/investment/edit/:uid', editInvestmentPlan)

router.get('/investment/users/all', allUserInvestmentPlans)

router.post('/investment/users/status', userInvestmentPlansStatus)

// live trade plan
router.get('/live-trade', allLiveTrade)

router.get('/live-trade/:uid', getLiveTradePlan)

router.delete('/live-trade/:uid', deleteLiveTradePlan)

router.post('/live-trade/add', addLiveTradePlan)

router.patch('/live-trade/edit/:uid', editLiveTradePlan)

router.get('/live-trade/users/all', allUserLivetradePlans)

router.post('/live-trade/users/status', userLivetradePlansStatus)

// stock

router.get('/stocks/:page', allStocks)

router.post('/stocks/add', addStock)

router.patch('/stocks/edit/:uid', editStock)

router.get('/stocks/single/:uid', getStock)

router.delete('/stocks/:uid', deleteStock)

router.get('/user-stocks/:uid', getUserStocks)

router.post('/user-stocks/status/update', userStocksStatus)

// deposits
router.get('/deposits', allDeposits)

router.post('/deposits/status', depositStatus)

router.delete('/deposits/:id', depositDelete)

router.patch('/deposits/edit', depositEdit)

// withdrawal
router.get('/withdrawal', allWithdrawals)

router.post('/withdrawal/status', withdrawalStatus)

router.delete('/withdrawal/:id', withdrawalDelete)

router.patch('/withdrawal/edit', withdrawalEdit)

// delete user
router.delete('/delete-user/:uid', deleteUser)

// login activity
router.get('/login-activity/:email', loginActivity)

router.get('/activity', activity)

// block user
router.get('/block-user/:uid', blockUser)

// unblock user
router.get('/unblock-user/:uid', unBlockUser)

// sign out user
router.get('/signout-user/:uid', signOutUser)

// user profit
router.get('/profit/all/:uid', profitAll)

router.post('/profit/add', profitAdd)

router.patch('/profit/edit/:uid', profitEdit)

router.get('/profit/single/:id', profitSingle)

router.delete('/profit/delete/:uid/:id', profitDelete)

router.post('/email/send', emailSend)

router.post('/email/send-bulk', emailBulkSend)

router.patch('/notification/settings', notificationSettings)

// referral code
router.get('/referral-codes', allReferralCodes)

router.post('/referral-codes/create', referralCodesCreate)

router.delete('/referral-codes/:id', referralCodesDelete)

export { router as adminRouter }
