import { gql } from "graphql-tag";

export const documentTypeDefs = gql`
  type Document {
    id: ID!
    title: String!
    ownerId: ID!
    createdAt: String!
  }

  type Query {
    userDocuments(userId: ID!): [Document!]!
  }
`;