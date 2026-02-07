import { Router } from 'express'
import { userInfo } from '../controllers/user/userInfo.js'
import { protect } from '../controllers/auth/protect.js'
import { uploadKyc } from '../controllers/kyc/upload-kyc.js'
import { addDeposit } from '../controllers/deposit/deposit-add.js'
import { allPaymentMethod } from '../controllers/admin/all-payment.js'
import { getDeposit } from '../controllers/deposit/deposit.js'
import { addWithdrawal } from '../controllers/withdrawal/withdrawal-add.js'
import { joinInvestmentTrade } from '../controllers/investment/join.js'
import { getInvestmentTrade } from '../controllers/investment/get.js'
import { joinLiveTrade } from '../controllers/livetrade/join.js'
import { getLiveTrade } from '../controllers/livetrade/get.js'
import { allStocks } from '../controllers/admin/stock-all.js'
import { allLiveTrade } from '../controllers/admin/livetrade-all.js'
import { allInvestmentPlan } from '../controllers/admin/investment-all.js'
import { allTransactions } from '../controllers/transaction/transaction-all.js'
import { buyStock } from '../controllers/stock/buy.js'
import { getStock } from '../controllers/stock/get.js'
import { getInvoice } from '../controllers/deposit/invoice.js'
import { updateProfileName } from '../controllers/profile/update-profile-name.js'
import { updateUserPassword } from '../controllers/profile/update-user-password.js'
import { profitAll } from '../controllers/admin/profit-all.js'
import { preferenceSet } from '../controllers/preference/set.js'
import { notificationTurnOff } from '../controllers/admin/notification-settings.js'

const router = Router()

router.use(protect)

router.get('/info', userInfo)

router.post('/kyc/upload', uploadKyc)

// deposits

router.post('/deposit/add', addDeposit)

router.get('/deposit/all', allPaymentMethod)

router.get('/deposit/:uid', getDeposit)

router.get('/deposit/invoice/:uid', getInvoice)

router.post('/withdrawal/add', addWithdrawal)

// investments
router.get('/investment', allInvestmentPlan)

router.post('/investment/join', joinInvestmentTrade)

router.get('/investment/:uid', getInvestmentTrade)

// live trade
router.get('/live-trade', allLiveTrade)

router.post('/livetrade/join', joinLiveTrade)

router.get('/livetrade/:uid', getLiveTrade)

// stocks
router.get('/stocks/:page', allStocks)

router.post('/stocks/buy', buyStock)

router.get('/stocks/single/:uid', getStock)

// transactions
router.get('/transactions/:uid', allTransactions)

// update profile name
router.post('/profile/update-name', updateProfileName)

// update password
router.post('/profile/update-password', updateUserPassword)

// profit
router.get('/profit/all/:uid', profitAll)

// preference
router.post('/preference/set', preferenceSet)

// notifications
router.post('/notification/off', notificationTurnOff)

export { router as userRouter }
