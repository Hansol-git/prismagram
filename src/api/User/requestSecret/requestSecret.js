import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret); // send loginSecret first,
        await prisma.updateUser({ data: { loginSecret }, where: { email } }); // then save the loginSecret into the User DB
        return true;
      } catch {
        return false;
      }
    }
  }
};
