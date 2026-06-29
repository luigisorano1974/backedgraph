import { AccountStatus, AuthenticatedUser, GlobalRole, UserProfile } from "../../domain/user/user.model.js";
import { AuthenticationError, ConflictError, ForbiddenError } from "../../utils/error.js";
import { GraphQLContext } from "../context.js";

export function requireAuth(context: GraphQLContext): AuthenticatedUser {
  if (!context.auth.authUser) {
    throw new AuthenticationError("Autenticazione richiesta.");
  }

  return context.auth.authUser;
}

export function requireMissingProfile(ctx: GraphQLContext): AuthenticatedUser {
  const user = requireAuth(ctx);

  if (ctx.auth.profile) {
    throw new ConflictError("Profilo applicativo già esistente.");
  }

  return user;
}

export function requireProfile(ctx: GraphQLContext): UserProfile {
  requireAuth(ctx);

  if (!ctx.auth.profile) {
    throw new ForbiddenError("Profilo applicativo non ancora creato.");
  }

  return ctx.auth.profile;
}

export function requireVerifiedEmail(ctx: GraphQLContext): AuthenticatedUser {
  const user = requireAuth(ctx);

  if (user.email_verified !== true) {
    throw new ForbiddenError("Email non verificata.");
  }

  return user;
}

export function requirePasswordEmailVerified(ctx: GraphQLContext): AuthenticatedUser {
  const user = requireAuth(ctx);

  if (user.provider === "PASSWORD" && user.email_verified !== true) {
    throw new ForbiddenError("Email non verificata.");
  }

  return user;
}

export function requireNotBlockedProfile(ctx: GraphQLContext): UserProfile {
  const profile = requireProfile(ctx);

  if (profile.accountStatus === "SUSPENDED") {
    throw new ForbiddenError("Account sospeso.");
  }

  if (profile.accountStatus === "DISABLED") {
    throw new ForbiddenError("Account disabilitato.");
  }

  return profile;
}

export function requireAccountStatus(  ctx: GraphQLContext,  allowedStatuses: AccountStatus[]): UserProfile {
  const profile = requireProfile(ctx);

  if (!allowedStatuses.includes(profile.accountStatus)) {
    throw new ForbiddenError("Stato account non abilitato per questa operazione.");
  }

  return profile;
}

export function requireActiveProfile(ctx: GraphQLContext): UserProfile {
  return requireAccountStatus(ctx, ["ACTIVE"]);
}

export function requireRole( ctx: GraphQLContext, allowedRoles: GlobalRole[]): UserProfile {
  const profile = requireProfile(ctx);

  if (!allowedRoles.includes(profile.globalRole)) {
    throw new ForbiddenError("Ruolo non autorizzato.");
  }

  return profile;
}

export function requireAdmin(ctx: GraphQLContext): UserProfile {
  const profile = requireActiveProfile(ctx);

  if (profile.globalRole !== "ADMIN") {
    throw new ForbiddenError("Permessi amministrativi richiesti.");
  }

  return profile;
}