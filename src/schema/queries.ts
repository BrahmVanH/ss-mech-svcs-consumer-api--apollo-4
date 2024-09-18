import { ImgObj, QueryGetPresignedS3ObjectsArgs, QueryResolvers, ThumbtackReview } from '../generated/graphql';
import { getSignedUrls } from '../lib/aws/s3Query';

// import scrape from '../lib/thumbtack_review_scraper';

interface Context {
	scrape: () => ThumbtackReview[];
}

const queries: QueryResolvers = {
	queryThumbtackReviews: async (_: {}, __, { scrape }: Context) => {
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
	getPresignedS3Objects: async (_: {}, { keys }: QueryGetPresignedS3ObjectsArgs, __: Context) => {
		try {
			if (!keys || keys.length < 1) {
				// console.error('There was an error querying presigned urls, no image keys provided');
				return [];
			}
			const imgObjs: ImgObj[] = (await getSignedUrls(keys)) as ImgObj[];

			if (!imgObjs || imgObjs.length < 1) {
				console.error('An unknown error ocurred while trying to get presigned s3 urls');
				return [];
			}

			return imgObjs;
		} catch (err: any) {
			console.error({ message: 'error in getting signed s3 urls', details: err });
			throw new Error('error in getting signed s3 urls: ' + err.message);
		}
	},
};

export default queries;
