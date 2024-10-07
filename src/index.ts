import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schema';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request } from 'express';
import cors from 'cors';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { rateLimitDirective } from 'graphql-rate-limit-directive';
import { CustomContext } from '../types/types';
import client from './lib/apolloClient';
import scrape from './lib/thumbtack_review_scraper';

// Configre environment variables

dotenv.config();

// Create express app instance

const app = express();

// Create an http server to use locally - hosting provider will
// provide Secure transfers in production

const httpServer = http.createServer(app);

// Declare local port or allow hosting provider to assign port

const port = process.env.PORT ?? 4000;

// Create schema and apply constraint directives for validation

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();

let schema = makeExecutableSchema({
	typeDefs: [constraintDirectiveTypeDefs, rateLimitDirectiveTypeDefs, typeDefs],
	resolvers,
});

// Apply constraint and rate limit directives to schema

schema = constraintDirective()(schema);
schema = rateLimitDirectiveTransformer(schema);

// Create Apollo Server instance

// To Do: Disable introspection in production after live testing
const server = new ApolloServer<CustomContext>({
	schema,
	introspection: true,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Allow only specified origins to access the server

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

// Start Apollo Server, Apply middleware to express app, including CORS and JSON parsing,
// allows server to use /graphql endpoint
// Add access-control-allow-credentials header to allow cookies to be sent to the server

const startApolloServer = async () => {
	try {
		await server.start();
	
		app.use(
			'/graphql',
			cors({ origin: allowedOrigins, credentials: true }),
			express.json(),
			expressMiddleware(server, {
				context: async ({ req }: { req: Request }) => {
					// const provided_api_key = req.headers.authorization ?? '';
					// console.log('API Key:', provided_api_key);
					// // Compare api key provided by client to env
					// if (provided_api_key !== process.env.API_KEY) {
					// 	console.log('Invalid API Key');
					// 	throw new Error('Invalid API Key');
					// }

					return {
						client,
						scrape,
					};
				},
			})
		);
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

// Define how to start the http server on designated port

const startHttpServer = async () => {
	try {
		await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
		console.log(`🚀 Server ready at port: ${port}`);
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

// Start the Apollo Server and the HTTP Server
startApolloServer()
	.then(() => {
		startHttpServer();
	})
	.catch((err) => {
		console.error('Error starting server', err);
	});
