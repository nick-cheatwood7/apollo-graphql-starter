/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../types/Context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  RegisterInput: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName?: string | null; // String
    password: string; // String!
  }
  UpdatePostInput: { // input type
    message: string; // String!
    title: string; // String!
  }
  UpdateUserInput: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName?: string | null; // String
    password: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
}

export interface NexusGenObjects {
  LoginResponse: { // root type
    error: boolean; // Boolean!
    message: string; // String!
  }
  Mutation: {};
  Post: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    id: string; // ID!
    message: string; // String!
    title: string; // String!
    updatedAt?: NexusGenScalars['Date'] | null; // Date
    userId: string; // String!
  }
  Query: {};
  RegisterResponse: { // root type
    error: boolean; // Boolean!
    message: string; // String!
  }
  UpdatePostResult: { // root type
    error: boolean; // Boolean!
    message: string; // String!
  }
  UpdateUserResult: { // root type
    error: boolean; // Boolean!
    message: string; // String!
  }
  User: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastLogin?: NexusGenScalars['Date'] | null; // Date
    lastName?: string | null; // String
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
}

export interface NexusGenInterfaces {
  Node: core.Discriminate<'Post', 'required'> | core.Discriminate<'User', 'required'>;
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  LoginResponse: { // field return type
    error: boolean; // Boolean!
    message: string; // String!
  }
  Mutation: { // field return type
    createPost: NexusGenRootTypes['UpdatePostResult'] | null; // UpdatePostResult
    deletePost: NexusGenRootTypes['UpdatePostResult'] | null; // UpdatePostResult
    deleteUser: NexusGenRootTypes['UpdateUserResult'] | null; // UpdateUserResult
    login: NexusGenRootTypes['LoginResponse'] | null; // LoginResponse
    register: NexusGenRootTypes['RegisterResponse'] | null; // RegisterResponse
    updatePost: NexusGenRootTypes['UpdatePostResult'] | null; // UpdatePostResult
    updateUser: NexusGenRootTypes['UpdateUserResult'] | null; // UpdateUserResult
  }
  Post: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    id: string; // ID!
    message: string; // String!
    title: string; // String!
    updatedAt: NexusGenScalars['Date'] | null; // Date
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  Query: { // field return type
    post: NexusGenRootTypes['Post'] | null; // Post
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    test: boolean | null; // Boolean
    user: NexusGenRootTypes['User'] | null; // User
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  RegisterResponse: { // field return type
    error: boolean; // Boolean!
    message: string; // String!
  }
  UpdatePostResult: { // field return type
    error: boolean; // Boolean!
    message: string; // String!
  }
  UpdateUserResult: { // field return type
    error: boolean; // Boolean!
    message: string; // String!
  }
  User: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastLogin: NexusGenScalars['Date'] | null; // Date
    lastName: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
  Node: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    id: string; // ID!
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
}

export interface NexusGenFieldTypeNames {
  LoginResponse: { // field return type name
    error: 'Boolean'
    message: 'String'
  }
  Mutation: { // field return type name
    createPost: 'UpdatePostResult'
    deletePost: 'UpdatePostResult'
    deleteUser: 'UpdateUserResult'
    login: 'LoginResponse'
    register: 'RegisterResponse'
    updatePost: 'UpdatePostResult'
    updateUser: 'UpdateUserResult'
  }
  Post: { // field return type name
    createdAt: 'Date'
    id: 'ID'
    message: 'String'
    title: 'String'
    updatedAt: 'Date'
    user: 'User'
    userId: 'String'
  }
  Query: { // field return type name
    post: 'Post'
    posts: 'Post'
    test: 'Boolean'
    user: 'User'
    users: 'User'
  }
  RegisterResponse: { // field return type name
    error: 'Boolean'
    message: 'String'
  }
  UpdatePostResult: { // field return type name
    error: 'Boolean'
    message: 'String'
  }
  UpdateUserResult: { // field return type name
    error: 'Boolean'
    message: 'String'
  }
  User: { // field return type name
    createdAt: 'Date'
    email: 'String'
    firstName: 'String'
    id: 'ID'
    lastLogin: 'Date'
    lastName: 'String'
    posts: 'Post'
    updatedAt: 'Date'
  }
  Node: { // field return type name
    createdAt: 'Date'
    id: 'ID'
    updatedAt: 'Date'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createPost: { // args
      options: NexusGenInputs['UpdatePostInput']; // UpdatePostInput!
    }
    deletePost: { // args
      id: string; // String!
    }
    deleteUser: { // args
      id: string; // String!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      options: NexusGenInputs['RegisterInput']; // RegisterInput!
    }
    updatePost: { // args
      id: string; // String!
      options: NexusGenInputs['UpdatePostInput']; // UpdatePostInput!
    }
    updateUser: { // args
      id: string; // String!
      options: NexusGenInputs['UpdateUserInput']; // UpdateUserInput!
    }
  }
  Query: {
    post: { // args
      id: string; // String!
    }
    test: { // args
      bool: boolean; // Boolean!
    }
    user: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Node: "Post" | "User"
}

export interface NexusGenTypeInterfaces {
  Post: "Node"
  User: "Node"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: true
    isTypeOf: false
    __typename: true
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}