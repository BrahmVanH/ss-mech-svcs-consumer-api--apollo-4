declare module 'perfect-express-sanitizer' {
	import { RequestHandler } from 'express';

	export interface SanitizerOptions {
		xss?: boolean;
		noSql?: boolean;
		sql?: boolean;
		level?: 1 | 2;
		allow?: string[];
		replace?: (value: any) => any;
	}

	export interface Sanitizer {
		clean(options?: SanitizerOptions): RequestHandler;
		middleware(options?: SanitizerOptions): RequestHandler;
		sanitize(data: any, options?: SanitizerOptions): any;
	}

	const sanitizer: Sanitizer;

	export = sanitizer;
}
