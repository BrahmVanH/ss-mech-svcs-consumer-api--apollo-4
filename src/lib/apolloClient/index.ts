import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: process.env.CRM_LAMBDA_FUNC_URL ?? 'http://localhost:5000/graphql',
		headers: {
			origin: process.env.CORS_ORIGIN ?? 'http://localhost:4000',
		},
	}),
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		},
		mutate: {
			fetchPolicy: 'no-cache',
		},
	},
});

export default client;
