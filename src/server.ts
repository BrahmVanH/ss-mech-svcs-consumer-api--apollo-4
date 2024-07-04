import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schema';
import { db } from './config/connection';
import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { Resolvers } from './generated/graphql';

// Configre environment variables

dotenv.config();

// Create express app instance

const app = express();

const httpServer = http.createServer(app);

const port = process.env.PORT ?? 4000;

let schema = makeExecutableSchema({
	typeDefs: [constraintDirectiveTypeDefs, typeDefs],
	resolvers,
});

schema = constraintDirective()(schema);

const server = new ApolloServer<BaseContext>({
	schema,
	introspection: true,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	if (!allowedOrigins.includes(req.headers.origin ?? '')) {
		console.log('Origin not allowed:', req.headers.origin);
		// To-do: add more security to prevent access from unauthorized origins

		return res.status(403).send('Origin not allowed');
	}
	next();
});

// const startApolloServer = async () => {
// 	try {
// 		await server.start();
// 		app.use('/graphql', cors({ origin: allowedOrigins }), express.json(), expressMiddleware(server));
// 		// app.use((req, res, next) => {
// 		// 	if (!allowedOrigins.includes(req.headers.origin ?? '')) {
// 		// 		console.log('Origin not allowed:', req.headers.origin);
// 		// 	}
// 		// 	next();
// 		// });
// 	} catch (err: any) {
// 		console.error('Error starting server', err);
// 	}
// };

// const startHttpServer = async () => {
// 	try {
// 		await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
// 		console.log(`🚀 Server ready at http://localhost:4000/graphql`);
// 	} catch (err: any) {
// 		console.error('Error starting server', err);
// 	}
// };

// startApolloServer()
// 	.then(() => {
// 		startHttpServer();
// 	})
// 	.catch((err) => {
// 		console.error('Error starting server', err);
// 	});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs: any, resolvers: Resolvers) => {
	await server.start();
	// server.applyMiddleware({ app: app as any });
	app.use('/graphql', cors({ origin: allowedOrigins }), express.json(), expressMiddleware(server));

	db.once('open', () => {
		app.listen(port, () => {
			console.log('allowed origins:', process.env.CORS_ORIGINS);
			console.log('allowedOrigins:', allowedOrigins);
			console.log(`API server running on port ${port}!`);
			console.log(`Use GraphQL at http://localhost:${port}/graphql`);
		});
	});
};
