import { Category } from "@prisma/client";

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

export interface GroupRecipesPreviewDto {
  publicId: string;
  name: string;
  imageUrl: string;
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