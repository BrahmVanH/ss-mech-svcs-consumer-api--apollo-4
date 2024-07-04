import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  email_String_NotNull_maxLength_255_format_email: { input: any; output: any; }
  familyName_String_NotNull_minLength_1_maxLength_20: { input: any; output: any; }
  givenName_String_NotNull_minLength_1_maxLength_20: { input: any; output: any; }
  location_String_NotNull_minLength_1_maxLength_10: { input: any; output: any; }
  message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs: { input: any; output: any; }
  service_String_NotNull_minLength_1_maxLength_40: { input: any; output: any; }
  tel_String_NotNull_minLength_1_maxLength_12: { input: any; output: any; }
};

export type DeleteS3ObjectInput = {
  imgKeys: Array<Scalars['String']['input']>;
};

export type DeleteS3ObjectResponse = {
  __typename?: 'DeleteS3ObjectResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendScheduleServiceMessage: Scalars['String']['output'];
};


export type MutationSendScheduleServiceMessageArgs = {
  input: ScheduleServiceMessageInput;
};

export type Query = {
  __typename?: 'Query';
  queryThumbtackReviews?: Maybe<Array<ThumbtackReview>>;
};

export type ScheduleServiceMessage = {
  __typename?: 'ScheduleServiceMessage';
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  location: Scalars['String']['output'];
  message: Scalars['String']['output'];
  service: Scalars['String']['output'];
  tel: Scalars['String']['output'];
};

export type ScheduleServiceMessageInput = {
  email: Scalars['email_String_NotNull_maxLength_255_format_email']['input'];
  familyName: Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['input'];
  givenName: Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['input'];
  location: Scalars['location_String_NotNull_minLength_1_maxLength_10']['input'];
  message: Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs']['input'];
  service: Scalars['service_String_NotNull_minLength_1_maxLength_40']['input'];
  tel: Scalars['tel_String_NotNull_minLength_1_maxLength_12']['input'];
};

export type ThumbtackReview = {
  __typename?: 'ThumbtackReview';
  author: ThumbtackReviewAuthor;
  datePublished: Scalars['String']['output'];
  description: Scalars['String']['output'];
  reviewRating: ThumbtackReviewRating;
};

export type ThumbtackReviewAuthor = {
  __typename?: 'ThumbtackReviewAuthor';
  name: Scalars['String']['output'];
};

export type ThumbtackReviewRating = {
  __typename?: 'ThumbtackReviewRating';
  ratingValue: Scalars['Int']['output'];
};

export type ImageObject = {
  __typename?: 'imageObject';
  imgKey: Scalars['String']['output'];
  original: Scalars['String']['output'];
  originalAlt: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  thumbnailAlt: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: ResolverTypeWrapper<DeleteS3ObjectResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ScheduleServiceMessage: ResolverTypeWrapper<ScheduleServiceMessage>;
  ScheduleServiceMessageInput: ScheduleServiceMessageInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ThumbtackReview: ResolverTypeWrapper<ThumbtackReview>;
  ThumbtackReviewAuthor: ResolverTypeWrapper<ThumbtackReviewAuthor>;
  ThumbtackReviewRating: ResolverTypeWrapper<ThumbtackReviewRating>;
  email_String_NotNull_maxLength_255_format_email: ResolverTypeWrapper<Scalars['email_String_NotNull_maxLength_255_format_email']['output']>;
  familyName_String_NotNull_minLength_1_maxLength_20: ResolverTypeWrapper<Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['output']>;
  givenName_String_NotNull_minLength_1_maxLength_20: ResolverTypeWrapper<Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['output']>;
  imageObject: ResolverTypeWrapper<ImageObject>;
  location_String_NotNull_minLength_1_maxLength_10: ResolverTypeWrapper<Scalars['location_String_NotNull_minLength_1_maxLength_10']['output']>;
  message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs: ResolverTypeWrapper<Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs']['output']>;
  service_String_NotNull_minLength_1_maxLength_40: ResolverTypeWrapper<Scalars['service_String_NotNull_minLength_1_maxLength_40']['output']>;
  tel_String_NotNull_minLength_1_maxLength_12: ResolverTypeWrapper<Scalars['tel_String_NotNull_minLength_1_maxLength_12']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: DeleteS3ObjectResponse;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  ScheduleServiceMessage: ScheduleServiceMessage;
  ScheduleServiceMessageInput: ScheduleServiceMessageInput;
  String: Scalars['String']['output'];
  ThumbtackReview: ThumbtackReview;
  ThumbtackReviewAuthor: ThumbtackReviewAuthor;
  ThumbtackReviewRating: ThumbtackReviewRating;
  email_String_NotNull_maxLength_255_format_email: Scalars['email_String_NotNull_maxLength_255_format_email']['output'];
  familyName_String_NotNull_minLength_1_maxLength_20: Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['output'];
  givenName_String_NotNull_minLength_1_maxLength_20: Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['output'];
  imageObject: ImageObject;
  location_String_NotNull_minLength_1_maxLength_10: Scalars['location_String_NotNull_minLength_1_maxLength_10']['output'];
  message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs: Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs']['output'];
  service_String_NotNull_minLength_1_maxLength_40: Scalars['service_String_NotNull_minLength_1_maxLength_40']['output'];
  tel_String_NotNull_minLength_1_maxLength_12: Scalars['tel_String_NotNull_minLength_1_maxLength_12']['output'];
};

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']['input']>;
  endsWith?: Maybe<Scalars['String']['input']>;
  exclusiveMax?: Maybe<Scalars['Float']['input']>;
  exclusiveMin?: Maybe<Scalars['Float']['input']>;
  format?: Maybe<Scalars['String']['input']>;
  max?: Maybe<Scalars['Float']['input']>;
  maxItems?: Maybe<Scalars['Int']['input']>;
  maxLength?: Maybe<Scalars['Int']['input']>;
  min?: Maybe<Scalars['Float']['input']>;
  minItems?: Maybe<Scalars['Int']['input']>;
  minLength?: Maybe<Scalars['Int']['input']>;
  multipleOf?: Maybe<Scalars['Float']['input']>;
  notContains?: Maybe<Scalars['String']['input']>;
  pattern?: Maybe<Scalars['String']['input']>;
  startsWith?: Maybe<Scalars['String']['input']>;
  uniqueTypeName?: Maybe<Scalars['String']['input']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DeleteS3ObjectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteS3ObjectResponse'] = ResolversParentTypes['DeleteS3ObjectResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  sendScheduleServiceMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSendScheduleServiceMessageArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  queryThumbtackReviews?: Resolver<Maybe<Array<ResolversTypes['ThumbtackReview']>>, ParentType, ContextType>;
};

