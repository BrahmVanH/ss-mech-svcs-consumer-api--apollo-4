import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schema';
import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request } from 'express';
import cors from 'cors';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { CustomContext } from './types';
import client from './lib/apolloClient';

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

let schema = makeExecutableSchema({
	typeDefs: [constraintDirectiveTypeDefs, typeDefs],
	resolvers,
});

// Apply constraint directives to schema

schema = constraintDirective()(schema);

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

const startApolloServer = async () => {
	try {
		await server.start();
		app.use(
			'/graphql',
			cors({ origin: allowedOrigins }),
			express.json(),
			expressMiddleware(server, {
				context: async ({ req }: { req: Request }) => {
					return {
						client,
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
