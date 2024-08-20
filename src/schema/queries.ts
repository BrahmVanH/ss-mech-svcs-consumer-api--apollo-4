import { QueryGetPresignedS3UrlsArgs, QueryResolvers } from '../generated/graphql';
import { getSignedUrls } from '../lib/aws/s3Query';
// import scrape from '../lib/thumbtack_review_scraper';

const queries: QueryResolvers = {
	queryThumbtackReviews: async (_: {}, __, { scrape }) => {
		try {
			const reviews = scrape();
			if (reviews && reviews.length < 1) {
				throw new Error('Error fetching reviews from Thumbtack');
			}
			return reviews;
		} catch (err: any) {
			console.error({ message: 'error in finding reviews', details: err });
			throw new Error('Error in finding reviews: ' + err.message);
		}
	},
	getPresignedS3Urls: async (_: {}, { keys }: QueryGetPresignedS3UrlsArgs, __: any) => {
		try {
			if (!keys || keys.length < 1) {
				// console.error('There was an error querying presigned urls, no image keys provided');
				return [''];
			}
			const signedUrls = await getSignedUrls(keys);

			if (!signedUrls) {
				console.error('An unknown error ocurred while trying to get presigned s3 urls');
				return [''];
			}

			return signedUrls;
		} catch (err: any) {
			console.error({ message: 'error in getting signed s3 urls', details: err });
			throw new Error('error in getting signed s3 urls: ' + err.message);
		}
	},
};

export default queries;
