import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleFollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args; // friend
      const { user } = request; // me
      try {
        const existingFollowing = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id } }]
        });
        if (existingFollowing) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              following: {
                disconnect: {
                  id
                }
              }
            }
          });
        } else {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              following: {
                connect: {
                  id
                }
              }
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
