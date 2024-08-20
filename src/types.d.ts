import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { BaseContext } from '@apollo/server';

interface CustomContext extends BaseContext {
	client: ApolloClient<NormalizedCacheObject>;
}


export type S3Object = {
	Key: string;
	LastModified: Date;
	ETag: string;
	ChecksumAlgorithm: string[]; // You might want to specify the actual type here
	Size: number;
	StorageClass: string;
};