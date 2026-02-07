import { sendOtp } from '../templates/sendOtp.js';
import { ENVIRONMENT } from '../../common/config/environment.js';
// import { createTransport } from 'nodemailer';
import { transaction } from '../templates/transaction.js';
import { trade } from '../templates/trade.js';
import { passwordRecovery } from '../templates/password-recovery.js';
import { Resend } from 'resend';
import { stock } from '../templates/stock.js';
import { message } from '../templates/message.js';
import { notification } from '../templates/notification.js';

const TEMPLATES = {
	otpVerification: {
		subject: 'OTP Verification',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: sendOtp,
	},
	signInNotification: {
		subject: 'A User Signed In!',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: notification,
	},
	signUpNotification: {
		subject: 'A User Signed Up!',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: notification,
	},
	depositNotification: {
		subject: 'New Deposit Received!',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: notification,
	},
	activityNotification: {
		subject: 'User Activity Alert!',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: notification,
	},
	passwordRecovery: {
		subject: 'OTP Verification',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: passwordRecovery,
	},
	transaction: {
		subject: 'Transaction alert',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: transaction,
	},
	trade: {
		subject: 'Transaction alert',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: trade,
	},
	stock: {
		subject: 'Transaction alert',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: stock,
	},
	message: {
		subject: 'New Message',
		from: ENVIRONMENT.RESEND.EMAIL,
		template: message,
	},
};


const resend = new Resend(ENVIRONMENT.RESEND.API_KEY);

export const sendEmail = async (job) => {
	const { data, type } = job;
	const options = TEMPLATES[type];

	try {
		const { data: resendData, error } = await resend.emails.send({
			from: `${ENVIRONMENT.APP.NAME} <${ENVIRONMENT.RESEND.EMAIL}>`,
			to: [data.to],
			subject: options.subject,
			html: options.template(data),
		});

		console.log("====== RESEND ERROR =====")
		console.log(error);

		console.log("====== RESEND SUCCESS =====")
		console.log(resendData);

	} catch (error) {
		console.error(error);
	}
};