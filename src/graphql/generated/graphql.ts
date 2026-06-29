import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  PendingAdminApproval = 'PENDING_ADMIN_APPROVAL',
  PendingEmailVerification = 'PENDING_EMAIL_VERIFICATION',
  Suspended = 'SUSPENDED'
}

export enum AuthProvider {
  Google = 'GOOGLE',
  Password = 'PASSWORD'
}

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  email?: Maybe<Scalars['String']['output']>;
  email_verified: Scalars['Boolean']['output'];
  provider: AuthProvider;
  uid: Scalars['ID']['output'];
};

export type CompleteMyProfileInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export enum GlobalRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  completeMyProfile: UserProfile;
};


export type MutationCompleteMyProfileArgs = {
  input: CompleteMyProfileInput;
};

export type Query = {
  __typename?: 'Query';
  me: UserPayload;
  myProfile: UserProfile;
  userDocuments: Array<Document>;
};


export type QueryUserDocumentsArgs = {
  userId: Scalars['ID']['input'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  authUser: AuthenticatedUser;
  profile?: Maybe<UserProfile>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  accountStatus: AccountStatus;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  fiscalCode?: Maybe<Scalars['String']['output']>;
  globalRole: GlobalRole;
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  uid: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountStatus: AccountStatus;
  AuthProvider: AuthProvider;
  AuthenticatedUser: ResolverTypeWrapper<AuthenticatedUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CompleteMyProfileInput: CompleteMyProfileInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Document: ResolverTypeWrapper<Document>;
  GlobalRole: GlobalRole;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticatedUser: AuthenticatedUser;
  Boolean: Scalars['Boolean']['output'];
  CompleteMyProfileInput: CompleteMyProfileInput;
  DateTime: Scalars['DateTime']['output'];
  Document: Document;
  ID: Scalars['ID']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  UserPayload: UserPayload;
  UserProfile: UserProfile;
};

export type AuthenticatedUserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthenticatedUser'] = ResolversParentTypes['AuthenticatedUser']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['AuthProvider'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DocumentResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  completeMyProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<MutationCompleteMyProfileArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['UserPayload'], ParentType, ContextType>;
  myProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
  userDocuments?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QueryUserDocumentsArgs, 'userId'>>;
};

export type UserPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = {
  authUser?: Resolver<ResolversTypes['AuthenticatedUser'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  accountStatus?: Resolver<ResolversTypes['AccountStatus'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fiscalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  globalRole?: Resolver<ResolversTypes['GlobalRole'], ParentType, ContextType>;
  lastLoginAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AuthenticatedUser?: AuthenticatedUserResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
};

