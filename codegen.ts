import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // Trova ricorsivamente tutti i file .schema.ts in qualsiasi sottocartella
  schema: "./src/modules/**/*.schema.ts",
  generates: {
    "src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        useTypeImports: true,
        // Collega il contesto personalizzato ai resolver generati
        contextType: "../graphql/context.js#GraphQLContext",
      }
    }
  }
};

export default config;