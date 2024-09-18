export const extractThumbtackData = (reviewsArrArr: any) => {
	let reviews: any = [];
	reviewsArrArr.forEach((reviewsArr: any) => {
		reviews.push(reviewsArr[0]);
	});

	return reviews;
};
