import { Prisma } from "@prisma/client";
export type UserGroupsResponse = Prisma.GroupMemberGetPayload<{
  select: {
    group: {
      select: {
        id: true;
        name: true;
        imageUrl: true;
        publicId: true;
      };
    };
    admin: true;
  };
}>;

export type GroupRecipesResponse = Prisma.GroupGetPayload<{
  include: {
    recipes: {
      select: {
        title: true;
        publicId: true;
        imageUrl: true;
        categories: true;
        isPublic: true;
        _count: {
          select: {
            likes: true;
          };
        };
      };
    };
    members: {
      select: {
        user: {
          select: {
            publicId: true;
            fullName: true;
            username: true;
            headLine: true;
          };
        };
      };
    };
  };
}>;

export type GroupMembersIdByGroupIdResponse = Prisma.GroupGetPayload<{
  select: {
    members: {
      select: {
        admin: true;
        user: {
          select: {
            publicId: true;
          };
        };
      };
    };
  };
}>;

export type GroupIdResponse = Prisma.GroupGetPayload<{
  select: {
    publicId: true;
  };
}>;

export type UpdatedGroupResponse = Prisma.GroupGetPayload<{
  select: {
    publicId: true;
    name: true;
    description: true
  };
}>;
