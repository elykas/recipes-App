import { LikeType } from "@prisma/client";
import {
  pgAddLikeToPost,
  pgCreatePost,
  pgDeletePost,
  pgGetImageOfPostByPublicId,
  pgGetPostIdByPublicId,
  pgGetUserPublicIdByPostId,
  pgIsLikeExists,
  pgRemoveLikeFromPost,
  pgUpdateImagePost,
  pgUpdateLikeToPost,
  pgUpdatePost,
} from "../dal/postDal";
import {
  CreatePostResponseDto,
  DeletedPostDto,
  PostInputCreateDto,
  PostInputUpdateDto,
  PostLikeResponseDto,
  UpdateImagePostDto,
  UpdatePostResponseDto,
} from "../dto/postDto";
import {
  AuthorOfPostResponse,
  PostLikeResponse,
  PostPublicIdResponse,
  PostResponseWithId,
} from "../types/response/postResponse";
import ErrorResponse from "../utils/errors/errors";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";
import { getUserIdByPublicIdService } from "./userService";

export const getSomePostsByIdService = async (postsId: string[], userPublicId: string) => {
  if(postsId.length === 0) return [];
  const posts: PostResponseWithId[] = await pgGetSomePostsByIService(postsId, userPublicId);
  return posts;
}

export const createPostService = async (
  post: PostInputCreateDto,
  imageFile: Express.Multer.File | undefined,
  userPublicId: string
): Promise<CreatePostResponseDto> => {
  if (!imageFile) throw ErrorResponse("Image is required", 400);

  const imagePath: string = await uploadSingleImage(
    imageFile.buffer,
    userPublicId,
    imageFile.mimetype,
    "post"
  );

  const newPost: PostPublicIdResponse = await pgCreatePost(
    post,
    imagePath,
    userPublicId
  );
  const newPostDto: CreatePostResponseDto = {
    publicId: newPost.publicId,
  };
  return newPostDto;
};

export const updatePostService = async (
  post: PostInputUpdateDto,
  postPublicId: string
): Promise<UpdatePostResponseDto> => {
  if (!postPublicId) {
    throw ErrorResponse("PostId is required", 400);
  }

  const updatedPost = await pgUpdatePost(post, postPublicId);

  if (!updatedPost) {
    throw ErrorResponse("Post not found", 404);
  }

  const updatedPostDto: UpdatePostResponseDto = {
    publicId: updatedPost.publicId,
  };

  return updatedPostDto;
};

export const getUserPublicIdByPostIdService = async (
  postPublicId: string
): Promise<AuthorOfPostResponse> => {
  if (!postPublicId) {
    throw ErrorResponse("PostId is required", 400);
  }

  const publicUserId: AuthorOfPostResponse | null =
    await pgGetUserPublicIdByPostId(postPublicId);
  if (!publicUserId) {
    throw ErrorResponse("Post not found", 404);
  }

  return publicUserId;
};

export const getPostIdByPublicIdService = async (
  postPublicId: string
): Promise<PostResponseWithId> => {
  if (!postPublicId) throw ErrorResponse("postId is required", 404);

  const postId: PostResponseWithId | null =
    await pgGetPostIdByPublicId(postPublicId);
  if (!postId) throw ErrorResponse("Post not found", 404);

  return postId;
};

export const updatePostImageService = async (
  imageFile: Express.Multer.File | undefined,
  postPublicId: string
): Promise<UpdateImagePostDto> => {
  if (!imageFile) throw ErrorResponse("Image is required for post", 400);

  let imageUrl: string;
  const oldImagePath: string | undefined =
    await pgGetImageOfPostByPublicId(postPublicId);

  if (oldImagePath === undefined) {
    throw ErrorResponse("Post is not found", 400);
  }

  const imagePath: string = await uploadSingleImage(
    imageFile.buffer,
    postPublicId,
    imageFile.mimetype,
    "post"
  );
  imageUrl = imagePath;

  const updatedImagePost: PostPublicIdResponse = await pgUpdateImagePost(
    imageUrl,
    postPublicId
  );

  await deleteImageFromStorage(oldImagePath);

  const updatedImagePostDto: UpdateImagePostDto = {
    publicId: updatedImagePost.publicId,
  };
  return updatedImagePostDto;
};

export const deletePostService = async (
  postPublicId: string
): Promise<DeletedPostDto> => {
  if (!postPublicId) throw ErrorResponse("PostId is required", 400);
  const deletedPost: PostPublicIdResponse = await pgDeletePost(postPublicId);
  const deletedPostDto: DeletedPostDto = { publicId: deletedPost.publicId };
  return deletedPostDto;
};

export const upsertLikeToPostService = async (
  postPublicId: string,
  userPublicId: string,
  like: LikeType
): Promise<PostLikeResponseDto> => {
  if (!postPublicId || !userPublicId || !like)
    throw ErrorResponse("PostId and like is required", 400);

  const userId: number = await getUserIdByPublicIdService(userPublicId);

  const { id: postId }: PostResponseWithId =
    await getPostIdByPublicIdService(postPublicId);

  let postWithLike: PostLikeResponse;

  const likeExists = await pgIsLikeExists(userId, postId);

  if (!likeExists) {
    postWithLike = await pgAddLikeToPost(userId, postId, like);
  } else {
    postWithLike = await pgUpdateLikeToPost(userId, postId, like);
  }

  const postWithLikeDto: PostLikeResponseDto = {
    publicId: postWithLike.post.publicId,
  };

  return postWithLikeDto;
};

export const removeLikeFromPostService = async (
  postPublicId: string,
  userPublicId: string
): Promise<PostLikeResponseDto> => {
  if (!postPublicId || !userPublicId)
    throw ErrorResponse("PostId and like is required", 400);

  const userId: number = await getUserIdByPublicIdService(userPublicId);

  const { id: postId }: PostResponseWithId =
    await getPostIdByPublicIdService(postPublicId);

  const likeExists = await pgIsLikeExists(userId, postId);
  if (!likeExists) throw ErrorResponse("Like not found", 404);
  
  const postWithLike: PostLikeResponse = await pgRemoveLikeFromPost(
    userId,
    postId
  );
  const postWithLikeDto: PostLikeResponseDto = {
    publicId: postWithLike.post.publicId,
  };
  return postWithLikeDto;
};
