import { NextFunction, Request, Response } from "express";
import { CreatePostResponseDto, PostInputCreateDto, PostInputUpdateDto, UpdateImagePostDto, UpdatePostResponseDto } from "../dto/postDto";
import { createPostService, updatePostImageService, updatePostService } from "../services/postService";
import { AuthenticatedRequest } from "../types/requests";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const post: PostInputCreateDto = JSON.parse(req.body.post);
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