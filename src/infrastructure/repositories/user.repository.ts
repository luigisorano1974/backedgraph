import { AccountStatus, UserDocument } from "../../domain/user/user.model.js";
import { db } from "../firebase.js";


export class UserRepository {

  private readonly collection = db.collection("users");

  async findByUid(uid: string): Promise<UserDocument | null> {
    const snapshot = await this.collection.doc(uid).get();

    if (!snapshot.exists) {
      return null;
    }

    return snapshot.data()! as UserDocument;
  }

   async createProfile(user: UserDocument): Promise<UserDocument> {

    await this.collection.doc(user.uid).create(user);

    return user;
  }

  async updateProfileCompletion(
    uid: string,
    command: {
      firstName: string;
      lastName: string;
      accountStatus: AccountStatus;
    }
  ): Promise<UserDocument> {
    const now = new Date();

    await this.collection.doc(uid).update({
      firstName: command.firstName,
      lastName: command.lastName,
      accountStatus: command.accountStatus,
      updatedAt: now,
      lastLoginAt: now,
    });

    const updatedDocument = await this.findByUid(uid);

    if (!updatedDocument) {
      throw new Error("Profilo utente non trovato dopo aggiornamento.");
    }

    return updatedDocument;
  }

  async updateAccountStatus(uid: string, accountStatus: AccountStatus): Promise<UserDocument> {
    const now = new Date();

    await this.collection.doc(uid).update({
      accountStatus,
      updatedAt: now,
    });

    const updatedDocument = await this.findByUid(uid);

    if (!updatedDocument) {
      throw new Error("Profilo utente non trovato dopo aggiornamento stato.");
    }

    return updatedDocument;
  }

//   async listAll(limit = 100): Promise<UserProfile[]> {
//     const snap = await this.collection()
//       .orderBy("createdAt", "desc")
//       .limit(limit)
//       .get();

//     return snap.docs.map(doc => doc.data() as UserProfile);
//   }

//   async updateRole(uid: string, globalRole: GlobalRole): Promise<UserProfile> {
//     const ref = this.collection().doc(uid);
//     const snap = await ref.get();

//     if (!snap.exists) {
//       throw new NotFoundError("Utente non trovato.");
//     }

//     await ref.update({
//       globalRole,
//       updatedAt: nowIso()
//     });

//     const updated = await ref.get();
//     return updated.data() as UserProfile;
//   }

//   async updateStatus(uid: string, accountStatus: AccountStatus): Promise<UserProfile> {
//     const ref = this.collection().doc(uid);
//     const snap = await ref.get();

//     if (!snap.exists) {
//       throw new NotFoundError("Utente non trovato.");
//     }

//     await ref.update({
//       accountStatus,
//       updatedAt: nowIso()
//     });

//     const updated = await ref.get();
//     return updated.data() as UserProfile;
//   }
}
