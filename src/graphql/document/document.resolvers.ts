import { Resolvers } from "../generated/graphql.js";

export const documentResolvers: Resolvers = {
  Query: {
    userDocuments: async (_parent, args, context) => {
      if (!context.currentUser) {
        throw new Error("Non Autorizzato.");
      }

      // Estraiamo l'ID richiesto dai parametri validati da TS
      const { userId } = args;

      // Simulazione database filtrato per l'ID utente richiesto
      return [
        {
          id: "doc_101",
          title: "Specifiche Progetto Backend.pdf",
          ownerId: userId,
          createdAt: new Date().toISOString()
        }
      ];
    }
  }
};