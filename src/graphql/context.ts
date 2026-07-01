import type { Request } from "express";
import { firebaseAuth } from "../config/firebase.js";
import { UserRepository } from "../modules/users/user.repository.js";
import { UserService } from "../modules/users/user.service.js";
import { AuthenticationError, ForbiddenError } from "../utils/error.js";
import { AuthenticatedUser, AuthProvider, UserPayload} from "../modules/users/user.model.js";
import { DecodedIdToken } from "firebase-admin/auth";


export type GraphQLContext = {
  services: {
    userService: UserService;
  };
  auth: UserPayload;
  requestMeta: {
     ip?: string | null;
     userAgent?: string | null;
  };
};

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

function extractBearerToken(req: Request): string | null {

  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return null;
  }

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.replace("Bearer ", "").trim();
}


function mapProvider(firebaseProvider: string | undefined): AuthProvider {
  switch (firebaseProvider) {
    case "google.com":
      return "GOOGLE";

    case "password":
      return "PASSWORD";

    default:
      throw new ForbiddenError("Provider di autenticazione non consentito.");
  }
}

function getFirebaseAuthErrorCode(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : null;
  }

  return null;
}

function mapFirebaseAuthError(error: unknown): never {
  const code = getFirebaseAuthErrorCode(error);

  switch (code) {
    case "auth/user-disabled":
      throw new ForbiddenError("Utente disabilitato.");

    case "auth/id-token-revoked":
      throw new AuthenticationError(
        "Sessione non più valida, effettuare nuovamente il login."
      );

    case "auth/id-token-expired":
      throw new AuthenticationError("Token scaduto.");

    default:
      throw new AuthenticationError("Token non valido.");
  }
}

async function getAuthenticatedUser(token: string | null): Promise<AuthenticatedUser> {

  if (!token) {
    throw new AuthenticationError("Token Firebase obbligatorio.");
  }

  let decodedToken: DecodedIdToken;

  try {
    decodedToken = await firebaseAuth.verifyIdToken(token, true);
  } catch (error: unknown) {
    mapFirebaseAuthError(error);
  }

  const provider = mapProvider(decodedToken.firebase?.sign_in_provider);

  return {
    uid: decodedToken.uid,
    email: decodedToken.email ?? null,
    email_verified: decodedToken.email_verified === true,
    provider,
    firebase: decodedToken
  };
}

export async function buildContext({ req }: { req: Request }): Promise<GraphQLContext> {

  const token = extractBearerToken(req);

  const requestMeta = {
    ip: req.ip || req.socket.remoteAddress || null,
    userAgent: req.headers["user-agent"] || null
  };
    
  const authUser = await getAuthenticatedUser(token);

  const profile = await userService.getProfile(authUser);

  const syncedProfile = await userService.syncEmailVerificationStatus(authUser, profile);

  return {
    auth: { profile: syncedProfile, authUser: authUser },
    services: { userService: userService },
    requestMeta
  };
}

