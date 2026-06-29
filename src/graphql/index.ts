import { userTypeDefs } from "./user/user.schema.js";
import { userResolvers } from "./user/user.resolvers.js";
import { documentTypeDefs } from "./document/document.schema.js";
import { documentResolvers } from "./document/document.resolvers.js";

// Esportiamo gli array completi
export const typeDefs = [userTypeDefs, documentTypeDefs];
export const resolvers = [userResolvers, documentResolvers];