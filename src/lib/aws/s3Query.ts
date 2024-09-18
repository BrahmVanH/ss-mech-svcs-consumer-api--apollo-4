import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const getSignedUrls = async (keys: string[]) => {
	if (!keys || keys.length < 1) {
		console.error('Error in querying s3 for objects, no image key(s) provided');
		return '';
	}

	const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY ?? '';
	const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN ?? '';
	const keyPairId = process.env.CLOUDFRONT_KEYPAIR_ID ?? '';
	const dateLessThan = new Date(Date.now() + 60 * 60 * 1000).toISOString();


	try {
		const ImgObjs = keys.map(async (key) => {
			const url = `${cloudfrontDomain}/${key}`;
			const signedUrl = await getSignedUrl({
				url,
				keyPairId,
				dateLessThan,
				privateKey,
			});
			if (!signedUrl) {
				console.error('Error in signing the url');
				return '';
			}

			return {
				key,
				url: signedUrl,
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
