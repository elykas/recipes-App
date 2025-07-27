import { Prisma } from "@prisma/client";

export type PostIdResponse = Prisma.PostGetPayload<{
  select: { publicId: true };
}>;

export type AuthorOfPostResponse = Prisma.PostGetPayload<{
  select: { author: { select: { id: true; publicId: true } } };
}>;
