export interface PostInputCreateDto {
  content?: string | null;
  recipePublicId?: string | null;
}

export interface PostInputUpdateDto {
  content: string | null;
  recipePublicId: string | null;
}

interface BasicPostDto {
  publicId: string;
}

export interface CreatePostResponseDto extends BasicPostDto {}

export interface UpdatePostResponseDto extends BasicPostDto {}

export interface UpdateImagePostDto extends BasicPostDto {}
