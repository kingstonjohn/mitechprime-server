import { OtpModel } from '../../models/otp.js'
import { ENVIRONMENT } from '../config/environment.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';

export const hashData = async (data, options, secret) => {
    return jwt.sign(
        { ...data },
        secret ? secret : ENVIRONMENT.JWT.ACCESS_KEY,
        ...[options?.expiresIn ? { expiresIn: options?.expiresIn } : {}]
    )
}

export const generateRandom4Digit = () => {
    let random6Digit = crypto.randomInt(0, 9999)

    // Convert the random number to a string and pad it with leading zeros if necessary
    const random4DigitString = random6Digit.toString().padStart(4, '0')

    return random4DigitString
}

export const sendOtpVerificationPhoneTextMessage = async (
    countryCode,
    phoneNumber
) => {
    const otpCode = generateRandom4Digit()

    await OtpModel.create({ countryCode, phoneNumber, otp: otpCode })
}

export function formatDate(timestamp) {
    const date = new Date(timestamp)
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Get individual date components
    var dayName = days[date.getDay()];
    var monthName = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Pad minutes with leading zero if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted date string
    var formattedDate = dayName + ', ' + monthName + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ' ' + ampm;

    return formattedDate;
}

export const standardDateTime = () => {

    const now = new Date();

    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const timestamp = new Intl.DateTimeFormat('en-GB', options).format(now);
    return timestamp;
}