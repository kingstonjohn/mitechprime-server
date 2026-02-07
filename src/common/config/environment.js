import * as dotenv from 'dotenv'
dotenv.config()

export const ENVIRONMENT = {
    APP: {
        NAME: process.env.APP_NAME,
        PORT: process.env.PORT,
        ENV: process.env.NODE_ENV,
    },
    DB: {
        URL: process.env.MONGODB_URL,
    },
    JWT: {
        ACCESS_KEY: process.env.ACCESS_JWT_KEY,
    },
    JWT_EXPIRES_IN: {
        ACCESS: process.env.ACCESS_JWT_EXPIRES_IN,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PASSWORD: process.env.REDIS_PASSWORD,
    },
    RESEND: {
        API_KEY: process.env.RESEND_API_KEY,
        EMAIL: process.env.RESEND_EMAIL,
    },
    NODEMAILER: {
        EMAIL: process.env.NODEMAILER_EMAIL,
        PASSWORD: process.env.NODEMAILER_PASSWORD,
    },
    EMAIL: {
        OUTGOING_EMAIL: process.env.OUTGOING_EMAIL,
    }
}
