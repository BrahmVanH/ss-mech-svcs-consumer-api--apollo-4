import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { BaseContext } from '@apollo/server';

declare module 'perfect-express-sanitizer' {
	import { RequestHandler } from 'express';

	interface SanitizerOptions {
		xss?: boolean;
		noSql?: boolean;
		sql?: boolean;
		level?: 1 | 2;
		allow?: string[];
		replace?: (value: any) => any;
	}

	interface Sanitizer {
		clean(options?: SanitizerOptions): RequestHandler;
		middleware(options?: SanitizerOptions): RequestHandler;
		sanitize(data: any, options?: SanitizerOptions): any;
	}

	const sanitizer: Sanitizer;

	export = sanitizer;
}

interface CustomContext extends BaseContext {
	client: ApolloClient<NormalizedCacheObject>;
}

export type S3Object = {
	Key: string;
	LastModified: Date;
	ETag: string;
	ChecksumAlgorithm: string[]; // You might want to specify the actual type here
	Size: number;
	StorageClass: string;
};
