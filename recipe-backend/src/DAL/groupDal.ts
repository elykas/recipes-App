import prisma from "../config/database";
import { CreateGroupDto } from "../dto/groupDto";
import {
  GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesResponse,
  UpdatedGroupResponse,
  UserGroupsResponse,
} from "../types/responses";

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
  publicGroupId: string
): Promise<GroupRecipesResponse | null> => {
  const GroupRecipes: GroupRecipesResponse | null =
    await prisma.group.findUnique({
      where: {
        publicId: publicGroupId,
      },
      include: {
        recipes: {
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

  return GroupRecipes;
};

export const pgGetPublicUserIdByPublicGroupId = async (
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
              publicId: true,
            },
          },
        },
      },
    },
  });

  return groupMembers;
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

export const pgDeleteGroup = async (publicGroupId: string): Promise<GroupIdResponse> => {
  const deletedGroup: GroupIdResponse = await prisma.group.delete({
    where: {
      publicId: publicGroupId,
    },
    select: {
      publicId: true,
    }
  });
  return deletedGroup;
};
