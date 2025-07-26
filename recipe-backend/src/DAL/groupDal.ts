import prisma from "../config/database";
import { CreateGroupDto } from "../dto/groupDto";
import {
  AddGroupMemberResponse,
  MemberOfGroupResponse,
  RecipeGroupResponse,
  UpdateGroupRecipeResponse,
} from "../types/response/groupResponse";
import {
  GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesPreviewResponse,
  UpdatedGroupResponse,
  UserGroupsResponse,
} from "../types/response/groupResponse";

export const pgGetUserGroups = async (
  publicUserId: string
): Promise<UserGroupsResponse[]> => {
  const userGroups = await prisma.groupMember.findMany({
    where: {
      user: {
        publicId: publicUserId,
      },
    },
    select: {
      group: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          publicId: true,
        },
      },
      admin: true,
    },
  });

  return userGroups;
};

export const pgGetGroupRecipesPreview = async (
  groupPublicId: string
): Promise<GroupRecipesPreviewResponse | null> => {
  const group: GroupRecipesPreviewResponse | null =
    await prisma.group.findUnique({
      where: { publicId: groupPublicId },
      include: {
        groupRecipes: {
          select: {
            recipe: {
              select: {
                title: true,
                publicId: true,
                imageUrl: true,
                categories: true,
                isPublic: true,
                _count: {
                  select: {
                    likes: true,
                  },
                },
              },
            },
          },
        },
        members: {
          select: {
            user: {
              select: {
                publicId: true,
                fullName: true,
                username: true,
                headLine: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
  if (!group) return null;

  return group;
};

export const pgGetMembersOfGroupByPublicGroupId = async (
  publicGroupId: string
): Promise<GroupMembersIdByGroupIdResponse | null> => {
  const groupMembers = await prisma.group.findUnique({
    where: {
      publicId: publicGroupId,
    },
    select: {
      members: {
        select: {
          admin: true,
          user: {
            select: {
              id: true,
              publicId: true,
            },
          },
        },
      },
    },
  });

  return groupMembers;
};

export const pgGetMemberOfGroup = async (
  userId: number,
  groupId: number
): Promise<MemberOfGroupResponse | null> => {
  const memberPublicId = await prisma.groupMember.findUnique({
    where: {
      userId_groupId: {
        userId: userId,
        groupId: groupId,
      },
    },
    select: {
      admin: true,
      user: {
        select: {
          id: true,
          publicId: true,
        },
      },
    },
  });
  return memberPublicId;
};

export const pgGetGroupIdByPublicId = async (
  publicGroupId: string
): Promise<number | null> => {
  const groupId = await prisma.group.findUnique({
    where: {
      publicId: publicGroupId,
    },
    select: {
      id: true,
    },
  });
  return groupId?.id ?? null;
};

export const pgCreateGroup = async (
  groupData: CreateGroupDto,
  publicUserId: string
): Promise<GroupIdResponse> => {
  const newGroup = await prisma.group.create({
    data: {
      name: groupData.name,
      description: groupData.description,
      creator: {
        connect: { publicId: publicUserId },
      },
      members: {
        create: {
          user: {
            connect: { publicId: publicUserId },
          },
          admin: true,
        },
      },
    },
    select: {
      publicId: true,
    },
  });

  return newGroup;
};

export const pgEditGroupDetails = async (
  groupData: CreateGroupDto,
  publicGroupId: string
): Promise<UpdatedGroupResponse> => {
  const updatedGroup: UpdatedGroupResponse = await prisma.group.update({
    where: {
      publicId: publicGroupId,
    },
    data: {
      name: groupData.name,
      description: groupData.description,
    },
    select: {
      publicId: true,
      name: true,
      description: true,
    },
  });
  return updatedGroup;
};

export const pgDeleteGroup = async (
  publicGroupId: string
): Promise<GroupIdResponse> => {
  const deletedGroup: GroupIdResponse = await prisma.group.delete({
    where: {
      publicId: publicGroupId,
    },
    select: {
      publicId: true,
    },
  });
  return deletedGroup;
};

export const pgAddRecipeToGroup = async (
  recipePublicId: string,
  groupPublicId: string,
  addedByPublicId: string
): Promise<UpdateGroupRecipeResponse> => {
  const groupRecipe: UpdateGroupRecipeResponse =
    await prisma.groupRecipe.create({
      data: {
        recipe: {
          connect: { publicId: recipePublicId },
        },
        group: {
          connect: { publicId: groupPublicId },
        },
        addedBy: {
          connect: { publicId: addedByPublicId },
        },
      },
      select: {
        group: {
          select: { publicId: true },
        },
      },
    });

  return groupRecipe;
};

export const pgRemoveRecipeFromGroup = async (
  recipePublicId: string,
  groupPublicId: string
): Promise<UpdateGroupRecipeResponse> => {
  const groupRecipe: UpdateGroupRecipeResponse =
    await prisma.groupRecipe.delete({
      where: {
        groupId_recipeId: {
          groupId: (
            await prisma.group.findUniqueOrThrow({
              where: { publicId: groupPublicId },
              select: { id: true },
            })
          ).id,
          recipeId: (
            await prisma.recipe.findUniqueOrThrow({
              where: { publicId: recipePublicId },
              select: { id: true },
            })
          ).id,
        },
      },
      select: {
        group: {
          select: { publicId: true },
        },
      },
    });

  return groupRecipe;
};

export const pgGetImageOfGroupByPublicId = async (
  publicId: string
): Promise<string> => {
  const group = await prisma.group.findUnique({
    where: { publicId },
    select: { imageUrl: true },
  });
  return group?.imageUrl ?? "";
};

export const pgUpdateImageOfGroup = async (
  publicGroupId: string,
  imageUrl: string | null
): Promise<GroupIdResponse> => {
  const recipeAdded: GroupIdResponse = await prisma.group.update({
    where: {
      publicId: publicGroupId,
    },
    data: {
      imageUrl: imageUrl,
    },
    select: {
      publicId: true,
    },
  });
  return recipeAdded;
};

export const pgAddGroupMember = async (
  groupPublicId: string,
  memberPublicId: string
): Promise<AddGroupMemberResponse> => {
  const groupMember: AddGroupMemberResponse = await prisma.groupMember.create({
    data: {
      group: {
        connect: { publicId: groupPublicId },
      },
      user: {
        connect: { publicId: memberPublicId },
      },
    },
    select: {
      group: {
        select: {
          publicId: true,
        },
      },
    },
  });

  return groupMember;
};

export const pgRemoveGroupMember = async (
  groupPublicId: string,
  memberPublicId: string
): Promise<number> => {
  const result = await prisma.groupMember.deleteMany({
    where: {
      group: { publicId: groupPublicId },
      user: { publicId: memberPublicId },
    },
  });

  return result.count;
};

export const pgGetGroupPublicIdByRecipeId = async (
  recipeId: number,
  groupId: number
) => {
  const groupRecipe = await prisma.groupRecipe.findUnique({
    where: {
      groupId_recipeId: {
        groupId,
        recipeId,
      },
    },
    select: {
      group: {
        select: { publicId: true },
      },
    },
  });

  return groupRecipe?.group.publicId ?? "";
};

export const pgGetGroupRecipeById = async (
  recipePublicId: string,
  groupPublicId: string
): Promise<RecipeGroupResponse> => {
  const groupRecipe: RecipeGroupResponse =
    await prisma.groupRecipe.findFirstOrThrow({
      where: {
        recipe: { publicId: recipePublicId },
        group: { publicId: groupPublicId },
      },
      select: {
        recipe: {
          include: {
            ingredients: true,
            categories: true,
            steps: true,
          },
        },
      },
    });

  return groupRecipe;
};

export const pgUpdateAdminStatus = async (
  groupId: number,
  memberId: number,
  adminStatus: boolean
): Promise<GroupIdResponse> => {
  const memberStatusUpdated: GroupIdResponse = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      members: {
        update: {
          where: {
            id: memberId,
          },
          data: {
            admin: adminStatus,
          },
        },
      },
    },
    select: {
      publicId: true,
    },
  });

  return memberStatusUpdated;
};
