import mongoose from 'mongoose'
import { ENVIRONMENT } from './environment.js'

export const connectDb = async () => {
    // console.log(process.env.MONGODB_URL)
    try {
        const conn = await mongoose.connect(ENVIRONMENT.DB.URL)

        console.log('MongoDB Connected to ' + conn.connection.name)
    } catch (error) {
        console.log('Error: ' + error.message)
        process.exit(1)
    }
}
