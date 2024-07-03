// import { QueryResolvers } from '../__generated__/graphql';
import scrape from '../lib/thumbtack_review_scraper';

const queries = {
	queryThumbtackReviews: async () => {
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
};

export default queries;
