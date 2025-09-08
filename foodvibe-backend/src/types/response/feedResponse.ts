import { Prisma } from "@prisma/client";

export type FeedResponse = Prisma.PostGetPayload<{
  select: {
    id: true;
    publicId: true;
    imageUrl: true;
    likeCount: true;
    createdAt: true;
    content: true;
    author: {
      select: {
        publicId: true;
        username: true;
        fullName: true;
        imageUrl: true;
      };
    };
    recipe: {
      select: {
        publicId: true;
      };
    };
  };
}>;
