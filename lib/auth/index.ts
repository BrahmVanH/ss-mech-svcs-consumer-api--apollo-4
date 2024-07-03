// import jwt, { JwtPayload } from 'jsonwebtoken';

// import { IUser } from '../types.d';
// import { User } from '../generated/graphql';

// export const signToken = ({ username, _id }: User) => {
// 	const expiration = process.env.AUTH_EXPIRATION ?? '';
// 	const secret: jwt.Secret = process.env.AUTH_SECRET ?? '';

// 	if (secret === '' || expiration === '') {
// 		console.error('Error in signToken: secret is not defined');
// 		return '';
// 	}
// 	const payload = { username, _id };
// 	const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });

// 	if (!token || token === '') {
// 		console.error('Error in signToken: token is not defined');
// 		return '';
// 	}
// 	return token;
// };

// export const authMiddleware = ({ req }: any) => {
// 	const expiration = process.env.AUTH_EXPIRATION ?? '';
// 	const secret = process.env.AUTH_SECRET ?? '';

// 	if (secret === '' || expiration === '') {
// 		console.error('Error in authMiddleware: secret is not defined');
// 		return req;
// 	}

// 	let token = req.body.token || req.query.token || req.headers.authorization;

// 	if (req.headers.authorization) {
// 		token = token.split(' ').pop().trim();
// 	}

// 	if (!token) {
// 		return req;
// 	}

// 	const { data } = jwt.verify(token, secret, { maxAge: expiration }) as JwtPayload;
// 	if (!data) {
// 		return req;
// 	}
// 	req.user = data;

// 	return req;
// };

export {};
