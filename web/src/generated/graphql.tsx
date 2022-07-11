import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type DefaultResult = {
  __typename?: 'DefaultResult';
  errors: Scalars['Boolean'];
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<DefaultResult>;
  createPost?: Maybe<UpdatePostResult>;
  deletePost?: Maybe<UpdatePostResult>;
  deleteUser?: Maybe<UpdateUserResult>;
  forgotPassword?: Maybe<DefaultResult>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<RegisterResponse>;
  updatePost?: Maybe<UpdatePostResult>;
  updateUser?: Maybe<UpdateUserResult>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: UpdatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  options: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  options: UpdateUserInput;
};

export type Node = {
  /** the creation timestamp of the resource */
  createdAt: Scalars['Date'];
  /** the GUID of the resource */
  id: Scalars['ID'];
  /** the last modifification timestamp of the resource */
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Post = Node & {
  __typename?: 'Post';
  /** the creation timestamp of the resource */
  createdAt: Scalars['Date'];
  /** the GUID of the resource */
  id: Scalars['ID'];
  message: Scalars['String'];
  title: Scalars['String'];
  /** the last modifification timestamp of the resource */
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  test?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryTestArgs = {
  bool: Scalars['Boolean'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UpdatePostInput = {
  message: Scalars['String'];
  title: Scalars['String'];
};

export type UpdatePostResult = {
  __typename?: 'UpdatePostResult';
  error: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UpdateUserResult = {
  __typename?: 'UpdateUserResult';
  error: Scalars['Boolean'];
  message: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  /** the creation timestamp of the resource */
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** the GUID of the resource */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['Date']>;
  lastName?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  /** the last modifification timestamp of the resource */
  updatedAt?: Maybe<Scalars['Date']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', message: string, error: boolean } | null };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterResponse', message: string, error: boolean } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    message
    error
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    message
    error
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};