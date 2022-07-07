import { booleanArg, extendType, nonNull } from "nexus";

export const TestQuery = extendType({
  type: "Query",
  definition(t) {
    t.boolean("test", {
      args: { bool: nonNull(booleanArg()) },
      resolve: async (_source, { bool }, _context) => {
        return bool;
      }
    });
  }
});
