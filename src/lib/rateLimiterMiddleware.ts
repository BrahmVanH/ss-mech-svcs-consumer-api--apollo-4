import { NextFunction, Request, Response } from 'express';
import RedisManager from './RedisManager';

const RATE_LIMIT_WINDOW = 3600;
const MAX_REQUESTS = 5;

// Rate limiter middleware that uses a redis store to track user ips and their request count
const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const client = await RedisManager.connect();
		const ip = req.ip;
		const key = `rate-limiter:${ip}`;

		// Using multi to ensure atomicity
		const multi = client.multi();
		multi.get(key);
		multi.ttl(key);

		const execResult = await multi.exec();
		const getErr = execResult ? execResult[0] : null;
		const currentCount = execResult ? execResult[1] : null;
		const ttlErr = execResult ? execResult[2] : null;
		const ttl = execResult ? execResult[3] : null;

		if (getErr || ttlErr) throw getErr || ttlErr;

		if (currentCount && typeof currentCount === 'string' && parseInt(currentCount) >= MAX_REQUESTS) {
			return res.status(429).json({
				error: 'Too many requests',
				retryAfter: ttl,
			});
		}

		// Increment or set the counter
		await client.multi().incr(key).expire(key, RATE_LIMIT_WINDOW).exec();

		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};

export default rateLimiter;
