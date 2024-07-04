export const extractThumbtackData = (reviewsArrArr: any) => {
	console.log('extractThumbtackData reviewsArrArr');
	let reviews: any = [];
	reviewsArrArr.forEach((reviewsArr: any) => {
		reviews.push(reviewsArr[0]);
	});

	return reviews;
};
