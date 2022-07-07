import { interfaceType } from "nexus";

export const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.nonNull.id("id", { description: "the GUID of the resource" });
    t.nonNull.date("createdAt", {
      description: "the creation timestamp of the resource"
    });
    t.date("updatedAt", {
      description: "the last modifification timestamp of the resource"
    });
  }
});
