import { Prisma } from "@prisma/client";

export type PostPublicIdResponse = Prisma.PostGetPayload<{
  select: { publicId: true };
}>;

export type PostResponseWithId = Prisma.PostGetPayload<{
  select: { id: true; publicId: true };
}>;

export type AuthorOfPostResponse = Prisma.PostGetPayload<{
  select: { author: { select: { id: true; publicId: true } } };
}>;

export type PostLikeResponse = Prisma.PostLikeGetPayload<{
  select: {
    post: {
      select: {
        publicId: true;
      };
    };
  };
}>;
