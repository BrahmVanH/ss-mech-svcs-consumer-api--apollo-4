// import { PutObjectCommand, DeleteObjectCommand, DeleteObjectsCommand, S3Client, DeleteObjectCommandOutput } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// const createPresignedUrlWithClient = ({ region, bucket, key, commandType, altTag }: { region: string; bucket: string; key: string; commandType: string; altTag: string }) => {
// 	const client = new S3Client({
// 		region: process.env.S3_REGION ?? '',
// 		credentials: {
// 			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
// 			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
// 		},
// 	});
// 	let command;
// 	if (commandType === 'put') {
// 		command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: 'image/jpg', Tagging: `alt=${altTag}` });
// 		return getSignedUrl(client, command, { expiresIn: 3600, unhoistableHeaders: new Set(['x-amz-tagging']) });
// 	} else if (commandType === 'delete') {
// 		command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
// 		return getSignedUrl(client, command, { expiresIn: 3600 });
// 	} else {
// 		console.error('Invalid command type');
// 		throw new Error();
// 	}
// };

// export const getPresignedUrl = async (key: string, commandType: string, altTag: string) => {
// 	if (!key) {
// 		console.error('No key provided');
// 		throw new Error();
// 	}
// 	const REGION = process.env.S3_REGION ?? '';
// 	const BUCKET = process.env.S3_BUCKET_NAME ?? '';
// 	const KEY = key;

// 	try {
// 		const uploadUrl = await createPresignedUrlWithClient({
// 			region: REGION,
// 			bucket: BUCKET,
// 			key: KEY,
// 			commandType,
// 			altTag,
// 		});

// 		return uploadUrl;
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// export const deleteS3Objects = async (keys: string[]) => {
// 	const client = new S3Client({
// 		region: process.env.S3_REGION ?? '',
// 		credentials: {
// 			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
// 			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
// 		},
// 	});

// 	if (!keys.length) {
// 		console.error('No keys provided');
// 		throw new Error('No image keys provided');
// 	}

// 	const params = {
// 		Bucket: process.env.S3_BUCKET_NAME ?? '',
// 		Delete: {
// 			Objects: keys.map((key) => ({ Key: key })),
// 		},
// 	};

// 	const command = new DeleteObjectsCommand(params);
// 	try {
// 		const data = await client.send(command);
// 		if (data.$metadata.httpStatusCode === 204 || data.$metadata.httpStatusCode === 200) {

// 			return {
// 				status: data.$metadata.httpStatusCode,
// 				message: 'Successfully deleted image(s)',
// 			};
// 		}
// 		console.error('Failed to delete object', data);
// 		return {
// 			status: 400,
// 			message: 'Failed to delete image(s)',
// 		};
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
