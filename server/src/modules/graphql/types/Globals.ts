import { interfaceType, objectType } from "nexus";

export const Node = interfaceType({
    name: "Node",
    definition(t) {
        t.nonNull.id("id", { description: "the GUID of the resource" });
        t.nonNull.date("createdAt", {
            description: "the creation timestamp of the resource",
        });
        t.date("updatedAt", {
            description: "the last modifification timestamp of the resource",
        });
    },
});

export const DefaultResult = objectType({
    name: "DefaultResult",
    definition(t) {
        t.nonNull.string("message");
        t.nonNull.boolean("errors");
    },
});
