import { FeedDto } from "../../dto/feedDto";

export const mapToFeedDto = (post: any): FeedDto => ({
  publicId: post.publicId,
  imageUrl: post.imageUrl,
  likeCount: post.likeCount,
  content: post.content,
  author: {
    publicId: post.author.publicId,
    username: post.author.username,
    fullName: post.author.fullName,
    imageUrl: post.author.imageUrl,
  },
  recipe: {
    publicId: post.recipe.publicId,
  },
});