import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        username,
        email,
        firstName = "",
        lastName = "",
        bio = "",
        avatar = ""
      } = args;
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
        avatar
      });
      return user;
    }
  }
};
