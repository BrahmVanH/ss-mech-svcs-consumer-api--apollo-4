const typeDefs = `#graphql
# AWS S3 Types

type ImgObj {
	key: String
	url: String
	alt: String
}

type DeleteS3ObjectResponse {
	status: Int!
	message: String!
}

input DeleteS3ObjectInput {
	imgKeys: [String!]!
}



# Thumbtack Review Types 

type ThumbtackReviewAuthor {
	name: String!
}

type ThumbtackReviewRating {
	
	ratingValue: Int!
}

type ThumbtackReview {
	
	datePublished: String!
	description: String!
	author: ThumbtackReviewAuthor!
	reviewRating: ThumbtackReviewRating!
}

# Schedule Services (API to API) & CRUD Types

type ScheduleServiceMessage {
	givenName: String!
	familyName: String!
	tel: String!
	email: String!
	location: String!
	service: String!
	message: String!
}

input ScheduleServiceMessageInput {
	givenName: String! @constraint(minLength: 1, maxLength: 20)
	familyName: String! @constraint(minLength: 1, maxLength: 20)
	tel: String! @constraint(minLength: 1, maxLength: 12)
	email: String! @constraint(format: "email", maxLength: 255)
	location: String! @constraint(minLength: 1, maxLength: 10)
	service: String! @constraint(minLength: 1, maxLength: 40)
	message: String! @constraint(pattern: "[A-Za-z0-9 _.,!'/$]*", minLength: 10, maxLength: 255)
}

# Queries

type Query {


	# S3 Queries
	getPresignedS3Objects(keys: [String!]!): [ImgObj!]!

	# Thumbtack Review Queries
	queryThumbtackReviews: [ThumbtackReview!]
  

}

 type Mutation  {

 	# Schedule Service Mutations (API to API)
 	sendScheduleServiceMessage(input: ScheduleServiceMessageInput!): String! @rateLimit(limit: 5, duration: 3600)

}
`;

export default typeDefs;
