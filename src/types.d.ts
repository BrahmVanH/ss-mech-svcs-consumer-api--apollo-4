import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { BaseContext } from '@apollo/server';

interface CustomContext extends BaseContext {
	client: ApolloClient<NormalizedCacheObject>;
}
