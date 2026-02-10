import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from "cors"
import http from "http"
import { ENVIRONMENT } from './common/config/environment.js'
import { connectDb } from './common/config/database.js'
import { API_VERSION } from './common/constants/index.js'
import { authRouter } from './routes/authRouter.js'
import { appErrorMiddleware } from './middlewares/appError.js'
import { userRouter } from './routes/userRoute.js'
import { addEmailToQueue, emailQueue, emailQueueEvent, emailWorker, stopQueue } from './queues/emailQueue.js'
import { adminRouter } from './routes/adminRoute.js'
import { Server } from 'socket.io'
import { timeoutMiddleware } from './middlewares/timeout.js'
import { SupportTicketModel } from './models/support-ticket.js'
import { UserModel } from './models/user.js'
import { UAParser } from 'ua-parser-js'
import { LoginActivityModel } from './models/login-activity.js'

process.on('uncaughtException', async (error) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Server Shutting down...')
    console.log(error.name, error.message)
    await stopQueue();
    process.exit(1);
})

const app = express()

app.set('trust proxy', true)
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.disable('x-powered-by')

// Compression Middleware
app.use(compression())

//Middleware to allow CORS from frontend
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'https://mitechprime.com', 'https://www.mitechprime.com', 'https://backdoor-vault.mitechprime.com', 'https://www.backdoor-vault.mitechprime.com'],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

// Rate limiter middleware
// const limiter = rateLimit({
//    windowMs: 10 * 60 * 1000, // 15 minutes
//     max: 300, // Limit each IP to 300 requests per windowMs
//     message: 'Too many requests, please try again later.',
// })
// app.use(limiter) 

//Secure cookies and other helmet-related configurations
app.use(helmet.hidePoweredBy())
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.permittedCrossDomainPolicies())

// Prevent browser from caching sensitive information
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    next()
})

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: ['date', 'createdAt'], // whitelist some parameters
    })
)

// Logger middleware
app.use(morgan('dev'))

// Add request time to req object
app.use((req, res, next) => {
    req['requestTime'] = new Date().toISOString()
    next()
})

// Initialize routes

app.get('/', async (req, res) => {
    res.send('Welcome to Fizomarket server!')
})

// Endpoint to test if server is alive
app.use(`${API_VERSION}/alive`, (request, response) =>
    response
        .status(200)
        .json({ status: 'Success', message: 'Server is up and running' })
)

// Auth route
app.use(`${API_VERSION}/auth`, authRouter)

app.use(`${API_VERSION}/user`, userRouter)

app.use(`${API_VERSION}/admin`, adminRouter)

// Handle unknown routes
app.all('/*', async (req, res) => {
    console.log(
        'Route not found ' + new Date(Date.now()) + ' ' + req.originalUrl
    )
    res.status(404).json({
        status: 'error',
        message: `OOPs!! No handler defined for ${req.method.toUpperCase()}: ${req.url
            } route. Check the API documentation for more details.`,
    })
})

// SOCKETS

// to ensure all the express middlewares are set up before starting the socket server
// including security headers and other middlewares
const server = http.createServer(app);
const io = new Server(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'https://mitechprime.com', 'https://www.mitechprime.com', 'https://backdoor-vault.mitechprime.com', 'https://www.backdoor-vault.mitechprime.com'],
    },
});

app.use((request, response, next) => {
    request.io = io;
    next();
});

