import IORedis from 'ioredis';
import { ENVIRONMENT } from '../common/config/environment.js';
import { Queue, QueueEvents, Worker } from 'bullmq';
import { sendEmail } from './handlers/index.js';

// create a connection to Redis
const connection = new IORedis(ENVIRONMENT.REDIS.HOST, {
	password: ENVIRONMENT.REDIS.PASSWORD,
	maxRetriesPerRequest: null,
})

connection.on('connect', () => {
	console.log('Redis connection success 🔥');
})

connection.on('error', (error) => {
	console.log('Redis connection failed 💥', error);
})

// Create a new connection in every node instance
export const emailQueue = new Queue('emailQueue', {
	connection,
	defaultJobOptions: {
		attempts: 5,
		backoff: {
			type: 'exponential',
			delay: 2000,
		},
	},
});

export const addEmailToQueue = async (opts) => {
	const { type, data } = opts;
	try {
		await emailQueue.add(type, opts, {
			...(data.priority !== 'high' && { priority: 2 }),
		});
	} catch (error) {
		console.error('Error enqueueing email job:', error);
		throw error;
	}
};

const workerOptions = {
	connection,
	limiter: { max: 1, duration: 1000 }, // process 1 email every second due to rate limiting of email sender
	lockDuration: 5000, // 5 seconds to process the job before it can be picked up by another worker
	removeOnComplete: {
		age: 3600, // keep up to 1 hour
		count: 1000, // keep up to 1000 jobs
	},
	removeOnFail: {
		age: 24 * 3600, // keep up to 24 hours
	},
	concurrency: 5, // process 5 jobs concurrently
};

// create a worker to process jobs from the email queue
export const emailWorker = new Worker(
	'emailQueue',
	async (job) => await sendEmail(job.data),
	workerOptions
);

// create a queue event listener
export const emailQueueEvent = new QueueEvents('emailQueue', { connection });

emailQueueEvent.on('failed', ({ jobId, failedReason }) => {
	console.log(`Job ${jobId} failed with error ${failedReason}`);
	// Do something with the return value of failed job
});

emailQueueEvent.on('waiting', ({ jobId }) => {
	console.log(`A job with ID ${jobId} is waiting`);
});

emailQueueEvent.on('completed', ({ jobId, returnvalue }) => {
	console.log(`Job ${jobId} completed`, returnvalue);
	// Called every time a job is completed in any worker
});

emailWorker.on('error', (err) => {
	// log the error
	console.error(err);
});

emailWorker.on('failed', async (job, err) => {
	console.error(`Job ${job.id} failed with error: ${err.message}`);
	await job.moveToFailed({ message: err.message }, true); // Move job to failed queue
  });

// TODO: Implement RETRY logic for failed or stalled jobs

export const stopQueue = async () => {
	await emailWorker.close();
	await emailQueue.close();
	console.info('Email queue closed!');
};
