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
      const existingUsername = await prisma.user({ username });
      const existingEmail = await prisma.user({ email });
      if (existingEmail) {
        throw Error("This email is already taken");
      } else if (existingUsername) {
        throw Error("This username is already taken");
      }
      try {
        const user = await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio,
          avatar
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
