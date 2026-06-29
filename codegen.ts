import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // Trova ricorsivamente tutti i file .schema.ts in qualsiasi sottocartella
  schema: "./src/graphql/**/*.schema.ts",
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        // Collega il contesto personalizzato ai resolver generati
        contextType: "../../types/context.js#AppContext"
      }
    }
  }
};

export default config;