io.on(
    'connection',
    (async (socket) => {
        const queryUserId = socket.handshake.query?._id;
        const userAgent = socket.handshake.headers['user-agent'];
        const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;

        console.log('User Connected ==> ', socket.id);
        console.log("Query User Id ==>", queryUserId)
        console.log("User Agent => ", userAgent)
        console.log("IP => ", ip)

        let parser = new UAParser(userAgent);

        let parserResults = parser.getResult();
        const deviceInformation = `Browser: ${parserResults.browser.name}, OS: ${parserResults.os.name}`

        if (queryUserId != null) {
            try {
                const user = await UserModel.findByIdAndUpdate(queryUserId, {
                    socketId: socket.id,
                    status: "online",
                }, { new: true });

                if (user.role == "client") {

                    const username = `${user.firstName} ${user.lastName}`;

                    const userEmail = user.email;

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

                    addEmailToQueue({
                        type: 'activityNotification',
                        data: {
                            to: ENVIRONMENT.EMAIL.OUTGOING_EMAIL,
                            title: `${username} Is Now Active`,
                            content: `New User Session Started for ${username}
                        <br />${timestamp}
                        <br />${deviceInformation}
                        <br />IP: ${ip}
                        `,
                            priority: 'high',
                        },
                    });

                    await LoginActivityModel.create({
                        email: userEmail,
                        deviceInfo: deviceInformation,
                        ipAddress: ip,
                        activity: 'ACTIVITY'
                    })
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        socket.on('support-tickets', async (data) => {

            const userId = data?._id;

            try {
                const supportChats = await SupportTicketModel.find({
                    participants: { $all: [userId] },
                })
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                socket.emit('output-support-tickets', supportChats)
            }
            catch (error) {
                socket.emit('error', "An error occurred!");
            }
        })

        socket.on('create-support-ticket', async (data, callback) => {

            try {
                const userId = data._id;

                const admins = await UserModel.find({ role: "admin" });

                const adminsId = admins.map(admins => admins._id);

                await SupportTicketModel.create({
                    participants: [userId, ...adminsId],
                    messages: [{
                        from: userId,  // assuming userId is the customer creating the ticket
                        to: adminsId[1],  // sending to the super admin in the list
                        type: 'text',
                        text: data.message,
                    }]
                });

                const supportChats = await SupportTicketModel.find({
                    participants: { $all: [userId] },
                })
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                const adminSupportChats = await SupportTicketModel
                    .find()
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to")
                    .sort({ "createdAt": -1 })
                    .exec();

                admins.forEach(data => {
                    io.to(data.socketId).emit('new-support-ticket--admin', adminSupportChats)
                })

                callback(supportChats)
            }
            catch (error) {
                console.log(error)
                socket.emit('error', "An error occurred!");
            }
        })

        // Chat functionality

        socket.on('chat-history', async (chatId) => {

            try {
                const supportChat = await SupportTicketModel
                    .findById(chatId)
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to")

                socket.emit('chat-messages', supportChat)
            }
            catch (error) {
                socket.emit('error', "An error occurred!");
            }
        })

        socket.on('create-chat-message', async (data) => {

            const chatId = data.chatId;

            try {
                const supportChat = await SupportTicketModel
                    .findById(chatId)
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                const user = supportChat.participants[0];
                const admins = supportChat.participants.slice(1);
                const adminsId = admins.map(data => data._id);

                const newMessage = {
                    type: data.type,
                    text: data.text,
                    from: user._id,
                    to: adminsId[0],
                }

                supportChat.messages.push(newMessage);

                await supportChat.save({ new: true, validateModifiedOnly: true });

                const supportChatMessages = await SupportTicketModel
                    .findById(chatId)
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to")

                const adminSupportChats = await SupportTicketModel
                    .find()
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to")
                    .sort({ "createdAt": -1 })
                    .exec();

                socket.emit('new-chat-message', supportChatMessages);

                const activeAdmins = admins.filter(data => data.status === "online");

                activeAdmins.forEach(data => {
                    io.to(data.socketId).emit('output-support-tickets', adminSupportChats)
                    io.to(data.socketId).emit('chat-messages', supportChatMessages)
                })
            }
            catch (error) {
                console.log(error)
                socket.emit('error', "An error occurred!");
            }
        })

        socket.on('admin-create-chat-message', async (data) => {

            const chatId = data.chatId;
            const adminId = data._id

            try {
                const supportChat = await SupportTicketModel
                    .findById(chatId)
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                const user = supportChat.participants[0];
                const admin = supportChat.participants.find(data => data._id == adminId);

                const newMessage = {
                    type: data.type,
                    text: data.text,
                    from: admin._id,
                    to: user._id,
                }

                supportChat.messages.push(newMessage);

                await supportChat.save({ new: true, validateModifiedOnly: true });

                const supportChatMessages = await SupportTicketModel
                    .findById(chatId)
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                const userSupportChats = await SupportTicketModel.find({
                    participants: { $all: [user._id] },
                })
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                socket.emit('new-chat-message', supportChatMessages);

                io.to(user.socketId).emit('output-support-tickets', userSupportChats)
                io.to(user.socketId).emit('chat-messages', supportChatMessages)
            }
            catch (error) {
                console.log(error)
                socket.emit('error', "An error occurred!");
            }
        })

        socket.on('close-support-ticket', async (data, callback) => {

            const supportChat = await SupportTicketModel.findByIdAndUpdate(data,
                { status: "close" },
                { new: true }
            );

            supportChat.participants.forEach(async (userId) => {
                const user = await UserModel.findById(userId);

                const supportChats = await SupportTicketModel.find({
                    participants: { $all: [user._id] },
                })
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                io.to(user.socketId).emit('output-support-tickets', supportChats)
            })

            callback("Support ticket closed")
        })

        socket.on('open-support-ticket', async (data, callback) => {

            const supportChat = await SupportTicketModel.findByIdAndUpdate(data,
                { status: "open" },
                { new: true },
            )

            supportChat.participants.forEach(async (userId) => {
                const user = await UserModel.findById(userId);

                const supportChats = await SupportTicketModel.find({
                    participants: { $all: [user._id] },
                })
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                io.to(user.socketId).emit('output-support-tickets', supportChats)
            })

            callback("Support ticket opened")
        })

        socket.on('delete-support-ticket', async (data, callback) => {

            const supportChat = await SupportTicketModel.findByIdAndDelete(data)

            supportChat.participants.forEach(async (userId) => {
                const user = await UserModel.findById(userId);

                const supportChats = await SupportTicketModel.find({
                    participants: { $all: [user._id] },
                })
                    .populate("participants")
                    .populate("messages.from")
                    .populate("messages.to");

                io.to(user.socketId).emit('output-support-tickets', supportChats)
            })

            callback("Support ticket deleted")
        })

        // disconnect
        socket.on('disconnect', async () => {
            console.log('user disconnected ===> ', socket.id);

            try {
                await UserModel.findOneAndUpdate(
                    { socketId: socket.id },
                    {
                        status: "offline",
                    });
            }
            catch (error) {
                console.log(error);
            }
        });
    })
);

app.use(timeoutMiddleware);
app.use(appErrorMiddleware);

const appServer = server.listen(ENVIRONMENT.APP.PORT, async () => {
    await connectDb()
    console.log(
        `Server is running live: http://localhost:${ENVIRONMENT.APP.PORT}`
    );

    await emailQueue.waitUntilReady();
    await emailWorker.waitUntilReady();
    await emailQueueEvent.waitUntilReady();
})

// unhandledRejection  handler
process.on('unhandledRejection', async (error) => {
    console.log('UNHANDLED REJECTION! 💥 Server Shutting down...')
    console.log(error.name, error.message)
    await stopQueue();
    appServer.close(() => {
        process.exit(1)
    })
})
