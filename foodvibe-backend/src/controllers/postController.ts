import { NextFunction, Request, Response } from "express";
import {
  CreatePostResponseDto,
  DeletedPostDto,
  FullPostDto,
  PostInputCreateDto,
  PostInputUpdateDto,
  PostLikeResponseDto,
  UpdateImagePostDto,
  UpdatePostResponseDto,
} from "../dto/postDto";
import {
  upsertLikeToPostService,
  createPostService,
  deletePostService,
  updatePostImageService,
  updatePostService,
  removeLikeFromPostService,
  getSomePostsByIdService,
} from "../services/postService";
import { AuthenticatedRequest } from "../types/requests";
import { LikeType } from "@prisma/client";

export const getSomePostsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const { postsId } = req.body;
    const posts: FullPostDto[] = await getSomePostsByIdService(
      postsId,
      userPublicId,
    );
    res.status(200).json({
      data: posts,
      success: true,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    next(error);
  }
} 

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const post: PostInputCreateDto = req.body;
    const imageFile: Express.Multer.File | undefined = req.file;

    const newPost: CreatePostResponseDto = await createPostService(
      post,
      imageFile,
      userPublicId
    );

    res.status(201).json({
      data: newPost,
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId: postPublicId } = req.params;
    const post: PostInputUpdateDto = req.body.post;

    const updatedPost: UpdatePostResponseDto = await updatePostService(
      post,
      postPublicId
    );

    res.status(200).json({
      data: updatedPost,
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePostImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId: postPublicId } = req.params;
    const imageFile: Express.Multer.File | undefined = req.file;

    const updatedImagePost: UpdateImagePostDto = await updatePostImageService(
      imageFile,
      postPublicId
    );

    res.status(200).json({
      data: updatedImagePost,
      success: true,
      message: "Post image updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId: postPublicId } = req.params;
    const deletedPost: DeletedPostDto = await deletePostService(postPublicId);
    res.status(200).json({
      data: deletedPost,
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const upsertLikeToPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId: postPublicId } = req.params;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const like: LikeType = req.body.like;

    const postWithAddedLike: PostLikeResponseDto = await upsertLikeToPostService(
      postPublicId,
      userPublicId,
      like
    );
    res.status(200).json({
      data: postWithAddedLike,
      success: true,
      message: "like added to post successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeLikeFromPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId: postPublicId } = req.params;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const postWithRemovedLike: PostLikeResponseDto = await removeLikeFromPostService(
      postPublicId,
      userPublicId,
    );
    res.status(200).json({
      data: postWithRemovedLike,
      success: true,
      message: "like removed from post successfully",
    });
  } catch (error) {
    next(error);
  }
};