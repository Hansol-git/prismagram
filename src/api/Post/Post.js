import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request; // me
      const { id } = parent; // post
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    files: ({ id }) => prisma.post({ id }).files(),
    comment: ({ id }) => prisma.post({ id }).comment(),
    user: ({ id }) => prisma.post({ id }).user()
  }
};