export type ScheduleServiceMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleServiceMessage'] = ResolversParentTypes['ScheduleServiceMessage']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  service?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbtackReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThumbtackReview'] = ResolversParentTypes['ThumbtackReview']> = {
  author?: Resolver<ResolversTypes['ThumbtackReviewAuthor'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviewRating?: Resolver<ResolversTypes['ThumbtackReviewRating'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbtackReviewAuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThumbtackReviewAuthor'] = ResolversParentTypes['ThumbtackReviewAuthor']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbtackReviewRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThumbtackReviewRating'] = ResolversParentTypes['ThumbtackReviewRating']> = {
  ratingValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Email_String_NotNull_MaxLength_255_Format_EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['email_String_NotNull_maxLength_255_format_email'], any> {
  name: 'email_String_NotNull_maxLength_255_format_email';
}

export interface FamilyName_String_NotNull_MinLength_1_MaxLength_20ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['familyName_String_NotNull_minLength_1_maxLength_20'], any> {
  name: 'familyName_String_NotNull_minLength_1_maxLength_20';
}

export interface GivenName_String_NotNull_MinLength_1_MaxLength_20ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['givenName_String_NotNull_minLength_1_maxLength_20'], any> {
  name: 'givenName_String_NotNull_minLength_1_maxLength_20';
}

export type ImageObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['imageObject'] = ResolversParentTypes['imageObject']> = {
  imgKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnailAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Location_String_NotNull_MinLength_1_MaxLength_10ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['location_String_NotNull_minLength_1_maxLength_10'], any> {
  name: 'location_String_NotNull_minLength_1_maxLength_10';
}

export interface Message_String_NotNull_MinLength_10_MaxLength_255_Pattern_09azAZsScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs'], any> {
  name: 'message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs';
}

export interface Service_String_NotNull_MinLength_1_MaxLength_40ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['service_String_NotNull_minLength_1_maxLength_40'], any> {
  name: 'service_String_NotNull_minLength_1_maxLength_40';
}

export interface Tel_String_NotNull_MinLength_1_MaxLength_12ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['tel_String_NotNull_minLength_1_maxLength_12'], any> {
  name: 'tel_String_NotNull_minLength_1_maxLength_12';
}

export type Resolvers<ContextType = any> = {
  DeleteS3ObjectResponse?: DeleteS3ObjectResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduleServiceMessage?: ScheduleServiceMessageResolvers<ContextType>;
  ThumbtackReview?: ThumbtackReviewResolvers<ContextType>;
  ThumbtackReviewAuthor?: ThumbtackReviewAuthorResolvers<ContextType>;
  ThumbtackReviewRating?: ThumbtackReviewRatingResolvers<ContextType>;
  email_String_NotNull_maxLength_255_format_email?: GraphQLScalarType;
  familyName_String_NotNull_minLength_1_maxLength_20?: GraphQLScalarType;
  givenName_String_NotNull_minLength_1_maxLength_20?: GraphQLScalarType;
  imageObject?: ImageObjectResolvers<ContextType>;
  location_String_NotNull_minLength_1_maxLength_10?: GraphQLScalarType;
  message_String_NotNull_minLength_10_maxLength_255_pattern_09azAZs?: GraphQLScalarType;
  service_String_NotNull_minLength_1_maxLength_40?: GraphQLScalarType;
  tel_String_NotNull_minLength_1_maxLength_12?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};
