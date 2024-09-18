import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const getSignedUrls = async (keys: string[]) => {
	if (!keys || keys.length < 1) {
		console.error('Error in querying s3 for objects, no image key(s) provided');
		return '';
	}

	const s3 = new S3Client({
		region: process.env.AWS_REGION ?? '',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
		},
	});

	const bucketName = process.env.AWS_BUCKET_NAME ?? '';

	try {
		const ImgObjs = keys.map(async (key) => {
			const url = await getSignedUrl(
				s3,
				new GetObjectCommand({
					Bucket: bucketName,
					Key: key,
				}),
				{
					expiresIn: 3600,
				}
			);
			if (!url) {
				console.error('Error in signing the url');
				return '';
			}
			
			return {
				key,
				url,
			};
		});

		if (!ImgObjs) {
			console.error('An unknown error occurred while trying to get presigned s3 urls');
			return '';
		}

		return ImgObjs;
	} catch (err) {
		console.error('there was an error in signing the url', err);
		return '';
	}
};

// const getImgTag = async (imageBucket: string, imageItem: S3Object) => {
// 	const s3 = new S3Client({
// 		region: process.env.S3_REGION ?? '',
// 		credentials: {
// 			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
// 			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
// 		},
// 	});
// 	if (!imageItem) {
// 		console.error('Error in retrieving image tags');
// 		throw new Error('Error in retrieving image tags');
// 	}

// 	const altTag = new GetObjectTaggingCommand({
// 		Bucket: imageBucket,
// 		Key: imageItem?.Key,
// 	});

// 	try {
// 		const response = await s3.send(altTag);

// 		if (!response?.TagSet) {
// 			console.error('Error in retrieving image tags');
// 			throw new Error('Error in retrieving image tags');
// 		}
// 		return response.TagSet[0]?.Value;
// 	} catch (err) {
// 		console.error('there was an error in retrieving image tags', err);
// 	}
// };
