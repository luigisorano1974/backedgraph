import { userTypeDefs } from "../modules/users/user.schema.js";
import { userResolvers } from "../modules/users/user.resolvers.js";


// Esportiamo gli array completi
export const typeDefs = [userTypeDefs];
export const resolvers = [userResolvers];