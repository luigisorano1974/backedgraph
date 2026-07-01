import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs, resolvers } from  "./graphql/index.js"
import { buildContext } from "./graphql/context.js";
import type { GraphQLContext } from "./graphql/context.js";


const app = express();
const port = Number(process.env.PORT || 8080);

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:4200")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  cors({
    // origin: (origin, callback) => {
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //     return;
    //   }

    //   callback(new Error(`CORS origin non consentito: ${origin}`));
    // },
    // credentials: true
  }),
  express.json({ limit: "2mb" }),
  expressMiddleware(server, {
    context: buildContext
  })
);

app.listen(port, () => {
  console.log(`Server pronto su http://localhost:${port}/graphql`);
});
