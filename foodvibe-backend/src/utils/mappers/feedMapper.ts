import { FeedDto } from "../../dto/feedDto";

export const mapToFeedDto = (post: any): FeedDto => ({
  publicId: post.publicId,
  imageUrl: post.imageUrl,
  likeCount: post.likeCount,
  content: post.content ?? null,
  author: {
    publicId: post.author.publicId,
    username: post.author.username,
    fullName: post.author.fullName ?? null,
    imageUrl: post.author.imageUrl ?? null,
    headLine: post.author.headLine ?? null,
  },
  recipe: post.recipe
    ? { publicId: post.recipe.publicId ?? null }
    : null,
});