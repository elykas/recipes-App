import { Category, DifficultyLevel } from "@prisma/client";
import { ICategory, IIngredient, ISteps } from "../models/recipeModel";

export interface UserGroupsDto {
  publicId: string;
  name: string;
  imageUrl: string | null;
  admin: boolean;
}

export interface GroupMemberDto {
  publicId: string;
  fullName: string;
  username: string;
  headLine: string;
  imageUrl: string | null;
}

export interface GroupRecipeDto {
  title: string;
  publicId: string;
  imageUrl: string | null;
  categories: Category[];
  isPublic: boolean;
  likesCount: number;
}

export interface FullRecipeGroupDto {
  publicId: string;
  title: string;
  categories: ICategory[];
  ingredients: IIngredient[];
  difficulty: DifficultyLevel;
  isPublic: boolean;
  steps: ISteps[];
  prepTime?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  tip?: string[] | null;
}

export interface GroupRecipesPreviewDto {
  publicId: string;
  name: string;
  imageUrl: string | null;
  members: GroupMemberDto[];
  recipes: GroupRecipeDto[];
}

interface GroupBaseDto {
  publicId: string;
}

export type CreateGroupDto = {
  name: string;
  description?: string;
};

export interface NewGroupDto extends GroupBaseDto {}

export interface UpdatedGroupDto extends GroupBaseDto {
  name: string;
  description: string | null;
}

export interface DeleteGroupDto extends GroupBaseDto {}

export interface AddRecipeToGroupDto extends GroupBaseDto {}

export interface RemoveRecipeFromGroupDto extends GroupBaseDto {}

export interface UpdatedImageGroupDto extends GroupBaseDto {}

export interface AddGroupMemberDto extends GroupBaseDto {}

export interface GroupOfMemberDto extends GroupBaseDto {}
