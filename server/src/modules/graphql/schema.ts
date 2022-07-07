import { makeSchema, fieldAuthorizePlugin } from "nexus";
import { join } from "path";
import * as types from "./types";

export const schema = makeSchema({
  types,
  contextType: {
    module: join(process.cwd(), "./src/types/Context.ts"),
    export: "Context"
  },
  outputs: {
    schema: join(process.cwd(), "./src/generated/schema.graphql"),
    typegen: join(process.cwd(), "./src/generated/nexus-types.ts")
  },
  features: {
    abstractTypeStrategies: {
      resolveType: true, // default
      isTypeOf: false, // default
      __typename: true
    }
  },
  plugins: [fieldAuthorizePlugin()]
});
