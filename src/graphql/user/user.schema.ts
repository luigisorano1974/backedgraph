import { gql } from "graphql-tag";

export const userTypeDefs = gql`
 scalar DateTime

  enum GlobalRole {
    ADMIN
    USER
  }

  enum AccountStatus {
    PENDING_EMAIL_VERIFICATION
    PENDING_ADMIN_APPROVAL
    ACTIVE
    SUSPENDED
    DISABLED
  }

  enum AuthProvider {
    GOOGLE
    PASSWORD
  }

  type AuthenticatedUser {
    uid: ID!
    email: String
    email_verified: Boolean!
    provider: AuthProvider!
  }

  type UserProfile {
    uid: ID!
    email: String
    displayName: String!

    firstName: String!
    lastName: String!
    phone: String
    fiscalCode: String

    globalRole: GlobalRole!
    accountStatus: AccountStatus!

    createdAt: DateTime!
    updatedAt: DateTime!
    completedAt: DateTime
    lastLoginAt: DateTime
  }

  type UserPayload {
    authUser: AuthenticatedUser!
    profile: UserProfile
  }

  input CompleteMyProfileInput {
    firstName: String!
    lastName: String!
  }

  type Query {
    me: UserPayload!
    myProfile: UserProfile!
  }

  type Mutation {
    completeMyProfile(input: CompleteMyProfileInput!): UserProfile!
  }
`;

// export const userTypeDefs = gql`
//   enum AccountStatus {
//     ACTIVE
//     PENDING_CONFIRMATION
//     SUSPENDED
//     DISABLED
//   }

//   enum GlobalRole {
//     ADMIN
//     USER
//   }

//   type UserProfile {
//     uid: ID!
//     email: String!
//     displayName: String
//     globalRole: GlobalRole!
//     accountStatus: AccountStatus!
//   }

//   input RegisterUserInput {
//     email: String!
//     password: String!
//     displayName: String
//   }

//   type Query {
//     activeUsers: [UserProfile!]!
//   }

//   type Mutation {
//     registerUser(input: RegisterUserInput!): UserProfile!
//     updateAccountStatus(input: UpdateAccountStatusInput!): UserProfile!
//   }
// `;