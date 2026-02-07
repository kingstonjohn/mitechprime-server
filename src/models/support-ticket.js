import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const supportChatSchema = new mongoose.Schema({
    participants: [
        {
            type: ObjectId,
            ref: "user",
        },
    ],
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },
    messages: [
        {
            to: {
                type: ObjectId,
                ref: "user",
            },
            from: {
                type: ObjectId,
                ref: "user",
            },
            type: {
                type: String,
                enum: ["text", "document", "link", "video", "audio", "image"],
            },
            text: {
                type: String,
            },
            link: {
                type: String,
            },
            document: {
                type: String,
            },
            audio: {
                type: String,
            },
            video: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
            updatedAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
}, { timestamps: true });

const SupportTicketModel = mongoose.model('support-chat', supportChatSchema)

export { SupportTicketModel }
