import { initializeApp, getApps, getApp, applicationDefault, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, FieldValue, type Firestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import type { Bucket } from "@google-cloud/storage";

const projectId = process.env.PROJECT_ID;
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || projectId;
const firestoreDatabaseId = process.env.FIRESTORE_DATABASE_ID || "(default)";
const bucketName = process.env.BUCKET_NAME;

if (!projectId) {
  throw new Error("Variabile ambiente PROJECT_ID mancante.");
}

if (!firebaseProjectId) {
  throw new Error("Variabile ambiente FIREBASE_PROJECT_ID mancante.");
}

if (!firestoreDatabaseId) {
  throw new Error("Variabile ambiente FIRESTORE_DATABASE_ID mancante.");
}

if (!bucketName) {
  throw new Error("Variabile ambiente BUCKET_NAME mancante.");
}

const app: App =
  getApps().length === 0
    ? initializeApp({
        projectId: firebaseProjectId,
        credential: applicationDefault()
      })
    : getApp();

export const firebaseAuth: Auth = getAuth(app);

export const db: Firestore = getFirestore(app, firestoreDatabaseId);

export const storage = new Storage({
  projectId
});

export const bucket: Bucket = storage.bucket(bucketName);

export { FieldValue };