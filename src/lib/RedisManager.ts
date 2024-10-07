import { rejects } from 'assert';
import { createClient, RedisClientType } from '@redis/client';

export default class RedisManager {
	public static client: RedisClientType | null = null;
	private static connectionPromise: Promise<RedisClientType> | null = null;

	public static async connect(): Promise<RedisClientType> {
		if (this.client?.isOpen) {
			return this.client;
		}
		if (this.connectionPromise) {
			return this.connectionPromise;
		}

		this.connectionPromise = new Promise((resolve, reject) => {
			try {
				const client: RedisClientType = createClient({
					password: process.env.REDIS_PASSWORD,
					socket: {
						host: process.env.REDIS_URL,
						port: parseInt(process.env.REDIS_PORT ?? '0'),
					},
				});

				client.on('error', (err) => console.error('Redis Client Error', err));
				client.on('connect', () => console.log('Redis Client Connected'));
				client.on('reconnecting', () => console.log('Redis Client Reconnecting'));
				client.on('ready', () => console.log('Redis Client Ready'));

				client.connect();

				this.client = client;
				resolve(client);
			} catch (error: any) {
				this.connectionPromise = null;
				rejects(error);
			}
		});
		return this.connectionPromise;
	}

	public static async disconnect(): Promise<void> {
		if (this.client) {
			await this.client.quit();
			this.client = null;
			this.connectionPromise = null;
		}
	}
}
