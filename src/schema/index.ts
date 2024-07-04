import Query from './queries';
import typeDefs from './typeDefs';
// import Mutation from './mutations';
import { Resolvers } from '../generated/graphql';

// const resolvers: Resolvers = { Query, Mutation };
const resolvers: Resolvers = { Query };

export { resolvers, typeDefs };
