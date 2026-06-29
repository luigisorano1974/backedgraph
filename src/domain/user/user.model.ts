import { DecodedIdToken } from "firebase-admin/auth";

export type GlobalRole = "ADMIN" | "USER";

export type AccountStatus =
  | "PENDING_EMAIL_VERIFICATION"
  | "PENDING_PROFILE_COMPLETION"
  | "PENDING_ADMIN_APPROVAL"
  | "ACTIVE"
  | "SUSPENDED"
  | "DISABLED";

export type AuthProvider = "PASSWORD" | "GOOGLE";

export type UserProfile = {
  uid: string;
  email?: string | null;
  displayName: string;

  firstName: string;
  lastName: string;
  phone?: string | null;
  fiscalCode?: string | null;

  globalRole: GlobalRole;
  accountStatus: AccountStatus;

  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date | null;
  lastLoginAt?: Date | null;
}

export type CompleteMyProfileCommand  = {
  firstName: string;
  lastName: string;
};


export type AuthenticatedUserProvider = "GOOGLE" | "PASSWORD";

export interface AuthenticatedUser {
  uid: string;
  email?: string | null;
  email_verified?: boolean | null;
  firebase: DecodedIdToken;
  provider: AuthenticatedUserProvider
}



export type UserDocument = {
  uid: string;
  firstName: string;
  lastName: string;
  globalRole: GlobalRole;
  accountStatus: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
};


export type UserPayload = {
    authUser: AuthenticatedUser;
    profile: UserProfile | null
}