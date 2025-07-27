import {
  pgCreatePost,
  pgGetImageOfPostByPublicId,
  pgGetUserPublicIdByPostId,
  pgUpdateImagePost,
  pgUpdatePost,
} from "../dal/postDal";
import {
  CreatePostResponseDto,
  PostInputCreateDto,
  PostInputUpdateDto,
  UpdateImagePostDto,
  UpdatePostResponseDto,
} from "../dto/postDto";
import {
  AuthorOfPostResponse,
  PostIdResponse,
} from "../types/response/postResponse";
import ErrorResponse from "../utils/errors/errors";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";

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

  const newPost: PostIdResponse = await pgCreatePost(
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

  const updatedImagePost: PostIdResponse = await pgUpdateImagePost(
    imageUrl,
    postPublicId
  );

  await deleteImageFromStorage(oldImagePath);

  const updatedImagePostDto: UpdateImagePostDto = {
    publicId: updatedImagePost.publicId,
  };
  return updatedImagePostDto;
};
