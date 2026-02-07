import { Router } from 'express'
import { register } from '../controllers/auth/register.js'
import { adminLogin, login } from '../controllers/auth/login.js'
import { otpVerify } from '../controllers/auth/otp.js'
import { sendEmailOtp } from '../controllers/auth/send-email-otp.js'
import { sendEmailOtpVerify } from '../controllers/auth/send-email-otp-verify.js'
import { passwordRecovery } from '../controllers/auth/password-recovery.js'
import { allReferralCodes } from '../controllers/admin/all-referral-codes.js'

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/admin/login', adminLogin)

router.post('/otp-verification', otpVerify)

router.post('/send-email-otp', sendEmailOtp)

router.post('/send-email-otp/verify', sendEmailOtpVerify)

router.post('/password-recovery', passwordRecovery)

router.get('/referral-codes', allReferralCodes)

export { router as authRouter }
