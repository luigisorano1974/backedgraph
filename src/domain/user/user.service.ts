import { AccountStatus, AuthenticatedUser, CompleteMyProfileCommand, UserDocument, UserProfile } from "./user.model.js";
import { UserRepository } from "../../infrastructure/repositories/user.repository.js";
import { normalizeRequiredString } from "../../utils/guard.string.js";
import { ConflictError, ForbiddenError } from "../../utils/error.js";


function mapDocumentToUserProfile(authUser: AuthenticatedUser, userDocument: UserDocument): UserProfile {
   return {
    uid: userDocument.uid,
    email: authUser.email,
    displayName: `${userDocument.firstName} ${userDocument.lastName}`.trim(),
    globalRole: userDocument.globalRole,
    accountStatus: userDocument.accountStatus,
    createdAt: userDocument.createdAt,
    updatedAt: userDocument.updatedAt,
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    lastLoginAt: userDocument.lastLoginAt,
  };
}


export class UserService {

  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(authUser: AuthenticatedUser): Promise<UserProfile | null> {

    const userDocument = await this.userRepository.findByUid(authUser.uid);

    if(!userDocument){
      return null;
    }

    if (userDocument.accountStatus === "PENDING_EMAIL_VERIFICATION" && this.hasPassedEmailVerificationStep(authUser)) {
      const updatedDocument = await this.userRepository.updateAccountStatus(authUser.uid,"PENDING_ADMIN_APPROVAL");
      return mapDocumentToUserProfile(authUser, updatedDocument);
    }

    return mapDocumentToUserProfile(authUser, userDocument);
  }

  async syncEmailVerificationStatus(authUser: AuthenticatedUser, profile: UserProfile | null): Promise<UserProfile | null> {

    if (!profile) {
      return null;
    }

    if (profile.accountStatus !== "PENDING_EMAIL_VERIFICATION") {
      return profile;
    }

    if (!this.hasPassedEmailVerificationStep(authUser)) {
      return profile;
    }

    const updatedDocument = await this.userRepository.updateAccountStatus(authUser.uid, "PENDING_ADMIN_APPROVAL");

    return mapDocumentToUserProfile(authUser, updatedDocument);
  }

  async completeMyProfile(authUser: AuthenticatedUser, input: CompleteMyProfileCommand): Promise<UserProfile> {

    const firstName = normalizeRequiredString(input.firstName, "Nome");

    const lastName = normalizeRequiredString(input.lastName, "Cognome");

    const existingDocument = await this.userRepository.findByUid(authUser.uid);

    if (!existingDocument) {
      return this.createCompletedProfile(authUser, firstName, lastName);     
    }

    const existingProfile = mapDocumentToUserProfile(authUser, existingDocument);


    switch (existingProfile.accountStatus) {
      case "ACTIVE":
        throw new ConflictError("Profilo già completato. Usa updateMyProfile.");

      case "SUSPENDED":
        throw new ForbiddenError("Account sospeso.");

      case "DISABLED":
        throw new ForbiddenError("Account disabilitato.");
    }

    const updatedDocument = await this.userRepository.updateProfileCompletion(
      authUser.uid,
      {
        firstName,
        lastName,
        accountStatus: this.resolveCompletedProfileStatus(authUser)
      }
    );

     return mapDocumentToUserProfile(authUser, updatedDocument);
  }

  private async createCompletedProfile(authUser: AuthenticatedUser, firstName: string, lastName: string): Promise<UserProfile> {
    const now = new Date();

    const userDocument: UserDocument = {
      uid: authUser.uid,
      firstName,
      lastName,
      accountStatus: this.resolveCompletedProfileStatus(authUser),
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
      globalRole: "USER",
    };

    try {
      const createdDocument = await this.userRepository.createProfile(userDocument);

      return mapDocumentToUserProfile(authUser, createdDocument);

    } catch (error: unknown) {

      const existingDocument = await this.userRepository.findByUid(authUser.uid);

      if (existingDocument) {
        return mapDocumentToUserProfile(authUser, existingDocument);
      }

      throw error;
    }
  }

  private resolveCompletedProfileStatus(authUser: AuthenticatedUser): AccountStatus {
    if (authUser.provider === "PASSWORD" && authUser.email_verified !== true) {
      return "PENDING_EMAIL_VERIFICATION";
    }

    return "PENDING_ADMIN_APPROVAL";
  }

  private hasPassedEmailVerificationStep(authUser: AuthenticatedUser): boolean {
    if (authUser.provider === "GOOGLE") {
      return true;
    }

    return authUser.email_verified === true;
  }
}
