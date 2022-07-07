import { prisma } from "../../utils/prisma";
(async () => {
  await prisma.user.deleteMany();
})();

export {};
