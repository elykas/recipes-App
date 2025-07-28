import { FullPostDto } from "../../dto/postDto";
import { FullPostResponse } from "../../types/response/postResponse";

export const mapFullPostResponseToDto = (post: FullPostResponse): FullPostDto => ({
  publicId: post.publicId,
  content: post.content ?? null,
  imageUrl: post.imageUrl ?? null,
  recipe: post.recipe
    ? {
        publicId: post.recipe.publicId,
        title: post.recipe.title,
      }
    : null,
  user: {
    publicId: post.author.publicId,
    username: post.author.username,
  },
  likes: post._count.likes,
});
