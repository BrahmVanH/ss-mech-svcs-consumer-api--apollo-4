import { ThumbtackReview } from '../../generated/graphql';
import { extractThumbtackData } from './helper';

import { execSync } from 'child_process';

// Scrape thumbtack data
// I wasn't able to get the timing right for getting the data, so I
// chose to just block the thread until the data is returned.
const scrape = () => {
	const scrapedData = execSync('python src/lib/thumbtack_review_scraper/thumbtack_scraper.py', { encoding: 'utf8' });
	const jsonString = scrapedData.replace(/ '/g, ' "').replace(/' /g, '" ').replace(/{'/g, '{"').replace(/'}/g, '"}').replace(/':/g, '":').replace(/',/g, '",');
	const reviewJson = JSON.parse(jsonString);

	if (reviewJson.length === 0 || !reviewJson) {
		throw new Error('No data returned from scraper');
	}

	const reviews = extractThumbtackData(reviewJson);

	if (reviews.length === 0 || !reviews) {
		throw new Error('No data returned from scraper');
	}

	return reviews;
};

export default scrape;
