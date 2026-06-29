import { GraphQLContext } from "../context.js";
import { requireAuth, requireProfile } from "../security/resolverGuards.js";
import { CompleteMyProfileCommand, UserPayload, UserProfile } from "../../domain/user/user.model.js";


type CompleteMyProfileArgs = {
  input: CompleteMyProfileCommand ;
};

export const userResolvers = {
  Query: {

    me: async (_parent: unknown, _args: Record<string, never>, context: GraphQLContext): Promise<UserPayload> => {

      const authUser = requireAuth(context);

      return {authUser, profile: context.auth.profile};
    },

    myProfile: async (_parent: unknown, _args: Record<string, never>, context: GraphQLContext): Promise<UserProfile> => {
      return requireProfile(context);
    }

  },

  Mutation: {

    completeMyProfile: async (_parent: unknown, args: CompleteMyProfileArgs, context: GraphQLContext): Promise<UserProfile> => {

      const authUser = requireAuth(context);

      return context.services.userService.completeMyProfile(authUser, args.input);
    }
    
  }
};




// export const userResolvers: Resolvers = {
//   Query: {
//     activeUsers: async (_parent, _args, context) => {
//       //  requireAuth(context);
//       // Protezione dello strato d'accesso
//       if (!context.currentUser) {
//         throw new Error("Non Autorizzato: Token mancante o non valido.");
//       }

//       // Simulazione database (Qui inserirai la chiamata a Firestore in futuro)
//       return [
//         {
//          accountStatus: "ACTIVE",
//           uid: "usr_0100",
//           email: "luigi@example.com",
//           displayName: "Luigi",
//           //accountStatus: AccountStatus.Active
//         },
//         {
//           uid: "usr_02",
//           email: "mario@example.com",
//           displayName: "Mario",
//           accountStatus:"ACTIVE"
//         }
//       ];
//     }
//   },
//  Mutation: {
//     registerUser: async (_parent, { input }, _context) => {
//       return await userService.createApplicationUser({
//         email: input.email,
//         password: input.password,
//         displayName: input.displayName ?? null
//       });
//     }
//   }
// };